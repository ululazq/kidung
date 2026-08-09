Salin ke `novels/<slug>/chapter-N.md`. Nama file harus cocok `^chapter-\d+\.md$`.

---

```markdown
---
title: "Bab N: <Judul Bab>"
chapter: N
---

<Kalimat pertama: satu momen konkret di dalam adegan. Bukan ringkasan, bukan latar belakang, bukan daftar beat.>

<Adegan 1 — GCD atau RDD. Tujuan tokoh terlihat dalam beberapa paragraf pertama.>

"<Dialog yang memindahkan informasi atau menggeser hubungan.>"

<Aksi, konsekuensi, komplikasi.>

---

<Adegan 2 setelah jeda. `---` sendirian di satu baris adalah satu-satunya pemisah adegan yang benar.>

<Kalimat terakhir: aksi yang belum selesai, keputusan yang harganya belum dibayar, atau informasi yang mengubah makna adegan sebelumnya.>
```

---

## Yang wajib

- Frontmatter persis dua field: `title` dan `chapter`. Tidak ada yang lain.
- `title` bergaya `"Bab N: Judul"`. Prefiksnya dibuang situs saat merender, tapi berguna di editor.
- `chapter` cocok dengan angka di nama file.
- 1.500–2.500 kata.
- Minimal dua pertukaran dialog yang mengubah sesuatu.
- Satu perubahan status yang bisa dirumuskan dalam satu kalimat.

## Yang dilarang

- `#` heading apa pun di body — situs sudah merender judul.
- Kalimat atau paragraf yang muncul lebih dari sekali.
- Paragraf pembuka berisi ringkasan beat ber-`...`.
- Nama yang tidak ada di `bible.md`.
- Penutup generik: `menyongsong hari baru`, `siap menghadapi ancaman yang kian nyata`, atau pertanyaan retoris ke pembaca.
- Field frontmatter tambahan seperti `words`, `date`, atau `pov` — tidak dibaca situs.

Sebelum simpan, jalankan `reference/quality-gate.md`.
