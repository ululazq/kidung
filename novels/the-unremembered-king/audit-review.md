# Audit Review: the-unremembered-king

Temuan audit drift (`npm run novel:audit`) yang sudah ditinjau penulis. Baris di
sini mengizinkan commit meski audit masih menemukan drift — gunakan untuk
keputusan sadar ("twist sengaja", "akan diperbaiki arc berikutnya"). Hapus
barisnya setelah temuan benar-benar diperbaiki (catatan basi = peringatan).

| ID | Kategori | Temuan | Keputusan |
|---|---|---|---|
| E-5b8d5c | entitas | "Foreman Brannoc" (4×, bab 37, 54, 57) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: Brannoc ter-track; 'Foreman Brannoc' = gelar+nama. |
| E-5705d7 | entitas | "Overseer Tharrow" (3×, bab 54, 57, 59) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: Kel Tharrow ter-track sebagai Overseer/Quota Office; 'Overseer Tharrow' = gelar+nama. |
| E-6b3d46 | entitas | "Shift Guard Kovan" (11×, bab 32, 33, 46, 49, 60, 61) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive berulang: Kovan ter-track di bible/world-state; 'Shift Guard Kovan' = gelar+nama, bukan entitas baru. |
| E-a434ac | entitas | "Quota Office Caldrest" (6×, bab 32, 78, 92, 111, 129, 141) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: 'Quota Office Caldrest' = institusi kanon + lokasi, sudah ter-track. |
| E-6b3d46 | entitas | "Shift Guard Kovan" (11×, bab 32, 33, 46, 49, 60, 61) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: Kovan ter-track; gelar+nama. |
| E-5b8d5c | entitas | "Foreman Brannoc" (4×, bab 37, 54, 57) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: Brannoc ter-track; gelar+nama. |
| E-67eba6 | entitas | "Dewan Regional Anthema" (3×, bab 111, 141, 159) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Dewan Regional Anthema Spire = badan yang sudah tercatat di world-state sebagai Dewan Regional/Spire; variasi penulisan |
| E-a434ac | entitas | "Quota Office Caldrest" (6×, bab 32, 78, 92, 111, 129, 141) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Quota Office Caldrest = Quota Office (sudah kanon) + nama kota; variasi |
| E-5b8d5c | entitas | "Foreman Brannoc" (4×, bab 37, 54, 57) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Foreman Brannoc = gelar jabatan + nama, sudah kanon di bible |
| E-5705d7 | entitas | "Overseer Tharrow" (3×, bab 54, 57, 59) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Tharrow dengan gelar lama sebelum dibekukan; tokoh sudah kanon |
| E-6b3d46 | entitas | "Shift Guard Kovan" (11×, bab 32, 33, 46, 49, 60, 61) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Shift Guard Kovan = jabatan+nama Kovan; sudah kanon |
| E-1402ad | entitas | "Remainder-nya" (5×, bab 45, 120, 175, 176, 179) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | the Remainder kanon + akhiran kepemilikan; sudah ditinjau sebelumnya, muncul ulang di bab baru |
| E-b0b055 | entitas | "Veyl Akademie" (11×, bab 194, 197, 199, 201, 205, 206, 208, 211, 218, 219, 221) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | False positive kategori: the Veyl Akademie adalah institusi/lokasi kanon (bukan tokoh) — sekolah murid Caldrest; sudah ter-track di bible; entri world-state arc 3 mencatat perannya (name train harian, pasal 12 protokol musim). |
| E-1c8a81 | entitas | "Assayer Guild" (5×, bab 105, 106, 107, 167, 186) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | False positive berulang: Assayers' Guild = faksi kanon di bible (bukan tokoh); "Assayer Guild" = variasi ejaan dialog. |
| E-27fc73 | entitas | "Dewan Choir" (3×, bab 187, 203, 209) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: variasi penulisan institusi kanon Dewan Regional / Choir Spire yang sudah ter-track; gabungan dua nama kanon. |
| E-269140 | entitas | "Hollowed Caldrest" (3×, bab 174, 191) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: frasa deskriptif ("Caldrest yang hollowed") untuk masa lalu kota dalam narasi, bukan entitas/nama. |

| E-004398 | entitas | "Kantor Penghubung Utara" (7×, bab 183, 200, 201, 203, 227, 229) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive berulang: cabang utara Kantor Penghubung kanon (Ossian); institusi+lokasi, bukan tokoh; muncul ulang di bab persiapan/pemulangan timur. |
| E-ddb367 | entitas | "Hourglass-nya" (3×, bab 220, 223, 234) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: "Hourglass-nya" = kolom Hourglass kanon + akhiran kepemilikan dialog; bukan entitas. |
| E-b15aa4 | entitas | "Kantor Penghubung" (16×, bab 193–237) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive berulang: Kantor Penghubung = institusi kanon (Ossian); penyebutan singkat. |
| E-beef6d | entitas | "Nak" (29×, bab 44–243) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | False positive berulang: "Nak" = vokatif Indonesia, bukan tokoh; muncul ulang di bab 240-245. |
| E-f07054 | entitas | … dan 23 kandidat lain — periksa dulu yang di atas sebelum melanjutkan | 23 kandidat sisa = pola sama dengan temuan yang sudah ditinjau (vokatif Nak/Kak, gelar+nama, kepemilikan -nya/-mu); tidak ada entitas baru. |
| E-87200a | entitas | "Gella" (8×, bab 241–243) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Sudah ditambahkan ke bible.md tabel Tokoh pendukung (bab 245 sinkronisasi); world-state mengikuti di entri 240-245. |
