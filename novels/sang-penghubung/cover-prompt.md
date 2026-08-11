# Sang Penghubung — Cover Image Prompt

## Concept

<Dua sampai empat kalimat Bahasa Indonesia: siapa yang terlihat, sedang apa,
di mana, dan kontras visual apa yang membawa tema novel. Bukan sinopsis plot —
hanya yang kelihatan di satu gambar diam.>

## Prompt (siap tempel ke AI image generator)

```
<Prompt Bahasa Inggris, satu paragraf, siap salin. Wajib memuat, berurutan:
subjek (usia, etnis, rambut, pakaian — spesifik) · aksi dan pose · latar dan
propertinya · sumber cahaya dan arahnya · mood · palet warna dalam kata ·
gaya seni · "No text on the image." · "Portrait orientation (3:4 aspect ratio).">
```

## Style

- **Genre**: <sama dengan field `genre` di README>
- **Mood**: <2-4 kata sifat>
- **Art style**: <digital painting semi-realistis / cat air / dsb. Sebutkan juga yang BUKAN>
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
- <gaya yang salah untuk novel ini>
- <warna yang merusak mood>
- <elemen latar yang salah genre>
- Komposisi terlalu ramai

## Aspect Ratio

**3:4** (portrait) — standar cover novel. Alternatif 2:3.

## Catatan untuk Iterasi

- Jika <masalah yang bisa diduga>: <penyesuaian konkret>
- Jika tokohnya terlihat terlalu Western: tambahkan ciri wajah Asia Tenggara, kulit sawo matang, rambut hitam
- <satu detail yang paling sering salah di novel ini>

## Lokasi File CoverSetelah generate, simpan sebagai `public/covers/<slug>.webp`.
