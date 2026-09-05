// Perbaiki mojibake (UTF-8 yang ter-encode ganda) pada bab novel.
// Pakai: node _fixmojibake.cjs [file1 file2 ...]   (default: semua chapter-*.md)
const fs = require('fs');
const path = require('path');
const dir = 'novels/the-unremembered-king/';

const MAP = [
  ['â€”', '—'], ['â€“', '–'], ['â€œ', '"'], ['â€\u009d', '"'],
  ['â€™', '\u2019'], ['â€˜', '\u2018'], ['â€¦', '…'],
  ['Â ', ' '], ['Ã©', 'é'], ['Ã¡', 'á'], ['Ã­', 'í'],
  ['Ã³', 'ó'], ['Ãº', 'ú'], ['Ã±', 'ñ'], ['â€¢', '•'],
];

const files = process.argv.length > 2
  ? process.argv.slice(2)
  : fs.readdirSync(dir).filter(f => /^chapter-\d+\.md$/.test(f)).map(f => dir + f);

let n = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  let after = before;
  for (const [bad, good] of MAP) after = after.split(bad).join(good);
  if (after !== before) {
    fs.writeFileSync(f, after);
    console.log('fixed: ' + path.basename(f));
    n++;
  }
}
console.log('--- ' + n + ' file diperbaiki ---');
