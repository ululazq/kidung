# Laporan Kontinuitas — The Astral Sovereign

Audit kontinuitas menyeluruh bab 1–24 (metode continuity-check) setelah rekonstruksi dari 70 bab rusak. Tanggal audit: 2026-08-09.

---

## Ringkasan

**Pindai mekanis bersih.** 24/24 bab dalam target 1.500–2.500 kata (1.502–1.767), frontmatter valid (4 baris, `title` + `chapter`), tanpa H1 di body, F1 (kalimat duplikat dalam bab) = 0, F1b (paragraf duplikat lintas bab) = 0, dialog hadir di semua bab (13–44 baris kutip). Build Astro sukses: **509 halaman**, semua 24 bab + halaman novel terdaftar di sitemap.

**Temuan yang dituntaskan:**

| # | Temuan | Perbaikan |
|---|---|---|
| 1 | 70 bab stub (364–398 kata, H1 dobel, judul Inggris, boilerplate 2 paragraf di 69 bab) | Digantikan 24 bab baru hasil konsolidasi 70 beat; semua judul Indonesia, tanpa boilerplate |
| 2 | F1 dalam bab: kalimat kembar di ch2, 4, 6, 8, 19 | Divariasikan (tag dialog, "Suara itu nyaris tertawa") |
| 3 | F1b lintas bab: `"Apa?"` ×4, "Garudaya tidak menjawab. Ia menyerang." ×2, mantra `*Bara. Bara Pratama...*` ×2, ending ch18 yang mengulang ending ch17 | Divariasikan; ending ch18 ditulis ulang fokus pengepungan |
| 4 | Timeline purnama: ch13/14 memperlihatkan purnama naik padahal ch15 "malam sebelum purnama" | Ditetapkan: bab 15–20 = **satu malam purnama** (H-0); ch13/14 = H-1 (bulan nyaris bulat); ch16 Respati "malam ini"; ch17 purnama naik |
| 5 | Masa tugas: Wardaya & Sancaka "seangkatan" tapi Wardaya 30 tahun vs Sancaka 50 tahun | Diseragamkan ke 50 tahun (ch2, 6, 10, 11); perpecahan Respati tetap 30 tahun (dicatat di bible: Respati ~20 tahun lebih muda) |
| 6 | "Empu Respati" (ch22) | → "Penasihat Respati" (Respati anggota Dewan, bukan Empu) |
| 7 | Istilah lama naskah 70-bab (pencak silat, Void Blade, peretas) | Nol sisa di bab; "Godframe", "peretas" (Maya), "Sanjaya Syndicate" = kanon baru yang dicatat di bible |
| 8 | Lore lama README (peretas silat, Void-Godframe, Inti Kidungverse, 70 bab) | README ditulis ulang ke kanon 24 bab; cover-prompt diselaraskan (keris emas) |

**Keputusan sadar (dicatat di bible §7):** dua nada cincin+Wali; cincin hancur → sirkuit kota; erosi berhenti di bab 15 (teknik memilih); Bara bisa kembali dari gerbang (transendensi ≠ kematian, harga: terikat kota, ingatan hilang tak kembali); Ki Sancaka wafat tenang di bab 24; bookend "Akhirnya, kau datang" (bab 1 ↔ 24) dan "kota yang tidak pernah tahu" (bab 1 ↔ 23–24) sengaja.

## Bookend bab 1 ↔ 24

- **Bab 1:** kurir yang tidak pernah bertanya menerima kotak; cincin berbisik *"Akhirnya. Kau datang."*; lari ke utara.
- **Bab 24:** Penjaga yang memilih jawabannya; bisikan leluhur berbisik *"Akhirnya. Kau datang."* kepada kurir baru di bawah; Bara tersenyum.
- **Motif "kota yang tidak pernah tahu":** bab 1 (kota yang tidak memberi siapa pun apa-apa) → bab 23–24 (kota yang tidak pernah tahu nama penjaganya, tetapi merasakan iramanya).

## Status

- Kanon: `bible.md` (nama, timeline, chekhov, siapa-tahu-apa, mekanik, peta bab, keputusan sadar).
- Struktur: `outline.md` (24 bab, 3 babak, catatan revisi).
- Naskah: 24 bab, `status: "Complete"`, target 24 bab di README.
- **Belum di-commit** — menunggu konfirmasi.
