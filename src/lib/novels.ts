import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const NOVELS_DIR = path.join(process.cwd(), 'novels')
const COVERS_DIR = path.join(process.cwd(), 'public', 'covers')

export interface NovelMeta {
  title: string
  slug: string
  genre: string
  tone: string
  protagonist: string
  description: string
  status: string
  started: string
  completed?: string
  universe?: string
  language?: string
}

export interface ChapterRef {
  number: number
  title: string
  slug: string
  words: number
}

export interface Novel extends NovelMeta {
  chapters: ChapterRef[]
  chapterCount: number
  totalWords: number
  cover: string | null
  genreTags: string[]
}

export interface ChapterContent {
  number: number
  title: string
  body: string
  words: number
  novel: Novel
  prev: ChapterRef | null
  next: ChapterRef | null
}

/** Frontmatter parsing fails on a leading BOM, so strip it before gray-matter. */
function stripBom(raw: string): string {
  return raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw
}

/** Several READMEs have trailing spaces inside the quoted YAML values. */
function clean(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback
}

/**
 * "Dark Fantasy / Contemporary Urban" -> ["Dark Fantasy", "Contemporary Urban"]
 * Used for the genre filter chips on the index page.
 */
function splitGenre(genre: string): string[] {
  return genre
    .split('/')
    .map((g) => g.trim())
    .filter(Boolean)
}

function countWords(body: string): number {
  return body.split(/\s+/).filter(Boolean).length
}

/** chapter-2.md must sort before chapter-10.md, so sort on the parsed number. */
function chapterNumber(filename: string): number {
  const match = filename.match(/chapter-(\d+)\.md$/)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

async function readCoverSet(): Promise<Map<string, string>> {
  try {
    const files = await fs.readdir(COVERS_DIR)
    return new Map(
      files
        .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
        .map((f) => [f.replace(/\.[^.]+$/, ''), f]),
    )
  } catch {
    return new Map()
  }
}

async function readChapters(dir: string): Promise<ChapterRef[]> {
  const files = (await fs.readdir(dir))
    .filter((f) => /^chapter-\d+\.md$/.test(f))
    .sort((a, b) => chapterNumber(a) - chapterNumber(b))

  const chapters = await Promise.all(
    files.map(async (file) => {
      const raw = stripBom(await fs.readFile(path.join(dir, file), 'utf-8'))
      const { data, content } = matter(raw)
      const number = chapterNumber(file)
      // Titles are written as "Bab 16: Bentrok" in some novels and plain
      // "Awakening" in others — strip the redundant prefix for consistency.
      const rawTitle = clean(data.title, `Chapter ${number}`)
      const title = rawTitle.replace(/^(Bab|Chapter)\s*\d+\s*[:.\-–]\s*/i, '')
      return {
        number,
        title: title || `Chapter ${number}`,
        slug: file.replace(/\.md$/, ''),
        words: countWords(content),
      }
    }),
  )

  return chapters
}

let cache: Novel[] | null = null

export async function getNovels(): Promise<Novel[]> {
  if (cache) return cache

  const covers = await readCoverSet()
  const entries = await fs.readdir(NOVELS_DIR, { withFileTypes: true })
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name)

  const novels = await Promise.all(
    dirs.map(async (dirName) => {
      const dir = path.join(NOVELS_DIR, dirName)
      let data: Record<string, unknown> = {}

      try {
        const raw = stripBom(await fs.readFile(path.join(dir, 'README.md'), 'utf-8'))
        data = matter(raw).data
      } catch {
        // A novel folder without a README still renders from its chapters.
      }

      const chapters = await readChapters(dir)
      const slug = clean(data.slug, dirName)
      const genre = clean(data.genre, 'Fiksi')

      return {
        slug,
        title: clean(data.title, dirName),
        genre,
        genreTags: splitGenre(genre),
        tone: clean(data.tone),
        protagonist: clean(data.protagonist),
        description: clean(data.description),
        status: clean(data.status, 'In Progress'),
        started: clean(data.started),
        completed: clean(data.completed) || undefined,
        universe: clean(data.universe) || undefined,
        language: clean(data.language) || undefined,
        chapters,
        chapterCount: chapters.length,
        totalWords: chapters.reduce((sum, c) => sum + c.words, 0),
        cover: covers.get(slug) ?? null,
      } satisfies Novel
    }),
  )

  // Novels with chapters first, then alphabetical.
  cache = novels
    .filter((n) => n.chapterCount > 0)
    .sort((a, b) => a.title.localeCompare(b.title))

  return cache
}

export async function getNovel(slug: string): Promise<Novel | undefined> {
  const novels = await getNovels()
  return novels.find((n) => n.slug === slug)
}

export async function getChapter(
  novelSlug: string,
  chapterSlug: string,
): Promise<ChapterContent | null> {
  const novel = await getNovel(novelSlug)
  if (!novel) return null

  const index = novel.chapters.findIndex((c) => c.slug === chapterSlug)
  if (index === -1) return null

  const ref = novel.chapters[index]!
  // The folder name is the source of truth for the path; slug may differ.
  const dirName = await resolveDirName(novelSlug)
  const file = path.join(NOVELS_DIR, dirName, `${chapterSlug}.md`)
  const raw = stripBom(await fs.readFile(file, 'utf-8'))
  const { content } = matter(raw)

  return {
    number: ref.number,
    title: ref.title,
    body: content,
    words: ref.words,
    novel,
    prev: index > 0 ? novel.chapters[index - 1]! : null,
    next: index < novel.chapters.length - 1 ? novel.chapters[index + 1]! : null,
  }
}

/** Map a novel slug back to its folder name (they match today, but need not). */
async function resolveDirName(slug: string): Promise<string> {
  const entries = await fs.readdir(NOVELS_DIR, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name === slug) return entry.name
    try {
      const raw = stripBom(
        await fs.readFile(path.join(NOVELS_DIR, entry.name, 'README.md'), 'utf-8'),
      )
      if (clean(matter(raw).data.slug) === slug) return entry.name
    } catch {
      // Ignore folders we cannot read a README from.
    }
  }
  return slug
}

export function readingMinutes(words: number): number {
  // ~220 wpm is a common average for narrative prose in Indonesian.
  return Math.max(1, Math.round(words / 220))
}

export async function getAllGenres(): Promise<string[]> {
  const novels = await getNovels()
  const set = new Set<string>()
  for (const novel of novels) {
    for (const tag of novel.genreTags) set.add(tag)
  }
  return [...set].sort()
}
