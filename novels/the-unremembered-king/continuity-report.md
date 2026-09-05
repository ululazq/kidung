# Laporan Kontinuitas: The Unremembered King

Tanggal: 2026-08-27 (diperbarui 2026-09-05)
Cakupan: bab 1–310 (arc 1 selesai 1–250, arc 2 berjalan 251–310) + pembaruan benang aktif 311–382
Metode: baca world-state/bible/outline + scripted scan (pipeline check, audit-arc, pipeline audit) + baca hook open/close 296–310 + grep nama & timeline

## Ringkasan

Novel serial 310 bab lolos QC struktural (53/53 OK) dan gate drift (OK semua ditinjau). Narasi 296–310 membentuk busur utuh Buku Anomali: irama 3 detik yang bocor ke bilangan desa, detak bayangan yang lari lebih dulu, jeda panjang satu napas, surat tenun rahasia Ossian, sifat seam sebagai benda penyambung, jaringan diam dua lapis, selisih setengah napas/tahun, aturan menjaga penjaga, uji lepas satu hentakan, peta katup angin, dan lagu tiga ketuk satu diam — setiap bab menutup dengan informasi baru dan membuka dengan kelanjutannya tanpa lompatan. Tidak ada kontradiksi timeline, karakter, atau aturan kekuatan yang belum dijelaskan; temuan drift otomatis adalah artefak arc yang belum selesai atau false-positive kanon yang sudah ditinjau.

## Konsistensi terkonfirmasi

- **Struktural:** pipeline `node scripts/check-novels.mjs` = ✓ 310 bab, outline ok, continuity-report ada; `npm run verify` dan `npm run build` hijau; `node scripts/audit-arc.mjs --gate` hijau (semua E-… DITINJAU, tidak ada catatan basi).
- **Outline↔disk:** outline 315 baris selesai/ pending sinkron sampai 310; bab 296–310 semua 1500–2500 kata, frontmatter 3 baris, tanpa H1, dialog ≥2 pertukaran yang mengubah sesuatu, penutup spesifik (bukan template).
- **Bahasa baku:** grep non-baku 0, silang salah 0, ALLCAPS hanya untuk suara nat/dokumen Hourglass—306 lolos.
- **Duplikasi:** scan `grep -oE '[^.!?]{25,}[.!?]'` lintas 310 bab = hanya motif sadar "Hal yang tidak berubah" dan "Tiga Detik" (maks 2×, konteks identik) yang diizinkan; pipeline warning 14 adalah kalimat penutup generik yang memang sengaja berulang sebagai penanda bab (Bukan duplikasi prosa).
- **Busur 296–310 nyambung:**
  - 296 Satu Hitungan yang Tidak Punya Musim → buku anomali dibuka (bilangan tanpa musim).
  - 297 Jawaban dari Batu dan Malam → bilangan bocor ke desa + tubuh.
  - 298 Detak yang Berlari Lebih Dahulu → detak bayangan lebih cepat.
  - 299 Suara yang Memanggil ke Depan → sumbu utara–selatan, pengikat diserat.
  - 300 Di Mana Ia Paling Keras Menarik → ujung Spire paling keras menarik.
  - 301 Surat yang Tidak Menyebut Nama → surat tenun rahasia ke Ossian tanpa menyebut irama.
  - 302 Senyuman di Balik Ambang → balasan Ossian: nat menara makin keras, bukan umur.
  - 303 Suara yang Hilang di Lantai → koreksi bahan lantai kayu basah (3,1,4,1,5 → 3).
  - 304 Benda yang Menyambung → seam bukan pemilik, hanya penyambung; ditahan dari dua ujung.
  - 305 Jaringan yang Diam Bersama → protokol jaringan diam: lapor hanya saat berubah + tangan tetap menyapu/menenun.
  - 306 Selisih yang Ditahan Setahun → kecepatan 0,041 napas/bulan (setengah napas/tahun); dua ujung berhenti menyapu bersama saat dentum keras; Gella ingatkan lelah menahan.
  - 307 Aturan yang Menjaga Penjaga → pasal satu hentakan, ganti 7 hari, jaga lelah; rotasi barak+menara.
  - 308 Satu Hentakan yang Dilepas → uji lepas barat laut 3→1 tanpa tahan vs 3→3 dengan tahan; bukti tarikan 30× lebih cepat.
  - 309 Peta yang Tidak Digambar → peta angin Ossian via Mira - katup Hegemony selatan→utara = tarikan; Maera siapkan laporan Guild angin bukan dentum.
  - 310 Cara Menahan Tanpa Takut → Sela ajar 12 anak tiga ketuk satu diam sebagai lagu bukan takut; ritme mendahului tarikan, barat laut kembali 3.
