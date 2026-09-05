// Perbaikan ejaan/typo pada SELURUH bab novel the-unremembered-king (1-352).
// Hanya kata non-baku/typo yang jelas; tidak mengubah makna, kanon, atau istilah entitas.
// Pakai: node _fixspell.cjs            -> semua bab
//        node _fixspell.cjs 5 38       -> rentang bab 5..38
const fs = require('fs');
const dir = 'novels/the-unremembered-king/';

const FIX = [
  [/\bmemenuliskan\b/g, 'menuliskan'],
  [/\bmemenulis\b/g, 'menulis'],
  [/\bmengjawab/g, 'menjawab'],
  [/\bngitung\b/g, 'menghitung'],
  [/\bngecek\b/g, 'memeriksa'],
  [/\bngajarin\b/g, 'mengajari'],
  [/\bnemu\b/g, 'menemukan'],
  [/\bberansur\b/g, 'berangsur'],
  [/\bmeja bular\b/g, 'meja bundar'],
  [/\bbular\b/g, 'bundar'],
  [/\bmengetatkan\b/g, 'mengencangkan'],
  [/\bbisa dakwa\b/g, 'bisa mendakwa'],
  [/\bnyulum\b/g, 'memakai vein'],
  [/\bbatu selingkung selebar kepala\b/g, 'batu selebar kepala'],
  [/\bpatung wajar\b/g, 'patina wajar'],
  [/\bmenertawakan pendek\b/g, 'tertawa pendek'],
  [/\bloh kau kan\b/g, 'kau kan'],
  [/\bfihak\b/g, 'pihak'],
  [/(bulan|tahun|hari) silang\b/g, '$1 silam'],
];

const from = process.argv[2] ? parseInt(process.argv[2], 10) : 1;
const to = process.argv[3] ? parseInt(process.argv[3], 10) : 352;

let total = 0;
for (let n = from; n <= to; n++) {
  const f = dir + 'chapter-' + n + '.md';
  if (!fs.existsSync(f)) continue;
  const before = fs.readFileSync(f, 'utf8');
  let after = before;
  const hits = [];
  for (const [re, to2] of FIX) {
    const m = after.match(re);
    if (m) { hits.push(m[0] + '->' + to2 + ' x' + m.length); after = after.replace(re, to2); }
  }
  if (after !== before) {
    fs.writeFileSync(f, after);
    console.log('ch' + n + ': ' + hits.join(', '));
    total++;
  }
}
console.log('--- ' + total + ' file diperbaiki ---');
