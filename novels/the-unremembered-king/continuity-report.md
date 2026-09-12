# Laporan Kontinuitas: The Unremembered King

Tanggal: 2026-08-27 (diperbarui 2026-09-05, 2026-09-10, 2026-09-11, 2026-09-13)
Cakupan: bab 1–310 (arc 1 selesai 1–250, arc 2 berjalan 251–310) + pembaruan benang aktif 311–407 + audit bab 435–449
Metode: world-state/bible/outline/arcs + audit drift otomatis + pembacaan penuh bab 435–449 terhadap timeline, tokoh, worldbuilding, perubahan status, pengetahuan, dan state serial

## Ringkasan

Novel serial 310 bab lolos QC struktural (53/53 OK) dan gate drift (OK semua ditinjau). Narasi 296–310 membentuk busur utuh the Anomaly Book: irama 3 detik yang bocor ke bilangan desa, detak bayangan yang lari lebih dulu, jeda panjang satu napas, surat tenun rahasia Ossian, sifat seam sebagai benda penyambung, jaringan diam dua lapis, selisih setengah napas/tahun, aturan menjaga penjaga, uji lepas satu hentakan, peta katup angin, dan lagu tiga ketuk satu diam — setiap bab menutup dengan informasi baru dan membuka dengan kelanjutannya tanpa lompatan. Tidak ada kontradiksi timeline, karakter, atau aturan kekuatan yang belum dijelaskan; temuan drift otomatis adalah artefak arc yang belum selesai atau false-positive kanon yang sudah ditinjau.

## Konsistensi terkonfirmasi

- **Struktural:** pipeline `node scripts/check-novels.mjs` = ✓ 310 bab, outline ok, continuity-report ada; `npm run verify` dan `npm run build` hijau; `node scripts/audit-arc.mjs --gate` hijau (semua E-… DITINJAU, tidak ada catatan basi).
- **Outline↔disk:** outline 315 baris selesai/ pending sinkron sampai 310; bab 296–310 semua 1500–2500 kata, frontmatter 3 baris, tanpa H1, dialog ≥2 pertukaran yang mengubah sesuatu, penutup spesifik (bukan template).
- **Bahasa baku:** grep non-baku 0, silang salah 0, ALLCAPS hanya untuk suara nat/dokumen Hourglass—306 lolos.
- **Duplikasi:** scan `grep -oE '[^.!?]{25,}[.!?]'` lintas 310 bab = hanya motif sadar "Hal yang tidak berubah" dan "Tiga Detik" (maks 2×, konteks identik) yang diizinkan; pipeline warning 14 adalah kalimat penutup generik yang memang sengaja berulang sebagai penanda bab (Bukan duplikasi prosa).
- **Busur 296–310 nyambung:**
  - 296 Satu Hitungan yang Tidak Punya Musim → the Anomaly Book dibuka (bilangan tanpa musim).
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
- Setiap bab 296–310 menutup dengan keputusan/informasi baru (bukan retoris): 296 buku dibuka, 297 sebar ke the Listening School, 298 dua nadi, 299 sumbu utara, 300 tebal buku, 301 surat, 302 balasan, 303 koreksi bahan, 304 dua ujung, 305 jaringan diam, 306 kecepatan. Tidak ada beat terulang.
- Motif "hal yang tidak berubah" dan "delapan belas tahun" muncul tiap bab sebagai benang tematik, bukan padding—konteksnya bergeser (dari menyapu ke menahan napas).