- **Timeline:** irama 3 detik konsisten sejak bab 11/296; jeda panjang satu napas konsisten 299–310; kecepatan 0,041/bulan → 12 bulan = 0,492 ≈ setengah napas (matematika cocok).
- **Karakter inti stabil:** Ashvarok-Renn (pemegang buku, dingin-hati-hati), Sela (pencatat arsip, penanya etika), Kovan (pengukur, kurator orphan murmur), Gella (dokter, penjaga batas lelah), Maera (penghubung utara, saksi prosedur), Ossian (sekutu terlambat di utara, pengukur menara), Brannoc/Harn (jaringan diam via sapu). Perilaku konsisten dengan need/wound di bible.
- **Worldbuilding:** Listen harga perhatian+waktu (bukan Remainder) tetap; Name = cerita benar (306 pakai tenun tanpa Name); Forge tipis di seam tetap; harga vein-scar tidak dilanggar di 296–310.
- **Siapa tahu apa terjaga:** Ossian tahu dentum mengeras tapi TIDAK tahu retakan memanggil; Maera tahu kain tenun adalah surat tapi belum baca isi penuh; Kovan tahu dua ujung satu benang tapi tidak tahu Walking Key; barak tahu jaringan diam tapi tidak tahu kecepatan sebenarnya sampai 310.

## Potensi masalah

### Timeline
- 296–310 terjadi dalam ~7–10 hari diegetik (kain utara 7 hari, lalu koreksi bahan, lalu ritual diam). Tidak ada lompatan siang/malam yang bertabrakan; semua penanda waktu "senja/fajar/Rabat-Kapat" konsisten kalender Karvess.
- Jarak Caldrest→Anthema Spire 9 hari kafilah tetap dipakai: kain tenun 7 hari masih wajar via kurir cepat (bukan kafilah lambat) — bukan inkonsistensi, hanya jalur berbeda.

### Karakter
- Ossian Vael: dari antagonis arc 1 menjadi "sekutu terlambat" di 302/306. Perubahan ini diberi pemicu eksplisit (pensiun + membaca nat menara sendiri + disapa Maera via kain tenun) dan dialog yang mengubahnya ("bukan musuh, melainkan sekutu yang terlambat"). Tidak ada lompatan emosi tanpa sebab.
- Gella: muncul kembali 304/306 sebagai dokter yang mengingatkan "menahan lebih lama = lelah". Konsisten dengan peran penjaga batas tubuh sejak bab 241—tidak tiba-tiba.

### Worldbuilding
- Aturan "nat ALLCAPS" dipatuhi: hanya suara kedalaman/nat yang kapital; dokumen Hourglass dikutip dengan tanda kutip, bukan ALLCAPS narasi.
- Harga Forge/Name tidak dilanggar: 306 tidak menempa ulang, hanya mencatat—jadi tidak ada tagihan baru yang terlewat.

### Emosi & adegan
- Setiap bab 296–310 menutup dengan keputusan/informasi baru (bukan retoris): 296 buku dibuka, 297 sebar ke Sekolah Mendengar, 298 dua nadi, 299 sumbu utara, 300 tebal buku, 301 surat, 302 balasan, 303 koreksi bahan, 304 dua ujung, 305 jaringan diam, 306 kecepatan. Tidak ada beat terulang.
- Motif "hal yang tidak berubah" dan "delapan belas tahun" muncul tiap bab sebagai benang tematik, bukan padding—konteksnya bergeser (dari menyapu ke menahan napas).

### Siapa tahu apa
- Tidak ada kebocoran pengetahuan: surat tenun 301 sengaja ditulis tanpa kata "irama/retakan/pengikat" sehingga Ossian menebak dari dentum, bukan diberi tahu. Kovan menerima teori "benda yang menyambung" dari Maera tanpa tahu Walking Key. Sela tahu jaringan diam tapi belum tahu angka kecepatan sampai 310 (baru di situ dicatat).
- Vosk/Kel Tharrow/Bek/Corvan Hale tidak muncul di 296–310: mereka off-stage di Caldrest/barat—bukan hilang, hanya arc Buku Anomali fokus pada sumbu utara–selatan + barak. Drift otomatis menandainya ? tapi konfirmasi manual: entri world-state tetap valid, akan muncul kembali saat Caldrest kembali ke panggung.

