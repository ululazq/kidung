import re

path = r'C:\Users\MyBook Hype AMD\.openclaw\workspace\kidung\novels\the-thread-shop\chapter-1.md'

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

marker = 'Rani menoleh. *Bagaimana kau tahu?*'
idx = c.rfind(marker)

appendix = """

Siti menutup mata. *Aku pernah merasakannya. Saat aku pertama kali masuk ke lorong ini — sebelum kau datang. Aku merasakan sesuatu. Seperti ada yang menarik tanganku ke sini. Ke toko ini.*

*Kenapa?*

*Karena benang kuning keemasanku — benang yang sudah kubawa sepuluh tahun — dia bergetar saat aku lewat lorong ini. Dia tahu kau datang. Dia sudah menunggu.*

Rani diam. Menatap benang kuning keemasan di saku Siti. Benang itu mengkilau lembut. Hangat.

*Jadi kau bukan hanya teman*, kata Rani. *Kau adalah... bagian dari toko ini.*

Siti membuka mata. *Aku adalah bagian dari toko ini sejak hari pertama. Sejak kau menyentuh benang kuning keemasanku dan bilang — benang itu milikmu.*

*Tapi kau tidak membelinya*, kata Rani.

*Bukan*, jawab Siti. *Benang itu sudah di sini. Sudah ada di saku ku sejak sepuluh tahun lalu. Aku tidak tahu kenapa. Tapi setiap hari — setiap hari — aku mengelusnya. Merasa hangat. Merasa... dekat dengan sesuatu yang tidak bisa kutemui.*

*Dekat dengan siapa?*

*Dekat dengan ibuku*, bisik Siti. Suaranya pecah. *Ibu ku sudah meninggal lima tahun lalu. Tapi setiap malam — saat aku mengelus benang ini — aku merasa dia ada di sebelahku. Merajut sesuatu untukku. Menjagaku.*

Rani mendekat. Ambil tangan Siti. Benang kuning keemasan di telapak tangan Siti berkilau hangat.

*Dentang.*

Getaran yang sama seperti di dalam toko. Tapi lebih lembut. Seperti pelukan.

*Benang ini sudah cukup kuat untuk menampung beban ibumu*, kata Rani. *Tapi dia sudah penuh. Sepuluh tahun. Dia tidak bisa menampung lagi.*

*Apa yang harus kulakukan?*

*Kita harus menjahitnya. Menggabungkan beban ibumu dengan beban yang sudah ada di toko ini. Agar dia tidak mengambang. Agar dia punya tempat.*

Siti menarik napas dalam. *Baik.*

---

Tiga hari kemudian.

Rani sudah bangun pagi. Minum kopi. Membaca buku catatan. Dan di sampingnya — Siti. Duduk di bangku kayu, benang kuning keemasannya di telapak tangan.

*Jadi begitu rasanya*, kata Siti. *Membawa benang yang sudah dulu. Mengelusnya setiap hari. Merasa ibu dekat.*

*Bukan ibu yang dekat*, katanya Rani. *Benang yang menyimpan keinginan. Harapan. Rasa rindu.*

*Tapi aku merasa dia dekat.*

*Karena kau pernah mencintainya. Benang itu menyimpan cinta. Cinta tidak bisa hilang.*

Siti menutup mata. *Aku ingin membeli benang lain. Untuk suamiku. Yang pergi tiga tahun lalu.*

Rani menoleh. *Suamimu? Benang apa yang kau inginkan?*

*Benang Hijau Rumput. Untuk kesehatan. Untuk kekuatan. Untuk... supaya dia kembali.*

*Benang Hijau Rumput*, kata Rani, menelusuri rak. *Benang yang kuat. Tapi mahal.*

*Mahal apa?*

*Kau harus memberikan sesuatu yang setia. Sesuatu yang sudah lama kau pegang. Baru bisa membeli benang yang kuat.*

Siti mendiamkan tangannya. Di telapak — benang kuning keemasan yang sudah ia bawa pulang tadi malam.

*Ya*, katanya. *Aku tahu.*

---

Rani menutup buku catatan. Di halaman namanya — *2 Agustus 2026 — Hitam Malam (Rani, 31 th). Diwarisi. Beban: kehilangan pekerjaan, kepercayaan diri, arah hidup. Harga: satu kunci besi dan rasa takut.*

Dan di bawahnya — tulisan baru. *3 Agustus 2026 — Kuning Keemasan (Siti, 42 th). Diterima. Beban: rindu ibu, suami yang pergi. Harga: sepuluh tahun mengelus benang di celana dalam.*

Rani menutup buku. Taruh di meja kerja. Di sampingnya — benang Hitam Malam. Di ujung jari manisnya — benang hitam tipis.

*Besok*, katanya ke kosang. *Jam sembilan. Kita belajar menjahit.*

Di luar, pasar malam sudah mulai ramai. Pedagang bakso. Penjual martabak. Penyanyi dangdut. Semuanya mencari sesuatu — makanan, hiburan, atau mungkin... benang.

---

Rani naik motor. Siti duduk di sebelahnya. Di tasnya — kue lapis. Di saku jaketnya — benang kuning keemasan.

Mereka berhenti di lampu merah. Di sebelah kanan — toko benang. Pintunya tertutup. Tapi Rani bisa merasakannya. Ribuan benang bernapas di dalam. Menunggu.

*Besok malam*, kata Rani. *Kita mulai belajar menjahit.*

Siti mengangguk. *Aku datang jam sembilan. Aku bawa kue lagi.*

Rani tersenyum. Pertama kalinya dalam tiga minggu.

---

Di dalam kontrakannya, Rani membuka buku catatan. Halaman baru. Pulpen di tangan.

*4 Agustus 2026 — Kuning Keemasan (Siti, 42 th). Diterima. Beban: rindu ibu, suami yang pergi. Harga: sepuluh tahun mengelus benang di celana dalam.*

Tulis selesai. Rani menutup buku. Melihat ke jendela. Pasar malam di bawahnya masih hidup. Warung makan menyala. Penjual bakso menunggu pelanggan.

Di dalam dadanya — benang Hitam Malam. Di ujung jari manisnya — benang hitam tipis. Di saku jaketnya — benang kuning keemasan milik Siti.

Tiga benang. Tiga beban. Tiga orang yang terhubung oleh satu toko tua di lorong pasar malam yang tidak pernah masuk peta.

Rani menarik napas. Pertama kalinya dalam tiga minggu — dia merasa siap untuk esok malam.

Jam sembilan. Pak Tua menunggu.

Dan benang-benang itu — semua benang itu — menunggu untuk dijual.
"""

new_c = c[:idx+len(marker)] + appendix
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_c)

words = len(re.findall(r'\b\w+\b', new_c))
print(f'ch1: {words} words')
