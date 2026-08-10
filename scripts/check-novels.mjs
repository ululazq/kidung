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
 *   7. Entitas unik per novel (audit klaster nama/org 2026-08-10): setiap entitas
 *      di UNIQUE_ENTITIES wajib muncul di bab novel pemiliknya SAJA. Bab = kanon
 *      publik; bible/outline/continuity-report/compendium boleh menyebut nama
 *      untuk riwayat rename, jadi tidak dihitung. Keluarga "Obsidian"
 *      (compendium seksi 4) juga dijaga: novel di luar OBSIDIAN_OWNERS tidak
 *      boleh memakai awalan "Obsidian".
 *
 *      Bila novel baru sengaja memakai ulang nama yang sudah ada sebagai gema
 *      kanon (pola "Nama Gema" compendium seksi 6), hapus entitas itu dari
 *      UNIQUE_ENTITIES dan catat klasternya di compendium dulu.
 *
 * Cara pakai:
 *   npm run verify
 *   node scripts/check-novels.mjs
 *   node scripts/check-novels.mjs --novel <slug>                                  # satu novel saja
 *   node scripts/check-novels.mjs --novel <slug> --mechanical [--strict]         # + cek mekanis per bab
 *   node scripts/check-novels.mjs --novel <slug> --mechanical --strict --complete # gate akhir publish
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

// --- Argumen CLI ---
// --novel <slug>  hanya periksa satu novel (dipakai pipeline); cek lintas novel
//                  (entitas unik, vokatif, klaster nama) dilewati dalam mode ini
// --mechanical    aktifkan cek mekanis per bab: heading di body, kalimat
//                  berulang, dialog nyaris hilang, penutup generik (peringatan)
// --strict        cek mekanis yang melanggar jadi error (dipakai novel:publish)
// --complete      novel wajib memverifikasi Complete: outline menyatakan bab persis
//                  sama dengan file di disk (dipakai novel:publish sebagai gate akhir)
const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1] : null;
};
const FILTER_SLUG = arg("--novel");
const MECHANICAL = process.argv.includes("--mechanical");
const STRICT = process.argv.includes("--strict");
const COMPLETE_MODE = process.argv.includes("--complete");

// Entitas unik per novel (dari audit klaster nama/org 2026-08-10 + seksi 3/4
// compendium): [nama, slug novel pemilik]. Pemakaian di bab novel lain = bocor.
const UNIQUE_ENTITIES = [
  // Karakter & mentor
  ["Master Alistair", "the-aegis-of-aether"],
  ["Master Whitmore", "the-clockwork-astra"],
  ["Master Kenzo", "the-neon-cipher"],
  ["Master Kaelen", "the-aetherium-vow"],
  ["Kapten Varian", "the-aegis-of-aether"],
  ["Komandan Varek", "the-aetherium-vow"],
  ["Jodi", "the-aegis-of-aether"],
  ["Bimo", "the-iron-karma"],
  // Relik & konsep unik
  ["Aether Regulator", "the-clockwork-astra"],
  ["Vessel Principle", "the-clockwork-astra"],
  ["Astra Regulator", "the-neon-cipher"],
  ["Prinsip Matang", "the-neon-cipher"],
  ["Astra Cipher", "the-neon-cipher"],
  ["Astra Horologium", "the-clockwork-astra"],
  ["Konsorsium Kunci", "the-aetherium-vow"],
  ["Iron Monarch", "the-shadow-compiler"],
  // Faksi & korporasi
  ["Obsidian Syndicate", "the-aegis-of-aether"],
  ["Obsidian Ministry", "the-clockwork-astra"],
  ["Obsidian Covenant", "the-cinder-relic"],
  ["Apex Corporation", "the-neon-cipher"],
  ["Syndicate Vane", "the-neon-cipher"],
  ["Sanjaya Syndicate", "the-astral-sovereign"],
  ["Eclipse Forge", "the-shadow-forger"],
  ["Concord Syndicate", "the-resonance-blade"],
  ["Iron Coven", "the-copper-relic"],
  ["JagadBumi", "the-iron-karma"],
  // Model zirah (seksi 3 compendium)
  ["Steam-Godframe", "the-clockwork-astra"],
  ["Aetheric Godframe", "the-neon-cipher"],
  ["Steam-Colossus", "the-aetherium-vow"],
  ["Heavy-Godframe", "the-aegis-of-aether"],
  ["Silver-Godframe", "the-shadow-compiler"],
  ["Boiler-Godframe", "sang-pembawa-pelita"],
  ["Copper-Godframe", "the-copper-relic"],
  ["Sonic-Godframe", "the-resonance-blade"],
  ["Shadow-Godframe", "the-shadow-forger"],
  ["Aetherium Exoskeleton", "serat-penempa-hampa"],
  ["Iron-Godframe", "the-cinder-relic"],
];

