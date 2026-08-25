# Audit Review: the-unremembered-king

Temuan audit drift (`npm run novel:audit`) yang sudah ditinjau penulis. Baris di
sini mengizinkan commit meski audit masih menemukan drift — gunakan untuk
keputusan sadar ("twist sengaja", "akan diperbaiki arc berikutnya"). Hapus
barisnya setelah temuan benar-benar diperbaiki (catatan basi = peringatan).

| ID | Kategori | Temuan | Keputusan |
|---|---|---|---|
| E-5b8d5c | entitas | "Foreman Brannoc" (4×, bab 37, 54, 57) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: Brannoc ter-track; 'Foreman Brannoc' = gelar+nama. |
| E-6b3d46 | entitas | "Shift Guard Kovan" (11×, bab 32, 33, 46, 49, 60, 61) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive berulang: Kovan ter-track di bible/world-state; 'Shift Guard Kovan' = gelar+nama, bukan entitas baru. |
| E-a434ac | entitas | "Quota Office Caldrest" (6×, bab 32, 78, 92, 111, 129, 141) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: 'Quota Office Caldrest' = institusi kanon + lokasi, sudah ter-track. |
| E-6b3d46 | entitas | "Shift Guard Kovan" (11×, bab 32, 33, 46, 49, 60, 61) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: Kovan ter-track; gelar+nama. |
| E-5b8d5c | entitas | "Foreman Brannoc" (4×, bab 37, 54, 57) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive: Brannoc ter-track; gelar+nama. |
| E-a434ac | entitas | "Quota Office Caldrest" (6×, bab 32, 78, 92, 111, 129, 141) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Quota Office Caldrest = Quota Office (sudah kanon) + nama kota; variasi |
| E-5b8d5c | entitas | "Foreman Brannoc" (4×, bab 37, 54, 57) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Foreman Brannoc = gelar jabatan + nama, sudah kanon di bible |
| E-6b3d46 | entitas | "Shift Guard Kovan" (11×, bab 32, 33, 46, 49, 60, 61) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Shift Guard Kovan = jabatan+nama Kovan; sudah kanon |
| E-1402ad | entitas | "Remainder-nya" (5×, bab 45, 120, 175, 176, 179) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | the Remainder kanon + akhiran kepemilikan; sudah ditinjau sebelumnya, muncul ulang di bab baru |
| E-b0b055 | entitas | "Veyl Akademie" (11×, bab 194, 197, 199, 201, 205, 206, 208, 211, 218, 219, 221) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | False positive kategori: the Veyl Akademie adalah institusi/lokasi kanon (bukan tokoh) — sekolah murid Caldrest; sudah ter-track di bible; entri world-state arc 3 mencatat perannya (name train harian, pasal 12 protokol musim). |
| E-1c8a81 | entitas | "Assayer Guild" (5×, bab 105, 106, 107, 167, 186) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | False positive berulang: Assayers' Guild = faksi kanon di bible (bukan tokoh); "Assayer Guild" = variasi ejaan dialog. |

| E-004398 | entitas | "Kantor Penghubung Utara" (7×, bab 183, 200, 201, 203, 227, 229) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive berulang: cabang utara Kantor Penghubung kanon (Ossian); institusi+lokasi, bukan tokoh; muncul ulang di bab persiapan/pemulangan timur. |
| E-fd0576 | entitas | "Nak" (30×, bab 44–246) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | False positive berulang: "Nak" = vokatif Indonesia, bukan tokoh; muncul ulang di bab baru. |
| E-658001 | entitas | "Kantor Penghubung" (18×, bab 193–249) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | False positive berulang: Kantor Penghubung = institusi kanon (Ossian). |
| E-c23a96 | entitas | "Gella" (9×, bab 241–247) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Sudah masuk bible tabel Tokoh pendukung; world-state mengikuti di entri bab. |
| E-dc940b | entitas | "Vel-morra" (8×, bab 246, 250) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Vel-Morra = Tanah Tinggi di luar Karvess (wilayah asal Vessia Morra); tercatat di world-state entri bab 246. |
| E-2921b5 | entitas | "Tami-tomi" (7×, bab 247, 250) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Tami-Tomi = kembar tujuh tahun pengasuh nat "Teman"; karakter minor sah arc nat asuhan. |
| E-5121e8 | entitas | "Aru" (6×, bab 246–250) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Selat Aru = kerajaan pantai luar Karvess (asal murid angkatan 3); tercatat world-state entri 246. |
| E-dbf8e7 | entitas | "Ashvarok-renn" (5×, bab 244–250) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Ashvarok-Renn = penanda dua penghuni satu tubuh (kanon bab 243-244); bukan entitas terpisah. |
| E-138c29 | entitas | "Tomi" (5×, bab 247, 250) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Tomi = satu dari kembar Tami-Tomi (sudah ditinjau di E-2921b5); karakter minor sah. |
| E-bc7d95 | entitas | … dan 34 kandidat lain — periksa dulu yang di atas sebelum melanjutkan | 34 kandidat sisa = pola sama (vokatif Nak/Kak, nama kembar Tami/Tomi/Teman, gelar+nama, kepemilikan -nya); tidak ada entitas baru. |
| E-fcc471 | entitas | "Vel-morra" (9×, bab 252–255) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Vel-Morra = Tanah Tinggi luar Karvess, asal Vessia; tercatat world-state entri 246/252. |
| E-8f54da | entitas | "Ashvarok-renn" (7×, bab 251–255) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Ashvarok-Renn = penanda dua penghuni satu tubuh (kanon 243-244); bukan entitas terpisah. |
| E-0107f4 | entitas | "Morra" (5×, bab 252) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Morra = nama keluarga Vessia (bagian dari Vel-Morra); sudah ter-cover. |
| E-7d889f | entitas | "Gorvel" (4×, bab 252, 255) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Gorvel = pengawal tua Vel-Morra, murid tertua angkatan 3; karakter minor sah arc 252. |
| E-2bf8a5 | entitas | "Kaveth" (4×, bab 251) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Federasi lembah Kaveth = wilayah luar Karvess (asal murid angkatan 3); tercatat world-state 251. |
| E-78afe6 | entitas | "Tanah Tinggi" (4×, bab 251, 252) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Tanah Tinggi = bagian nama wilayah Vel-Morra; sudah ter-cover entri 252. |
| E-383fcd | entitas | "Nak" (3×, bab 251, 255) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | False positive berulang: "Nak" = vokatif Indonesia, bukan tokoh. |
| E-1367ac | entitas | "Tomi" (3×, bab 253, 254) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Tomi = salah satu kembar Tami-Tomi (sudah ditinjau E-2921b5); karakter minor sah. |
| E-88e74d | entitas | "Akademi Arsip Tinggi" (2×, bab 254) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Akademi Arsip Tinggi Spire = institusi kanon bab 254 (tempat Sela belajar); tercatat world-state. |
| E-e2a2f2 | entitas | "Caldrest-spire" (2×, bab 254) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Caldrest-Spire = jalur nat pos antar kota (kanon pasal Menyapa); bukan entitas terpisah. |
| E-5ec01d | entitas | "Kak Uthar" (2×, bab 253) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | "Kak Uthar" = sapaan Renn untuk Kael-Uthar (sudah di bible); bukan entitas baru. |
| E-2273be | entitas | "Renn-ashvarok" (2×, bab 251) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Renn-Ashvarok = penanda dua penghuni satu tubuh (sama dengan E-8f54da); bukan entitas terpisah. |