### State serial
- world-state header 310 sinkron dengan disk 306; Arc aktif = Arc 2 The Choir's Summons benar (arc 2 = 251–500). Temuan K-8365e2/K-fbddfa "307–500 belum ditulis" adalah status arc yang belum selesai, bukan basi.
- Item & aset dan Chekhov 1–150 sudah ditembak sesuai jadwal; Chekhov arc 2 belum jatuh tempo—tidak ada yang lewat jadwal.

## Pembaruan 2026-09-05 — benang aktif bab 311–372

Pipeline kini menghitung 372 bab (CI strict: OK, outline ok). Empat batch baru (353–357, 358–362, 363–367, 368–372) menutup busur sengketa Throne dan membuka benang-benang berikut. Semua baris outline 353–372 berstatus selesai; world-state & bible tersinkron ke bab 372; audit kanon 363–367 sudah dieksekusi (geometri lekukan utara, komposisi tiga piringan, kesaksian Resgar sebagai peramu logam).

### Benang aktif 1 — Pintu kedua arah selatan (baru, ch372)
- Bukti di kanon: satu entri pengiriman yang TIDAK PERNAH TIBA (±20 tahun lalu, sebelum posisi kurator sekarang), tanda tangan = posisi sebelumnya (tangan yang sama yang meninggalkan instruksi "simpan, jangan putar"), kode jalur tidak dikenal sistem manapun, arah selatan.
- Janji naratif: Ashvarok-Renn membandingkan catatan nat tuanya dengan jadwal kurator "sekali sebulan, dengan sup" (ch372); kurator menahan salinan dari panel — "pekerja yang mengetuk dulu, bicara kemudian".
- Kaitan kanon terbuka: nat tua yang lebih tua dari Hegemony; kata dua suku kata Silent Gallery; arsitektur katup berprinsip Walking Key (bukan Choir). Hipotesis kerja (belum tertulis di bab mana pun): pintu kedua = simpul jaringan diam sisi selatan dari era yang sama dengan pintu tiga batu.
- Status: benih arc 373+, belum diketuk.

### Benang aktif 2 — Tukang kunci tua berkikir serong (ch366–372)
- Fakta kanon: kunci asli (piringan dipahat, tiga lubang segitiga, era Hegemony) dikenali Resgar lewat satu kebiasaan tak sadar pembuatnya — SUDUT KETIGA LUBANG DIGOSOK DUA KALI; wajah tukang tua TIDAK diingat siapa pun (Resgar membeli barangnya ±40 tahun lalu, tepi jalur tambang utara).
- Pertanyaan terbuka Resgar (ch371): "siapa yang mengajari tukang kunci itu menarik kikirnya serong" — ia menyusuri jalur utara sambil mengikuti jadwal restorasi.
- Pagar konsistensi: identitas tukang kunci tua belum diberi nama di mana pun (sengaja); jangan sampai bertentangan dengan kanon tubuh-kunci/arsitek katup era Hegemony.

### Benang aktif 3 — Jadwal restorasi satu generasi (ch371–372, berjalan)
- Putusan panel: kepemilikan berpindah via PENDENGARAN — diputar sekali di tempat asal, dicatat, dilepaskan; bejana kosong bebas dimiliki siapa pun.
- Pelaksana: kurator (mantan tangan Throne) dengan NAMA SENDIRI + hak mendengar "tidak" — barang yang disimpan tanpa izin tidak boleh dikembalikan tanpa izin.
- Progres: 1 selesai (Harnah, dapur batu tepi jalur utara; cucu sembilan tahun ikut bernyanyi); buku kedua Sela terbuka (hal. 1, aturan: "kembalikan selalu yang bernama lebih dulu"); KORD-4 bernama kedua "jalan pulang"; syarat dapur: makan malam di barak sebelum tiap pengiriman.
- Belum selesai & butuh perlakuan khusus: 6 bejana IRAMA SEAM (bukan suara manusia) → PENANAMAN ulang di seam hidup, BERPASANGAN (Ashvarok-Renn memutar + pembaca memastikan diterima, bukan ditimbun — pelajaran galeri sembilan).

