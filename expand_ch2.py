import re

path = r'C:\Users\MyBook Hype AMD\.openclaw\workspace\kidung\novels\the-thread-shop\chapter-2.md'

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

appendix = """

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

\"Kau terlihat lebih baik,\" kata Siti. \"Mata kau tidak bengkak lagi.\"

\"Benang Merah hilang semalam,\" kata Rani.

Siti mengangguk. \"Aku tahu. Aku dengar dari lorong belakang. Aku tidak masuk karena... aku tidak ingin kau kewalahan.\"

\"Terima kasih.\"

\"Penjaga toko tidak boleh kewalahan,\" kata Siti. \"Tapi penjaga toko juga tidak boleh sendirian.\"

Rani tersenyum. Untuk pertama kalinya dalam seminggu — senyum yang tulus. Senyum yang tidak dipaksakan. Senyum yang tumbuh dari tempat yang dalam.

---

Jam sembilan malam. Pak Tua datang.

\"Benang Merah sudah kembali,\" katanya. \"Beban sudah stabil.\"

\"Terima kasih.\"

\"Selanjutnya — kau harus belajar menjahit. Besok malam. Jam sembilan. Aku ajarkan cara menjahit benang yang hilang.\"

\"Benang yang hilang?\"

\"Benang yang berpindah ke tempat yang salah. Benang yang mengambang. Benang yang... menjadi akar.\" Pak Tua berdiri. \"Dan Rani — kau harus tahu satu hal.\"

\"Apa?\"

\"Penjaga yang tidak bisa menjahit... akan menjadi akar itu sendiri.\"

Pak Tua pergi. Pintu tertutup. *Krek.*

Rani duduk di meja kerja. Menatap buku catatan. Menatap benang Hitam Malam di jarinya.

Besok malam. Jam sembilan. Belajar menjahit.

Dan di lorong belakang — akar-akar bercahaya merah perlahan padam. Menunggu.

---

Kata kunci: Benang Merah Budi, hilang dan ditemukan, akar merah, beban mengambang, Pak Tua ajarkan menjahit, Siti jaga toko."""

new_c = c + appendix
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_c)

words = len(re.findall(r'\b\w+\b', new_c))
print(f'ch2: {words} words')
