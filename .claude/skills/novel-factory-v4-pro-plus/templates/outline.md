Salin ke `novels/<slug>/outline.md`. Situs tidak merendernya.

Aturan tunggal: **tidak ada bab yang ditulis tanpa barisnya di sini.** Bab tanpa perubahan status yang bisa dirumuskan adalah asal-usul semua padding.

---

```markdown
# Outline: <Judul Novel>

Target: <N> bab @ 1.500–2.500 kata

## Premis

<Siapa> ingin <apa>, dihalangi <apa>, dan kalau gagal <taruhannya apa>.

## Struktur

| Titik | Bab | Isi |
|---|---|---|
| Kejadian pemicu | <1> | <...> |
| Akhir Babak I | <~25%> | keputusan protagonis untuk masuk |
| Titik tengah | <~50%> | pemahaman yang membalik tujuan |
| Titik terendah | <~75%> | kehilangan yang membuat rencana lama mustahil |
| Klimaks | <...> | menguji Lie secara langsung |
| Resolusi | <...> | 1–2 bab |

## Arc protagonis

| Titik | Bab |
|---|---|
| Lie utuh | |
| Retak pertama | |
| Melihat kebenaran, belum sanggup | |
| Lie merenggut sesuatu | |
| Bertindak dari Need | |

## Jadwal antagonis

Apa yang dia capai, andaikan protagonis tidak menghalangi.

| Bab | Yang dia capai |
|---|---|

## Subplot

| Subplot | Kenalan (bab) | Sentuhan (bab) | Resolusi (bab) |
|---|---|---|---|

## Bab

Satu baris per bab. Format: perubahan status → status lama jadi status baru.

| Bab | POV | Adegan | Perubahan status | Status |
|---|---|---|---|---|
| 1 | <Kaelen> | 2 (GCD, RDD) | <Kaelen menemukan relik → mekanik biasa jadi buruan> | selesai |
| 2 | | | | |
| 3 | | | | |
```

---

## Mode serial panjang (`serial: true`)

Untuk novel 1000+ bab, tabel bab di atas hanya berisi **jendela arc aktif**
(satu arc = mis. 250 bab). Saat arc selesai, tambahkan baris bab arc berikutnya
DI BAWAH baris lama — jangan hapus atau menggeser baris yang sudah `selesai`.
Header target memakai bentuk `Target: 2000 bab (serial panjang, 8 arc × 250 bab)`.
Peta arc keseluruhan tinggal di `arcs.md`; lihat `workflows/serial-long-form.md`.

---

## Catatan

- **Perubahan status** wajib berbentuk `X → Y`. Kalau tidak bisa dirumuskan, babnya belum siap ditulis — pecah atau gabungkan beat.
- **Adegan**: 1–3 per bab, tandai bentuknya GCD atau RDD. Rasio kasar 2:1. Lihat `reference/story-architecture.md`.
- Boleh outline penuh sampai bab terakhir, atau 10 bab dulu lalu diperpanjang di batas babak.
- **Status**: kosong / `sedang ditulis` / `selesai`. Perbarui sesudah tiap bab.
- Jangan dua bab beruntun dengan tipe adegan dan intensitas yang sama.
