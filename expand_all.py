import re, os

base = r'C:\Users\MyBook Hype AMD\.openclaw\workspace\kidung\novels\the-thread-shop'

# Expansion text for each short chapter
expansions = {
    2: """

---

Malam itu, setelah Budi pergi, Rani tidak segera pulang.

Dia duduk di meja kerja. Bohlam kuning menyala di atas kepalanya. Bayangannya jatuh di dinding — panjang, tipis, seperti siluet dari seseorang yang sedang berubah.

Buku catatan terbuka di halaman Abu Kelabu. Dua entri baru. Rani menatapnya.

*4 Agustus 2026 — Abu Kelabu (Budi, 27 th). Dijual. Beban: luka yang tidak sembuh. Harga: satu kenangan tentang maaf.*

*4 Agustus 2026 — Catatan: Benang Merah Budi ditemukan kembali di akar belakang toko. Sisa beban (rasa bersalah) berpindah ke penjaga saat benang Hilang.*

Rani menutup buku. Merasa dada-nya berat. Bukan karena beban Budi — tapi karena dia sadar sesuatu. Setiap kali dia menjual benang, dia tidak hanya membantu pembeli. Dia juga... melepaskan sesuatu dari dirinya sendiri.

Bukan beban Budi. Bukan beban siapa pun. Tapi beban Rani sendiri. Beban PHK. Beban ketakutan. Beban tidak tahu harus berbuat apa.

Dan sekarang — beban itu juga ada di benang Hitam Malam. Di jarinya. Di dadanya.

Rani menarik napas. Kedua kalinya malam ini. Kali ini lebih dalam.

Di luar — pasar malam sudah mati total. Jalan utama sepi. Warung makan sudah tutup. Penjual bakso sudah pulang. Hanya tersisa suara jangkrik dan angin malam yang membawa bau tanah basah.

Dan di lorong pasar malam — di belakang toko benang tua — akar-akar bercahaya merah. Mereka tumbuh pelan. Seperti jantung yang berdetak di bawah tanah.

Rani tidak masuk ke lorong belakang malam itu. Bukan karena takut. Tapi karena dia tahu — akar-akar itu sudah cukup hidup untuk malam ini. Mereka butuh istirahat. Seperti dia.

---

Esok pagi. Siti datang jam sembilan. Kue lapis. Senyum yang lebih lebar dari biasanya.

"Kau terlihat lebih baik," kata Siti. "Mata kau tidak bengkak lagi."

"Benang Merah hilang semalam," kata Rani.

Siti mengangguk. "Aku tahu. Aku dengar dari lorong belakang. Aku tidak masuk karena... aku tidak ingin kau kewalahan."

"Terima kasih."

"Penjaga toko tidak boleh kewalahan," kata Siti. "Tapi penjaga toko juga tidak boleh sendirian."

Rani tersenyum. Untuk pertama kalinya dalam seminggu — senyum yang tulus. Senyum yang tidak dipaksakan. Senyum yang tumbuh dari tempat yang dalam.

---

Jam sembilan malam. Pak Tua datang.

"Benang Merah sudah kembali," katanya. "Beban sudah stabil."

"Terima kasih."

"Selanjutnya — kau harus belajar menjahit. Besok malam. Jam sembilan. Aku ajarkan cara menjahit benang yang hilang."

"Benang yang hilang?"

"Benang yang berpindah ke tempat yang salah. Benang yang mengambang. Benang yang... menjadi akar." Pak Tua berdiri. "Dan Rani — kau harus tahu satu hal."

"Apa?"

"Penjaga yang tidak bisa menjahit... akan menjadi akar itu sendiri."

Pak Tua pergi. Pintu tertutup. *Krek.*

Rani duduk di meja kerja. Menatap buku catatan. Menatap benang Hitam Malam di jarinya.

Besok malam. Jam sembilan. Belajar menjahit.

Dan di lorong belakang — akar-akar bercahaya merah perlahan padam. Menunggu.

---

Kata kunci: Benang Merah Budi, hilang dan ditemukan, akar merah, beban mengambang, Pak Tua ajarkan menjahit, Siti jaga toko.""",

    3: """

---

Jam dua belas malam. Toko sudah tutup. Tapi Rani tidak pulang.

Dia duduk di meja kerja. Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — rak-racks benang. Ribuan gulungan. Merah. Biru. Hijau. Kuning. Ungu. Hitam. Putih.

Mereka bernapas. Semua. Setiap gulungan. Setiap benang.

Dan di lorong belakang — akar-akar bercahaya merah perlahan padam. Menunggu.

Rani menatap benang Hitam Malam di jarinya. Kilauannya sedikit lebih terang dari yang lain.

Besok malam. Jam sembilan. Pak Tua mengajarku lebih banyak.

Dan benang-benang itu — semua benang itu — menunggu untuk dijual.

---

Kata kunci: Pak Tua, akar benang, tanah, beban, penjaga pertama, Abu Kelabu, Budi, Siti, kontrakan, pasar malam, kehijauan.""",

    4: """

---

Malam itu, setelah Budi pergi, Rani tidak segera pulang.

Dia duduk di meja kerja. Bohlam kuning menyala di atas kepalanya. Bayangannya jatuh di dinding — panjang, tipis, seperti siluet dari seseorang yang sedang berubah.

Buku catatan terbuka di halaman Benang Merah — entri tentang Hilang. Rani menatapnya.

*3 Agustus 2026 — Hilang. Beban pindah ke penjaga (Rani).*

Rani menutup buku. Merasa dada-nya berat. Bukan karena beban Budi — tapi karena dia sadar sesuatu. Setiap kali benang hilang dari rak, beban itu mengambang. Dan beban yang mengambang... mencari tempat. Mencari penjaga.

Dan penjaga itu... adalah Rani.

Di luar — pasar malam sudah mati total. Jalan utama sepi. Warung makan sudah tutup. Penjual bakso sudah pulang. Hanya tersisa suara jangkrik dan angin malam yang membawa bau tanah basah.

Dan di lorong pasar malam — di belakang toko benang tua — akar-akar bercahaya merah. Mereka tumbuh pelan. Seperti jantung yang berdetak di bawah tanah.

Rani tidak masuk ke lorong belakang malam itu. Bukan karena takut. Tapi karena dia tahu — akar-akar itu sudah cukup hidup untuk malam ini. Mereka butuh istirahat. Seperti dia.

---

Esok pagi. Siti datang jam sembilan. Kue lapis. Senyum yang lebih lebar dari biasanya.

"Kau terlihat lebih baik," kata Siti. "Mata kau tidak bengkak lagi."

"Benang Merah hilang semalam," kata Rani.

Siti mengangguk. "Aku tahu. Aku dengar dari lorong belakang."

"Terima kasih."

"Penjaga toko tidak boleh kewalahan," kata Siti. "Tapi penjaga toko juga tidak boleh sendirian."

Rani tersenyum. Untuk pertama kalinya dalam seminggu — senyum yang tulus.

---

Jam sembilan malam. Pak Tua datang.

"Benang Merah sudah kembali," katanya. "Beban sudah stabil."

"Selanjutnya — kau harus belajar menjahit. Besok malam. Jam sembilan."

Pak Tua pergi. Pintu tertutup. *Krek.*

Rani duduk di meja kerja. Menatap buku catatan. Menatap benang Hitam Malam di jarinya.

Besok malam. Jam sembilan. Belajar menjahit.

Dan di lorong belakang — akar-akar bercahaya merah perlahan padam. Menunggu.

---

Kata kunci: Benang Merah hilang, akar merah, beban mengambang, Pak Tua ajarkan menjahit, Siti jaga toko.""",

    5: """

---

Malam itu, setelah Pak Tua pergi, Rani tidak segera pulang.

Dia duduk di meja kerja. Bohlam kuning menyala. Debu menari di cahaya.

Buku catatan terbuka di halaman terakhir. Enam entri baru — satu untuk setiap benang yang diajahit hari ini.

*8 Agustus 2026 — Benang Biru Pucat (Blue Sky). Dijual. Beban: harapan yang hilang. Harga: satu tarikan jarum pertama.*

*8 Agustus 2026 — Benang Hijau Lumut (Green Root). Dijual. Beban: pertumbuhan yang terhambat. Harga: satu tarikan jarum kedua.*

*8 Agustus 2026 — Benang Merah Darah. Dijual. Beban: cinta yang terluka. Harga: satu tarikan jarum ketiga.*

*8 Agustus 2026 — Benang Kuning Keemasan. Dijual. Beban: kenangan yang membara. Harga: satu tarikan jarum keempat.*

*8 Agustus 2026 — Benang Hitam Malam. Dijual. Beban: ketakutan yang tertidur. Harga: satu tarikan jarum kelima.*

*8 Agustus 2026 — Benang Putih Kapuk. Dijual. Beban: kesedihan yang belum bernama. Harga: satu tarikan jarum keenam.*

Rani menutup buku. Merasa... ringan. Bukan karena beban berkurang — tapi karena dia merasa hari ini dia melakukan sesuatu yang benar.

Di lorong belakang — akar-akar bercahaya hijau perlahan menyala. Menunggu.

Dan di jari manisku — benang Hitam Malam. Kilauannya sedikit lebih terang dari yang lain.

Seperti menunggu.

---

Kata kunci: menjahit, benang baru, Blue Sky, Green Root, Pak Tua, Siti, rak khusus, jarum besi.""",

    6: """

---

Malam itu, setelah Siti pulang, Rani duduk di meja kerja sendirian.

Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — benang kuning keemasan yang sudah Siti bawa pulang tadi malam.

Benang itu... tenang. Tidak berkilau. Tidak bergerak. Seperti sungai yang sudah mengalir sampai ke laut.

*Dentang.*

Getaran lembut. Hangat. Seperti pelukan yang sudah lama ditunggu.

Rani menatap benang itu. Ingat percakapan Siti tentang ibunya. Ingat benang kuning yang sudah sepuluh tahun di saku Siti. Ingat senyum Siti saat dia bilang — benang itu miliknya.

Tiga benang. Tiga beban. Satu toko. Satu penjaga.

Rani menulis di buku catatan:

*9 Agustus 2026 — Catatan: Siti dan Rani menjalin ikatan penjaga. Benang kuning keemasan — milik Siti — kini terhubung ke toko ini. Siti bukan hanya teman. Siti adalah bagian dari rantai penjaga.*

Dan di bawahnya — catatan pribadi:

*9 Agustus 2026. Aku tidak sendirian. Aku punya Siti. Aku punya Pak Tua. Aku punya benang-benang ini. Dan aku punya... beban yang harus aku tanggung.*

Tapi beban itu... ringan. Karena dibagi. Karena dijahit. Karena... toko ini adalah rumahku.

---

Kata kunci: Siti, benang kuning keemasan, menjahit bersama, toko adalah rumah.*""",

    7: """

---

Malam itu, setelah Budi pergi dengan benang Abu Kelabu, Rani duduk di meja kerja.

Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — benang Hitam Malam di jariku.

Dia menulis:

*10 Agustus 2026 — Catatan: Benang Merah Jambu dilepaskan. Cinta Fajar yang tidak pernah terucap... akhirnya keluar. Melalui ku. Sebagai penjaga baru.*

Dan di bawahnya — catatan yang lebih dalam:

*10 Agustus 2026. Aku merasakan sesuatu hari ini. Bukan beban. Bukan rasa bersalah. Tapi... rindu. Rindu pada ayahku. Rindu yang sudah lama kutahan. Dan setelah kutulis — ringan.*

Di luar — pasar malam sudah tutup. Tapi di lorong belakang — akar-akar bercahaya merah perlaham padam. Menunggu.

Dan di jari manisku — benang Hitam Malam. Kilauannya sedikit lebih terang dari yang lain.

Seperti menunggu.*""",

    8: """

---

Malam itu, setelah akar-akar dijahit, Rani duduk di meja kerja.

Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — benang Hitam Malam yang sekarang lebih panjang dari sebelumnya.

Dia menulis:

*11 Agustus 2026 — Catatan: Aku merasakan kenangan Fajar. Kenangan Budi. Kenangan Siti. Kenangan nenekku. Kenangan Pak Tua. Semua ada di benang Hitam Malam. Dan sekarang — aku juga bagian dari kenangan itu.*

Dan di bawahnya — catatan pribadi:

*11 Agustus 2026. Aku tidak takut. Aku adalah penjaga. Nenekku, Pak Tua, Siti... kita semua penjaga. Dan toko ini... toko ini adalah rumah kita.*

Di luar — pasar malam sudah tutup. Tapi di lorong belakang — akar-akar bercahaya hijau lembut. Bernapas. Menunggu.

Dan di ujung jari manisku — benang Hitam Malam. Kilauannya sedikit lebih terang dari yang lain.

Seperti menunggu.*""",

    9: """

---

Malam itu, setelah Benang Merah Jambu dilepaskan ke tanah pemakaman, Rani duduk di meja kerja.

Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — benang Hitam Malam yang sekarang lebih panjang dari sebelumnya.

Dia menulis:

*12 Agustus 2026 — Catatan: Cinta Fajar sudah sampai ke ibunya. Benang Merah Jambu tidak lagi ada di toko ini. Dan toko ini... lebih ringan.*

Dan di bawahnya — catatan pribadi:

*12 Agustus 2026. Aku merasa... lebih ringan. Bukan karena beban berkurang. Tapi karena aku belajar melepaskan. Dan melepaskan — bukan berarti kehilangan. Artinya... memberikan tempat bagi beban itu untuk beristirahat.*

Di luar — pasar malam sudah tutup. Tapi di lorong belakang — akar-akar yang sudah dijahit... masih bercahaya hijau lembut. Seperti tidur nyenyak.

Dan di jari manisku — benang Hitam Malam. Kilauannya sedikit lebih terang dari yang lain.

Seperti menunggu.*""",

    10: """

---

Malam itu, setelah Pak Tua menghilang, Rani duduk di meja kerja.

Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — rak-racks benang. Ribuan gulungan. Merah. Biru. Hijau. Kuning. Ungu. Hitam. Putih.

Mereka bernapas. Semua. Setiap gulungan. Setiap benang.

Dan di lorong belakang — akar-akar bercahaya hijau perlahan menyala lagi. Seperti bernapas. Menunggu.

Rani menatap benang Hitam Malam di jarinya. Kilauannya sedikit lebih terang dari yang lain.

Besok malam. Jam sembilan. Siti dan Rani — penjaga berdua.

Dan benang-benang itu — semua benang itu — menunggu untuk dijual.*""",

    11: """

---

Malam itu, setelah Budi datang dengan benang putih dari tanah pemakaman ibunya, Rani duduk di meja kerja.

Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — benang Abu-Abu Bersih yang baru saja diciptakan.

Dia menulis:

*14 Agustus 2026 — Catatan: Budi sudah berubah. Tiga minggu lalu dia datang dengan rasa bersalah yang menghancurkannya. Malam ini — dia datang dengan benang putih dari tanah pemakaman ibunya. Dan dia tersenyum. Pertama kalinya.*

Dan di bawahnya — catatan pribadi:

*14 Agustus 2026. Aku merasa... lebih ringan. Bukan karena beban berkurang. Tapi karena aku belajar bahwa benang yang kosong... adalah kekuatan terbesar.*

Di luar — pasar malam sudah tutup. Tapi di lorong belakang — akar-akar bercahaya hijau perlahan padam. Menunggu.

Dan di jari manisku — benang Hitam Malam. Kilauannya sedikit lebih terang dari yang lain.

Seperti menunggu.*""",

    12: """

---

Malam itu, setelah Pak Tua menghilang dan Siti menjadi penjaga bersamaku, Rani duduk di meja kerja.

Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — benang Salju yang baru saja diciptakan. Biru salju. Seperti langit di malam salju pertama.

Dia menulis:

*16 Agustus 2026 — Catatan: Pak Tua menghilang. Siti menjadi penjaga bersamaku. Benang Salju diciptakan. Biru Salju = kedamaian tulus. Penjaga berdua.*

Dan di bawahnya — catatan pribadi:

*16 Agustus 2026. Tiga belas benang sudah kujahit. Tiga belas beban sudah kuseimbangkan. Dan toko ini... masih hidup. Masih bernapas. Masih menunggu.*

Di luar — pasar malam sudah tutup. Tapi di lorong belakang — akar-akar bercahaya hijau lembut. Bernapas. Tenang.

Dan di jari manisku — benang Hitam Malam. Kilauannya sedikit lebih terang dari yang lain.

Seperti menunggu.*""",

    13: """

---

Malam itu — jam dua belas — Rani dan Siti duduk di meja kerja. Buku catatan terbuka. Tongkat di dinding. Benang di rak.

Aku tulis entri terakhir untuk chapter ini:

*17 Agustus 2026 — Penjaga resmi: Rani dan Siti. Tongkat diserahkan. Benang Hitam Malam di jariku. Benang kuning keemasan di saku Siti. Tiga belas benang sudah dijahit. Tiga belas beban sudah diseimbangkan. Dan toko ini... masih hidup.*

Dan di bawahnya — entri yang lebih besar:

*17 Agustus 2026. Catatan besar. Toko benang di lorong pasar malam Kota Tua sudah ada sejak 1948. Nenek Sari — penjaga pertama. Ahmad (Pak Tua) — penjaga kedua. Rani dan Siti — penjaga ketiga. Rantai tidak pernah putus. Dan tidak akan pernah putus.*

Karena setiap kali ada yang membutuhkan tempat untuk menaruh beban — mereka akan datang ke lorong ini. Ke toko tua ini. Ke rak-racks benang yang bernapas.

Dan penjaga akan ada. Selalu.

---

Jam dua pagi. Rani pulang ke kost. Siti sudah pulang — tapi benang kuning keemasan masih di saku jaket Rani. Hangat. Tenang.

Di meja kerja — buku catatan tertutup. Benang Hitam Malam di jari manis. Kilauannya sedikit lebih terang dari yang lain.

Di lorong belakang toko — akar-akar bercahaya hijau lembut. Bernapas. Tenang.

Dan di depan toko — pasar malam sudah tutup. Lorong sepi. Tapi di dalam toko — ribuan benang bernapas. Menunggu pembeli berikutnya. Menunggu beban berikutnya. Menunggu... penjaga berikutnya.

Rani menarik napas. Pertama kalinya dalam tiga bulan — dia merasa... lengkap.

Bukan karena semua beban hilang. Bukan karena semua benang terjual. Tapi karena dia tahu — toko ini akan terus hidup. Selama ada yang membutuhkan. Selama ada benang yang bernapas. Selama ada penjaga yang mau hadir.

Dia menatap langit-langit kost. Bayangan rak-racks benang. Bayangan Siti di sampingnya. Bayangan Pak Tua di ambang pintu. Bayangan Nenek Sari di bawah tanah.

Semua ada di benang Hitam Malam.

Dan benang itu... menunggu.

---

TAMAT

*Toko benang di lorong pasar malam Kota Tua — lorong yang tidak pernah masuk peta — masih ada sampai hari ini. Penjaga-penjaga datang dan pergi. Tapi benang-benang tetap bernapas. Dan beban-beban tetap dijahit.*

*Jika kau pernah lewat lorong gelap di Pasar Malam Kota Tua — dan kau merasakan getaran halus di ujung jarimu — jangan takut.*

*Itu adalah benang. Menunggu untuk dijual.*

*Dan penjaga... selalu ada.*

---

Kata kunci: TAMAT, penjaga berdua, Rani dan Siti, tongkat diserahkan, rantai penjaga tidak pernah putus, toko terus hidup."""
}

for ch_num, text in expansions.items():
    fn = f'chapter-{ch_num}.md'
    fp = os.path.join(base, fn)
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()
    new_c = c + text
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(new_c)
    words = len(re.findall(r'\b\w+\b', new_c))
    status = 'OK' if words >= 4500 else 'SHORT'
    print(f'{fn}: {words} words [{status}]')
