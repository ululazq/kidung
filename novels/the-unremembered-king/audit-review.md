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
| E-1690cf | "Nak" (13×, bab 251-280) | Vokatif kanon — lihat pola #1. |
| E-1b9bc5 | "Tanah Tinggi" (11×) | Lokasi kanon Vel-Morra — pola #5. |
| E-094914 | "Maka" (4×) | Kata hubung umum — pola #7. |
| E-d7bf19 | "Hal-hal" (2×) | Kata umum — pola #7. |
| E-d4541a | "Tanggung" (2×, bab 284) | Kata umum — pola #7. |
| E-a96d95 | entitas | "Akademi Arsip Tinggi" (3×, bab 254, 256) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-c14be2 | entitas | "Kak Ashvarok" (3×, bab 264, 267, 268) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-2c36bf | entitas | "Kak Raja" (3×, bab 251, 256) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-4ce3b5 | entitas | "Nak Renn" (3×, bab 255, 256, 257) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-6f6307 | entitas | "Dicoret" (2×, bab 268, 275) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-5ec01d | entitas | "Kak Uthar" (2×, bab 253) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-3a9c78 | entitas | "Nak-nak" (2×, bab 251, 260) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Pola berulang sudah ditinjau permanen di audit-review.md (vokatif/gelar+nama/institusi kanon) |
| E-3754d3 | kandidat lain | Pola sama dengan daftar atas; tidak ada entitas baru. |

*Terakhir ditinjau: bab 284.*
