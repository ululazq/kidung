// Perbaiki kerusakan warisan blanket-replace `kerja` -> `bekerja` yang merusak
// KATA MAJEMUK (nomina + kerja) di seluruh novel.
//
// PENTING: hanya majemuk yang TIDAK AMBIGU dimasukkan. Konstruksi subjek+verba
// yang sah DIBIARKAN (mis. "prosedur bekerja dengan barang", "cara bekerja",
// "keheningan bekerja", "tempat bekerja", "dunia bekerja", "tiga tahun bekerja").
// Tiap entri di bawah sudah diperiksa konteksnya (grep -o dengan 50 char sekitar).
//
// Pakai: node _fixkerja.cjs [--dry]
const fs = require('fs');
const dir = 'novels/the-unremembered-king/';
const dry = process.argv.includes('--dry');

// nomina yang jelas membentuk majemuk "X kerja"
const NOUNS = [
  'kontrak', 'tenaga', 'ruang', 'ruangan', 'meja', 'jam', 'papan', 'bangku',
  'jubah', 'mantel', 'jadwal', 'daftar', 'buku', 'laporan', 'rekan', 'kawan',
  'relasi', 'antrean', 'radius', 'sudut', 'pekan', 'penempatan', 'pemberi',
  'shift', 'beban', 'keselamatan', 'kerangka', 'lembar', 'arsip', 'urutan',
  'usia', 'umur', 'musim', 'lagu', 'irama', 'hasil',
];

const FIX = NOUNS.map(n => [new RegExp('\\b(' + n + ') bekerja\\b', 'g'), '$1 kerja']);
// frasa khusus
FIX.push([/\bmakan malam bekerja\b/g, 'makan malam kerja']);
FIX.push([/\bhari bekerja\b/g, 'hari kerja']);

let total = 0, hits = 0;
for (let n = 1; n <= 352; n++) {
  const f = dir + 'chapter-' + n + '.md';
  if (!fs.existsSync(f)) continue;
  const before = fs.readFileSync(f, 'utf8');
  let after = before;
  const log = [];
  for (const [re, rep] of FIX) {
    const m = after.match(re);
    if (m) { log.push(m[0] + ' x' + m.length); after = after.replace(re, rep); hits += m.length; }
  }
  if (after !== before) {
    if (!dry) fs.writeFileSync(f, after);
    console.log('ch' + n + ': ' + log.join(', '));
    total++;
  }
}
console.log('--- ' + total + ' bab, ' + hits + ' perbaikan' + (dry ? ' (DRY RUN)' : '') + ' ---');
