# Prose Craft

File terpenting di skill ini. Semua contoh diambil dari repo ini sendiri.

---

## 1. Padding: penyakit utama repo ini

### BURUK — `novels/the-chrono-engine/chapter-1.md`

> Di bawah naungan langit malam industri Neo-Batavia yang dingin, setiap hembusan angin membawa aroma uap belerang dan rahasia kuno yang tersimpan di bawah tanah kota. Kaelen Sora merasakan bagaimana sirkuit Chrono Engine di tangan kanannya berdenyut ritmis... **[paragraf yang sama persis diulang 12 kali berturut-turut]**

Bab itu 5.000 kata, tapi isinya kira-kira 400 kata unik. Nol dialog. Nol kejadian.

Catatan latar: novel ini memakai latar bumi rekaan (Neo-Batavia) — contoh
tersebut dipakai untuk menunjukkan padding, bukan sebagai pola latar. Novel
baru di repo ini default ke universe imajiner non-bumi; istilah seperti
"Neo-Batavia" atau "Garda Bayang Nusantara" jangan dijadikan acuan penamaan.

**Kenapa ini terjadi:** ada target kata, tidak ada materi cerita. Model mengejar angka dengan menyalin.

**Yang benar:** kalau bab kurang panjang, itu sinyal beat-nya tipis. Tambah:
- satu komplikasi baru (rencana gagal, sekutu berbohong, alat rusak),
- satu adegan dialog dengan tujuan bertentangan,
- konsekuensi konkret dari aksi sebelumnya.

Bukan tambah kalimat.

### BAIK — `novels/sang-pencatat-nama/chapter-1.md`

> "Surat ini ditulis ayahmu, lima belas tahun lalu, semalam sebelum ia
> menghilang," kata Ranggalawe. "Aku menyimpannya karena ia memintaku. Ia
> bilang: kalau suatu hari ada yang menghapus nama anakku, berikan surat ini
> padanya."
>
> Arka tidak menyentuh kertas itu. Tangannya bergetar. "Kang membaca isinya?"
>
> "Aku tidak perlu. Aku tahu apa isinya dari cara ayahmu menulisnya." Ranggalawe
> berdiri dan berjalan ke pintu. "Dia menulis namamu di sana, Arka. Tiga kali.
> Dan nama-nama lain yang tidak kukenal."

Setiap paragraf memindahkan cerita. Dialog membawa informasi *dan* tekanan.
Tidak ada yang diulang. Perhatikan: latar novel ini imajiner (Candraprana,
Prasasti Agung) — lokasi dan istilah dunia bukan kosakata Indonesia, meski
prosanya ditulis dalam Bahasa Indonesia.

---

## 2. Ringkasan beat yang bocor

### BURUK — pembuka `the-chrono-engine/chapter-1.md`

> Hujan bulan Agustus menimpa atap seng... Di bengkel pembuat jam tua bawah tanah, Kaelen Sora menunduk memeriksa sebuah kubus kuningan kuno... Kubus itu merekah membara... Pasukan pelacak Obsidian Ministry mendobrak pintu bengkel, memulai pertempuran kinetik pertama...

Ini daftar beat dari outline yang dijadikan paragraf. Pembaca diberi tahu seluruh isi bab sebelum bab dimulai. 226 file di repo ini punya pembuka semacam ini.

**Ciri yang harus dicari sebelum simpan:** paragraf pertama berisi `...` lebih dari sekali, atau menyebut kejadian yang belum terjadi.

**Yang benar:** mulai dari satu momen konkret di dalam adegan. Baris pertama `sang-pencatat-nama/chapter-1.md` masuk lewat indra dan tempat, bukan ringkasan:

> Arka Wibisana menyadari namanya hilang bukan karena ia lupa, melainkan karena
> tinta itu sendiri yang menolaknya.

---

## 3. Dialog

Setiap bab wajib punya dialog yang **mengubah sesuatu** — informasi berpindah, hubungan bergeser, atau keputusan diambil. Basa-basi tidak dihitung.

- Beri setiap karakter pola bicara yang bisa dibedakan tanpa tag. Panjang kalimat, tingkat formalitas (`aku/kamu` vs `saya/Anda`), kosakata teknis, kebiasaan menghindar.
- Tokoh punya tujuan yang bertabrakan dalam satu percakapan. Kalau semua sepakat, adegannya tidak perlu ada.
- Tag dialog: `kata`, `tanya`, `jawab` sudah cukup. Hindari `ujarnya penuh simpati sekaligus ketegangan yang mendalam` — gantikan dengan aksi kecil (beat) yang menunjukkan emosinya.
- Jangan pakai dialog untuk menyuapi lore ke pembaca. Kalau dua tokoh sama-sama tahu sesuatu, mereka tidak akan menjelaskannya satu sama lain.

