# Kanon Kidungverse

Semesta bersama repo ini. Baca sebelum menulis novel baru — bukan untuk mengikat, tapi supaya keputusan berdiri-sendiri-atau-tidak diambil sadar.

---

## Status

`universe: "Kidungverse"` ada di **14 dari 14** README. Satu di antaranya menulis `"Kidungverse / Urban Dark Fantasy"` — bentuk itu keliru, `universe` bukan field bergaya `genre` dan tidak dipecah di `/`. Tulis `"Kidungverse"` saja.

Field ini tidak memicu apa pun di situs (`novels.ts:153`) — ia hanya tampil sebagai metadata. Jadi berbagi semesta adalah keputusan naratif, bukan teknis.

Catatan latar: Kidungverse adalah semesta bersama dengan latarnya sendiri
(sebagian novel di dalamnya berlatar bumi rekaan/Indonesia). Novel **baru**
di repo ini tidak wajib masuk Kidungverse, dan masuk Kidungverse bukan alasan
memakai kosakata/lokasi Indonesia — universe imajiner berdiri sendiri adalah
default untuk novel baru. Lihat `reference/worldbuilding.md` → Latar.

---

## Cara memutuskan berbagi semesta

Sebelum menulis novel baru, baca README novel yang sudah ada. Lalu pilih satu:

**Masuk Kidungverse** kalau premisnya menguat dengan gema — lokasi yang sama dilihat dari sudut lain, mitos yang sama ditafsirkan berbeda, atau tokoh sampingan satu novel jadi protagonis di novel lain.

**Berdiri sendiri** kalau premisnya justru butuh dunia dengan aturan berbeda. Sistem kekuatan yang bertabrakan dengan novel lain lebih merusak daripada untung. Kalau berdiri sendiri, hapus baris `universe` — string kosong diperlakukan sebagai tidak ada.

Yang dilarang: mencantumkan `universe: "Kidungverse"` lalu menulis dunia yang tidak berhubungan sama sekali. Itu janji yang tidak ditepati ke pembaca yang membaca lebih dari satu novel.

### Kalau berbagi semesta

Catat di `bible.md` bagian **Kanon Nama**, kolom Catatan: nama mana yang dipinjam dari novel lain dan dari novel mana. Ejaan harus persis sama — kalau `the-host` menulis Stasiun 13, novel baru tidak boleh menulis Stasiun Tiga Belas.

Cross-reference yang berhasil bersifat kecil dan tidak wajib dipahami: lokasi yang lewat, mitos yang disebut sambil lalu, easter egg. Yang gagal adalah plot yang mensyaratkan pembaca sudah membaca novel lain.

---

## Register tiga novel selesai

Ketiganya `status: "Complete"`, 15 bab. Dipakai sebagai rujukan nada — bukan cetakan.

### The Host

Dark, gritty, filosofis. POV ganda (Arif modern / Rahwana kuno), berselang di jeda adegan. Nama skill dalam Bahasa Inggris (Mind Palace, Karma Sense, Shadow Step, Soul Whisper). Harga kekuatan = penuaan biologis. Antagonis = peleburan kesadaran. Resolusi = pengorbanan bersama.

Pelajaran yang bisa dipindah: harga yang diukur dalam satuan tubuh terasa lebih nyata daripada harga abstrak, dan POV ganda menuntut dua suara yang benar-benar berbeda — lihat `character.md`.

### Lantern of Night

Muram, atmosferik, literer. Sensorik berat. POV tunggal (Mila). Istilah gaib dalam Bahasa Indonesia (Nyala, bayangan, nama) — kebalikan dari The Host. Harga = kepingan ingatan per nama yang dititipkan. Antagonis = Sang Kolektor (Luruh) yang memanen nama. Twist = protagonis ternyata wadah hidup (nama setengah). Resolusi: antagonis diberi rumah, bukan dikalahkan.

### Gods in Jars

Hangat, humor kering, dark-cozy. POV tunggal (Nadia, Altar-Keeper). Istilah Indonesia (guci, sigil, domain) dengan tahap memudar Radiant → Faint → Dim → Ghost → Gone. Harga = kehilangan ingatan per ritual, meningkat: nama → wajah → identitas → seluruh kota. Antagonis = Lupa Corp / Tuan Lupa, abu-abu secara moral (melupakan itu menyembuhkan). Twist: antagonis diberi rumah — guci kosong yang disimpan Rukmini tiga puluh tahun.

---

## Pola berulang yang berhasil

Tiga novel selesai, dan dua di antaranya menutup dengan **antagonis diberi tempat, bukan dihancurkan**. Itu bukan kebetulan — ia tumbuh dari antagonis yang ditulis dengan pembelaan yang masuk akal (`character.md`). Kalau antagonis sejak awal ditulis sebagai korban dari sistem yang sama, akhir yang memusnahkannya terasa seperti kegagalan tema.

Jangan jadikan ini rumus. Novel keempat yang mengulang beat yang sama akan terbaca sebagai kebiasaan penulis, bukan pilihan.

---

## Prinsip Wadah

Twist paling sering dipakai di semesta ini: **protagonis ternyata adalah wadah, kunci, atau alat yang dibutuhkan antagonis** — dia bagian dari rencana itu sejak sebelum cerita dimulai.

Syarat supaya tidak terasa murahan:

- Tanam di Babak I sebagai detail kecil yang punya penjelasan lain yang wajar saat itu.
- Ungkap di titik tengah, bukan di klimaks. Setelah terungkap, protagonis harus punya cukup halaman untuk bertindak dari pengetahuan itu.
- Ubah arti adegan-adegan sebelumnya, bukan cuma menambah informasi. Pembaca harus bisa memeriksa ulang dan menemukan petunjuknya memang ada.
- Ini harus menabrak Lie protagonis, bukan sekadar mengejutkan.

Dipakai di `lantern-of-night` (Mila = nama setengah) dan `the-host` (Arif = inang). Kalau novel ketiga memakainya lagi, pertimbangkan membaliknya: protagonis mengira dirinya wadah, ternyata bukan.
