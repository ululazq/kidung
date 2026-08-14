# Workflow: Novel Baru

Dari ide mentah sampai bab 1 tersimpan. Jangan lompat ke prosa sebelum langkah 4 selesai — itu jalur langsung menuju bab kosong dan padding.

---

## 1. Discovery (dulu, kalau ide masih mentah)

**Jangan scaffolding di atas ide yang belum digali.** Kalau pengguna datang dengan perasaan samar — bukan premis — jalankan `workflows/discover-novel.md` dulu: wawancara reflektif bagian per bagian (North Star, premis, tema, struktur, genre + batasnya, suara & gaya) dengan konfirmasi di tiap bagian. Hasilnya `novels/<slug>/discovery.md`, diturunkan ke bible di langkah 3.

Kalau premis sudah utuh (siapa, ingin apa, dihalangi apa, taruhannya apa) dan pengguna tidak mau diajak wawancara, lewati dan kunci premis langsung:

- Satu kalimat: siapa, ingin apa, dihalangi apa, taruhannya apa. Kalau salah satu unsur belum ada, tanya pengguna. Lihat `reference/story-architecture.md`.
- **Putuskan latar secara eksplisit.** Default: universe imajiner non-bumi —
  lokasi dan istilah dunia dibangun sendiri, bukan kosakata Indonesia dan
  bukan nama tempat bumi (lihat `reference/worldbuilding.md` → Latar).
  Latar bumi nyata (Jakarta, Yogyakarta, dll.) hanya atas permintaan
  eksplisit pengguna. Kalau pengguna tidak menyebut latar, pakai imajiner.
- Tentukan juga genre utama (lihat `reference/genre-packs.md`) dan panjang target: 20–40 bab @ 1.500–2.500 kata.
- Putuskan sekarang juga apakah novel ini masuk Kidungverse atau berdiri sendiri — keputusan itu mempengaruhi nama, lokasi, dan sistem kekuatan yang boleh dipakai. Lihat `reference/kidung-canon.md`.

## 2. Tentukan slug

`kebab-case`, ASCII, tanpa angka. Cek belum dipakai:

```bash
ls novels/
```

Buat folder `novels/<slug>/`. Cara cepat: skeleton lengkap (README, bible, outline, cover-prompt, continuity-report) dibuat otomatis oleh pipeline:

```bash
npm run novel:scaffold -- --title "Judul" --genre "Fantasy / Steampunk" --universe "Kidungverse" --chapters 20
```

Perintah ini memvalidasi slug, menolak folder yang sudah ada, dan mengisi frontmatter README (status `In Progress`, `started` hari ini). Bab ditulis menyusul; novel muncul di situs hanya setelah `chapter-1.md` ada. Sambil menulis, cek tiap tahap dengan `npm run novel:check -- <slug>`.

## 3. Tulis `bible.md`

Salin `templates/bible.md` ke `novels/<slug>/bible.md` dan isi:

- Protagonis dan antagonis dengan Want / Need / Lie / Wound (`reference/character.md`).
- Aturan sistem kekuatan beserta harga dan batasnya (`reference/worldbuilding.md`).
- Daftar kanon nama: karakter, tempat, faksi, item, istilah — dengan ejaan baku.
- Bagian Chekhov's gun dan timeline, awalnya kosong.
- Seksi **Suara & Gaya** diisi dari `discovery.md` kalau fase discovery dijalankan (POV, register, tekstur, ritme, batas genre).

**Bible ditulis sebelum bab mana pun.** Ini satu-satunya hal yang mencegah drift nama.

## 4. Tulis `outline.md`

Salin `templates/outline.md` ke `novels/<slug>/outline.md`.

Untuk tiap bab, satu baris perubahan status: `Bab 7: Kaelen tahu Alistair menjual lokasinya → percaya jadi tidak percaya.` Tandai batas babak (25% / 75%), titik tengah, dan titik terendah.

Boleh outline penuh sampai bab terakhir, atau 10 bab pertama dulu lalu diperpanjang. Yang tidak boleh: menulis bab tanpa barisnya di outline.

Tulis juga jadwal antagonis terpisah — apa yang dia capai di bab berapa andaikan protagonis tidak menghalangi.

## 5. Tulis `README.md`

Salin `templates/novel-readme.md` ke `novels/<slug>/README.md`. Frontmatter harus lolos `reference/output-contract.md`. `status: "In Progress"`, `completed: ""`, `started` diisi tanggal hari ini.

## 6. Tulis bab 1

Ikuti `workflows/write-chapter.md`.

Khusus bab 1: perkenalkan dunia normal dan satu aturan yang nanti dipakai di klimaks, akhiri dengan kejadian pemicu yang tidak bisa dibatalkan. **Bab 1 tidak boleh menyelesaikan apa pun** — kesalahan yang sudah terjadi di `the-chrono-engine/chapter-1.md`.

## 7. Tulis `cover-prompt.md`

Salin `templates/cover-prompt.md` ke `novels/<slug>/cover-prompt.md` dan isi. **Wajib** — 14 dari 14 novel di repo ini punya file ini.

Prompt-nya baru bisa ditulis setelah bible jadi, karena butuh ciri fisik protagonis, lokasi khas, dan kontras visual yang membawa tema.

Menjalankan generator gambarnya butuh manusia, jadi `public/covers/<slug>.webp` boleh menyusul. Prompt-nya tidak boleh menyusul.

## 8. Verifikasi

```bash
npm run build
```

Novel baru muncul di indeks hanya setelah punya minimal satu bab.

---

## Checklist

- [ ] Ide digali lewat `discover-novel.md` (atau premis sudah utuh dan disetujui)
- [ ] `novels/<slug>/bible.md` terisi, bukan template kosong
- [ ] `novels/<slug>/outline.md` punya baris untuk minimal 10 bab
- [ ] `novels/<slug>/README.md` lolos kontrak frontmatter
- [ ] `novels/<slug>/cover-prompt.md` terisi
- [ ] `chapter-1.md` lolos `reference/quality-gate.md`
- [ ] `npm run build` sukses
