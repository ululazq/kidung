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
5. **Institusi+lokasi kanon**: "Quota Office Caldrest", "Kantor Penghubung (Utara)", "the Regional Council Anthema", "Assayer(s') Guild", "Veyl Akademie", "the High Archive Academy Spire", "Tanah Tinggi (Vel-Morra)", "Hollowed Caldrest" — semua tercatat di bible.
6. **Kanon + akhiran kepemilikan**: "Remainder-nya", "Hourglass-nya", "Telinga Dariannya".
7. **False-positive parser kata umum**: "Maka", "Hal-hal", "Tanggung", "Dicoret" — bukan entitas.
8. **"… dan N kandidat lain"** — sisa kandidat = pola sama dengan daftar atas.

## Keputusan sadar yang masih aktif

| ID | Temuan | Keputusan |
|---|---|---|
| E-1b9bc5 | "Tanah Tinggi" (11×) | Lokasi kanon Vel-Morra — pola #5. |
| E-094914 | "Maka" (4×) | Kata hubung umum — pola #7. |
| E-d7bf19 | "Hal-hal" (2×) | Kata umum — pola #7. |
| E-a96d95 | entitas | "the High Archive Academy" (3×, bab 254, 256) | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
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
| E-67eba6 | "the Regional Council Anthema" (3×, bab 111-159) | Institusi kanon — pola #5. |
| E-269140 | "Hollowed Caldrest" (3×, bab 174-191) | Institusi kanon — pola #5. |
| E-ddb367 | "Hourglass-nya" (3×, bab 220-234) | Kanon + kepemilikan — pola #6. |
| E-bb0a05 | "Kak Raja" (3×, bab 244-246) | Vokatif kanon — pola #2. |
| E-5705d7 | "Overseer Tharrow" (3×, bab 54-59) | Gelar+nama kanon — pola #4. |
| E-f07054 | "… dan 23 kandidat lain" | Sisa kandidat = pola sama dgn daftar atas (vokatif/gelar/institusi kanon/kata umum). |
| E-67d68e | "Pell" (4×, bab 292) | Tokoh minor terpisah dari Pellia; murid laki-laki kelas Tovik, ditegaskan eksplisit di bab 292 dan kini dicatat di bible. |
| E-d4541a | entitas | "Tanggung" (2×, bab 284) | kata umum (pola #7); bukan entitas |
| E-a31c2f | entitas | "Survivor's" (6×, bab 327, 328, 330, 331) | Survivor's = bentuk possessive dari the Survivor/the Survivors (entitas arc the Misclaim, sudah di bible.md & world-state.md). Varian token, bukan entitas baru |
| E-34087d | entitas | "Unclaimed Knot" (22×, bab 327, 328, 329, 330, 331, 332, 336, 340) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Label kerja simpul #6; kanon sudah dinormalisasi sebagai the Unclaimed/the Unclaimed Stone di bible dan world-state. |
| E-0c34d8 | entitas | "Nak" (15×, bab 251, 257, 265, 266, 273, 275, 280, 288, 289, 290, 292, 296) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | False positive parser: Nak adalah vokatif, bukan entitas. |
| E-3b7b44 | entitas | "Escape Survivor" (14×, bab 327, 328, 331, 332) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Deskripsi awal Survivor #2; kanon sudah tercatat sebagai the Escape. |
| E-52f74e | entitas | "Ground Stone" (13×, bab 339, 340, 341) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Label benda awal untuk simpul #7; kanon sudah tercatat sebagai the Ground. |
| E-39fadc | entitas | "Tanah Tinggi" (12×, bab 251, 252, 257, 268, 269, 279) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Nama lokasi kanon Vel-Morra/dataran tinggi, bukan entitas baru. |
| E-fc3cbd | entitas | "Wane" (10×, bab 342, 343, 345, 346, 348, 349, 350, 351) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Bentuk singular dari faksi kanon the Wanes; anggota terkait sudah tercatat di bible/world-state. |
| E-c0e53a | entitas | "Stillness Knot" (9×, bab 333, 334, 335, 336) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Label kerja simpul #4; kanon sudah dinormalisasi sebagai the Stillness. |
| E-d19981 | entitas | "Gate Survivor" (8×, bab 331, 332, 333, 336) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Deskripsi awal pemegang simpul #1; kanon sudah tercatat sebagai the Gate/the Northern Tower Nurse. |
| E-732f41 | entitas | "Silence Knot" (7×, bab 329, 330, 332) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Label kerja simpul #5; kanon sudah dinormalisasi sebagai the Silence. |
| E-c45104 | entitas | "High Archive Academy" (5×, bab 254, 255, 256) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Fragmen parser dari nama institusi kanon the High Archive Academy Spire. |
| E-50d10c | entitas | "Stillness Candidate" (5×, bab 332, 333) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Status sementara kandidat simpul #4; kanon final sudah tercatat sebagai the Stillness. |
| E-5352b5 | entitas | "Gate Family" (4×, bab 331) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Deskripsi keluarga the Gate yang sudah tercatat dalam kanon the Survivors. |
| E-6a9e9a | entitas | "Namun" (4×, bab 264, 266, 329, 331) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive parser: Namun adalah kata hubung, bukan entitas. |
| E-b6f2d0 | entitas | "Pell" (4×, bab 292) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Pell adalah tokoh minor terpisah dari Pellia; ditegaskan di bab 292 dan sudah dicatat di bible. |
| E-6deb4d | entitas | … dan 9 kandidat lain — periksa dulu yang di atas sebelum melanjutkan | Sembilan kandidat ditinjau: tiga istilah kanon, lima false positive/parser termasuk varian Kovan yang diperbaiki, dan gelar Penghitung Musim sudah dicatat di bible. |
| E-d8b374 | entitas | "Nak" (20×, bab 251, 255, 257, 258, 259, 265, 266, 273, 275, 280, 288, 289, 290, 292, 296) | Nak = vokatif peran Wida (bible kanon, baris 142), panggilan untuk semua anak barak, bukan entitas baru; 20x konsisten bab 251-296 |

*Terakhir ditinjau: bab 418.*