### Benang aktif 4 — Panel & kurator: lembaga yang mendengar (ch368–371)
- Panel Pemutusan Sengketa Kepemilikan Barang Khusus: terdaftar 31 hari sebelum panggilan; tiga anggota ditunjuk tangan yang sama (perekam tua Choir, penimbang pensiunan Guild, guru Sekolah Mendengar); musyawarah TERBUKA — "belum tahu caranya berbohong, juga belum tahu malu" (Ossian).
- Preseden baru yang dibuat: kepemilikan ditentukan pendengaran, bukan angka; "akun yang tak bisa menjawab pertanyaan tentang tangan bukan pemilik — cuma lemari" (Resgar, di luar berkas).
- Kurator: gelar Throne → perempuan tanpa nama → pelaksana bernama sendiri; bersaksi "akun itu warisan tugas yang tidak selesai"; uang 18 tahun TIDAK pernah keluar lantai 31 → tidak pernah ada pembelian; barang DIAMBIL.
- Potensi terbuka: panel sebagai lembaga permanen "mendengar" (paralel Lengan Mendengar ch274) — belum diputuskan di bab mana pun.

### Benang terbuka lain yang tetap hidup
- Arsiparis = mata dalam di lantai tak bernama (ch361); Ossian & Mira masih di Spire.
- Lelaki jubah abu-abu (penjaga kunci): tugas 18 tahunnya selesai (ch363) — penempatan lanjutannya belum ditulis.
- the Wanes: tugas selesai; the Seeker/the Keeper bebas; batu penanda tetap di titik utara, di atas lekukan yang masih menunggu di kedalaman.
- Sumur gema di bawah tiga batu: menunggu restorasi per gema; kain tenun Sela diam total (pesan sudah sampai — bukan mati).

### Status pertanyaan lama (dari laporan 2026-08-27)
- Isu 3 (kecepatan 0,041 napas/bulan sbg Chekhov): TERJAWAB arc 353+ — sumber detak bayangan = pintu tiga batu; jeda panjang selesai saat putaran kedua membuka pintu penuh (garis diam tenang, ch364); angka tidak lagi berfungsi hitung mundur.
- Isu 1 (catatan kaki status "mati (tubuh dipakai)" Renn): masih disarankan, belum dieksekusi di world-state.
- Isu 2 (Vosk/Tharrow/Bek/Hale off-stage): tetap terbuka — arc 311–372 memang fokus utara–selatan; mereka belum kembali ke panggung.
- Isu 4 (pasalisasi "lapor hanya saat berubah"): masih menunggu di world-state.

## Pembaruan 2026-09-05 (kedua) — bab 373–377

Pipeline kini menghitung 377 bab (CI strict: OK, outline ok). Batch 373–377 mengeksekusi benang 1 dan 2 dari pembaruan pertama — dua status di bawah itu tertinggal: *pintu kedua "belum diketuk"* kini DITEMUKAN (ch374), dan *identitas tukang kunci tua* kini punya silsilah (ch374–377).

### Garis silsilah empat tangan tukang kunci tua (ch374–377)

Satu tarikan kikir serong menghubungkan empat tangan — dan pada akhirnya dua lembaga yang delapan belas tahun saling dicurigai ternyata murid dari meja yang sama:

