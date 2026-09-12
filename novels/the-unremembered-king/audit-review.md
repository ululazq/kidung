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
| E-094914 | "Maka" (4×) | Kata hubung umum — pola #7. |
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
| E-beef6d | entitas | "Nak" (29×, bab 44, 52, 137, 138, 149, 181, 190, 202, 219, 220, 222, 226, 228, 229, 230, 238, 239, 241, 242, 243) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Nak adalah vokatif Indonesia untuk anak, bukan tokoh atau entitas. |
| E-91e2e9 | entitas | "Shift Guard Kovan" (8×, bab 46, 49, 60, 61) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Shift Guard Kovan adalah gelar jabatan ditambah tokoh kanon Kovan, bukan entitas baru. |
| E-885ca7 | entitas | "Assayer Guild" (6×, bab 18, 28, 105, 106, 107, 167) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Assayer Guild adalah varian penyebutan Assayers' Guild yang sudah kanon, bukan entitas baru. |
| E-e3328f | entitas | "Commission" (6×, bab 4, 13, 95, 128) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Commission adalah fragmen generik beberapa nama komisi berbeda, bukan satu entitas baru. |
| E-a9b046 | entitas | "Quota Office Caldrest" (6×, bab 78, 79, 92, 111, 129, 141) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Quota Office Caldrest adalah institusi kanon Quota Office ditambah lokasi Caldrest, bukan entitas baru. |
| E-7bb035 | entitas | "Paman" (5×, bab 182, 192) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Paman adalah sapaan kekerabatan untuk Barim, bukan tokoh baru. |
| E-5b8d5c | entitas | "Foreman Brannoc" (4×, bab 37, 54, 57) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Foreman Brannoc adalah gelar jabatan ditambah tokoh kanon Brannoc, bukan entitas baru. |
| E-a372e9 | entitas | "Guests" (4×, bab 172, 190) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Guests adalah kata umum dari judul protokol the Law for Guests, bukan entitas mandiri. |
| E-ebee55 | entitas | "Law" (4×, bab 172, 190) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Law adalah kata umum dari judul protokol the Law for Guests, bukan entitas mandiri. |
| E-a44f6f | entitas | "National Grand Assay" (4×, bab 95, 128) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | National Grand Assay adalah fragmen nama the National Grand Assay Commission, bukan entitas terpisah. |
| E-ffa3f5 | entitas | "Regional Council Anthema" (4×, bab 111, 141, 159, 248) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Regional Council Anthema adalah fragmen nama institusi kanon the Regional Council Anthema Spire, bukan entitas terpisah. |
| E-328be1 | entitas | "Remainder-nya" (4×, bab 120, 175, 176, 179) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Remainder-nya adalah the Remainder dengan akhiran posesif Indonesia, bukan entitas baru. |
| E-0cfb96 | entitas | "Assayer-nya" (3×, bab 22, 141, 169) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Assayer-nya adalah jabatan Assayer dengan akhiran posesif Indonesia, bukan entitas baru. |
| E-ddb367 | entitas | "Hourglass-nya" (3×, bab 220, 223, 234) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Hourglass-nya adalah Hourglass dengan akhiran posesif Indonesia, bukan entitas baru. |
| E-843ade | entitas | "Kak Raja" (3×, bab 244, 249) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Kak Raja adalah sapaan kekerabatan kepada raja, bukan tokoh baru. |
| E-c71fc0 | entitas | … dan 16 kandidat lain — periksa dulu yang di atas sebelum melanjutkan | Agregat 16 kandidat lanjutan sudah ditinjau satu per satu: sapaan, gelar, imbuhan posesif, istilah waktu, makanan, dan fragmen nama; tidak ada entitas kanon baru tersisa. |
| E-6deb4d | entitas | … dan 9 kandidat lain — periksa dulu yang di atas sebelum melanjutkan | Sembilan kandidat ditinjau: tiga istilah kanon, lima false positive/parser termasuk varian Kovan yang diperbaiki, dan gelar Penghitung Musim sudah dicatat di bible. |

*Terakhir ditinjau: bab 418.*
