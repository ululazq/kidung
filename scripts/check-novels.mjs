#!/usr/bin/env node
/**
 * Verifikasi novel Kidungverse sebelum commit.
 *
 * Memeriksa untuk setiap novel (folder dengan chapter-1.md di novels/):
 *   1. continuity-report.md wajib ada.
 *   2. outline.md memverifikasi Complete — jumlah kata "selesai" >= jumlah bab,
 *      dan jumlah bab yang dideklarasikan outline (header Bab N / entri bernomor /
 *      baris tabel) cocok dengan file bab di disk.
 *   3. Band bab: setiap bab 1.500–2.500 kata (standar repo), dengan pengecualian
 *      terdokumentasi di NOVEL-AUDIT.md seksi 1–2:
 *        - gods-in-jars      : 4.500–5.500 (format panjang disengaja)
 *        - lantern-of-night  : >2.500 diizinkan (pembukaan atmosferik, ch1–3)
 *   4. Frontmatter tiap bab: `chapter: N` cocok dengan nama file, `title` tidak kosong.
 *   5. Bible: header "Terakhir diperbarui: bab N" cocok dengan jumlah bab di disk.
 *   6. Sinkron judul (peringatan, tidak menggagalkan): judul bab di outline vs
 *      judul frontmatter file — perbedaan format (Epilog:, anotasi, urutan kata)
 *      dinormalisasi; selisih yang tersisa dicetak sebagai warning.
 *
 * Cara pakai:
 *   npm run verify
 *   node scripts/check-novels.mjs
 *
 * Exit code 1 bila ada pelanggaran (menahan commit jika dipakai sebagai pre-commit).
 * Lewati paksa di pre-commit: SKIP_NOVEL_CHECK=1 git commit ...
 */

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const NOVELS_DIR = "novels";
const BAND = { min: 1500, max: 2500 };
const EXCEPTIONS = {
  // slug -> rentang kata yang diizinkan (menggantikan BAND)
  "gods-in-jars": { min: 4500, max: 5500 },
  "lantern-of-night": { min: 1500, max: Infinity },
};

const errors = [];
const warnings = [];

// Hitungan kata kanon repo = `wc -w` (dipakai NOVEL-AUDIT). Git Bash wc
// memperlakukan token murni tanda baca (mis. "—") sebagai BUKAN kata dan
// tidak bisa direplikasi persis oleh \s JS (meleset puluhan kata/bab), jadi
// script memanggil wc langsung bila tersedia; fallback JS mendekati.
let wcCounts = null;

function collectCounts(chapterPaths) {
  const res = spawnSync("wc", ["-w", ...chapterPaths], { encoding: "utf8" });
  if (res.status !== 0) return; // wc tidak tersedia -> fallback JS
  wcCounts = new Map();
  for (const line of res.stdout.split(/\n/)) {
    const m = line.match(/^\s*(\d+)\s+(.+?)\s*$/);
    if (m) wcCounts.set(m[2], parseInt(m[1], 10));
  }
}

function countWords(path) {
  if (wcCounts && wcCounts.has(path)) return wcCounts.get(path);
  // Fallback (mendekati wc -w): token murni tanda baca tidak dihitung.
  const text = readFileSync(path, "utf8");
  return text.split(/\s+/).filter(Boolean).filter((tok) => /[A-Za-z0-9]/.test(tok)).length;
}

function chapterNumber(file) {
  const m = file.match(/^chapter-(\d+)\.md$/);
  return m ? parseInt(m[1], 10) : Infinity;
}

function readFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : "";
}

// Nomor bab yang dideklarasikan outline: header "Bab N" di mana pun, entri
// bernomor "N. **Judul**" (gaya the-duet/the-remembering), dan baris tabel
// "| N | ... |" (gaya pasar-subuh/the-astral-sovereign).
function outlineChapterNumbers(outline) {
  const nums = new Set();
  for (const m of outline.matchAll(/\bBab\s+(\d{1,2})\b/gi)) nums.add(parseInt(m[1], 10));
  for (const m of outline.matchAll(/^\d+\.\s+\*\*/gm)) nums.add(parseInt(m[0].match(/\d+/)[0], 10));
  for (const m of outline.matchAll(/^\|\s*(\d{1,2})\s*\|/gm)) nums.add(parseInt(m[1], 10));
  return [...nums].sort((a, b) => a - b);
}

