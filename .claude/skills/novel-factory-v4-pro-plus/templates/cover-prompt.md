Salin ke `novels/<slug>/cover-prompt.md`. Situs **tidak** merender file ini — ini input untuk generator gambar, bukan konten.

Struktur di bawah mengikuti tiga file terlengkap di repo (`gods-in-jars`, `the-host`, `lantern-of-night`). Sembilan file lain masih versi 4 bagian; kalau menyentuhnya, naikkan ke bentuk ini.

---

````markdown
# <Judul Novel> — Cover Image Prompt

## Concept

<Dua sampai empat kalimat Bahasa Indonesia: siapa yang terlihat, sedang apa, di mana, dan kontras visual apa yang membawa tema novel. Bukan sinopsis plot — hanya yang kelihatan di satu gambar diam.>

## Prompt (siap tempel ke AI image generator)

```
<Prompt Bahasa Inggris, satu paragraf, siap salin. Wajib memuat, berurutan:
subjek (usia, etnis, rambut, pakaian — spesifik) · aksi dan pose · latar dan
propertinya · sumber cahaya dan arahnya · mood · palet warna dalam kata ·
gaya seni · "No text on the image." · "Portrait orientation (3:4 aspect ratio)."
Boleh ditutup satu kalimat rujukan gaya, misal: "Influences: X meets Y lighting.">
```

## Style

- **Genre**: <sama dengan field `genre` di README>
- **Mood**: <2-4 kata sifat>
- **Art style**: <digital painting semi-realistis / cat air / dsb. Sebutkan juga yang BUKAN, misal "bukan anime, bukan photorealistic">
- **Lighting**: <arah dan sifat cahaya; sebut sumber utamanya>

## Color Palette

| Role | Hex | Description |
|------|-----|-------------|
| Background | `#000000` | <peran warna ini di gambar> |
| Warm accent | `#000000` | <...> |
| Cold accent | `#000000` | <...> |
| Earth tone | `#000000` | <...> |
| Highlight | `#000000` | <...> |

## Negative Prompt (yang harus dihindari)

- Teks, judul, huruf, watermark
- <gaya yang salah untuk novel ini, misal: karakter chibi/cartoony>
- <warna yang merusak mood, misal: neon terang>
- <elemen latar yang salah genre>
- Komposisi terlalu ramai

## Aspect Ratio

**3:4** (portrait) — standar cover novel. Alternatif 2:3.

## Catatan untuk Iterasi

- Jika <masalah yang bisa diduga>: <penyesuaian konkret>
- Jika tokohnya terlihat terlalu Western: tambahkan ciri wajah Asia Tenggara, kulit sawo matang, rambut hitam
- <satu detail yang paling sering salah di novel ini>

## Lokasi File Cover

Setelah generate, simpan sebagai `public/covers/<slug>.webp`.
````

---

## Aturan

- **Nama file cover harus persis `slug`**, bukan nama folder dan bukan judul. Situs mencocokkan `public/covers/<slug>.<ext>` (`src/lib/novels.ts:83`). Ekstensi yang dikenali: `webp`, `jpg`, `jpeg`, `png`, `avif`.
- **Blok prompt ditulis dalam Bahasa Inggris.** Generator gambar jauh lebih akurat dengan Inggris; sisa dokumen tetap Bahasa Indonesia.
- **`No text on the image` wajib ada.** Generator hampir selalu menempelkan judul palsu yang berantakan kalau tidak dilarang.
- **Hex di tabel palet harus diambil dari prompt**, bukan sebaliknya. Tabel itu yang dipakai kalau nanti sampulnya di-retouch atau dibuat ulang.
- Tanpa sampul, novel tetap tampil (`cover: null`). Jadi file prompt ini boleh ada lebih dulu daripada gambarnya — dan memang begitu kondisinya untuk 8 dari 14 novel saat ini.
