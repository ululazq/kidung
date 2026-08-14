# Workflow: Serial Panjang (2000+ Bab)

Mode untuk novel yang direncanakan ribuan bab — pola Overgeared/light novel serial.
Bukan cara menulis yang berbeda, tapi **lapisan perencanaan** di atas yang biasa:
perencanaan bergeser dari per-bab ke per-arc, dan state cerita hidup di file
`world-state.md` yang wajib sinkron, bukan di kepala penulis.

Aktifkan lewat frontmatter README `serial: true` (scaffold: `--serial`).

---

## Kontrak file tambahan (wajib untuk novel serial)

```
novels/<slug>/
  arcs.md           # peta arc bab 1 → target — KONTRAK, dicek otomatis
  world-state.md    # memori kerja: state yang benar SEKARANG — KONTRAK, dicek otomatis
  outline.md        # tabel bab = jendela ARC AKTIF saja; tumbuh per arc (tidak dihapus)
  audit-review.md   # ledger temuan yang sudah ditinjau (opsional, wajib bila ada drift)
```

Kedua file **tidak dirender situs** (hanya `README.md` dan `chapter-*.md` yang dibaca
`src/lib/novels.ts`), jadi boleh disimpan di folder novel tanpa menyentuh tampilan.

### `arcs.md` — peta arc

Satu baris per arc, bab berurutan, tidak boleh tumpang tindih:

```markdown
| Arc | Bab | Judul arc | Tujuan | Keadaan akhir dunia | Status |
|---|---|---|---|---|---|
| 1 | 1–250 | <judul> | <yang harus tercapai> | <keadaan dunia saat selesai> | Complete |
| 2 | 251–500 | <judul> | <...> | <...> | In Progress |
| 3 | 501–750 | <judul> | <...> | <...> | Planned |
```

**Baris tabel adalah kontrak** — `scripts/check-novels.mjs` membaca rentang bab
dari baris `| N | X–Y | ... |`. Jangan ubah formatnya. Gate otomatis:

- Setiap bab di disk wajib jatuh di dalam **tepat satu** arc. Bab di luar arc
  terdeklarasi = error: *tulis baris arc-nya dulu sebelum menulis babnya.*
- Rentang tumpang tindih = error; celah antar arc = peringatan.

Sekali arc dinyatakan `Complete`, jangan mengubah rentang babnya — bab sudah
tercommit. Rencana yang meleset diperbaiki di arc berikutnya, bukan dengan
menggeser arc lama.

### `world-state.md` — memori kerja

Satu-satunya file yang menjawab "apa yang benar **sekarang** di bab N?":

```markdown
Terakhir diperbarui: bab 512
Arc aktif: Arc 3 — <judul>
```

Header `Terakhir diperbarui: bab N` **wajib sama dengan jumlah bab di disk**
(dicek otomatis — basi = error). Isi bagian: Status dunia, Tokoh (status/lokasi/
kekuatan per tokoh), Alur aktif, Chekhov belum ditembak, Siapa tahu apa, Item & aset.

Aturan memori kerja:

- **Tulis state sekarang, bukan rencana.** "Grid marah pada Kaelen" — bukan
  "nanti Grid akan marah". Rencana tinggal di `arcs.md`/`outline.md`.
- **Update tiap selesai menulis bab** (atau tiap batch kecil). World-state basi
  adalah sumber utama drift nama/level/lokasi di serial panjang.
- **Hapus dari "Siapa tahu apa" apa yang sudah tidak relevan** — file ini untuk
  keadaan aktif, bukan arsip. Arsip hidup di `bible.md` dan `continuity-report.md`.

---

## Siklus menulis per arc

```
[1] Proyek arc berikutnya di arcs.md (baris + tujuan + keadaan akhir)
        ↓
[2] Tambahkan baris bab arc itu di outline.md (jendela baru, baris lama TETAP)
        ↓
[3] Tulis bab demi bab dalam jendela arc aktif — update world-state tiap bab
        ↓
[4] ~70% arc: audit otomatis drift (npm run novel:audit -- <slug> --arc N)
        ↓   lalu audit kontinuitas manual (workflows/continuity-check.md) untuk arc ini
[5] Arc selesai → tandai baris arcs.md "Complete" + world-state "Arc aktif: —"
        ↓
[6] Balik ke [1] — jangan mulai arc baru sebelum arc lama benar-benar selesai
```

**Audit drift otomatis** (`npm run novel:audit -- <slug> [--arc N] [--report]`)
membandingkan bab satu arc dengan `world-state.md` dan mencetak kandidat
drift: tokoh yang tidak muncul di arc, tokoh berstatus mati yang muncul lagi,
level LitRPG yang bocor, entitas bernama yang belum dicatat world-state,
item/Chekhov yang hilang. Laporan adalah pertanyaan, bukan vonis — jalankan
setelah tiap arc selesai (atau di ~70% arc) sebelum menulis laporan manual.
Temuan yang dikonfirmasi diperbaiki di `world-state.md` / bab, lalu audit
manual `workflows/continuity-check.md` menulis `continuity-report.md`.

**Selama menulis arc**, audit tidak menunggu akhir arc: jalankan ringkasan
tiap N bab (`npm run novel:audit -- <slug> --summary`, default N = 5) —
langkah wajib di `workflows/continue-writing.md`. Ringkasan itu juga yang
menunjukkan temuan level/entitas yang belum ditinjau sebelum sampai ke gate
commit.

**Gate commit & publish:** temuan **level & entitas** menggagalkan commit
(pre-commit + CI) DAN `novel:publish` sampai ditinjau — novel terbit harus
bebas drift yang belum dikonfirmasi. Tandai keputusan sadar dengan
`npm run novel:audit -- <slug> --accept <ID> --reason "alasan"` — menambah
baris ke `audit-review.md`. Untuk keputusan menyeluruh (mis. seluruh arc
sengaja ditulis sebagai satu twist): `--accept-all --reason "alasan"`
menandai semua temuan level/entitas arc sekaligus (yang sudah ditinjau
dilewati). Hapus barisnya setelah temuan diperbaiki.

Kunci disiplin: **jangan pernah menulis bab di luar jendela arc aktif.**
Gate `check-novels` menegakkan ini secara mekanis.

## Skala waktu nyata

- 1 bab @ 1.500–2.500 kata ≈ 1 sesi penulisan + QC.
- 1 arc 250 bab ≈ target bulanan (dengan pipeline, bukan sekali duduk).
- Jangan pernah menulis 2000 bab "sekaligus" lalu diperiksa — drift akan
  mengubur novel. Seri panjang adalah masalah *ritme*, bukan masalah sekali jalan.

## Checklist per arc

- [ ] Baris arc ada di `arcs.md` sebelum bab pertama arc ditulis
- [ ] Jendela bab arc ditambahkan ke `outline.md` (baris lama tidak dihapus)
- [ ] `world-state.md` ter-update sampai bab terakhir yang ditulis
- [ ] Audit drift otomatis (`npm run novel:audit -- <slug> --summary`) dijalankan tiap N bab (default 5) selama menulis arc
- [ ] Audit drift penuh (`npm run novel:audit -- <slug> --report`) dijalankan di ~70% arc / akhir arc
- [ ] Temuan level/entitas ditinjau (`--accept <ID>` atau `--accept-all`) atau diperbaiki — gate commit & publish lolos
- [ ] Audit kontinuitas manual (`continuity-report.md`) dijalankan di ~70% arc (atau tiap 100 bab, mana lebih dulu)
- [ ] `bible.md` header "Terakhir diperbarui: bab N" sinkron
- [ ] Verifikasi: `npm run novel:check <slug> --strict`