// Novel yang sah memakai awalan "Obsidian" (compendium seksi 4 — keluarga penuh,
// novel baru jangan menambah faksi/tempat berawalan Obsidian).
const OBSIDIAN_OWNERS = new Set([
  "the-aegis-of-aether", // Obsidian Syndicate
  "the-clockwork-astra", // Obsidian Ministry
  "the-cinder-relic", // Obsidian Covenant
  "sang-pemangku-fajar", // Menara Obsidian
  "the-astral-sovereign", // protokol Obsidian + Ruang Obsidian (non-faksi)
]);

// Vokatif mentor (compendium seksi 11): vokatif mengikuti gelar karakter
// (Master X → Master, Empu X → Empu, tanpa gelar → Guru). Mencampur dua
// vokatif dalam satu novel perlu cek manual — bisa jadi satu karakter
// dipanggil dua gelar (pelanggaran) atau dua mentor berbeda (sah).
const MENTOR_VOCATIVES = ["Guru", "Master", "Empu"];

// Kasus sah dengan dua mentor berbeda (vokatif masing-masing benar per
// compendium seksi 11) — ditinjau 2026-08-10, tidak perlu di-flag lagi:
//   the-copper-relic    : Empu Tirto → "Empu", Wira (tanpa gelar) → "Guru"
//   the-resonance-blade : Empu Wirama → "Empu", Rian (tanpa gelar) → "Guru"
const LEGIT_MENTOR_MIX = new Set(["the-copper-relic", "the-resonance-blade"]);

// Klaster nama gema yang didokumentasikan di compendium seksi 6 — tiap sisi
// wajib masih ada di novelnya. Bila hilang, catatan compendium basi (nama
// di-rename tanpa memperbarui compendium). [label, [ [istilah, slug], ... ]]
const DOCUMENTED_CLUSTERS = [
  ["klaster Vance", [["Gubernur Jenderal Vance", "the-shadow-compiler"], ["Elian Vance", "the-aegis-of-aether"], ["Rian Vance", "the-resonance-blade"]]],
  ["klaster Malakor", [["Lord Malakor", "the-clockwork-astra"], ["Baron Malakor", "the-aegis-of-aether"], ["Malcor", "sang-pemangku-fajar"]]],
  ["klaster Bagas", [["Bagas", "sang-garuda"], ["Bagas", "the-iron-karma"], ["Bagas", "pegadaian-bunga"]]],
  ["klaster Danu", [["Empu Danu", "the-cinder-relic"], ["Ki Danu", "kidung-tanah-karam"], ["Danu", "tangan-guntur"]]],
  ["klaster Kirana", [["Reza Kirana", "the-aetherium-vow"], ["Tara Kirana", "sang-pembawa-pelita"]]],
  ["klaster Arisya", [["Arisya Sola", "the-shadow-compiler"], ["Arisya Vael", "the-aetherium-vow"]]],
  ["klaster Maya", [["Maya", "the-host"], ["Maya Kirana", "the-aegis-of-aether"]]],
  ["klaster Kael", [["Rendra Kael", "the-shadow-compiler"], ["Master Kaelen", "the-aetherium-vow"]]],
  ["klaster Nusakara", [["Nusakara", "sang-garuda"], ["Nusakara", "tangan-guntur"]]],
  ["klaster Rukmini", [["Rukmini", "gods-in-jars"], ["Rukmini", "pasar-subuh"], ["Bu Rukmi", "kidung-tanah-karam"]]],
  ["klaster Mara", [["Old Mara", "the-prism"], ["Mara", "the-unhollowed"]]],
  ["klaster Regulator", [["Regulator Tembaga Sejati", "the-iron-karma"], ["Regulator Kuningan Sejati", "the-copper-relic"]]],
  ["klaster Iron", [["Iron Monarch", "the-shadow-compiler"], ["Iron-Godframe", "the-cinder-relic"]]],
  ["klaster Brata", [["Ki Demang Brata", "kidung-bayang-batavia"], ["Kapten Brata", "the-cinder-relic"]]],
  ["kembar Aether-London × Neo-Tokyo", [["Astra Horologium", "the-clockwork-astra"], ["Astra Cipher", "the-neon-cipher"], ["Master Whitmore", "the-clockwork-astra"], ["Master Kenzo", "the-neon-cipher"]]],
  ["klaster Varek×Varian", [["Komandan Varek", "the-aetherium-vow"], ["Kapten Varian", "the-aegis-of-aether"]]],
];

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

