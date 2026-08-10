import fs from 'node:fs/promises'
import path from 'node:path'
import { getNovels } from './novels'

const NOVELS_DIR = path.join(process.cwd(), 'novels')

/**
 * Istilah khas per universe, dikurasi dari compendium Kidungverse & bible
 * Auren/Skyroot (audit 2026-08). Hanya istilah yang muncul di beberapa novel
 * saja yang dipakai — istilah yang ada di semua novel (mis. "Hearth", "Vael",
 * "Clanmark" di Skyroot) tidak membedakan apa pun, jadi dibuang dari peta.
 */
const UNIVERSE_TERMS: Record<string, { term: string; note: string }[]> = {
  kidungverse: [
    { term: 'Bawah-Batavia', note: 'Kota bawah tanah steampunk' },
    { term: 'Neo-Batavia', note: 'Kota permukaan di atas Bawah-Batavia' },
    { term: 'Lupa Corp', note: 'Megakorporasi yang memperdagangkan memori' },
    { term: 'Empu Aether', note: 'Penempa legendaris Kuno' },
    { term: 'Aetherium', note: 'Energi hampa warisan Empu Aether' },
    { term: 'Godframe', note: 'Kategori zirah tempur' },
    { term: 'kanal', note: 'Arteri transportasi bawah tanah' },
    { term: 'merkuri', note: 'Lampu merkuri — ciri khas atmosfer' },
    { term: 'Sangha', note: 'Ordo/penempa sirkuit' },
    { term: 'ketukan', note: 'Motif irama dua-pendek-satu-panjang' },
  ],
  auren: [
    { term: 'Hollow', note: 'Korban Hearth curian' },
    { term: 'Chosen', note: 'Hollow yang diisi ulang Hearth curian' },
    { term: 'Sight', note: 'Pembacaan level publik' },
    { term: 'Mark', note: 'Tanda paksa kekuatan' },
  ],
  skyroot: [
    { term: 'Vowmark', note: 'Discipline sumpah' },
    { term: 'Seal', note: 'Segel yang menjaga dunia' },
    { term: 'Bloodline', note: 'Lapis trah di Skyroot' },
  ],
}

export interface NetworkNode {
  slug: string
  title: string
  terms: string[]
  degree: number
}

export interface NetworkEdge {
  a: string
  b: string
  terms: string[]
}

export interface UniverseNetwork {
  nodes: NetworkNode[]
  edges: NetworkEdge[]
  terms: { term: string; note: string }[]
}

let cache = new Map<string, UniverseNetwork>()

/** Baca semua bab sebuah novel menjadi satu string. */
async function readNovelText(slug: string): Promise<string> {
  const dir = path.join(NOVELS_DIR, slug)
  const files = (await fs.readdir(dir)).filter((f) => /^chapter-\d+\.md$/.test(f))
  let text = ''
  for (const file of files) {
    text += await fs.readFile(path.join(dir, file), 'utf-8')
  }
  return text
}

/**
 * Jaringan novel dalam satu universe: node = novel, edge = dua novel yang
 * sama-sama menyebut ≥1 istilah khas universe itu.
 */
export async function buildUniverseNetwork(
  universe: string,
): Promise<UniverseNetwork> {
  const key = universe.toLowerCase()
  const cached = cache.get(key)
  if (cached) return cached

  const terms = UNIVERSE_TERMS[key] ?? []
  const empty: UniverseNetwork = { nodes: [], edges: [], terms }
  if (terms.length === 0) return empty

  const novels = (await getNovels()).filter(
    (n) => (n.universe ?? '').toLowerCase() === universe.toLowerCase(),
  )
  const bySlug = new Map<string, NetworkNode>()
  for (const novel of novels) {
    let text = ''
    try {
      text = await readNovelText(novel.slug)
    } catch {
      // Novel tanpa bab (atau folder tak terbaca) tidak ikut peta.
      continue
    }
    const present = terms
      .map((t) => t.term)
      .filter((t) => text.includes(t))
    bySlug.set(novel.slug, { slug: novel.slug, title: novel.title, terms: present, degree: 0 })
  }

  const nodes = [...bySlug.values()]

  const edges: NetworkEdge[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const shared = nodes[i]!.terms.filter((t) => nodes[j]!.terms.includes(t))
      if (shared.length > 0) {
        edges.push({ a: nodes[i]!.slug, b: nodes[j]!.slug, terms: shared })
        nodes[i]!.degree++
        nodes[j]!.degree++
      }
    }
  }

  // Simpan catatan istilah hanya yang benar-benar membentuk edge.
  const used = new Set<string>()
  for (const e of edges) for (const t of e.terms) used.add(t)
  const usedTerms = terms.filter((t) => used.has(t.term))

  const result: UniverseNetwork = { nodes, edges, terms: usedTerms }
  cache.set(key, result)
  return result
}
