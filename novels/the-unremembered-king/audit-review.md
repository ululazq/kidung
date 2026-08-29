# Audit Review: the-unremembered-king

Temuan audit drift (`npm run novel:audit`) yang sudah ditinjau penulis. Baris di
sini mengizinkan commit meski audit masih menemukan drift — gunakan untuk
keputusan sadar ("twist sengaja", "akan diperbaiki arc berikutnya"). Hapus
barisnya setelah temuan benar-benar diperbaiki (catatan basi = peringatan).

## Pola berulang yang SUDAH DITINJAU PERMANEN (jangan tambah baris duplikat lagi)

Pola-pola berikut adalah false positive parser yang muncul di hampir tiap bab
baru. Semua sudah ditinjau berkali-kali; cukup dirujuk ke daftar ini:

1. **"Nak" / "Nak Renn" / "Nak-nak"** — vokatif Indonesia, bukan tokoh (kanon aturan #9).
2. **"Kak Ashvarok" / "Kak Raja" / "Kak Uthar"** — sapaan vokatif + nama kanon.
3. **"Ashvarok-renn"/"Ashvarok-Renn"** — penanda dua penghuni satu tubuh (kanon bab 243-244), bukan entitas terpisah.
4. **Gelar+nama**: "Foreman Brannoc", "Shift Guard Kovan", "Overseer Tharrow" — tokoh kanon dengan jabatan.
5. **Institusi+lokasi kanon**: "Quota Office Caldrest", "Kantor Penghubung (Utara)", "Dewan Regional Anthema", "Assayer(s') Guild", "Veyl Akademie", "Akademi Arsip Tinggi Spire", "Tanah Tinggi (Vel-Morra)", "Hollowed Caldrest" — semua tercatat di bible.
6. **Kanon + akhiran kepemilikan**: "Remainder-nya", "Hourglass-nya", "Telinga Dariannya".
7. **False-positive parser kata umum**: "Maka", "Hal-hal", "Tanggung", "Dicoret" — bukan entitas.
8. **"… dan N kandidat lain"** — sisa kandidat = pola sama dengan daftar atas.

## Keputusan sadar yang masih aktif

| ID | Temuan | Keputusan |
|---|---|---|
| E-1b9bc5 | "Tanah Tinggi" (11×) | Lokasi kanon Vel-Morra — pola #5. |
| E-094914 | "Maka" (4×) | Kata hubung umum — pola #7. |
| E-d7bf19 | "Hal-hal" (2×) | Kata umum — pola #7. |
| E-a96d95 | entitas | "Akademi Arsip Tinggi" (3×, bab 254, 256) | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-c14be2 | entitas | "Kak Ashvarok" (3×, bab 264, 267, 268) | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-2c36bf | entitas | "Kak Raja" (3×, bab 251, 256) | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-4ce3b5 | entitas | "Nak Renn" (3×, bab 255, 256, 257) | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-6f6307 | entitas | "Dicoret" (2×, bab 268, 275) | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-5ec01d | entitas | "Kak Uthar" (2×, bab 253) | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-3a9c78 | entitas | "Nak-nak" (2×, bab 251, 260) | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-fd0576 | "Nak" (30×, bab 44-246) | Vokatif kanon — pola #1. |
| E-658001 | "Kantor Penghubung" (18×, bab 193-249) | Institusi kanon — pola #5. |
| E-6b3d46 | "Shift Guard Kovan" (11×, bab 32-61) | Gelar+nama kanon — pola #4. |
| E-b0b055 | "Veyl Akademie" (11×, bab 194-221) | Institusi kanon — pola #5. |
| E-004398 | "Kantor Penghubung Utara" (7×, bab 183-229) | Institusi kanon — pola #5. |
| E-a434ac | "Quota Office Caldrest" (6×, bab 32-141) | Institusi kanon — pola #5. |
| E-1c8a81 | "Assayer Guild" (5×, bab 105-186) | Institusi kanon — pola #5. |
| E-1402ad | "Remainder-nya" (5×, bab 45-179) | Kanon + kepemilikan — pola #6. |
| E-5b8d5c | "Foreman Brannoc" (4×, bab 37-57) | Gelar+nama kanon — pola #4. |
| E-27fc73 | "Dewan Choir" (3×, bab 187-209) | Institusi kanon — pola #5. |
| E-67eba6 | "Dewan Regional Anthema" (3×, bab 111-159) | Institusi kanon — pola #5. |
| E-269140 | "Hollowed Caldrest" (3×, bab 174-191) | Institusi kanon — pola #5. |
| E-ddb367 | "Hourglass-nya" (3×, bab 220-234) | Kanon + kepemilikan — pola #6. |
| E-bb0a05 | "Kak Raja" (3×, bab 244-246) | Vokatif kanon — pola #2. |
| E-5705d7 | "Overseer Tharrow" (3×, bab 54-59) | Gelar+nama kanon — pola #4. |
| E-f07054 | "… dan 23 kandidat lain" | Sisa kandidat = pola sama dgn daftar atas (vokatif/gelar/institusi kanon/kata umum). |
| E-67d68e | "Pell" (4×, bab 292) | Julukan pendek untuk Pellia/Pellia Muda — entitas kanon (bible baris 29 & 147, world-state baris 574-580). Pola #8 (nama kanon, varian panggilan) |
| E-eb7083 | entitas | "Survivor" (15×, bab 327, 328, 329, 330, 331) | the Survivors = entitas arc the Misclaim (padanan Inggris untuk penyintas 8-9 orang pemegang napas-kunci); sudah di bible.md & world-state.md |
| E-d4541a | entitas | "Tanggung" (2×, bab 284) | kata umum (pola #7); bukan entitas |
| E-d8b374 | entitas | "Nak" (20×, bab 251, 255, 257, 258, 259, 265, 266, 273, 275, 280, 288, 289, 290, 292, 296) | Nak = vokatif peran Wida (bible kanon, baris 142), panggilan untuk semua anak barak, bukan entitas baru; 20x konsisten bab 251-296 |

*Terakhir ditinjau: bab 305.*
