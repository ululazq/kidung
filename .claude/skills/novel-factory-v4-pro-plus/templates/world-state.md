Salin ke `novels/<slug>/world-state.md` saat novel memakai mode serial panjang
(README `serial: true`). Situs tidak merendernya — tapi `scripts/check-novels.mjs`
memeriksa header `Terakhir diperbarui: bab N`, jadi harus sinkron dengan jumlah
bab di disk (basi = error).

File ini adalah **memori kerja** serial: jawaban atas "apa yang benar sekarang,
di bab N?" Rencana masa depan tinggal di `arcs.md` / `outline.md`, bukan di sini.

---

```markdown
# World State: <Judul Novel>

Terakhir diperbarui: bab 0
Arc aktif: —

## Status dunia

- <faksi / peta kekuatan / kondisi tempat-tempat utama — keadaannya sekarang>

## Tokoh

| Tokoh | Status | Lokasi | Kekuatan/level | Catatan |
|---|---|---|---|---|
| <nama> | hidup/mati/cedera/... | <tempat> | <level/kelas/item — bila ada> | <sedang apa sekarang> |

## Alur aktif

- <tujuan protagonis sekarang>
- <konflik yang sedang berjalan>
- <kebuntuan / pertanyaan terbuka yang harus dijawab>

## Chekhov belum ditembak

| Ditanam di bab | Apa | Rencana tembak (arc) |
|---|---|---|
| <bab> | <apa> | <arc> |

## Siapa tahu apa

| Fakta | Diketahui siapa | Sejak bab |
|---|---|---|
| <fakta> | <siapa> | <bab> |

## Item & aset

| Item | Pemegang | Status | Muncul bab |
|---|---|---|---|
| <item> | <siapa> | <utuh/rusak/hilang> | <bab> |
```

---

## Catatan

- **Update tiap selesai menulis bab** (atau tiap batch kecil). World-state basi
  adalah sumber utama drift nama/level/lokasi di serial panjang.
- **Tulis state sekarang, bukan rencana.** "Grid marah pada Kaelen" — bukan
  "nanti Grid akan marah".
- **Buang baris yang sudah tidak relevan** — ini file keadaan aktif, bukan arsip.
  Arsip hidup di `bible.md` dan `continuity-report.md`.
- Kalau novelnya LitRPG/level: kolom "Kekuatan/level" wajib diisi angka aktual —
  level protagonis di bab N adalah fakta yang paling sering bocor.
