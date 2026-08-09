# Novel Factory V4 Pro+

Skill penulisan novel panjang berbahasa Indonesia untuk repo ini. Setiap novel hidup di `novels/<slug>/` dan langsung dirender situs Astro, jadi bentuk file adalah kontrak.

Claude memuat `SKILL.md` otomatis; file lain dibaca saat dibutuhkan lewat tabel routing di dalamnya.

## Struktur

```
SKILL.md          selalu ter-load: aturan keras, kontrak output, routing
reference/        pengetahuan yang dibaca saat relevan
  output-contract.md    bentuk file & frontmatter yang dituntut situs
  prose-craft.md        anti-padding, dialog, sensorik, gaya Bahasa Indonesia
  story-architecture.md 3 babak, beat, pacing, subplot, foreshadowing
  character.md          Want/Need/Lie/Wound, suara, POV, konsistensi nama
  worldbuilding.md      sistem kekuatan, faksi, lokasi, timeline
  genre-packs.md        konvensi per genre
  kidung-canon.md       semesta bersama, register 3 novel selesai
  quality-gate.md       kondisi gagal keras + audit sebelum simpan
workflows/        prosedur langkah demi langkah
  discover-novel.md (interaktif, dari ide mentah) · new-novel.md · write-chapter.md
  continue-writing.md (termasuk mode paralel) · revise-chapter.md · continuity-check.md
templates/        kerangka file
  novel-readme.md · chapter.md · bible.md · outline.md · cover-prompt.md · discovery.md
```

## Cara pakai

Sebut saja apa yang mau dikerjakan — "bikin novel baru tentang X", "lanjutkan `the-rust-alchemist`", "perbaiki bab 3", "cek kontinuitas bab 10–20". Skill akan memilih workflow-nya sendiri.

Yang perlu diketahui:

- **Ide mentah? Mulai dari discovery, bukan scaffolding.** `workflows/discover-novel.md` menggali premis, tema, struktur, genre, dan suara lewat wawancara reflektif — bagian per bagian, dengan konfirmasi. Hasilnya `novels/<slug>/discovery.md`, lalu diturunkan ke bible. Ini diadaptasi dari skill `novel-architect`.
- **Bible dulu, bab kemudian.** Tiap novel wajib punya `novels/<slug>/bible.md` sebagai sumber kanon nama. Tanpa itu, nama karakter akan bergeser di tengah jalan — sudah terjadi di `the-chrono-engine`.
- **Target 1.500–2.500 kata per bab.** Target lama 5.000–6.000 kata adalah penyebab langsung 42 bab yang masih berisi paragraf berulang. Sebaliknya, mayoritas bab sekarang justru terlalu pendek — 175 dari 230 di bawah batas 1.200 kata.
- **Bible dan outline tinggal di `novels/<slug>/`,** bukan di folder skill. Satu skill melayani 14 novel.
- **Konsistensi diperiksa, bukan diharapkan.** `workflows/continuity-check.md` memindai timeline, karakter, worldbuilding, dan "siapa tahu apa" lintas bab, lalu menulis `novels/<slug>/continuity-report.md` berisi pertanyaan — bukan vonis. Jalankan tiap 10 bab dan sebelum novel dinyatakan selesai.

## Kondisi repo

`NOVEL-AUDIT.md` di root berisi laporan 230 bab: mana yang perlu ditulis ulang, mana yang cukup diperbaiki. Acuan gaya prosa adalah `novels/kidung-bayang-batavia/` — tapi bukan acuan panjang, karena semua babnya 367–578 kata.

Angka-angka itu cepat basi: Gemini Spark menulis ke `novels/the-void-alchemist/` secara otomatis tanpa membaca skill ini, dan keluarannya konsisten melanggar dua aturan (H1 di body, di bawah 1.200 kata). Hitung ulang dengan script di akhir `NOVEL-AUDIT.md` sebelum memakai angka mana pun.
