// Sweep kosakata non-baku buatan AI + typo di SELURUH bab novel the-unremembered-king (1-352).
// Pola: "kata Indonesia yang hampir benar tapi tidak ada di KBBI" (seperti pendudang), plus
// kata Inggris yang bocor ke prosa/dialog, plus bentuk kolokial "-in" yang tersisa dari sweep
// _fixbaku sebelumnya. Setiap kandidat sudah dicek konteksnya satu per satu.
// TIDAK menyentuh: nama entitas, istilah kanon (censure, murmur, interlude, registri,
// licensing overseer, timbung, purga, dll.), koine puitis yang sengaja (dilamat, nunun,
// pelu-pelu, kutanpa, kumimpi), dan kompaun dunia yang konsisten.
//
// Pakai: node _fixnonce.cjs [--dry]
const fs = require('fs');
const dir = 'novels/the-unremembered-king/';
const dry = process.argv.includes('--dry');

// pembungkus: kata utuh (batas kata di kedua sisi)
const w = (s, flags = 'g') => new RegExp('\\b' + s + '\\b', flags);
// frasa literal tanpa batas kata
const f = (s) => ({ re: new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), label: s });

// [pola-regex, label-pengganti] — urutan penting: frasa/varian panjang lebih dulu.
const FIX = [
  // ---------- frasa spesifik ----------
  [f('denyut-denying'), 'denyut-denyut'],
  [f('non-negotiable'), 'tidak bisa ditawar'],
  [f('pertanya Brannoc'), 'tanya Brannoc'],
  [f('DAN dapetin balik'), 'DAN mendapatkannya kembali'],
  [f('dia sabarin kita'), 'dia bersabar dengan kita'],
  [f('ketidaktanya-bertanya'), 'ketidakbertanyaannya'],
  [f('mendesas-desus'), 'berdesas-desus'],
  [w('motong-motong'), 'memotong-motong'],

  // ---------- kata Inggris / asing bocor ----------
  [w('limp'), 'lemas'],
  [w('fooling'), 'menipu'],
  [w('porque'), 'karena'],
  [w('remodeling'), 'perombakan'],
  [w('tapioca'), 'tapioka'],
  [w('clerical'), 'administrasi'],

  // ---------- kata AI yang hampir benar ----------
  [w('Pendudang'), 'Penduduk'],
  [w('pendudang'), 'penduduk'],
  [w('cakrawara'), 'cakrawala'],
  [w('nesanmu'), 'nisanmu'],
  [w('nesaninya'), 'nisannya'],
  [w('nesan'), 'nisan'],
  [w('porseling'), 'porselen'],
  [w('berteksur'), 'bertekstur'],
  [w('teksur'), 'tekstur'],
  [w('direhestrasi'), 'direkayasa'],
  [w('diposting'), 'dipasang'],
  [w('dengaman'), 'degaman'],
  [w('bocoh'), 'bocah'],
  [w('betpa'), 'betapa'],
  [w('terbangung'), 'terbangun'],
  [w('pemenulisnya'), 'penulisnya'],
  [w('memenuliskannya'), 'menuliskannya'],
  [w('hendal'), 'hendak'],
  [w('menyeles'), 'menyegel'],
  [w('jeleh'), 'jelek'],
  [w('pinggil'), 'pinggir'],
  [w('menyeruhut'), 'menyeruput'],
  [w('samaseperti'), 'sama seperti'],
  [w('laginya'), 'lagunya'],
  [w('anomalinnya'), 'anomalinya'],
  [w('penulannya'), 'penulisannya'],
  [w('sesuata'), 'sesuatu'],
  [w('diletakkkan'), 'diletakkan'],
  [w('segenggal'), 'segenggam'],
  [w('robah'), 'robek'],
  [w('tanggi'), 'tangga'],
  [w('murda'), 'murni'],
  [w('mukaunya'), 'mukanya'],
  [w('peranggi'), 'perangi'],
  [w('menandanganinya'), 'menandatanganinya'],
  [w('telitianya'), 'telitinya'],
  [w('menyadainya'), 'menyadarinya'],
  [w('antrepan'), 'antrean'],
  [w('operasionalsnya'), 'operasionalnya'],
  [w('memenunggu'), 'menunggu'],
  [w('koeksripsi'), 'koeksistensi'],
  [w('arsap'), 'arsip'],
  [w('ditaniminya'), 'ditanaminya'],
  [w('koir'), 'koor'],
  [w('diktahkan'), 'didiktekan'],
  [w('disebung'), 'disebut'],
  [w('pernahrnah'), 'pernah'],
  [w('disandu'), 'disandari'],
  [w('dilayan'), 'dilayani'],
  [w('teknikal'), 'teknis'],
  [w('dinyanyi'), 'dinyanyikan'],
  [w('menandut'), 'menandakan'],
  [w('kutempuhhi'), 'kutempuhi'],
  [w('tulan'), 'menulis'],
  [w('shif'), 'shift'],
  [w('leganda'), 'legenda'],
  [w('rahasiaanya'), 'rahasianya'],
  [w('peribadi'), 'pribadi'],
  [w('memelajari'), 'mempelajari'],
  [w('dinegasiasikan'), 'dinegosiasikan'],
  [w('menindaklanjunya'), 'menindaklanjutinya'],
  [w('memerebutkannya'), 'memperebutkannya'],
  [w('keringkontak'), 'kering kontak'],
  [w('blokedua'), 'blok kedua'],
  [w('dipeduli'), 'dipedulikan'],

  // ---------- keputusan penulis 2026-09-05 (kata ambigu 1-9) ----------
  [w('seboring'), 'seiring'],
  [w('tadapi'), 'sadapi'],
  [w('kaguh'), 'teguh'],
  [f('kecalakan ibunya'), 'ke pelukan ibunya'],
  [w('karman'), 'sepenuhnya'],
  [w('batidakan'), 'banggakan'],
  [w('mendengang'), 'mendatangi'],
  [f('apa yang mereka rugikan dengan percaya'), 'apa ruginya mereka percaya'],
  [w('dirender'), 'dipajang'],

  // ---------- bentuk kolokial "-in"/"-ang" sisa sweep ----------
  [w('motong'), 'memotong'],
  [w('nyatet'), 'mencatat'],
  [w('balikin'), 'kembalikan'],
  [w('nginep'), 'menginap'],
  [w('ribet'), 'rumit'],
  [w('curhat'), 'bercerita'],
  [w('AYOH'), 'AYO'],
  [w('Ayoh'), 'Ayo'],
  [w('ayoh'), 'ayo'],
  [w('diceritain'), 'diceritakan'],
  [w('ceritain'), 'ceritakan'],
  [w('dilakuin'), 'dilakukan'],
  [w('tuker'), 'tukar'],
  [w('nyambernya'), 'menyambarnya'],
  [w('nyasar'), 'tersesat'],
  [w('nawarin'), 'menawarkan'],
  [w('membales'), 'membalas'],
  [w('didengarin'), 'didengarkan'],
  [w('dengarin'), 'dengarkan'],
  [w('ditemenin'), 'ditemani'],
  [w('temenin'), 'temani'],
  [w('ngerasa'), 'merasa'],
  [w('ngumpuk'), 'berkumpul'],
  [w('ramean'), 'ramai-ramai'],
  [w('bikinnya'), 'membuatnya'],
  [w('Bantuin'), 'Bantu'],
  [w('nunda'), 'menunda'],
  [w('kelakuin'), 'berbuat'],
  [w('keselek'), 'tersedak'],
  [w('ngerasain'), 'merasakan'],
  [w('etidak'), 'tidak'],
  [w('lihatin'), 'lihatkan'],
  [w('tugasuku'), 'tugasku'],
  [w('milikkaku'), 'milikku'],
  [w('celemuknya'), 'celemeknya'],
  [w('arsiparist'), 'arsiparis'],
  [w('nganggep'), 'menganggap'],
  [w('ngopi'), 'minum kopi'],
  [w('dititipin'), 'dititipkan'],
  [w('diterjemahin'), 'diterjemahkan'],
  [w('dibiarin'), 'dibiarkan'],
  [w('dikosongin'), 'dikosongkan'],
  [w('ditakutin'), 'ditakuti'],
  [w('takutin'), 'menakuti'],
  [w('manfaatin'), 'memanfaatkan'],
  [w('dittepuk'), 'ditepuk'],
  [w('siapin'), 'siapkan'],
  [w('pulangin'), 'pulangkan'],
  [w('didiamin'), 'didiamkan'],
  [w('obrolin'), 'mengobroli'],
  [w('nanyiin'), 'bertanya'],
  [w('kedengeran'), 'terdengar'],
  [w('menjemupnya'), 'menjemputnya'],
  [w('pangilan'), 'panggilan'],
  [w('ngajarkan'), 'mengajarkan'],
  [w('ijin'), 'izin'],
  [w('tentuin'), 'menentukan'],
  [w('nyusun'), 'menyusun'],
  [w('nyebar'), 'menyebar'],
  [w('mimpiin'), 'mimpikan'],
];