Rasio kasar: 30–50% baris bab adalah dialog atau beat aksi di sekitar dialog.

---

## 4. Filter word Bahasa Indonesia

Kata-kata ini menyisipkan lapisan antara pembaca dan kejadian. Buang, lalu tulis kejadiannya langsung.

| Buang | Ganti dengan |
|---|---|
| `Ia merasakan bagaimana ...` | kejadiannya langsung |
| `Tampak seperti ...` / `terlihat bahwa ...` | deskripsi langsung |
| `mulai untuk ...` | kata kerjanya saja |
| `berusaha untuk ...` | kata kerjanya, atau tunjukkan kegagalannya |
| `seolah-olah ...` | pakai sekali per bab, bukan tiap paragraf |
| `menandai ...`, `memancarkan aura ...` | apa yang sebenarnya terjadi |
| `sesuatu yang tak terjelaskan` | jelaskan |

Contoh:
- Buruk: `Kaelen merasakan bagaimana sirkuit itu berdenyut ritmis, menandai pergerakan taktis.`
- Baik: `Sirkuit di lengan Kaelen berdenyut. Tiga kali cepat, lalu jeda — pola yang sama dengan yang dilihatnya di bangkai kereta uap.`

---

## 5. Ritme kalimat

Prosa yang rusak di repo ini semuanya berkalimat panjang seragam 25–35 kata. Efeknya bergumam.

- Variasikan: kalimat 4 kata di antara dua kalimat 20 kata.
- Adegan aksi: kalimat pendek, kata kerja kuat, sedikit anak kalimat.
- Adegan refleksi: boleh panjang, tapi maksimal dua berturut-turut.
- Satu paragraf = satu unit pikiran. Paragraf 200 kata hampir selalu bisa dipecah.

---

## 6. Sensorik dan detail

- Minimal dua indra selain penglihatan per adegan. Bau dan suhu paling jarang dipakai dan paling efektif.
- Detail spesifik mengalahkan detail megah: `bau kapur dan air kanal yang menggenang di dasar Prasasti Agung` bekerja; `aura kegelapan yang menyelimuti` tidak. Detail harus dari dunia itu sendiri — untuk latar imajiner, bangun tekstur khas dunia (bahan, bau, cuaca rekaan), bukan menempelkan bau bumi.
- Detail harus bekerja ganda — mencirikan tempat **dan** menyiratkan sesuatu tentang tokoh atau bahaya.

---

## 7. Show, don't tell

- Buruk: `Keberanian dan ketenangan Lyra menjadi tumpuan utama yang memberi kekuatan bagi Kaelen.`
- Baik: Lyra melakukan sesuatu di bawah tekanan yang membuktikannya, dan Kaelen menyesuaikan rencananya karena itu.

Emosi ditunjukkan lewat pilihan, bukan lewat kata sifat. Kalau sebuah kalimat menilai tokohnya (`berani`, `bijaksana`, `penuh simpati`), ganti dengan tindakan yang membuat pembaca menyimpulkan sendiri.

---

## 8. Penutup bab

Dilarang:
- `"...menyongsong hari baru."`
- `"...siap menghadapi ancaman yang kian nyata di depan mata."`
- `"Apakah Arya mampu menguasai kekuatan ini sebelum jiwanya direnggut?"` — pertanyaan retoris ke pembaca.
- Paragraf yang merangkum ulang isi bab.

Yang berhasil: aksi yang belum selesai, keputusan yang baru diambil dan harganya belum dibayar, atau satu informasi yang mengubah makna adegan sebelumnya.

---

## 9. Self-check duplikasi (wajib, sebelum simpan)

Tidak ada script validator di skill ini, jadi periksa manual:

1. Baca ulang kalimat pertama tiap paragraf. Ada yang sama atau nyaris sama? Hapus.
2. Pindai frasa khas (nama tempat, nama alat) — kalau frasa yang sama muncul 5 kali, ada penyalinan.
3. Kalau punya akses shell, bantu dengan:
   ```bash
   grep -oE '[^.!?]{25,}[.!?]' novels/<slug>/chapter-N.md | sed 's/^ *//' | sort | uniq -d
   ```
   Output harus kosong.
4. Cek jumlah kata: `wc -w novels/<slug>/chapter-N.md` → harus 1.500–2.500.