### Siapa tahu apa
- Tidak ada kebocoran pengetahuan: surat tenun 301 sengaja ditulis tanpa kata "irama/retakan/pengikat" sehingga Ossian menebak dari dentum, bukan diberi tahu. Kovan menerima teori "benda yang menyambung" dari Maera tanpa tahu Walking Key. Sela tahu jaringan diam tapi belum tahu angka kecepatan sampai 310 (baru di situ dicatat).
- Vosk/Kel Tharrow/Bek/Corvan Hale tidak muncul di 296–310: mereka off-stage di Caldrest/barat—bukan hilang, hanya arc the Anomaly Book fokus pada sumbu utara–selatan + barak. Drift otomatis menandainya ? tapi konfirmasi manual: entri world-state tetap valid, akan muncul kembali saat Caldrest kembali ke panggung.

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
- the Special Property Dispute Panel: terdaftar 31 hari sebelum panggilan; tiga anggota ditunjuk tangan yang sama (perekam tua Choir, penimbang pensiunan Guild, guru the Listening School); musyawarah TERBUKA — "belum tahu caranya berbohong, juga belum tahu malu" (Ossian).
- Preseden baru yang dibuat: kepemilikan ditentukan pendengaran, bukan angka; "akun yang tak bisa menjawab pertanyaan tentang tangan bukan pemilik — cuma lemari" (Resgar, di luar berkas).
- Kurator: gelar Throne → perempuan tanpa nama → pelaksana bernama sendiri; bersaksi "akun itu warisan tugas yang tidak selesai"; uang 18 tahun TIDAK pernah keluar lantai 31 → tidak pernah ada pembelian; barang DIAMBIL.
- Potensi terbuka: panel sebagai lembaga permanen "mendengar" (paralel the Listening Arm ch274) — belum diputuskan di bab mana pun.

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

### the Sapphire School (ch382 — berdiri)
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

## Pembaruan 2026-09-10 (keempat) — bab 383–402

Pipeline kini menghitung 402 bab (CI strict: OK, outline ok). Laporan ketiga berhenti di 382; bagian ini menutup celah 383–397 secara ringkas lalu merinci empat benang yang diminta sampai 402.

### Ringkasan celah 383–397 (status yang belum tercatat)
- **Kanta = MURID PERTAMA** (ch383): tiba dari jalur utara, memperbaiki gembok tiga lubang (janji "datang sendiri" ditepati), membuka kembali bengkel utara (ch384), bertemu murid kedua 30 th (ch385); mengisi KURSI PENJAGA tanpa upacara (ch396 — pasak berbunyi sekali).
- **Kursi penjaga** berdiri kosong (ch391–392) lalu diisi Kanta; pasal pertama terpenuhi sebelum kursi diisi; OSSIAN tetap dilarang mengisi.
- **Penanaman 4/6** (ch395): seam terdalam TANPA PINTU di bawah ujung peta — suara tanpa gema, tanah menjawab dengan getar dan benar penuh pada putaran KESEMBILAN; palu panggilan diketukkan ke tanah ("tempat ini sudah diberi palu").
- **Bejana asli Nilam DIPUTAR** (ch386): bukan lagu melainkan SUARA BICARA — "carilah aku di dalam barang yang kau kembalikan" dijawab sendiri; kemudian MENGHANGAT dari dalam (ch397).
- **Hitungan kunci (diperbaiki ch392/397):** daftar kurator = 6 entri; 4 dikembalikan (381, 387, 390, 395); 2 tersisa = SATU PASANG berpasangan; bejana Nilam TIDAK PERNAH dicabut dari tanah — ia di LUAR daftar resmi.