let files = 0, hits = 0;
const logLines = [];
for (let n = 1; n <= 352; n++) {
  const file = dir + 'chapter-' + n + '.md';
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  const log = [];
  for (const [rule, rep] of FIX) {
    const rx = rule instanceof RegExp ? rule : rule.re;
    const label = rule instanceof RegExp ? rule.source : rule.label;
    const m = after.match(rx);
    if (m) { log.push(label + '->' + rep + ' x' + m.length); after = after.replace(rx, rep); hits += m.length; }
  }
  if (after !== before) {
    if (!dry) fs.writeFileSync(file, after);
    logLines.push('ch' + n + ': ' + log.slice(0, 8).join(', ') + (log.length > 8 ? ' …+' + (log.length - 8) : ''));
    files++;
  }
}
// kanon: outline.md juga punya 1 pendudang
const of = dir + 'outline.md';
if (fs.existsSync(of)) {
  const ob = fs.readFileSync(of, 'utf8');
  const oa = ob.replace(/\bPendudang\b/g, 'Penduduk').replace(/\bpendudang\b/g, 'penduduk');
  if (oa !== ob) { if (!dry) fs.writeFileSync(of, oa); logLines.push('outline.md: pendudang->penduduk'); hits++; files++; }
}
console.log(logLines.join('\n'));
console.log('--- ' + files + ' file, ' + hits + ' perbaikan' + (dry ? ' (DRY RUN)' : '') + ' ---');