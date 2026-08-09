# Changelog - Novel Factory

## [V5.2] - 2026-08-08

Menyerap yang berguna dari skill `novel-architect` tanpa melanggar kontrak situs dan tanpa menghidupkan kembali teater multi-agent yang sudah dibuang di V5.

### Added
- **`workflows/discover-novel.md`** — fase discovery interaktif sebelum scaffolding: wawancara reflektif bagian per bagian (North Star, premis empat unsur, tema, struktur, genre + batas, suara & gaya) dengan Format Konfirmasi (`Ya` / `Ubah` / `Tulis ulang`) di tiap bagian. Menulis `discovery.md` sekali, hanya saat semua bagian disetujui. Ada mode quick untuk pengguna yang sudah tahu jawabannya. Inti dari `novel-architect`: *refleksi sebelum konstruksi*.
- **`templates/discovery.md`** — dokumen visi per novel yang dibekukan setelah discovery; diturunkan ke `bible.md`. Situs mengabaikannya (hanya `README.md` + `chapter-*.md` yang dibaca).
- **`workflows/continuity-check.md`** — audit konsistensi lintas bab (timeline, karakter, worldbuilding, emosi/adegan, siapa-tahu-apa) yang menulis `novels/<slug>/continuity-report.md` berisi **pertanyaan netral dengan rujukan bab, bukan vonis**. Diadaptasi dari langkah Final Continuity Check `novel-architect`.
- **Mode paralel draft + review** di `workflows/continue-writing.md` — bab 1 ditulis dengan tangan untuk mengunci suara, lalu agent paralel (delegate_task `run_in_background=true`) untuk bab 2–N, tiap prompt mandiri dengan daftar file konteks. Dibatasi syarat ketat (outline + bible penuh, ≥3 bab) dan larangan keras meniru kesalahan 70 bab `the-astral-sovereign`.
- **Arsip draf lama** di `workflows/revise-chapter.md` — salin ke `.scratch/archive/<slug>/` sebelum rewrite penuh, praktik Archive dari `novel-architect`.
- **Prinsip revisi lembut** di `workflows/revise-chapter.md` — revisi bahasa/ritme/emosi tanpa menambah kejadian, tanpa mengganti suara, hormati ambiguitas. Dari seksi Review `novel-architect`.
- **Seksi Suara & Gaya Novel** di `templates/bible.md` — POV/tense, register, tekstur bahasa, ritme, batas genre konkret; diisi dari `discovery.md`.
- Field **Kepribadian / Kekuatan / Kelemahan** di Protagonis dan Antagonis `templates/bible.md` (sheet karakter versi ringkas).
- `reference/output-contract.md` mendokumentasikan bahwa `discovery.md` dan `continuity-report.md` diabaikan situs.

### Changed
- `SKILL.md`: dua baris routing baru (discovery, continuity-check) + `discovery.md` di daftar template + catatan bahwa keduanya diadaptasi dari `novel-architect`.
- `workflows/new-novel.md`: langkah 1 menjadi fase discovery — scaffolding dilarang di atas ide yang belum digali; `bible.md` kini diisi dari `discovery.md`.
- `workflows/continue-writing.md`: cek kontinuitas tiap 10 bab dan sebelum novel selesai; langkah 6 kini wajib continuity-check dulu sebelum `status: "Complete"`.
- `README.md`: struktur workflow + cara pakai diperbarui.

### Not Changed (sengaja)
- **Tujuh aturan keras, quality gate, kontrak output, dan bible/outline per novel** — inti yang terbukti menyelamatkan repo dari 42 bab duplikat. `novel-architect` tidak membawa aturan baru ke sini; ia menyumbang fase penemuan dan verifikasi, bukan mengganti penegakan.
- `spark-scheduler-prompt.md` — Spark menulis otomatis tanpa wawancara; discovery dan continuity adalah fase manusia + asisten.

## [V5.1] - 2026-08-06

Menyerap skill `novel-writing-pro` yang selama ini berjalan paralel dan bertentangan.

> Angka bab di bawah dan di seksi V5 adalah kondisi **saat versi itu ditulis**. Pemilik repo lalu menghapus 91 bab sampah; hitungan yang berlaku sekarang ada di `NOVEL-AUDIT.md`.

### Added
- `templates/cover-prompt.md` — kerangka 8 bagian (Concept, Prompt, Style, Color Palette, Negative Prompt, Aspect Ratio, Catatan Iterasi, Lokasi File), mengikuti tiga file terlengkap di repo: `gods-in-jars`, `the-host`, `lantern-of-night`. Sebelumnya V5 tidak menyebut file ini sama sekali padahal ada di 14 dari 14 novel.
- `reference/kidung-canon.md` — semesta bersama Kidungverse, cara memutuskan berbagi semesta atau berdiri sendiri, register tiga novel `status: "Complete"`, dan Prinsip Wadah.
- `reference/output-contract.md` bagian **Jebakan operasional** — larangan menyisipkan prosa lewat script, hitung kata dari prosa bukan byte, CRLF vs LF, larangan blok meta di ekor bab.
- `reference/quality-gate.md` bagian **Sebelum novel dinyatakan selesai** — checklist tingkat novel.