### Penanaman irama seam — SELESAI 6/6 (per ch401)
- 1/6 (ch381) dan 2/6 (ch387: bel pagi lembah utara — dua pembacaan, dua bel satu irama) dan 3/6 (ch390: palu panggilan Lorong B — gembok dibuka Ossian sendiri, "maaf") sudah tercakup laporan sebelumnya.
- 4/6 (ch395): seam terdalam tanpa pintu (lihat ringkasan celah); penanda ke-10 ditinggal dengan kapur menghadap KE DALAM GELAP — jalan pulang ditandai untuk yang datang lain kali.
- 5/6 (ch398–401, dibacakan Kanta dari kursi penjaga): nat percabangan timur, seam di bawah rel, SAMBUNGAN REL KE-14 — tempat troli melambat; Kovan: *4 detik troli = tanah menghitung iramanya sendiri*; dikembalikan bersamaan dengan entri ke-6 pada fajar penanaman berpasangan.
- 6/6 (ch401): entri ke-6 TANPA kode = bejana Nilam, ditanamkan ke dalam bejana (bukan tanah); penanaman berpasangan: *dibunyikan bersamaan atau tidak sama sekali* — diselesaikan TIGA ARAH (lihat lagu empat nada di bawah).
- Kovan menulis DUA angka: *enam dari enam* (yang dikembalikan kepada pemiliknya) dan *lima dari enam* (irama yang dicabut dari tanah) — daftar jujur menyimpan dua definisi; jangan dipilih salah satunya di bab berikut tanpa alasan baru.
- **Daftar kurator SELESAI dan DIPINDAHKAN** ke kursi penjaga (ch402): arsip menunggu dibaca; ingatan menunggu diturunkan; Kanta menyimpannya sebagai daftar pengajaran. Daftar pencarian kini = DAFTAR TAK SELESAI (ch397) dengan jadwal SATU PENEMUAN JUJUR PER MUSIM (Brannoc); penemuan jujur pertama tercatat ch402 (lihat di bawah).

### Lagu empat nada (per ch400–401)
- Lagu bejana asli Nilam = TIGA nada + jeda, dan telinga barak membacanya tiga cara pada pendengaran pertama (ch400): (1) Ashvarok-Renn — lagu adalah PELAJARAN KUNCI (tiga lubang, setengah putaran, diam sebelum menyerah); guru menulisnya untuk murid yang belum datang; (2) Kovan — jeda ke-3 sama panjangnya dengan diam nat selatan: Nilam menulis IRAMA TANAH yang ia cintai; (3) Sela — lagu TIDAK SELESAI: nada ke-4 tidak pernah datang; bukan lagu yang berhenti, melainkan lagu yang MENUNGGU; nada ke-3 lagu = nada ke-3 lagu kain Sela (diam-selesai).
- Penyelesaian (ch401, fajar penanaman berpasangan) dilakukan TIGA ARAH: murid kedua memutar bejana asli + tamu mengetuk bejana kecil yang ia bawa pada jeda (nada ke-4) + kain Sela menyapa pada nada ke-3; lagu selesai PERTAMA KALI sejak ditulis; ratusan ceruk perpustakaan bergetar BERSAMA (bukan satu demi satu); denyut nat selatan + pintu kedua bertemu lagu.
- Kain Sela berubah: lebih ringan — *diam-yang-pernah-menyanyi*, bukan lagi diam-selesai (ch401). Pagar: jangan kembalikan sifat kain ke diam-selesai di bab mana pun.
- Pagar lain: tamu menyatakan nada ke-4 "pergi bersama penanamnya" — jadi pemilik nada ke-4 = TAMU (lihat di bawah), bukan tanah dan bukan murid kedua.

