import re

path = r'C:\Users\MyBook Hype AMD\.openclaw\workspace\kidung\novels\the-thread-shop\chapter-3.md'

with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

appendix = """

---

Jam dua belas malam. Toko sudah tutup. Tapi Rani tidak pulang.

Dia duduk di meja kerja. Buku catatan terbuka. Pulpen di tangan. Dan di hadapanku — rak-racks benang. Ribuan gulungan. Merah. Biru. Hijau. Kuning. Ungu. Hitam. Putih.

Mereka bernapas. Semua. Setiap gulungan. Setiap benang.

Dan di lorong belakang — akar-akar bercahaya merah perlahan padam. Menunggu.

Rani menatap benang Hitam Malam di jarinya. Kilauannya sedikit lebih terang dari yang lain.

Besok malam. Jam sembilan. Pak Tua mengajarku lebih banyak.

Dan benang-benang itu — semua benang itu — menunggu untuk dijual.

---

Kata kunci: Pak Tua, akar benang, tanah, beban, penjaga pertama, Abu Kelabu, Budi, Siti, kontrakan, pasar malam, kehijauan."""

new_c = c + appendix
with open(path, 'w', encoding='utf-8') as f:
    f.write(new_c)

words = len(re.findall(r'\b\w+\b', new_c))
print(f'ch3: {words} words')
"""