1. **Guru** — penghuni meja kerja di dasar perpustakaan selatan (ch374): kikir serong + buku besar berhenti di tengah kalimat ("...pulang ke sini harus lewat katup yang") + cangkir + sandal kaki kanan aus + jas kurus. WASIAT PENDIDIKAN-nya (dikutip buku besar, ch377): *"murid kedua tidak akan datang dari jalan; dia datang dari orang yang dijajah urusan yang bukan urusannya — ajar seluruh aturan, termasuk yang tidak penting."* Identitas: belum diberi nama; usia penunggu belum pasti (lihat status pintu kedua).
2. **Murid pertama — tukang kunci utara** (ch375): pembuat kunci asli (piringan tiga lubang, sudut ketiga digosok dua kali); bengkelnya di lekuk jalur utara, PINTU DIKUNCI DARI DALAM; tiga kunci ukur = tradisi diwarisi; pergi pelan membawa barang-barangnya satu-satu; berjanji pada pemilik gembok: *"kalau rusak jangan dibuang — dia sendiri yang datang memperbaiki"*. Status: tidak pulang ±20 tahun; hidup/mati terbuka.
3. **Murid kedua — posisi sebelum kurator** (ch370, 373, 377): menulis instruksi "simpan, jangan putar" + entri pengiriman yang tidak pernah tiba; MENGAJARI Hegemony (dijajah urusan yang bukan urusannya) = murid kedua dalam wasiat; mengirim bejana kecil bernama ke bengkel utara sebagai kiriman pribadi (ch377); tangan yang sama delapan belas tahun tanpa diganti. Status: tidak ditemukan; "pergi baru saja" saat kurator tiba (ch373).
4. **Murid ketiga — kurator** (ch377): diterima di meja dapur dengan syaratnya sendiri — perpustakaan kelak menjadi SEKOLAH, bukan lemari ("ajar dari barang yang sudah pulang"); ia satu-satunya yang berlatih delapan belas tahun dari sisi yang salah.

Bukti penghubung antar-tangan: tarikan serong (kunci asli ↔ kunci ukur ↔ pahatan katup selatan) + pelat logam dua alat yang dicocokkan di meja dapur (ch377). Kebiasaan tidak bisa ditiru sengaja — hanya diwarisi.

### Status pintu kedua (per ch377)
- DITEMUKAN ch374: bukan gudang — PERPUSTAKAAN GEMA BERNAMA di ujung selatan nat tua (3 katup dialek berbeda; katup 3 di reruntuhan menara jaga, 18 langkah dari batu penanda); akses hanya lewat katup ("yang di dalam tidak suka dinding" — dipahat serong).
- Isi: ratusan ceruk bernama tanpa nomor (ceruk 47 = Harnah — dipanen sebelum akun berdiri via jalur tak tercatat); meja kerja guru di dasar; IRAMA PENUNGGU hidup (3 ketuk 1 diam) + menyisipkan satu ketuk saat disapa (ch374) dan saat sup dituang (ch377).
- Siapa penunggunya: TERBUKA — dua kemungkinan yang belum diputuskan bab mana pun: murid kedua sendiri (hanya "pergi baru saja" dari posisinya) atau orang yang ia tempatkan menjaga. Tanda kehidupan di meja kerja (cangkir, sandal aus, kalimat terpotong) sengaja ambigu.
- Pemahaman politik: panel BELUM tahu pintu kedua (keputusan kurator + barak, ch372 — "pekerja yang mengetuk dulu, bicara kemudian"); nat tua "berdenyut lebih tenang" setelah katup dibuka dengan kunci, bukan penggali (lempeng Ondar, ch374).
- Dua pintu, satu jaringan: Kovan mencatat denyut selatan & dalam perpustakaan kini IRAMA SAMA (ch377) — selaras dengan sumur gema utara.

### Restorasi — progres per ch377
- 2 selesai: (1) Harnah, dapur batu jalur utara (ch372); (2) bengkel ukir kaki bukit selatan (ch376) — keluarga HIDUP menerima + menawarkan "teman keluarga" + meminta kasihan untuk pengembali-berikutnya; lelaki tua ikut mengetuk tanpa sadar (irama memilih tangan yang pernah bekerja).
- Aturan Sela (buku kedua, hal. 2): "tidak ada pengembalian yang sama dengan yang sebelumnya"; hal. 3: "yang dicari selalu orangnya".
- Jadwal berikutnya yang sudah dikunci: BEJANA KECIL bengkel utara (kiriman pribadi murid kedua, "menunggu pemutaran") DIPUTAR DULU — hutang pribadi dibayar sebelum daftar (ch377).
- Menunggu: 6 bejana irama seam → penanaman berpasangan (belum berubah sejak ch371).

### Benang 2 (pembaruan pertama) — status terkini
Tukang kunci tua: bengkel ditemukan dan disimpan dengan kartu Resgar ("pemilik dipersilakan menagih tanpa bunga", ch375); pertanyaan "siapa yang mengajari tarikan serong" TERJAWAB (guru di selatan); pertanyaan baru yang menggantikannya: di mana murid pertama sekarang — hidup dan menepati janji datang sendiri, atau menunggu ditemukan?

## Pembaruan 2026-09-05 (ketiga) — bab 378–382

