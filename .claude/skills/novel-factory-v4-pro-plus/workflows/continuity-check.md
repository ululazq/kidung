# Workflow: Cek Kontinuitas

Diagnostik lintas bab — diadaptasi dari langkah "Final Continuity Check" skill `novel-architect`. Tujuan: menemukan dan melaporkan inkonsistensi **tanpa mengubah satu baris pun**. Laporan adalah pertanyaan, bukan vonis — penulis yang memutuskan.

---

## Kapan dijalankan

- **Tiap 10 bab** selama menulis (`workflows/continue-writing.md`).
- **Sebelum masuk babak baru** — batas babak adalah titik termurah untuk memperbaiki drift.
- **Saat novel dinyatakan selesai** — sebelum `status: "Complete"`.

Bisa juga untuk subset bab: "cek kontinuitas bab 10–15" — prosesnya sama, cakupannya lebih kecil.

---

## Proses

### 1. Muat semua sumber

```bash
cat novels/<slug>/bible.md
cat novels/<slug>/outline.md
ls novels/<slug>/chapter-*.md | sort -V
```

Baca semua bab dalam urutan. Untuk novel > 30 bab, baca penuh bab-bab di sekitar titik periksa dan pindai sisanya dengan `grep` (lihat langkah 3).

### 2. Periksa lima kategori

| Kategori | Yang dicari | Sumber acuan |
|---|---|---|
| **Timeline** | Urutan kejadian, lompatan waktu, logika siang/malam, jarak tempuh | `bible.md` → Timeline; `outline.md` → Bab |
| **Karakter** | Perilaku konsisten, lompatan emosi tanpa pemicu, pengetahuan yang tahu-tahu dimiliki | `bible.md` → Protagonis/Antagonis/Tokoh pendukung/Relasi |
| **Worldbuilding** | Aturan sistem kekuatan dilanggar, harga tidak dibayar, lokasi/geografi berubah | `bible.md` → Sistem Kekuatan, Kanon Nama |
| **Emosi & adegan** | Perubahan status bab yang terlewat, beat terulang, kemunduran tanpa sebab | `outline.md` → Bab (kolom Perubahan status) |
| **Siapa tahu apa** | Fakta diketahui tokoh yang seharusnya belum tahu; pengungkapan terulang | `bible.md` → Siapa tahu apa |

### 3. Bantuan shell

```bash
SLUG=<slug>

# Nama proper di seluruh novel — cocokkan dengan Kanon Nama di bible.
grep -ohE '\b[A-Z][a-z]+ [A-Z][a-z]+\b' novels/$SLUG/chapter-*.md \
  | sort | uniq -c | sort -rn | head -30

# Bab yang panjangnya menyimpang (kandidat padding atau kekurangan).
wc -w novels/$SLUG/chapter-*.md | sort -n | head -5

# Nama yang muncul sekali lalu hilang — kandidat tokong yang dibuang.
grep -ohE '\b[A-Z][a-z]+ [A-Z][a-z]+\b' novels/$SLUG/chapter-*.md \
  | sort | uniq -c | sort -n | head -10

# Kalimat kembar lintas bab (duplikasi yang lolos gate per-bab).
grep -ohE '[^.!?]{25,}[.!?]' novels/$SLUG/chapter-*.md \
  | sed 's/^.*md://;s/^ *//' | sort | uniq -d | head
```

### 4. Tulis laporan

Simpan ke `novels/<slug>/continuity-report.md` (diabaikan situs — hanya `README.md` dan `chapter-*.md` yang dibaca). Format:

```markdown
# Laporan Kontinuitas: <Judul Novel>

Tanggal: <YYYY-MM-DD>
Cakupan: bab 1–<N>

## Ringkasan

<2–4 kalimat: apa yang diperiksa dan temuan besarnya.>

## Konsistensi terkonfirmasi

- <elemen yang memang konsisten, dengan rujukan bab>

## Potensi masalah

### Timeline
- <Bab X, paragraf Y>: <temuan> — pertanyaan: <...>

### Karakter
- <...>

### Worldbuilding
- <...>

### Emosi & adegan
- <...>

### Siapa tahu apa
- <...>

## Pertanyaan untuk penulis

**Isu 1:** <deskripsi netral>
- Pertanyaan: <spesifik, netral, satu fokus>
- Alasannya berguna: <mengapa pertanyaan ini membantu>

<lanjut untuk tiap isu>
```

### 5. Aturan observasi

- **Amati, jangan intervensi.** Jangan memperbaiki apa pun dalam laporan ini. Perbaikan dilakukan lewat `workflows/revise-chapter.md` setelah penulis memutuskan.
- **Flag inkonsistensi, bukan preferensi gaya.** Kalau ragu apakah ini sengaja, tulis sebagai pertanyaan.
- **Hormati ambiguitas yang disengaja.** Beberapa hal sengaja tidak dijelaskan — jangan tuntut jawaban.
- **Rujuk bab dan bagian, jangan menilai.** "Bab 4 menyebut matahari terbenam, bab 5 esok paginya sudah fajar — apakah satu malam penuh berlalu?" bukan "Kamu salah urut waktu."
- **Tidak ada penulisan ulang yang diusulkan.** Laporan berhenti di pertanyaan.

---

## Setelah laporan

1. Baca laporan bersama penulis, biarkan dia memilih yang mau ditindaklanjuti.
2. Untuk tiap isu yang diputuskan diperbaiki: jalankan `workflows/revise-chapter.md` pada bab terkait — dan perbarui `bible.md`/`outline.md` seiring perbaikan.
3. Isu yang dibiarkan: catat di `bible.md` seksi "Siapa tahu apa" atau "Aturan gaya" bahwa itu keputusan sadar, supaya tidak diangkat lagi di cek berikutnya.
4. Simpan laporan; jangan dihapus — `Archive` historis drift berguna saat novel direvisi bertahun-tahun kemudian.

---

## Checklist

- [ ] Semua bab dalam cakupan dibaca (atau dipindai dengan grep untuk yang jauh dari titik periksa)
- [ ] Lima kategori diperiksa terhadap `bible.md` dan `outline.md`
- [ ] Laporan ditulis ke `novels/<slug>/continuity-report.md`
- [ ] Setiap temuan berupa pertanyaan netral dengan rujukan bab, bukan vonis
- [ ] Tidak ada baris novel yang diubah oleh workflow ini
