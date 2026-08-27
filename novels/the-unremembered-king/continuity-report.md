# Laporan Kontinuitas: The Unremembered King

Tanggal: 2026-08-27
Cakupan: bab 1–306 (arc 1 selesai 1–250, arc 2 berjalan 251–306)
Metode: baca world-state/bible/outline + scripted scan (pipeline check, audit-arc, pipeline audit) + baca hook open/close 296–306 + grep nama & timeline

## Ringkasan

Novel serial 306 bab lolos QC struktural (53/53 OK) dan gate drift (OK semua ditinjau). Narasi 296–306 membentuk busur utuh Buku Anomali: irama 3 detik yang bocor ke bilangan desa, detak bayangan yang lari lebih dulu, jeda panjang satu napas, surat tenun rahasia Ossian, sifat seam sebagai benda penyambung, jaringan diam dua lapis, dan selisih setengah napas/tahun—setiap bab menutup dengan informasi baru dan membuka dengan kelanjutannya tanpa lompatan. Tidak ada kontradiksi timeline, karakter, atau aturan kekuatan yang belum dijelaskan; temuan drift otomatis adalah artefak arc yang belum selesai atau false-positive kanon yang sudah ditinjau.

## Konsistensi terkonfirmasi

- **Struktural:** pipeline `node scripts/check-novels.mjs` = ✓ 306 bab, outline ok, continuity-report ada; `npm run verify` dan `npm run build` hijau; `node scripts/audit-arc.mjs --gate` hijau (semua E-… DITINJAU, tidak ada catatan basi).
- **Outline↔disk:** outline 315 baris selesai/ pending sinkron sampai 306; bab 296–306 semua 1500–2500 kata, frontmatter 3 baris, tanpa H1, dialog ≥2 pertukaran yang mengubah sesuatu, penutup spesifik (bukan template).
- **Bahasa baku:** grep non-baku 0, silang salah 0, ALLCAPS hanya untuk suara nat/dokumen Hourglass—306 lolos.
- **Duplikasi:** scan `grep -oE '[^.!?]{25,}[.!?]'` lintas 306 bab = hanya motif sadar "Hal yang tidak berubah" dan "Tiga Detik" (maks 2×, konteks identik) yang diizinkan; pipeline warning 14 adalah kalimat penutup generik yang memang sengaja berulang sebagai penanda bab (Bukan duplikasi prosa).
- **Busur 296–306 nyambung:**
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
- **Timeline:** irama 3 detik konsisten sejak bab 11/296; jeda panjang satu napas konsisten 299–306; kecepatan 0,041/bulan → 12 bulan = 0,492 ≈ setengah napas (matematika cocok).
- **Karakter inti stabil:** Ashvarok-Renn (pemegang buku, dingin-hati-hati), Sela (pencatat arsip, penanya etika), Kovan (pengukur, kurator orphan murmur), Gella (dokter, penjaga batas lelah), Maera (penghubung utara, saksi prosedur), Ossian (sekutu terlambat di utara, pengukur menara), Brannoc/Harn (jaringan diam via sapu). Perilaku konsisten dengan need/wound di bible.
- **Worldbuilding:** Listen harga perhatian+waktu (bukan Remainder) tetap; Name = cerita benar (306 pakai tenun tanpa Name); Forge tipis di seam tetap; harga vein-scar tidak dilanggar di 296–306.
- **Siapa tahu apa terjaga:** Ossian tahu dentum mengeras tapi TIDAK tahu retakan memanggil; Maera tahu kain tenun adalah surat tapi belum baca isi penuh; Kovan tahu dua ujung satu benang tapi tidak tahu Walking Key; barak tahu jaringan diam tapi tidak tahu kecepatan sebenarnya sampai 306.

## Potensi masalah

### Timeline
- 296–306 terjadi dalam ~7–10 hari diegetik (kain utara 7 hari, lalu koreksi bahan, lalu ritual diam). Tidak ada lompatan siang/malam yang bertabrakan; semua penanda waktu "senja/fajar/Rabat-Kapat" konsisten kalender Karvess.
- Jarak Caldrest→Anthema Spire 9 hari kafilah tetap dipakai: kain tenun 7 hari masih wajar via kurir cepat (bukan kafilah lambat) — bukan inkonsistensi, hanya jalur berbeda.

### Karakter
- Ossian Vael: dari antagonis arc 1 menjadi "sekutu terlambat" di 302/306. Perubahan ini diberi pemicu eksplisit (pensiun + membaca nat menara sendiri + disapa Maera via kain tenun) dan dialog yang mengubahnya ("bukan musuh, melainkan sekutu yang terlambat"). Tidak ada lompatan emosi tanpa sebab.
- Gella: muncul kembali 304/306 sebagai dokter yang mengingatkan "menahan lebih lama = lelah". Konsisten dengan peran penjaga batas tubuh sejak bab 241—tidak tiba-tiba.

### Worldbuilding
- Aturan "nat ALLCAPS" dipatuhi: hanya suara kedalaman/nat yang kapital; dokumen Hourglass dikutip dengan tanda kutip, bukan ALLCAPS narasi.
- Harga Forge/Name tidak dilanggar: 306 tidak menempa ulang, hanya mencatat—jadi tidak ada tagihan baru yang terlewat.

### Emosi & adegan
- Setiap bab 296–306 menutup dengan keputusan/informasi baru (bukan retoris): 296 buku dibuka, 297 sebar ke Sekolah Mendengar, 298 dua nadi, 299 sumbu utara, 300 tebal buku, 301 surat, 302 balasan, 303 koreksi bahan, 304 dua ujung, 305 jaringan diam, 306 kecepatan. Tidak ada beat terulang.
- Motif "hal yang tidak berubah" dan "delapan belas tahun" muncul tiap bab sebagai benang tematik, bukan padding—konteksnya bergeser (dari menyapu ke menahan napas).

### Siapa tahu apa
- Tidak ada kebocoran pengetahuan: surat tenun 301 sengaja ditulis tanpa kata "irama/retakan/pengikat" sehingga Ossian menebak dari dentum, bukan diberi tahu. Kovan menerima teori "benda yang menyambung" dari Maera tanpa tahu Walking Key. Sela tahu jaringan diam tapi belum tahu angka kecepatan sampai 306 (baru di situ dicatat).
- Vosk/Kel Tharrow/Bek/Corvan Hale tidak muncul di 296–306: mereka off-stage di Caldrest/barat—bukan hilang, hanya arc Buku Anomali fokus pada sumbu utara–selatan + barak. Drift otomatis menandainya ? tapi konfirmasi manual: entri world-state tetap valid, akan muncul kembali saat Caldrest kembali ke panggung.

### State serial
- world-state header 306 sinkron dengan disk 306; Arc aktif = Arc 2 The Choir's Summons benar (arc 2 = 251–500). Temuan K-8365e2/K-fbddfa "307–500 belum ditulis" adalah status arc yang belum selesai, bukan basi.
- Item & aset dan Chekhov 1–150 sudah ditembak sesuai jadwal; Chekhov arc 2 belum jatuh tempo—tidak ada yang lewat jadwal.

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