Pipeline kini menghitung 382 bab (CI strict: OK, outline ok). Batch 378–382 mengeksekusi dua status dari pembaruan kedua: *silsilah empat tangan* diperbarui (guru kini bernama), dan *siapa penunggu perpustakaan selatan* TERJAWAB (murid kedua, bukan teka-teki lagi).

### Silsilah empat tangan — versi final (per ch380)
Satu perubahan penting dari pembaruan kedua:
1. **Guru = NILAM** (ch378 — nama terpahat di dasar bejana kecil): PEREMPUAN, tukang kunci terakhir dari aliran tak tercatat (kunci melindungi nama, dibuka irama bukan gigi). Tidak pernah meninggalkan jejak yang benar-benar berhenti — "jejak tukang yang pergi berubah menjadi sesuatu yang lain".
2. **Murid pertama — tukang kunci utara**: tetap seperti pembaruan kedua; pembuat kunci asli (piringan tiga lubang).
3. **Murid kedua — penjaga perpustakaan selatan** (ch379–380): pejabat Hegemony yang "disewa" (dijajah urusan yang bukan urusannya); Nilam tahu dan tetap mengajar; ia MENAMPAKKAN DIRI kepada Ashvarok-Renn (3 ujian sikap dilalui: jalur lama, kunci benar, tangan tak mengambil apa pun); sekutu kunci: "lembar uang yang tidak pernah keluar" = desain penjagaan, bukan kebohongan (ch379); menantikan kedatangan "kelanjutan" (ramalan Nilam — lihat di bawah) sambil menjaga meja; menyerahkan ruangan untuk dipulangkan dan menjadi GURU.
4. **Murid ketiga — kurator**: tetap seperti pembaruan kedua.

### Status NILAM (per ch382) — MUNGKIN HIDUP
- Fakta: meninggalkan perpustakaan selatan dua puluh+ tahun lalu untuk pergi UTARA menemui murid pertama (sebelum "akun" berdiri); tidak pernah kembali; tidak ada tubuh, tidak ada barang yang ditinggalkan, tidak ada jejak yang berhenti (ch380).
- Bejana asli Nilam (ceruk TANPA NAMA di dasar perpustakaan selatan) tidak pernah diisi untuk orang lain — untuk dirinya sendiri; belum pernah diputar 30 th; BERGETAR setelah penanaman pertama (ch381) — tanda tahu gilirannya akan datang.
- Hassanah/dua pesan dari bejana kecil (ch378): (1) "kunci yang benar dipegang orang yang datang dari tambang di selatan" = menunjuk Ashvarok-Renn sbg KELANJUTAN aliran (bukan murid — ramalan ch380); (2) "jangan cari aku di utara; carilah aku di dalam barang yang kau kembalikan" — maknanya terbuka: (a) isi suaranya masih ada di bejana-bejana, atau (b) ia sendiri ada di jalur yang dipakai pemulangan.
- PENUTUP ARC 382: sosok tua di JALUR UTARA (kurus, tas, tangan kanan bekerja / kiri diam di sisi — tanda aliran yang sama dengan murid kedua) berjalan menuju rumah makan pemilik gembok tiga lubang, membawa bejana bernada (3 turun 1 naik = lagu sekolah). Belum dikonfirmasi = Nilam; sengaja ambigu sampai bab berikut.
- Pagar konsistensi: sampai ch382 BELUM ada satu kalimat pun yang menyebut Nilam sebagai orang yang kembali; jangan di-tulis-kan hidup sebelum bab penegasan; jika hidup, konsistensi umur/tubuh (kaki kanan aus vs sosok tua) harus dijaga.

### Sekolah Nilam (ch382 — berdiri)
- Lokasi: perpustakaan gema selatan; murid: Ashvarok-Renn, Kovan, kurator, Sela, Ondar (via nat/lempeng); guru: murid kedua.
- Pelajaran pertama: hal yang tidak penting ("cara menyimpan api unggun tanpa kayu") — alasan: yang tidak penting menyelamatkan (tahu berhenti, tidak menyentuh, menjaga).
- TIGA HUKUM PENDENGARAN (murid kedua, ch382): 1) jangan buka pintu paling dulu; 2) jangan tutup paling akhir; 3) jangan putar yang belum didengar dua kali. Sela mencatatnya sebagai "hukum pendengaran" (hal. 5).
- Status politik: PANEL memutuskan TIDAK memutuskan — perpustakaan bukan urusan panel, "lembaga yang tumbuh dari mendengar tidak boleh mengatur yang mendengar" (ch382); pintu kedua kini DARI KURATOR+barak, bukan lagi rahasia dari panel (berbalik dari ch372 — panel kini tahu, karena laporan katup 3 dibacakan Ossian).