### Tamu tanpa nama (per ch402) — IDENTITAS SENGAJA TERBUKA
- Jejaknya di kanon: baris kedua entri ke-6 (tinta yang menulis sambil berjalan, ch398) + tumpukan batu kedua dengan goresan BARU di jalur selatan (ch399, tahu jadwal rombongan) + ketukan 3+1 di pintu perpustakaan pada fajar penanaman (ch401).
- Fisik & tanda: orang tua, tas kecil, TANGAN KANAN BEKERJA / KIRI DIAM (tanda aliran sekolah); kurator membaca bekas KIKIR SERONG di tangannya (ch401) — artinya ia GURU NILAM ATAU MURID PERTAMA; TIDAK dipastikan, dan daftar tidak perlu tahu (*"daftar hanya perlu mencatat bahwa yang menunggu untuk ditemukan akhirnya datang, dan ia datang untuk pekerjaan, bukan untuk nama"*).
- Perilaku kanon: menolak diakui ("diakui bukan bagian dari pekerjaan"); MENOLAK kursi Nilam — kursi itu tetap kosong "untuk yang datang seperti aku"; mengetuk pintu kedua 3+1 dan DIJAWAB DARI DALAM (ch402); meninggalkan cangkir tamu — perpustakaan menunggunya pulang lagi (cangkir ketiga, ch402).
- Bukti besar yang DIBACA KURATOR tapi TIDAK diucapkan ke meja (ch401, halaman tak dibacakan): tamu tahu kikir serong SEBELUM kikir itu ditemukan → jika ia guru Nilam sendiri, buku besar yang kalimatnya berhenti di tengah sudah punya pemilik yang berhak menyelesaikannya — dan ia tidak akan menyelesaikannya (*kalimat yang selesai ditulis bukan lagi kalimat yang menunggu*).
- Pagar konsistensi: JANGAN beri nama tamu sebelum bab penegasan; jangan tulis ulang identitasnya sebagai pasti; umur/tubuh harus konsisten dengan sosok tua jalur utara ch382 (kemungkinan orang yang sama — belum dinyatakan kanon).

### Status pintu kedua (per ch402) — tiga lapis
1. Ditemukan (ch374) sebagai perpustakaan gema bernama dengan irama penunggu; penunggu = murid kedua (ch379–380) — lapisan ini SELESAI dan terbuka bagi sekolah.
2. Murid kedua kini GURU the Sapphire School (sejak ch382); meja keluarga, kursi bersaudara, dan lagu empat nada berada di lapisan ini.
3. LAPISAN BARU (ch402): pintu kedua (katup ketiga) DIJAWAB DARI DALAM oleh ketukan penunggu yang TIDAK diidentifikasi — *didengar; aku di sini; tunggu atau masuk, keduanya benar* — padahal murid kedua ada di dalam ruangan. Ada pendengar lain di balik pintu selatan; tamu menjawabnya sekali lagi (1 ketukan: *aku pulang bukan untuk masuk*) dan pergi.
- Pagar: the Watcher from Within TIDAK diidentifikasi; jangan tulis siapa dia sampai bab penegasan; jangan gabungkan dia dengan the Nameless Guest (tamu berada DI LUAR pintu saat itu).

### Benang terbuka lain (masih hidup, per ch402)
- Buku besar kalimat tak selesai: hanya tangan yang berhak boleh menyelesaikannya; murid kedua kini MEMELIHARA bukan MENUNGGU (ch402) — tamu belum memutuskan.
- Penemuan jujur pertama musim (ch402): lagu kerja kecil di percabangan tak dipetakan — didengarkan 3x, DITINGGALKAN di tempatnya, penanda ke-12 Resgar dipasang dengan satu kata: *dengar*; penemuan jujur berikutnya menunggu musim.
- Benang lama tetap terbuka: arsiparis sebagai mata dalam Spire; penempatan lanjutan lelaki jubah abu-abu; status the Wanes/batu penanda; sumur gema; status Nilam (hidup/ tidak — TIDAK dijawab oleh kemunculan tamu; pagar ch382 tetap berlaku).

## Pembaruan 2026-09-11 (kelima) — bab 403–407

Pipeline kini menghitung 407 bab (CI strict: OK, outline ok). Batch ini mengeksekusi penyelidikan jawaban dari dalam (benih ch402) dan menutup musim panen; empat benang di bawah menggantikan status laporan keempat.