/** Isi bab tanpa frontmatter — tempat cek mekanis dijalankan. */
function stripFrontmatter(text) {
  const m = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return m ? text.slice(m[0].length) : text;
}

// Penutup generik yang dilarang aturan keras 7 (heuristic — selalu peringatan).
const GENERIC_CLOSING = [
  /menyongsong (hari|esok|masa depan|pagi)/i,
  /siap (menghadapi|mengarungi) (ancaman|hari|apa pun|semuanya)/i,
  /^apakah .*\?$/i,
];

/**
 * Cek mekanis per bab (aturan keras 3, 5, 7 + larangan kalimat berulang).
 * Error hanya dalam mode --strict; tanpa --strict semuanya peringatan.
 */
function mechanicalChecks(body) {
  const out = [];
  const err = (msg) => out.push({ level: STRICT ? "error" : "warn", msg });

  const headings = [...body.matchAll(/^#{1,6}\s+.+$/gm)].map((m) => m[0].trim());
  if (headings.length) err(`heading di body (${headings.length}): "${headings[0].slice(0, 60)}"`);

  const quotes = (body.match(/"/g) || []).length;
  if (quotes < 2) err(`dialog nyaris tidak ada (hanya ${quotes} tanda kutip)`);

  const sentences = (body.match(/[^.!?]{25,}[.!?]/g) || [])
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const seen = new Set();
  const reported = new Set();
  for (const s of sentences) {
    const k = s.toLowerCase();
    if (seen.has(k) && !reported.has(k)) {
      reported.add(k);
      err(`kalimat berulang: "${s.slice(0, 80)}"`);
    }
    seen.add(k);
  }

  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  const last = lines[lines.length - 1] || "";
  if (last && GENERIC_CLOSING.some((re) => re.test(last))) {
    out.push({ level: "warn", msg: `penutup generik: "${last.slice(0, 80)}"` });
  }

  return out;
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
  .filter((name) => !FILTER_SLUG || name === FILTER_SLUG)
  .sort();

console.log(
  `Memverifikasi ${FILTER_SLUG ? `novel "${FILTER_SLUG}"` : `${dirs.length} novel`} terhadap standar repo...\n`,
);

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

if (FILTER_SLUG && novelsData.length === 0) {
  console.error(`Novel "${FILTER_SLUG}" tidak ditemukan (atau belum punya chapter-1.md).`);
  process.exit(1);
}

for (const { name, base, chapters } of novelsData) {
  const count = chapters.length;
  const problems = [];

  // 1) continuity-report
  if (!existsSync(join(base, "continuity-report.md"))) {
    problems.push("continuity-report.md tidak ada");
  }

  // 2) outline: penanda selesai + jumlah bab yang dideklarasikan
  //    Novel In Progress (status != "Complete") boleh menyatakan target lebih
  //    banyak dari bab di disk (outline penuh lebih dulu, bab ditulis menyusul);
  //    yang dilarang: bab tanpa barisnya di outline (maxN < count). Mode
  //    --complete (dipakai novel:publish) menuntut kecocokan persis.
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
    if (COMPLETE_MODE && maxN !== count) {
      problems.push(`outline menyatakan bab sampai ${maxN || "?"} vs ${count} file bab di disk`);
    } else if (!COMPLETE_MODE && maxN < count) {
      problems.push(`outline menyatakan bab sampai ${maxN || "?"} < ${count} file bab di disk (bab tanpa baris outline)`);
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
  //    + cek mekanis per bab (--mechanical)
  for (const ch of chapters) {
    const n = chapterNumber(ch);
    const raw = readFileSync(join(base, ch), "utf8");
    const fm = readFrontmatter(raw);
    const chM = fm.match(/^chapter:\s*(\d+)\s*$/m);
    if (!chM || parseInt(chM[1], 10) !== n) {
      problems.push(`${ch}: frontmatter chapter=${chM ? chM[1] : "?"} ≠ nama file ${n}`);
    }
    const tiM = fm.match(/^title:\s*"([^"]+)"\s*$/m) || fm.match(/^title:\s*(.+?)\s*$/m);
    if (!tiM || !tiM[1].trim()) {
      problems.push(`${ch}: frontmatter title kosong`);
    }
    if (MECHANICAL) {
      for (const p of mechanicalChecks(stripFrontmatter(raw))) {
        if (p.level === "error") problems.push(`${ch}: ${p.msg}`);
        else warnings.push(`${name} ${ch}: ${p.msg}`);
      }
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

if (!FILTER_SLUG) {
  // 7) entitas unik per novel + keluarga "Obsidian" (bab = kanon publik)
const chapterTextByNovel = new Map(
  novelsData.map(({ name, base, chapters }) => [
    name,
    chapters.map((c) => readFileSync(join(base, c), "utf8")).join("\n"),
  ])
);

for (const [entity, owner] of UNIQUE_ENTITIES) {
  const esc = entity.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${esc}\\b`);
  const found = [];
  for (const [name, text] of chapterTextByNovel) {
    if (re.test(text)) found.push(name);
  }
  if (found.length === 0) {
    // Entitas bisa sah hidup di bible/outline saja (konsep teknis) — cek dokumen pemilik
    // sebelum menuduh rename. Warn hanya bila hilang total dari folder pemilik.
    const ownerDocs = ["bible.md", "outline.md", "continuity-report.md"]
      .map((f) => join(NOVELS_DIR, owner, f))
      .filter((p) => existsSync(p))
      .map((p) => readFileSync(p, "utf8"))
      .join("\n");
    if (!ownerDocs.includes(entity)) {
      warnings.push(`entitas unik "${entity}" hilang total (pemilik ${owner}) — hapus dari UNIQUE_ENTITIES atau cek rename`);
    }
  } else if (found.length > 1) {
    const leak = found.filter((n) => n !== owner).join(", ");
    errors.push(`entitas unik "${entity}" bocor ke ${leak} (pemilik ${owner})`);
    console.log(`  ✗ entitas unik: "${entity}" bocor ke ${leak} (pemilik ${owner})`);
  } else if (found[0] !== owner) {
    errors.push(`entitas unik "${entity}" hanya ada di ${found[0]}, pemiliknya ${owner}`);
    console.log(`  ✗ entitas unik: "${entity}" hanya ada di ${found[0]}, pemiliknya ${owner}`);
  }
}

for (const [name, text] of chapterTextByNovel) {
  if (/\bObsidian\b/.test(text) && !OBSIDIAN_OWNERS.has(name)) {
    errors.push(`novel "${name}" memakai awalan "Obsidian" di bab — keluarga Obsidian penuh (compendium seksi 4)`);
    console.log(`  ✗ novel "${name}" memakai awalan "Obsidian" di bab — keluarga Obsidian penuh (compendium seksi 4)`);
  }
}

// 8a) Vokatif mentor campur per novel (compendium seksi 11)
for (const { name, base, chapters } of novelsData) {
  const text = chapters.map((c) => readFileSync(join(base, c), "utf8")).join("\n");
  const used = MENTOR_VOCATIVES.filter((v) =>
    new RegExp(`["',]\\s*${v}[.,!?—]`).test(text)
  );
  if (used.length >= 2 && !LEGIT_MENTOR_MIX.has(name)) {
    warnings.push(
      `${name}: vokatif mentor campur (${used.join(", ")}) — cek apakah satu karakter dipanggil dua gelar (compendium seksi 11)`
    );
  }
}

// 8b) Klaster nama gema compendium seksi 6 — tiap sisi wajib ada di novelnya
const clusterDocText = new Map();
function novelFolderText(slug) {
  if (!clusterDocText.has(slug)) {
    const base = join(NOVELS_DIR, slug);
    let t = "";
    if (existsSync(base)) {
      t = readdirSync(base)
        .filter((f) => f.endsWith(".md"))
        .map((f) => readFileSync(join(base, f), "utf8"))
        .join("\n");
    }
    clusterDocText.set(slug, t);
  }
  return clusterDocText.get(slug);
}
for (const [label, sides] of DOCUMENTED_CLUSTERS) {
  for (const [term, slug] of sides) {
    if (!novelFolderText(slug).includes(term)) {
      warnings.push(`compendium ${label}: "${term}" hilang dari ${slug} — catatan basi atau nama di-rename?`);
    }
  }
}
} // akhir if (!FILTER_SLUG) — cek lintas novel dilewati dalam mode --novel

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