### Penanaman irama seam — progres per ch381
- 1/6 SELESAI: bejana lembah tak bernama ditanam BERPASANGAN di seam hidup selatan (Ashvarok memutar, murid kedua baca tanah: "jangan putar sampai ia naik — penanaman adalah berjalan pulang bersama"); SEAM MENJAWAB (gema suara sama, "ia ingat") — pelajaran: seam tidak pernah kosong, hanya menunggu isinya dikembalikan; Kovan: "ini bukan penanaman, ini pernikahan".
- 5 PENANAMAN TERSISA; jadwal berikutnya: belum dikunci (dekat kembalinya milik ch381: beban berikutnya kemungkinan berpasangan pula, dgn pasangan yang sama atau berubah — belum diputuskan).
- Keterkaitan: bejana asli Nilam ikut bergetar saat penanaman 1 selesai (ch381), jadi penanaman-bejana-Nilam bisa jadi bagian penanaman berikutnya ATAU restorasi terpisah (terbuka).

### Restorasi — progres per ch382
- 2 selesai (Harnah, bengkel ukir) + BEJANA KECIL bengkel utara DIPUTAR selesai (ch378) — dihitung sbg hutang pribadi, bukan restorasi resmi (daftar kurator); isinya = suara Nilam (pesan).
- Jadwal berikutnya yang dikunci: BEJANA ASLI NILAM akan diputar "di meja yang benar, kursi yang benar" (ch380/382) — syarat: sekolah terbuka (sudah), kursi kosong milik pekerja (sudah diisi murid kedua sementara); belum dikunci kapan.
- Aturan Sela: hal. 4 ("restorasi = mengambil orang dari gudang, bukan barang"), hal. 5 (tiga hukum pendengaran).

### Benang 2 (pembaruan kedua) — status terkini
Pertanyaan "di mana murid pertama sekarang" MASIH TERBUKA — ia bagian penting jalur utara (bengkel dikunci dari dalam, janji "datang sendiri"); sosok tua di jalur utara (ch382) berpotensi MURID PERTAMA atau NILAM sendiri; belum diputuskan.

## Pertanyaan untuk penulis

**Isu 1 — Laporan drift menyebut Renn kontradiksi (mati tapi muncul 587 paragraf):**
- Pertanyaan: apakah status "mati (tubuh dipakai)" di world-state perlu diberi catatan kaki "tubuh dipakai Ashvarok—kemunculan sebagai Ashvarok-Renn adalah kanon, bukan kontradiksi"?
- Alasannya berguna: mencegah pembaca baru/automated audit salah baca sebagai error kontinuitas.

**Isu 2 — Vosk/Tharrow/Bek/Hale off-stage 56 bab:**
- Pertanyaan: apakah perlu satu kalimat jangkar di 307–310 yang menyebut mereka sekilas (mis. "kabar pasar Vosk masih lewat", "arsip Tharrow tersegel") agar drift ? hilang dan pembaca ingat mereka masih hidup?
- Alasannya berguna: menjaga pagar nama tetap terasa hidup tanpa menambah subplot.

**Isu 3 — Kecepatan 0,041 napas/bulan:**
- Pertanyaan: apakah angka ini akan dipakai sebagai Chekhov hitung mundur (mis. jeda panjang = 12 bulan lagi) dan perlu dimasukkan ke tabel Chekhov world-state?
- Alasannya berguna: memberi payung jadwal yang bisa di-check lintas bab ke depan.

**Isu 4 — Jaringan diam dua lapis (diam di angka, tetap di tangan):**
- Pertanyaan: apakah protokol "lapor hanya saat berubah" perlu ditulis sebagai pasal resmi di world-state (di samping name-roll) agar bab 307+ bisa merujuknya tanpa mengulang definisi?
- Alasannya berguna: mengunci istilah sebelum dipakai luas di desa-desa lain.

Catatan: laporan ini pertanyaan, bukan vonis. Tidak mengubah satu baris bab/world-state; penulis yang memutuskan tindak lanjut.