### Buku besar (per ch405) — terbaca benar untuk pertama kalinya
- **Uji tinta** (Kovan): tinta kalimat terakhir ≠ tinta halaman-halaman kerja — halaman kerja = tinta tambang (kulit kayu nat direbus, kering jadi hitam); kalimat terakhir = cokelat muda = TINTA JALUR (kulit kayu perhentian, dibuat & dipakai di jalan).
- Kesimpulan kanon: kalimat *pulang ke sini harus lewat katup yang—* TIDAK berhenti karena penulis gagal pulang. Ia DIMULAI tidak selesai — ditulis di jalan pada hari berangkat, sengaja, sebagai janji yang masih berjalan; *janji yang masih berjalan tidak boleh ditutup oleh tangan yang sudah tiba*.
- Fakta pendukung: jejak telapak tamu di jalur hanya utara→pintu kedua, TIDAK pernah menuju meja kerja; tamu tidak pernah membuka buku besar — karena meja itu MEJA NILAM (kursi Nilam tetap kosong, dikatakan tamu sendiri: "bukan untuk yang pulang"); ada hal yang milik satu tangan walaupun tangan itu penulisnya.
- **Jawaban penulis** via anjing pengendus rumah makan jalur membawa batu (trail ink, tulisan tangan yang sama): *"tinta di buku besarku kukenali karena aku yang membuatnya... kalimat itu tidak ditulis untuk diselesaikan. ia ditulis untuk tetap terbuka selama jalan itu masih ada yang belum pulang — dan jalan itu masih punya yang belum pulang: aku belum selesai berjalan."*
- Tindakan murid kedua: MENUTUP buku besar (pertama kali dalam 30 th — buku terbuka = menunggu dibaca; buku tertutup = menjalankan janjinya di jalan) + segel kapur di sampul: *dijaga — jangan dibuka, jangan diselesaikan. penulisnya masih berjalan. pintu rumahnya tidak dikunci; bukunya dikunci oleh janjinya sendiri.*
- Kovan memasang kotak-batu + kapur + pesan di percabangan: *"ketukanmu tercatat lima kali musim ini, semua setelah kami bergerak... silakan lewat dengan lebih tenang"* — penanda jenis baru: untuk hati orang yang tidak mau disebut namanya.
- Pagar konsistensi: JANGAN menyelesaikan kalimat itu di bab mana pun; jangan tulis tamu membuka buku; kalau tamu menyelesaikannya suatu hari, itu harus diperjuangkan naratifnya sendiri (keputusan tamu, bukan keputusan meja).

### the Smoothing Joint (per ch406) — penemuan jujur kedua musim
- Lokasi: orphan joint (±2 lengan) di jalur selatan yang TIDAK menghubungkan apa pun; ditemukan Kovan karena diamnya berbeda (bekerja terlalu pelan untuk didengar kecuali telapak yang mencari).
- Bunyinya: BUKAN irama daftar, BUKAN lagu — melainkan PEKERJAAN PENGHALUS BEJANA: gerakan tangan menghaluskan dinding dalam bejana, pekerjaan yang dicabut dari pekerjanya (bukan iramanya). Melarikan diri ke nat kecil yang tak dianggap penting; bekerja 30 th tanpa barang/meja/hasil.
- Bukti pekerjaannya: dinding nat halus seperti dinding dalam bejana; di ujungnya lekukan + TEMPAT DUDUK BEJANA yang kosong — menunggu bejana yang DIJANJIKAN (bukan menunggu diputar; menunggu ditempatkan).
- Detail pendengaran (pagi ekstra): bunyi sesekali BERHENTI 2–3 tarikan napas lalu lanjut dari gerakan yang sama — bukan lelah/ragu: tangan yang mendengar sesuatu dari jauh.
- Keputusan meja tiga suara: DITINGGALKAN di tempatnya — menaruh bejana pilihan sendiri = penipuan cara baik (rumah sudah dihaluskan untuk yang dijanjikan); cara bekerja tidak bisa dikembalikan, hanya bisa ditunggu bersama. Ashvarok-Renn menyapa pekerjaannya; kapur Kanta di dinding luar: *nat ini menyiapkan rumah untuk janji yang belum tiba. jangan isi. jangan ambil. hanya dengarkan.*
- Nama panggilan dari ibu Tamma: **THE SMOOTHING JOINT** — *"tempat yang pekerjaannya tidak kelihatan dan rumahnya belum ada isinya... kalau bunyinya senang, berarti janjinya dekat."* Nama panggilan ini dipakai meja, bukan istilah resmi.
- Pagar: the Smoothing Joint TIDAK masuk daftar kurator dan TIDAK masuk daftar tak selesai sebagai entri pencarian; jangan isi lekukannya dengan bejana apa pun sampai kanon menunjukkan bejana yang dijanjikan.

