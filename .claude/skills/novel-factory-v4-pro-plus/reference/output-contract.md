# Kontrak Output

Bentuk file di `novels/` bukan selera — situs Astro membacanya. Setiap aturan di bawah diturunkan langsung dari kode. Rujukan baris disertakan supaya bisa dicek ulang kalau kode berubah.

## Struktur folder

```
novels/<slug>/
  README.md        # metadata novel — dirender situs
  bible.md         # kanon internal — diabaikan situs
  outline.md       # beat per bab — diabaikan situs
  cover-prompt.md  # prompt sampul — diabaikan situs
  discovery.md     # visi awal (opsional) — diabaikan situs
  continuity-report.md  # hasil audit kontinuitas (opsional) — diabaikan situs
  chapter-1.md
  chapter-2.md
  ...
public/covers/<slug>.webp
```

Situs memindai setiap subfolder `novels/` (`src/lib/novels.ts:123-124`). Folder tanpa bab tidak muncul di indeks (`novels.ts:165`), jadi novel yang baru punya README saja belum akan tampil — itu wajar.

File internal (`bible.md`, `outline.md`, `cover-prompt.md`, dan opsional `discovery.md` / `continuity-report.md`) diabaikan situs: hanya `README.md` dan file yang cocok `^chapter-\d+\.md$` yang dibaca (`novels.ts:93-94`). Jadi dokumen visi dan laporan audit boleh tinggal di folder novel tanpa menyentuh rendering — sama seperti bible dan outline.

Nama file bab **harus** cocok `^chapter-\d+\.md$` (`novels.ts:93`). `chapter-01.md`, `bab-1.md`, atau `chapter-1.markdown` diabaikan diam-diam. Urutan diambil dari angka, bukan alfabet (`novels.ts:73-76`), jadi `chapter-10.md` aman.

## `README.md`

Frontmatter memetakan ke `interface NovelMeta` (`novels.ts:8-20`):

```yaml
---
title: "Kidung Bayang Batavia"
slug: "kidung-bayang-batavia"
genre: "Dark Urban Fantasy / Action Fantasy"
tone: "Atmospheric, Gritty, Mysterious"
protagonist: "Arya Pratama"
description: "Satu kalimat kait — siapa, apa yang dia aktifkan, taruhannya apa."
status: "In Progress"
started: "2026-08-03"
completed: ""
universe: "Kidungverse"
language: "Indonesian"
---
```

- `title`, `slug`, `genre`, `tone`, `protagonist`, `description`, `status`, `started` — wajib.
- `completed`, `universe`, `language` — opsional; string kosong diperlakukan sebagai tidak ada (`novels.ts:152-154`).
- `slug` harus sama dengan nama folder. Kalau beda, situs masih bisa memetakan balik (`novels.ts:205-220`), tapi jangan mengandalkan itu — nama sampul ikut `slug`, bukan nama folder.
- `genre` dipecah di tanda `/` menjadi chip filter di halaman indeks (`novels.ts:61-66`). Tulis `"Steampunk / Dark Fantasy"`, bukan `"Steampunk, Dark Fantasy"`.
- `status` default `"In Progress"` kalau kosong. Pakai `"In Progress"` atau `"Complete"`.

Di bawah frontmatter, README boleh berisi apa pun untuk manusia (judul H1, sinopsis, daftar karakter). Situs tidak merender body README, jadi H1 di sini justru benar — kebalikan dari bab.

## `chapter-N.md`

```yaml
---
title: "Bab 3: Garis Merah Kota Tua"
chapter: 3
---
```

- `title` — situs membuang prefiks `Bab N:` / `Chapter N:` saat merender (`novels.ts:104`), tapi prefiks itu berguna di editor. Konsisten pakai bentuk `"Bab N: Judul"`.
- `chapter` — angka, harus cocok dengan angka di nama file. Situs sebetulnya memakai angka dari nama file (`novels.ts:100`), jadi field ini murni untuk manusia; tetap tulis dan tetap konsisten.
- Jangan tambahkan field lain. Tidak ada `words`, `date`, `pov`, atau `tags` yang dibaca.

### Body

- **Tanpa H1.** `<h1>{chapter.title}</h1>` sudah dirender di `[chapterSlug].astro:48`.
- `##` dan `###` boleh (di-style di `[chapterSlug].astro:214-228`), tapi jarang berguna dalam prosa naratif.
- **Jeda adegan pakai `---`** sendirian di satu baris. Di-style sebagai pemisah (`[chapterSlug].astro:258`). Jangan pakai `***`, `# # #`, atau baris kosong ganda.
- Body diparse `marked` (`[chapterSlug].astro:4,20`), jadi markdown standar berlaku: `*miring*`, `**tebal**`, `> kutipan` semuanya di-style.
- Jumlah kata dihitung dari body (`novels.ts:68-70`) dan waktu baca dari 220 wpm (`novels.ts:222-225`). Jangan tulis jumlah kata manual.

## Sampul

Dua file, dua peran:

- `novels/<slug>/cover-prompt.md` — prompt generator gambar. **Wajib**, dan ada di 14 dari 14 novel. Situs tidak membacanya. Bentuknya di `templates/cover-prompt.md`.
- `public/covers/<slug>.<ext>` — gambar jadinya. Opsional; baru ada untuk 6 dari 14 novel.

Ekstensi yang dikenali: `webp`, `jpg`, `jpeg`, `png`, `avif` (`novels.ts:83`). Nama file harus persis `slug` — bukan nama folder, bukan judul. Tanpa sampul novel tetap tampil (`cover: null`).

## Jebakan YAML

Dua bug pernah ditambal di sisi situs. Jangan menambah kasus baru:

- **BOM** di awal file merusak parsing frontmatter — sudah di-strip (`novels.ts:47-50`), tapi tetap simpan file sebagai UTF-8 tanpa BOM.
- **Spasi trailing** di dalam nilai YAML — sudah di-trim (`novels.ts:52-55`). `novels/the-chrono-engine/README.md` masih penuh spasi trailing; jangan tiru.

Selalu kutip nilai string dengan `"`. Judul yang mengandung `:` tanpa kutip akan gagal parse.

## Jebakan operasional

Empat kesalahan yang sudah pernah merusak file di repo ini. Semuanya soal *cara* menulis file, bukan isinya.

- **Jangan menyisipkan prosa lewat script.** Script yang meng-append atau menyisipkan teks pernah menabrak pagar frontmatter dan merusaknya. Kalau terpaksa memakai script, periksa 5 baris pertama file **dan** jalankan `npm run build` sebelum commit.
- **Hitung kata dari prosa, bukan dari byte.** Ukuran file bukan jumlah kata. Pakai perintah di `quality-gate.md` yang membuang frontmatter lebih dulu; angka itulah yang dihitung situs (`novels.ts:68-70`).
- **CRLF vs LF.** File yang ditulis di Windows bisa memakai CRLF, dan pencocokan teks eksak akan gagal terhadap string LF. Baca file dulu, pastikan akhir barisnya, baru edit. Ini juga penyebab spasi trailing lolos dari pemeriksaan yang memakai pola `^---$`.
- **Jangan tinggalkan blok meta di ekor bab.** `Ringkasan perubahan`, `End Hook`, catatan rencana adegan — semuanya ikut dirender sebagai prosa dan ikut dihitung sebagai kata. Bab berakhir di kalimat terakhir cerita.

Prosa panjang lebih aman ditulis langsung dan diverifikasi per bab daripada digenerasi massal lalu ditambal.
