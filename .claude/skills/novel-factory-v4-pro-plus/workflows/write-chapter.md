# Workflow: Tulis Satu Bab

Alur inti skill ini. Jangan mulai menulis prosa sebelum langkah 1–3 selesai.

---

## 1. Muat kanon

```bash
cat novels/<slug>/bible.md
cat novels/<slug>/outline.md
```

Kalau `bible.md` belum ada, buat dulu dari `templates/bible.md` dengan merekonstruksi kanon dari README dan bab-bab yang sudah ada. Jangan menulis bab baru di atas kanon yang tidak tertulis.

Catat dari bible: ejaan nama yang akan dipakai, aturan sistem kekuatan dan harganya, Chekhov's gun yang menunggu, dan "sudah diungkap sampai bab berapa".

## 2. Baca dua bab terakhir

```bash
tail -40 novels/<slug>/chapter-<N-2>.md
tail -40 novels/<slug>/chapter-<N-1>.md
```

Ambil: lokasi dan waktu di akhir bab lalu, siapa yang hadir, luka atau kerugian yang belum sembuh, dan pertanyaan terbuka yang menggantung. Bab baru harus menyambung ketiganya.

## 3. Ambil beat dari outline

Cari baris bab N di `outline.md`. Rumuskan perubahan statusnya dalam satu kalimat:

> Bab N: [siapa] [mengetahui/kehilangan/memutuskan apa] → [status lama] jadi [status baru].

**Kalau tidak bisa dirumuskan, jangan menulis.** Kembali ke outline, pecah atau gabungkan beat sampai bab ini punya satu perubahan yang jelas. Bab tanpa perubahan status adalah asal-usul semua padding di repo ini.

Tentukan juga: POV siapa, berapa adegan (1–3), dan bentuk tiap adegan (GCD atau RDD — lihat `reference/story-architecture.md`).

## 4. Tulis

Buat `novels/<slug>/chapter-N.md`. Frontmatter persis:

```yaml
---
title: "Bab N: Judul"
chapter: N
---
```

Lalu prosa, mengikuti `reference/prose-craft.md`:

- Masuk lewat momen konkret di dalam adegan — **bukan** paragraf ringkasan.
- Tanpa `#` heading di body.
- Jeda adegan pakai `---` sendirian di satu baris.
- Dialog yang mengubah sesuatu, minimal dua pertukaran.
- Nama persis seperti di bible.
- 1.500–2.500 kata dari materi nyata.
- Penutup spesifik: aksi belum selesai, keputusan yang harganya belum dibayar, atau informasi yang mengubah makna adegan sebelumnya.

Kalau di tengah menulis terasa kurang panjang: tambah komplikasi, bukan kalimat. Kalau tidak ada komplikasi yang masuk akal, beat-nya tipis — balik ke langkah 3.

## 5. Quality gate

Jalankan `reference/quality-gate.md` lengkap. Lapis 1 wajib bersih sebelum simpan:

```bash
FILE=novels/<slug>/chapter-N.md
grep -oE '[^.!?]{25,}[.!?]' "$FILE" | sed 's/^ *//' | sort | uniq -d   # harus kosong
grep -n '^#' "$FILE"                                              # harus kosong
grep -c '"' "$FILE"                                               # harus > 0
wc -w "$FILE"                                                     # 1500-2500
```

## 6. Perbarui kanon

Setelah bab tersimpan, edit `novels/<slug>/bible.md`:

- Nama baru yang muncul → daftar kanon.
- Foreshadow yang ditanam → bagian Chekhov's gun, sebut bab penanamannya.
- Posisi waktu dan lokasi di akhir bab → timeline.
- Naikkan "sudah diungkap sampai bab N".

Lalu tandai bab selesai di `outline.md` dan sesuaikan beat berikutnya kalau ada yang bergeser.

## 7. Regresi situs

```bash
npm run build
```

---

## Checklist

- [ ] Bible dan dua bab terakhir dibaca sebelum menulis
- [ ] Perubahan status bab bisa dirumuskan satu kalimat
- [ ] Quality gate lapis 1 bersih
- [ ] Bible dan outline diperbarui
- [ ] `npm run build` sukses