### Fixed
- **`quality-gate.md` F6 vs `SKILL.md` aturan 6.** Dua angka berbeda (1.200–3.000 vs 1.500–2.500) tanpa penjelasan, terbaca sebagai kontradiksi. Sekarang dinyatakan eksplisit sebagai dua lapis: target vs batas gagal keras.
- **Perintah shell di `quality-gate.md` ikut menghitung frontmatter.** `wc -w "$FILE"` tidak cocok dengan angka situs. Semua perintah sekarang memakai `BODY=$(sed '1,4d' "$FILE")`, plus cek duplikat paragraf yang sebelumnya tidak ada.
- **Casing path di `NOVEL-AUDIT.md`** — tiga rujukan ke `Novel-Factory-V4-Pro-Plus`, jalan di Windows tapi gagal di Linux.
- **`NOVEL-AUDIT.md` dihitung ulang dari nol** setelah 91 bab dihapus: 321 → **230 bab**. Peta masalahnya berbalik — duplikasi turun 144 → 42 (45% → 18%), sementara bab di bawah 1.200 kata naik jadi 175 (76%) dan jadi masalah terbesar. H1 di body 251 → 160. Empat folder (`the-aegis-of-aether`, `the-chrono-engine`, `the-rust-alchemist`, `the-shadow-weaver`) kini tanpa bab, jadi tidak muncul di indeks situs.
- **Angka "91 bab rusak" di `SKILL.md` dan `workflows/revise-chapter.md`** tidak pernah cocok dengan audit mana pun. Diganti angka nyata.
- **`kidung-bayang-batavia` tidak lagi disebut "baseline" tanpa syarat.** Prosanya memang acuan, tapi ke-70 babnya 367–578 kata — di bawah batas gagal keras. Sekarang dinyatakan sebagai acuan gaya, bukan acuan panjang.
- Langkah 7 `workflows/new-novel.md` naik dari "Sampul (opsional)" jadi kewajiban menulis `cover-prompt.md`. Gambar `.webp`-nya tetap boleh menyusul karena butuh manusia menjalankan generator.

### Documented

- **Gemini Spark** menulis otomatis ke `novels/the-void-alchemist/` (~1,6 bab/jam) tanpa membaca skill ini, tapi ia membaca `README.md` novelnya — dan kanonnya terjaga: protagonis `Renjiro Aksara` plus nama pendukung konsisten di 4 bab, nol duplikasi, frontmatter valid. Dua pelanggaran yang tersisa murni level prompt: `# Bab N:` di body (4/4) dan panjang di bawah 1.200 kata dengan tren memendek (821 → 799 → 457 → 433).
- **Novel lain bukan karya Spark.** Timestamp membuktikan generasi massal: `kidung-bayang-batavia` dan `the-astral-sovereign` masing-masing 70 bab dalam 3–4 menit. Seluruh duplikasi, H1, dan bab tanpa dialog di audit berasal dari sana. Usulan perbaikan prompt Spark ada di `NOVEL-AUDIT.md` §8.

### Removed
- **Skill `novel-writing-pro`.** Bertentangan langsung: menetapkan ~5.000 kata/bab sebagai "platform standard, not optional" — target yang sama dengan penyebab bab berisi paragraf berulang. Juga mengizinkan header `**Scene N:**` yang tidak ada di kontrak situs. Seluruh isinya yang unik sudah diserap ke file-file di atas.

## [V5] - 2026-08-06

Perombakan total. Versi sebelumnya punya 68 file tapi total isinya 14 KB — hampir semuanya stub 1–3 baris yang tidak pernah dibaca dan tidak menegakkan aturan apa pun. Hasilnya terdokumentasi di `NOVEL-AUDIT.md`.

### Fixed
- **`SKILL.md` sekarang punya YAML frontmatter.** Sebelumnya tidak ada, jadi skill tak punya `description` dan tidak bisa ditemukan otomatis.
- **Target panjang bab 5.000–6.000 → 1.500–2.500 kata.** Target lama adalah penyebab langsung 144 bab berisi paragraf yang diulang verbatim sampai 12 kali.
- **Larangan H1 di body bab.** Situs sudah merender judul; 251 bab terlanjur punya judul dobel.
- **Story bible pindah dari folder skill ke `novels/<slug>/bible.md`.** Satu file global mustahil melayani 14 novel — itu sebabnya `the-chrono-engine` berganti protagonis dari Kaelen Sora ke Leo Vance di bab 2.

### Added
- **ATURAN KERAS** di kepala `SKILL.md`: tujuh larangan yang membatalkan bab kalau dilanggar.
- `reference/output-contract.md` — kontrak file dan frontmatter, diturunkan baris demi baris dari `src/lib/novels.ts` dan `src/pages/chapter/[novelSlug]/[chapterSlug].astro`.
- `reference/prose-craft.md` — contoh buruk vs baik yang dikutip langsung dari repo ini, plus prosedur self-check duplikasi.
- `reference/quality-gate.md` — 8 kondisi gagal keras dengan perintah shell pemeriksanya.
- `templates/bible.md` dan `templates/outline.md` — kanon per-novel dan beat per-bab.
- `NOVEL-AUDIT.md` di root repo — laporan 321 bab yang jadi daftar kerja perbaikan.

### Removed
- 56 file stub: seluruh `instructions/` (38), `checklists/` (7), `examples/` (5), `memory/` (5), `CONFIG.md`. Isi yang berguna diserap ke `reference/`.
- `templates/` lama (7 → 4) dan `workflows/` lama (7 → 4), dikonsolidasi.
- Kerangka multi-agent ([ARCHITECT], [WORLDBUILDER], dst.) dan diagram state machine — teater, bukan penegakan aturan.

Hasil: 68 file → 18 file, dan setiap file punya isi.

## [V4 Pro+] - 2026-08-06
### Added
- Multi-Agent Orchestration Architecture ([ARCHITECT], [WORLDBUILDER], [CHARACTER_DESIGNER], [DRAFTER], [EDITOR]).
- Persistent Memory Engine (`story-bible.md`, `timeline-engine.md`, `relationship-engine.md`).
- Foreshadowing & Chekhov's Gun Tracker.
- Automated Quality Checklist & Scoring Protocols.
- Advanced Genre Packs (Fantasy, Sci-Fi, Romance, Thriller, Urban Fantasy).
