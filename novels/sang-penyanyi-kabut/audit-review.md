# Audit Review: sang-penyanyi-kabut

Temuan audit drift (`npm run novel:audit`) yang sudah ditinjau penulis. Baris di
sini mengizinkan commit meski audit masih menemukan drift — gunakan untuk
keputusan sadar ("twist sengaja", "akan diperbaiki arc berikutnya"). Hapus
barisnya setelah temuan benar-benar diperbaiki (catatan basi = peringatan).

| ID | Kategori | Temuan | Keputusan |
|---|---|---|---|
| E-2c943c | entitas | "Aula Gema Solvane" (2×, bab 16, 33) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | sebutan lengkap lokasi kanon 'Aula Gema' (di Solvane) — bukan entitas baru |
| E-33eb0e | entitas | "Telinga Dariannya" (2×, bab 30, 35) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | bentuk posesif item kanon 'Telinga Darian' + akhiran -nya — bukan entitas baru |
| E-8b0648 | entitas | "Kabut Veyl" (9×, bab 2, 3, 6, 7, 8, 9) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Kabut Veyl = entitas lingkungan (Kabut di perairan Veyl-Haven), sudah tercatat di bible kanon; bukan tokoh — tidak perlu masuk tabel Tokoh world-state |
| E-d21b43 | entitas | "Kuota Kelima" (5×, bab 106, 107, 109, 110) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | Kuota Kelima = ekspedisi pemulangan ke-5 (bab 106-110, 40 pendengar, 35 org pulang, total 251) — entitas pemulangan massal yg dicatat di pemulangan-massal.md; Kuota 1-4 sudah tercatat sebagai ekspedisi kuota di world-state |
| E-b2ce09 | entitas | "Gunung Vaelmor" (2×, bab 1, 160) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | Lokasi kanon (bible: Gunung Vaelmor = gunung tempat Solvane berdiri) — muncul di bab 160 sbg referensi geografis, bukan entitas baru; aman |
| E-dc70a8 | entitas | "Ketua Dewan" (3×, bab 191, 193, 195) muncul berulang tapi tidak ada di world-state maupun bible — entitas baru yang belum di-track? | frasa jabatan historis 'kursi Ketua Dewan' yang diduduki perempuan tua faksi (bab 191/193/195) — merujuk kursi dewan lama, bukan entitas karakter baru |
| E-a7aae6 | entitas | "Ia" (2×, bab 8) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | kata ganti umum bahasa Indonesia, bukan entitas kanon |
