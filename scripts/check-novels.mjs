#!/usr/bin/env node
/**
 * Verifikasi novel Kidungverse sebelum commit.
 *
 * Memeriksa untuk setiap novel (folder dengan chapter-1.md di novels/):
 *   1. continuity-report.md wajib ada.
 *   2. outline.md memverifikasi Complete — jumlah kata "selesai" >= jumlah bab.
 *   3. Band bab: setiap bab 1.500–2.500 kata (standar repo), dengan pengecualian
 *      terdokumentasi di NOVEL-AUDIT.md seksi 1–2:
 *        - gods-in-jars      : 4.500–5.500 (format panjang disengaja)
 *        - lantern-of-night  : >2.500 diizinkan (pembukaan atmosferik, ch1–3)
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

  // 2) outline berstatus
  const outlinePath = join(base, "outline.md");
  let outlineCount = 0;
  if (existsSync(outlinePath)) {
    outlineCount = (readFileSync(outlinePath, "utf8").match(/selesai/g) || []).length;
    if (outlineCount < count) {
      problems.push(`outline tidak memverifikasi Complete (${outlineCount} 'selesai' < ${count} bab)`);
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

  if (problems.length) {
    errors.push(...problems.map((p) => `${name}: ${p}`));
    console.log(`  ✗ ${name}`);
    for (const p of problems) console.log(`      - ${p}`);
  } else {
    console.log(`  ✓ ${name} (${count} bab, outline ok, continuity-report ada)`);
  }
}

console.log("");
if (errors.length) {
  console.log(`GAGAL: ${errors.length} pelanggaran ditemukan.`);
  process.exitCode = 1;
} else {
  console.log(`OK: ${dirs.length}/${dirs.length} novel lolos semua pemeriksaan.`);
}
