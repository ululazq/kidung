---
name: novel-factory-v4-pro-plus
description: Menulis dan merevisi novel panjang berbahasa Indonesia bab demi bab dengan konsistensi kanon. Gunakan saat membuat novel baru, menulis atau melanjutkan bab, menyusun outline, membangun dunia atau karakter, atau merevisi draf di folder novels/. Menegakkan aturan anti-padding, bible per-novel, dan kontrak frontmatter situs Astro.
---

# Novel Factory V4 Pro+

Mesin penulisan novel panjang berbahasa Indonesia untuk repo ini. Setiap novel hidup di `novels/<slug>/` dan langsung dirender oleh situs Astro, jadi bentuk file adalah kontrak, bukan selera.

---

## ATURAN KERAS

Tujuh aturan berikut tidak bisa ditawar. Melanggar satu saja = bab gagal dan tidak boleh disimpan.

**1. Dilarang mengulang paragraf atau kalimat.**
Kalau bab terasa kurang panjang, tambahkan konflik, adegan, atau dialog baru. **Jangan pernah** menyalin-tempel teks yang sudah ada. Ini penyebab langsung 42 bab rusak yang masih ada di repo ini — lihat `NOVEL-AUDIT.md`.

**2. Dilarang menulis ringkasan beat ke dalam prosa.**
Paragraf pembuka bergaya `"Hujan menimpa atap... Kaelen menemukan kubus... Pasukan mendobrak pintu..."` adalah outline yang bocor. Beat hidup di `outline.md`, bukan di bab.

**3. Dilarang membuat H1 di body bab.**
Situs sudah merender judul (`src/pages/chapter/[novelSlug]/[chapterSlug].astro:48`). `# Bab 3: ...` di body = judul dobel.

**4. Nama wajib diambil dari `novels/<slug>/bible.md`.**
Karakter, tempat, faksi, item, istilah — semua ejaan baku ada di bible. Dilarang mengarang nama pengganti di tengah novel. Kalau bible belum ada, buat dulu dari `templates/bible.md`.

**5. Setiap bab wajib memuat dialog.**
Minimal dua pertukaran yang benar-benar mengubah sesuatu. Bab tanpa dialog adalah ringkasan, bukan cerita.

**6. Panjang bab 1.500–2.500 kata.**
Kalau tidak tercapai dengan materi nyata, beat-nya terlalu tipis — kembali ke outline dan pecah/gabungkan, jangan tambal dengan kalimat kosong.

**7. Jangan tutup bab dengan kalimat generik.**
`"...menyongsong hari baru"`, `"...siap menghadapi ancaman yang kian nyata"`, atau pertanyaan retoris `"Apakah Arya mampu...?"` dilarang. Tutup dengan aksi, keputusan, atau informasi baru.

---

## Kontrak Output (ringkas)

```
novels/<slug>/
  README.md        # frontmatter metadata novel
  bible.md         # kanon; tidak dirender situs
  outline.md       # beat per bab; tidak dirender situs
  cover-prompt.md  # prompt generator sampul; tidak dirender situs
  discovery.md     # visi awal (opsional); tidak dirender situs
  continuity-report.md  # hasil audit (opsional); tidak dirender situs
  chapter-1.md     # nama file harus cocok ^chapter-\d+\.md$
  chapter-2.md
public/covers/<slug>.webp
```

Frontmatter bab — persis tiga baris ini, tidak lebih:

```yaml
---
title: "Bab 3: Garis Merah Kota Tua"
chapter: 3
---
```

Body dimulai langsung dengan prosa. Jeda adegan pakai `---` sendirian di satu baris. Jumlah kata dihitung otomatis oleh situs; jangan tulis manual.

Detail lengkap + rujukan baris ke `src/lib/novels.ts`: baca `reference/output-contract.md`.

---

## Routing

Baca file yang relevan saja, saat dibutuhkan.

| Situasi | Baca |
|---|---|
| Ide masih mentah, mau digali dulu | `workflows/discover-novel.md` |
| Bikin novel baru dari ide | `workflows/new-novel.md` |
| Nulis satu bab tertentu | `workflows/write-chapter.md` |
| Lanjut dari bab terakhir | `workflows/continue-writing.md` |
| Perbaiki bab yang sudah ada | `workflows/revise-chapter.md` |
| Ragu soal bentuk file/frontmatter | `reference/output-contract.md` |
| Nulis prosa, dialog, deskripsi | `reference/prose-craft.md` |
| Susun plot, arc, pacing, foreshadow | `reference/story-architecture.md` |
| Bikin/mendalami karakter | `reference/character.md` |
| Bangun sistem kekuatan, faksi, lokasi | `reference/worldbuilding.md` |
| Butuh konvensi genre tertentu | `reference/genre-packs.md` |
| Novel baru: berbagi semesta atau berdiri sendiri | `reference/kidung-canon.md` |
| Sebelum menyimpan file apa pun | `reference/quality-gate.md` |
| Cek konsistensi lintas bab / novel selesai | `workflows/continuity-check.md` |

Template ada di `templates/`: `novel-readme.md`, `chapter.md`, `bible.md`, `outline.md`, `cover-prompt.md`, `discovery.md`.

Dua baris di atas diadaptasi dari skill `novel-architect`: fase discovery (refleksi sebelum konstruksi, konfirmasi per bagian) dan audit kontinuitas (laporan pertanyaan, bukan vonis). Kalau ide masih samar, mulai dari discovery — jangan langsung scaffolding.

---

## Quality Gate (versi pendek)

Sebelum menyimpan bab, jawab tujuh pertanyaan ini. Satu "tidak" = perbaiki dulu.

1. Tidak ada kalimat yang muncul lebih dari sekali?
2. Tidak ada paragraf ringkasan beat ber-`...`?
3. Tidak ada `#` heading di body?
4. Semua nama cocok dengan `bible.md`?
5. Ada dialog yang mengubah sesuatu?
6. 1.500–2.500 kata?
7. Kalimat penutup spesifik, bukan template?

Versi panjang beserta cara memindai duplikasi: `reference/quality-gate.md`.

---

## Setelah menyimpan

Perbarui `novels/<slug>/bible.md`: nama baru yang muncul, foreshadow yang ditanam, posisi timeline, dan "sudah diungkap sampai bab berapa". Bible yang basi adalah awal drift nama.
