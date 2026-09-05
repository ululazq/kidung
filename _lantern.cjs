// Naik-mutu gaya lantern: menambah em-dash pada pola tanda baca yang aman,
// SAMPAI bab mencapai ambang gaya (default 10), lalu berhenti.
//
// Kenapa bertarget: menerapkan semua pola ke semua tempat = em-dash berlebihan
// (40+/bab) yang justru merusak ritme. Panduan lantern minta jeda em-dash sebagai
// aksen, bukan tanda baca utama. Skrip berhenti begitu ambang tercapai.
//
// TIDAK mengubah kata, makna, kanon, atau istilah entitas — hanya tanda baca.
// TIDAK menyentuh frontmatter, heading, blok kutipan (>), atau ISI dialog "...".
//
// Pakai: node _lantern.cjs 101 154 [--target 10] [--dry]
//        node _lantern.cjs 101
const fs = require('fs');
const dir = 'novels/the-unremembered-king/';

const args = process.argv.slice(2);
const nums = args.filter(a => /^\d+$/.test(a)).map(Number);
const from = nums[0];
const to = nums.length > 1 && args.indexOf(String(nums[1])) < args.indexOf('--target') + 1 ? nums[1] : (nums[1] || from);
const ti = args.indexOf('--target');
const TARGET = ti >= 0 ? Number(args[ti + 1]) : 10;
const dry = args.includes('--dry');
const realTo = (ti >= 0 && nums[1] === TARGET) ? from : (nums[1] || from);

// Urutan prioritas: paling khas gaya lantern lebih dulu.
const RULES = [
  [/, yaitu\b/g, ' — yaitu'],
  [/, yang artinya\b/g, ' — yang artinya'],
  [/, bukan ([^,.;:!?"]{3,40}), melainkan\b/g, ' — bukan $1, melainkan'],
  [/, melainkan\b/g, ' — melainkan'],
  [/, dan (itu|itulah|justru|karena itu)\b/g, ' — dan $1'],
  [/, tetapi bukan\b/g, ' — tetapi bukan'],
  [/, seolah ([^,.;:!?"]{20,})/g, ' — seolah $1'],
  [/, sebab ([^,.;:!?"]{30,})/g, ' — sebab $1'],
  [/, sedangkan\b/g, ' — sedangkan'],
];

function isProtected(line) {
  const t = line.trim();
  if (t === '' || t === '---') return true;
  if (t.startsWith('>') || t.startsWith('#')) return true;
  if (t.startsWith('title:') || t.startsWith('chapter:')) return true;
  if (t.startsWith('"')) return true; // baris dialog penuh
  return false;
}

// Ganti SATU kemunculan pertama dari rule ke-r di narasi (dialog dipotong keluar).
function applyOnce(lines, rule) {
  const [re, rep] = rule;
  for (let i = 0; i < lines.length; i++) {
    if (isProtected(lines[i])) continue;
    const parts = lines[i].split(/("(?:[^"\\]|\\.)*")/g); // indeks ganjil = dialog
    for (let j = 0; j < parts.length; j += 2) {
      const one = new RegExp(re.source, re.flags.replace('g', ''));
      if (one.test(parts[j])) {
        parts[j] = parts[j].replace(one, rep);
        lines[i] = parts.join('');
        return true;
      }
    }
  }
  return false;
}

let touched = 0, added = 0;
for (let n = from; n <= realTo; n++) {
  const f = dir + 'chapter-' + n + '.md';
  if (!fs.existsSync(f)) continue;
  const before = fs.readFileSync(f, 'utf8');
  const nl = before.includes('\r\n') ? '\r\n' : '\n';
  const lines = before.split(/\r?\n/);
  let em = (before.match(/—/g) || []).length;
  const start = em;
  // putar rule berulang sampai ambang atau tidak ada lagi yang cocok
  let progress = true;
  while (em < TARGET && progress) {
    progress = false;
    for (const rule of RULES) {
      if (em >= TARGET) break;
      if (applyOnce(lines, rule)) { em++; progress = true; }
    }
  }
  if (em > start) {
    if (!dry) fs.writeFileSync(f, lines.join(nl));
    console.log('ch' + n + ': em ' + start + ' -> ' + em + (em < TARGET ? '  (pola habis)' : ''));
    touched++; added += em - start;
  }
}
console.log('--- ' + touched + ' bab, +' + added + ' em-dash, target ' + TARGET + (dry ? ' (DRY RUN)' : '') + ' ---');
