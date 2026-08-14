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
| E-a7aae6 | entitas | "Ia" (2×, bab 8) ada di bible (kanon) tapi tidak tercatat di world-state — tambahkan ke tabel Tokoh? | kata ganti umum bahasa Indonesia, bukan entitas kanon |
