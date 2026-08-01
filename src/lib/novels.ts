import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import fg from 'fast-glob'

const NOVELS_DIR = path.resolve(process.cwd(), 'novels')

export interface Novel {
  slug: string
  title: string
  genre?: string
  tone?: string
  protagonist?: string
  status?: string
  description?: string
}

export interface Chapter {
  slug: string
  novelSlug: string
  number: number
  title: string
  content: string
  wordCount: number
}

function extractSynopsis(markdown: string): string | undefined {
  const match = markdown.match(/##\s*Sinopsis\s*\n([\s\S]*?)(?:\n##\s|\n#\s|$)/i)
  if (!match) return undefined
  return match[1]
    .trim()
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(' ')
}

export function getNovels(): Novel[] {
  const readmes = fg.sync('*/README.md', { cwd: NOVELS_DIR, onlyFiles: true })
  return readmes.map((rel) => {
    const slug = rel.split(/[\\/]/)[0]
    const file = path.join(NOVELS_DIR, rel)
    const source = fs.readFileSync(file, 'utf-8')
    const { data, content } = matter(source)
    return {
      slug,
      title: data.title || slug,
      genre: data.genre,
      tone: data.tone,
      protagonist: data.protagonist,
      status: data.status,
      description: data.description || extractSynopsis(content),
    }
  })
}

export function getNovel(slug: string): Novel | undefined {
  return getNovels().find((n) => n.slug === slug)
}

export function getChapters(novelSlug?: string): Chapter[] {
  const pattern = novelSlug ? `${novelSlug}/chapter-*.md` : '*/chapter-*.md'
  const files = fg.sync(pattern, { cwd: NOVELS_DIR, onlyFiles: true })

  return files
    .map((rel) => {
      const file = path.join(NOVELS_DIR, rel)
      const { data, content } = matter(fs.readFileSync(file, 'utf-8'))
      const slug = rel.split(/[\\/]/)[0]
      const match = path.basename(rel).match(/chapter-(\d+)/)
      const number = parseInt(data.chapter) || (match ? parseInt(match[1]) : 1)
      const words = content.trim().split(/\s+/).filter(Boolean).length

      return {
        slug: `${slug}-chapter-${number}`,
        novelSlug: slug,
        number,
        title: data.title || `Chapter ${number}`,
        content,
        wordCount: words,
      }
    })
    .sort((a, b) => a.number - b.number)
}