### the Watcher from Within (per ch403–404, 407) — identitas tetap terbuka
- Fakta yang terkunci: (1) bukan murid kedua — ia ada DI DALAM ruangan saat ketukan tamu dan tidak mengetuk; tidak salah dengar (30 th membedakan bunyi rumahnya); (2) murid kedua merasa AMAN (bukan takut) saat mendengarnya — *seolah penjagaan tidak pernah jadi tanggung jawabku sendirian*; (3) mencatat kolom ketukan-dari-dalam di buku penjagaannya: kosong 26 th, lalu frekuensinya NAIK mengikuti kegiatan barak — hanya pernah menjawab SETELAH jalur hidup, tidak pernah sebaliknya; (4) margin bukunya bergambar tanda kikir serong tanpa sadar — mengenali sebelum mengenali.
- Hasil percobaan (ch404): 3 percobaan TUNGGAL (Ashvarok-Renn / Kovan / kurator) = tidak dijawab; 3 orang BERSAMA tanpa alat = DIJAWAB satu ketukan → pintu menjawab BENTUK KERJA (tiga jenis diam yang berbeda berdiri di satu tempat = SHIFT), bukan nama orang; *pintu itu menunggu shift, dan shift-nya dipilih pekerjaan yang sedang berjalan* (Kovan).
- Interpretasi Ashvarok-Renn (ch403): the Watcher from Within = penunggu yang mendengar yang ia tunggu dan tidak berani membukanya; penyelidikan bukan mencari siapa dia, melainkan SIAPA yang ia tunggu — dan jawabannya mungkin bukan orang.
- Penutup (ch407, catatan kursi Kanta): identitas TIDAK diketahui; yang diketahui: *ia menunggu seperti kita — sama-sama tidak mau pulang lebih dulu dari yang belum selesai.* Ossian menutup berkas panel: tanpa temuan nama + jaminan gembok; catatan pribadinya di berkas lama peta salah (arsip terbuka): *yang menunggu tidak pernah bisa ditutup dari luar.*
- Pagar: JANGAN identifikasi the Watcher from Within; JANGAN samakan dia dengan the Nameless Guest (tamu berada DI LUAR pintu saat itu); jika suatu hari keduanya dihubungkan, itu momen arc besar yang butuh bab sendiri.