// Judul bab dari outline: "**Bab 1 — Judul**", "## Bab 1 — Judul", "### Bab 14: Judul".
function extractOutlineTitles(outline) {
  const out = [];
  for (const m of outline.matchAll(/^\s*(?:\*\*|#{2,4}\s*)?Bab\s+(\d+)\s*[-–—:.]\s*(.+?)\s*(?:\*\*)?\s*$/gim)) {
    out.push({ n: parseInt(m[1], 10), t: m[2].trim() });
  }
  return out;
}

// Normalisasi judul untuk perbandingan: buang prefiks "Bab N"/"Epilog:",
// anotasi dalam kurung, dan fragmen setelah "—" (mis. "(Vox) — midpoint twist").
function normalizeTitle(s) {
  return s
    .toLowerCase()
    .replace(/^bab\s*\d+\s*[:.\-–—]?\s*/i, "")
    .replace(/^epilog(ue)?\s*[:.\-–—]?\s*/i, "")
    .replace(/\([^)]*\)/g, " ")
    .split(/[—–]/)[0]
    .replace(/[^a-z0-9\u00e0-\u024f]+/g, " ")
    .trim();
}

// Kumpulkan novel: folder dengan chapter-1.md (folder konsep auren/skyroot/kidungverse dilewati).
const dirs = readdirSync(NOVELS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .filter((name) => existsSync(join(NOVELS_DIR, name, "chapter-1.md")))
  .sort();

console.log(`Memverifikasi ${dirs.length} novel terhadap standar repo...\n`);

// Kumpulkan semua file bab, lalu hitung kata sekali lewat wc -w.
const novelsData = [];
const allChapterPaths = [];
for (const name of dirs) {
  const base = join(NOVELS_DIR, name);
  const chapters = readdirSync(base)
    .filter((f) => /^chapter-\d+\.md$/.test(f))
    .sort((a, b) => chapterNumber(a) - chapterNumber(b));
  novelsData.push({ name, base, chapters });
  for (const c of chapters) allChapterPaths.push(join(base, c));
}
collectCounts(allChapterPaths);

for (const { name, base, chapters } of novelsData) {
  const count = chapters.length;
  const problems = [];

  // 1) continuity-report
  if (!existsSync(join(base, "continuity-report.md"))) {
    problems.push("continuity-report.md tidak ada");
  }

  // 2) outline: penanda selesai + jumlah bab yang dideklarasikan
  const outlinePath = join(base, "outline.md");
  let outlineText = "";
  if (existsSync(outlinePath)) {
    outlineText = readFileSync(outlinePath, "utf8");
    const outlineCount = (outlineText.match(/selesai/g) || []).length;
    if (outlineCount < count) {
      problems.push(`outline tidak memverifikasi Complete (${outlineCount} 'selesai' < ${count} bab)`);
    }
    const nums = outlineChapterNumbers(outlineText);
    const maxN = nums.length ? Math.max(...nums) : 0;
    if (maxN !== count) {
      problems.push(`outline menyatakan bab sampai ${maxN || "?"} vs ${count} file bab di disk`);
    }
  } else {
    problems.push("outline.md tidak ada");
  }

  // 3) band bab
  const range = EXCEPTIONS[name] || BAND;
  for (const ch of chapters) {
    const words = countWords(join(base, ch));
    if (words < range.min || words > range.max) {
      problems.push(`${ch}: ${words} kata (di luar ${range.min}–${range.max === Infinity ? "∞" : range.max})`);
    }
  }

  // 4) frontmatter: chapter: N cocok nama file, title tidak kosong
  for (const ch of chapters) {
    const n = chapterNumber(ch);
    const fm = readFrontmatter(readFileSync(join(base, ch), "utf8"));
    const chM = fm.match(/^chapter:\s*(\d+)\s*$/m);
    if (!chM || parseInt(chM[1], 10) !== n) {
      problems.push(`${ch}: frontmatter chapter=${chM ? chM[1] : "?"} ≠ nama file ${n}`);
    }
    const tiM = fm.match(/^title:\s*"([^"]+)"\s*$/m) || fm.match(/^title:\s*(.+?)\s*$/m);
    if (!tiM || !tiM[1].trim()) {
      problems.push(`${ch}: frontmatter title kosong`);
    }
  }

  // 5) bible: header "Terakhir diperbarui: bab N"
  const biblePath = join(base, "bible.md");
  if (existsSync(biblePath)) {
    const bm = readFileSync(biblePath, "utf8").match(/Terakhir diperbarui:\s*bab\s*(\d+)/i);
    if (bm && parseInt(bm[1], 10) !== count) {
      problems.push(`bible header 'Terakhir diperbarui: bab ${bm[1]}' ≠ ${count} bab di disk`);
    }
  }

  // 6) sinkron judul (peringatan saja)
  if (outlineText) {
    const fmTitles = chapters.map((ch) => {
      const fm = readFrontmatter(readFileSync(join(base, ch), "utf8"));
      const tiM = fm.match(/^title:\s*"([^"]+)"\s*$/m) || fm.match(/^title:\s*(.+?)\s*$/m);
      return tiM ? tiM[1].trim() : "";
    });
    for (const o of extractOutlineTitles(outlineText)) {
      const ft = fmTitles[o.n - 1] || "";
      if (!ft) continue;
      const fn = ft.replace(/^bab\s*\d+\s*[:.\-–—]?\s*/i, "");
      if (normalizeTitle(fn) !== normalizeTitle(o.t)) {
        warnings.push(`${name} bab ${o.n}: outline "${o.t}" ≠ file "${fn}"`);
      }
    }
  }

  if (problems.length) {
    errors.push(...problems.map((p) => `${name}: ${p}`));
    console.log(`  ✗ ${name}`);
    for (const p of problems) console.log(`      - ${p}`);
  } else {
    console.log(`  ✓ ${name} (${count} bab, outline ok, continuity-report ada)`);
  }
}

console.log("");
if (warnings.length) {
  console.log(`PERINGATAN sinkron judul (${warnings.length} — tidak menggagalkan, perlu cek manual):`);
  for (const w of warnings) console.log(`  - ${w}`);
  console.log("");
}
if (errors.length) {
  console.log(`GAGAL: ${errors.length} pelanggaran ditemukan.`);
  process.exitCode = 1;
} else {
  console.log(`OK: ${dirs.length}/${dirs.length} novel lolos semua pemeriksaan.`);
}
