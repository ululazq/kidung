Salin ke `novels/<slug>/README.md`, isi setiap `<...>`, hapus komentar HTML.

---

```markdown
---
title: "<Judul Novel>"
slug: "<slug-sama-dengan-nama-folder>"
universe: "<Nama semesta, hapus baris ini kalau berdiri sendiri>"
genre: "<Genre Utama / Genre Kedua>"
tone: "<3-4 kata sifat, dipisah koma>"
language: "Indonesian"
protagonist: "<Nama Lengkap, peran singkat>"
description: "<Satu kalimat: siapa, apa yang dia temukan atau lakukan, dan taruhannya. Ini yang tampil di kartu indeks situs.>"
status: "In Progress"
started: "<YYYY-MM-DD>"
completed: ""
---

# <Judul Novel>

**<Satu baris kait bergaya sampul.>**

## Sinopsis

<Dua sampai tiga paragraf. Paragraf 1: dunia dan protagonis sebelum semuanya berubah. Paragraf 2: kejadian pemicu dan apa yang jadi taruhan. Paragraf 3: kekuatan penentang dan harga yang harus dibayar protagonis.>

## Karakter

- **<Nama> (<usia>)**: <peran satu baris>
- **<Nama> (<usia>)**: <peran satu baris>
- **<Nama>**: <antagonis, satu baris>

## Sistem <Nama Sistem Kekuatan>

<Dua sampai empat baris: apa yang bisa dilakukan, apa harganya, apa batasnya. Versi lengkap ada di bible.md.>
```

---

## Catatan

- `slug` **harus** sama dengan nama folder, dan sama dengan nama file sampul di `public/covers/`.
- `genre` dipecah di tanda `/` menjadi chip filter di situs. Pakai `/`, bukan koma. Maksimal 2–3 label.
- `universe`, `language`, `completed` boleh dikosongkan; string kosong diperlakukan sebagai tidak ada.
- `status` hanya `"In Progress"` atau `"Complete"`.
- Kutip semua nilai dengan `"`. Jangan ada spasi di belakang nilai.
- Simpan UTF-8 tanpa BOM.
- Body README tidak dirender situs, jadi `#` di sini aman — berbeda dengan file bab.
- Kanon lengkap tinggal di `bible.md`, bukan di README. README adalah etalase.