### Cangkir yang dijangkir (per ch407) — tamu pulang pelan-pelan
- Di perpustakaan selatan, suatu fajar biasa: cangkir ketiga (cangkir tamu, diganti air panas tiap hari sejak ch402) ditemukan KOSONG dengan cara berbeda dari penguapan — airnya MINUM; diletakkan kembali dengan dasar menghadap atas seperti ucapan terima kasih; tidak ada jejak telapak baru, tidak ada ketukan terdengar, tidak ada tanda di batu.
- Respons murid kedua: TIDAK mengirim nat, tidak menulis di catatan — kabar terlalu pribadi untuk denyut; mencuci cangkir, isi ulang, kembali ke tempatnya; *"kapan pun. pintunya tidak dikunci."*
- Korelasi jalur utara (dilarang disimpulkan, hanya dicatat berdampingan oleh Kanta): ibu Tamma jalur melaporkan tamu tua lewat KELUAR dari arah bengkel utara menuju selatan dengan TAS LEBIH RINGAN dari semua kali yang pernah dilihat pengendus (bejana nada ke-4 sudah diberikan di ch401); Kanta menulis dua fakta berdampingan: *kedekatan bukan kesimpulan; ia hanya harapan yang ditulis dengan tangan yang jujur.*
- Status benang tamu: ia pulang PELAN-PELAN ke semua tempat yang pernah ia tinggalkan (urutan tiga pesan: peringatan → pemeriksaan → keterbukaan — Kovan: *seperti tukang memilih urutan kuncinya: yang paling jauh dulu, yang paling pribadi terakhir*); ia belum pulang untuk tinggal; identitas tetap terbuka (guru Nilam ATAU murid pertama — pagar laporan keempat tetap berlaku).
- Penutup musim lain yang tercatat ch407: jadwal troli resmi +4 detik di sambungan rel ke-14 (*jeda yang bukan keterlambatan; ia hormat* — Brannoc); Resgar membuat penanda ke-14 dan rak gudangnya mulai menjadi arsip; halaman margin Kovan berisi angka-angka yang tidak masuk laporan (*ukuran tahun yang benar*); Sela menulis benih: *kalau suatu hari ada yang datang lewat pintu yang tidak pernah diketuk — jangan tanya siapa dia. tanyakan apakah ia sudah makan.*
- Daftar penemuan jujur musim panen: PENUH 2/2 (lagu kerja kecil ch402 + the Smoothing Joint ch406) — dua-duanya DITINGGALKAN; Kanta: *musim ini tidak membawa pulang satu pun benda dari bawah tanah — dan musim yang paling banyak mengembalikan, karena yang dikembalikan adalah perhatian.*

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

## Pembaruan 2026-09-13 — bab 435–449

### Ringkasan

Bab 435–449 konsisten pada timeline, rantai dokumen, aturan bukti, batas pengetahuan, dan state serial. Rangkaian bergerak dari catatan poros menuju sertifikat pembelian tanpa membuka identitas kursi 4T-09 atau menggabungkan pembelian dengan tekanan. Satu salah sebut gender KRL-209 pada bab 440 diperbaiki agar konsisten dengan perkenalannya pada bab 439.

### Konsistensi terkonfirmasi

- Harga Listen selesai dibayar satu hari penuh pada bab 435 tanpa memakai the Remainder.
- Urutan prosedural konsisten: catatan poros 17.24.02, permintaan garis atas 17.24.09, serah depot 18.32, status 18.47, pasangan audit 19.06, status jaminan 19.19, penyerahan 19.33, dan sidang 19.48.
- RAC-31-P/RESPONSE membentuk PA-NEW-7716; RAC-PH-437-1186 berkembang dari pembayaran penahanan menjadi pertimbangan pembelian sah hanya setelah jaminan dan konversi.
- MU-31-N7-884 tetap berisi 64 takik dalam paket 69 takik; PG-44102 dan KL-11608 tetap utuh; paket tidak dibuka.
- KRL-209, petugas penerimaan, biro perantara, depot pemroses, mandat 4T-09, dan pembeli tetap memiliki peran terpisah.
- Bab 447 mendaftarkan hak, bab 448 mengesahkan sertifikat sisi dalam, dan bab 449 baru melepaskan salinan luar setelah verifikasi silang.
- Identitas kursi di balik 4T-09 tetap tertutup. Anthema Spire tetap hanya ujung aktif tekanan yang diamati. Pembelian artefak tidak ditetapkan sebagai sumber, tujuan, atau penyebab tekanan.
- State akhir bab 449 cocok dengan world-state, bible, outline, dan arcs: bukti formal tersedia untuk paket pembuktian publik; Arc 2 masih aktif.

### Potensi masalah

Tidak ada masalah kontinuitas tersisa dalam cakupan 435–449. Gender KRL-209 kini konsisten sebagai perempuan pada bab 439–440.

Catatan: laporan ini pertanyaan, bukan vonis. Tidak mengubah ambiguitas identitas kursi, sumber tekanan, atau arah Arc 2.
