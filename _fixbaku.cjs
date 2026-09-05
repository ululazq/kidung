// Bakukan kosakata non-baku/kolokial di SELURUH novel the-unremembered-king.
//
// Prinsip: ganti hanya kata yang jelas non-baku. Konteks tiap kandidat sudah
// diperiksa (grep -oE dengan 30-45 char sekitar) sebelum masuk daftar.
// TIDAK menyentuh nama entitas, istilah kanon, atau makna kalimat.
//
// CATATAN ALLCAPS: sebagian kemunculan ada di dialog nat / kutipan dokumen yang
// memang ALLCAPS (kanon aturan #12). Bentuk ALLCAPS diganti dengan padanan
// ALLCAPS juga supaya konvensi suara nat tidak rusak.
//
// Pakai: node _fixbaku.cjs [--dry]
const fs = require('fs');
const dir = 'novels/the-unremembered-king/';
const dry = process.argv.includes('--dry');

// [pola, pengganti] — urutan penting: frasa panjang lebih dulu.
const FIX = [
  // --- konjungsi utama ---
  // Awal kalimat: "Tapi" -> "Namun" (lebih lazim & enak dibaca di posisi awal
  // daripada "Tetapi" yang menumpuk 700+ kali). Di tengah kalimat: "tetapi".
  [/\bTapi\b/g, 'Namun'],
  [/\btapi\b/g, 'tetapi'],
  [/\bTAPI\b/g, 'NAMUN'],

  // --- partikel & adverbia lisan ---
  [/\bCUMA\b/g, 'HANYA'],
  [/\bCuma\b/g, 'Hanya'],
  [/\bcuma\b/g, 'hanya'],
  [/\bNGGAK\b/g, 'TIDAK'],
  [/\bnggak\b/g, 'tidak'],
  [/\bGITU\b/g, 'SEPERTI ITU'],
  [/\bdoang\b/g, 'saja'],
  [/\bsampe\b/g, 'sampai'],

  // "aja" -> "saja" (semua kemunculan sudah dicek: semuanya bermakna 'saja')
  [/\baja\b/g, 'saja'],

  // partikel penegas lisan: dibuang atau dibakukan sesuai konteks aman
  [/\bIni kok seperti\b/g, 'Ini seperti'],
  [/\bKok ada banyak sekali orang\?/g, 'Mengapa ada banyak sekali orang?'],
  [/, lho\b/g, ''],
  [/\btuh tidak ada\b/g, 'itu tidak ada'],

  // --- interogativa lisan ---
  [/\bNgapain\b/g, 'Untuk apa'],
  [/\bngapain\b/g, 'untuk apa'],
  [/\bgimana\b/g, 'bagaimana'],

  // --- verba kolokial ---
  [/\bngomongin\b/g, 'membicarakan'],
  [/\bngomong\b/g, 'berbicara'],
  [/\bngukur\b/g, 'mengukur'],
  [/\bnghitung\b/g, 'menghitung'],
  [/\bnyebutin\b/g, 'menyebutkan'],
  [/\bnamain\b/g, 'menamai'],
  [/\bngasih\b/g, 'memberi'],
  [/\bnungguin\b/g, 'menunggui'],
  [/\bnyimpan\b/g, 'menyimpan'],
  [/\bnempel\b/g, 'menempel'],
  [/\bnaruh\b/g, 'menaruh'],
  [/\bmanggil\b/g, 'memanggil'],
  [/\bliat\b/g, 'lihat'],
  [/\bngetok\b/g, 'mengetuk'],
  [/\bnanya\b/g, 'bertanya'],
  [/\bnutup\b/g, 'menutup'],
  [/\bmilih\b/g, 'memilih'],
  [/\bmikir\b/g, 'berpikir'],
  [/\bmakasih\b/g, 'terima kasih'],
  [/\bnyanyi\b/g, 'menyanyi'],

  // --- "kasih" sebagai verba (bukan 'terima kasih' / 'kasih sayang' / 'kasihan') ---
  [/\bkasih tahu\b/g, 'beri tahu'],
  [/\b(aku|kau|kamu|kita|dia|mereka|saya) kasih\b/g, '$1 beri'],
  [/\byang kasih\b/g, 'yang memberi'],
  [/\bbisa kasih\b/g, 'bisa memberi'],
  [/\bmau kasih\b/g, 'mau memberi'],
  [/\bsudah kasih\b/g, 'sudah memberi'],
  [/\bpernah kasih\b/g, 'pernah memberi'],
  [/\bselalu kasih\b/g, 'selalu memberi'],
  [/\bjangan kasih\b/g, 'jangan beri'],
  [/\bterus kasih\b/g, 'lalu memberi'],
  [/\borang kasih\b/g, 'orang memberi'],
  [/\bbelajar kasih sayang\b/g, 'belajar kasih sayang'], // sah, jangan diubah
  [/\bkasih makan\b/g, 'memberi makan'],

  // --- typo ejaan ---
  [/\bberheti\b/g, 'berhenti'],
  [/\bup to date\b/g, 'paling mutakhir'],
  [/\btau\b/g, 'tahu'],

  // --- verba kolokial tanpa prefiks (batch 2, konteks sudah dicek) ---
  [/\bnunggu\b/g, 'menunggu'],
  [/\bnulis\b/g, 'menulis'],
  [/\bngobrol\b/g, 'berbincang'],
  [/\bngalahin\b/g, 'melampaui'],
  [/\bnyanyi-nyanyi\b/g, 'bernyanyi-nyanyi'],
  [/\bbelajar nyanyi\b/g, 'belajar menyanyi'],
  [/\bkalian nyanyi\b/g, 'kalian bernyanyi'],
  [/\byang nyanyi\b/g, 'yang bernyanyi'],
  [/\bnat-natnya nyanyi\b/g, 'nat-natnya bernyanyi'],
  [/\bbatu-batunya nyanyi\b/g, 'batu-batunya bernyanyi'],
  [/\bmurid-murid yang nyanyi\b/g, 'murid-murid yang bernyanyi'],
  [/\bpengen\b/g, 'ingin'],
  [/\bnolak\b/g, 'menolak'],
  [/\bngajar\b/g, 'mengajar'],
  [/\bdengerin\b/g, 'mendengarkan'],
  [/\bdenger\b/g, 'dengar'],
  [/\bbawain\b/g, 'membawakan'],
  [/\bmikir\b/g, 'berpikir'],
  [/\bmilih\b/g, 'memilih'],
  [/\bnanya\b/g, 'bertanya'],
  [/\bngetok\b/g, 'mengetuk'],
  [/\bketemu\b/g, 'bertemu'],
  [/\bkebagian\b/g, 'mendapat bagian'],
  [/\bDia tolok begitu saja\b/g, 'Dia tolak begitu saja'],
];

let files = 0, hits = 0;
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
    console.log('ch' + n + ': ' + log.slice(0, 6).join(', ') + (log.length > 6 ? ' …+' + (log.length - 6) : ''));
    files++;
  }
}
console.log('--- ' + files + ' bab, ' + hits + ' perbaikan' + (dry ? ' (DRY RUN)' : '') + ' ---');
