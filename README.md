# Kidung

**Perpustakaan novel fantasi Indonesia** — 43 novel, 652 bab, ±1,16 juta kata, tersebar di tiga semesta. Setiap novel hidup sebagai markdown murni di `novels/` dan dirender langsung menjadi situs web Astro.

| | |
|---|---|
| 📚 Novel | **43** (selesai, ber-bible, ber-outline) |
| 📖 Bab | **652** |
| ✍️ Kata | **±1.156.000** |
| 🌌 Semesta | **3** — Kidungverse · Auren · Skyroot |
| 🏗️ Situs | Astro 5 · dark mode · peta jaringan novel interaktif |

---

## Semesta

### 🌆 Kidungverse — 28 novel

Semesta terbesar: multiverse berlapis yang saling menggema. Lapisan intinya **Bawah-Batavia** — kota bawah tanah steampunk di bawah Neo-Batavia dengan kanal, uap, lampu merkuri, dan korporasi memori **Lupa Corp**. Di sekelilingnya hidup dunia paralel: Nusakara (penerbang roh), Kekaisaran Kaelvora, Aether-London, Neo-Tokyo, benua xianxia (Yunhai & Suzhi), dan Jakarta modern. Kekuatan berbasis **relik & jaringan** — tanpa level numerik; istilah bersama (Bawah-Batavia, Empu Aether, godframe, ketukan 2-1) dicatat di [compendium](novels/kidungverse/compendium.md).

*Gods in Jars · Kidung Bayang Batavia · Kidung Tanah Karam · Lantern of Night · Pasar Subuh · Pegadaian Bunga · Pustaka Kabut Senja · Sang Garuda · Sang Pemangku Fajar · Sang Pembawa Angin · Sang Pembawa Pelita · Sang Penyimpan Bilah · Serat Penempa Hampa · Tangan Guntur · The Aegis of Aether · The Aetherium Vow · The Astral Sovereign · The Cinder Relic · The Clockwork Astra · The Copper Relic · The Godherd · The Host · The Iron Karma · The Last Teacher · The Neon Cipher · The Resonance Blade · The Shadow Compiler · The Shadow Forger*

### ⚔️ Auren — 11 novel

Fantasi barat dengan sistem kekuatan **diegetik**: tiap orang punya *Hearth*, terbangun di usia 12, dan naik level dari perbuatan jujur — Iron 1–10 sampai Ascent 91–100 (cap per ras: Humans 80, Sil'vael 90, Durn 70, Hearthkin 60, Wraithborn 100). *Sight* bisa membaca level orang; para Voice of the Hollow memanen Hearth curian. Dokumen kanon: [bible Auren](novels/auren/bible.md).

*The Duet · The Forge · The Knock · The Prism · The Remembering · The Scribes · The Unheard · The Unhollowed · The Unstolen · The Unwritten · The Warden*

### ⛵ Skyroot — 4 novel

Saga arsipelago pelayaran. Kekuatan lahir dari **Mark** — tanda yang terukir lewat tiga disiplin: **Clanmark** (warisan keluarga), **Guildmark** (profesi), **Vowmark** (sumpah). Mark menetap setelah pemiliknya wafat, dan "yang kosong" — tanpa Mark — dianggap tak bernilai.

*The Unbound → Bloodfall → The Deep Vow → The Rejoining*

---

## Fitur situs

- **Beranda** — hero statistik, kartu sorotan, filter genre ringkas (chip + dropdown), grid 6 kolom ala manga tracker dengan badge status dan durasi baca per bab
- **Halaman universe** — timeline kanon + **peta jaringan novel interaktif** (SVG: node = novel, edge = istilah bersama antar novel) dengan legenda ukuran node dan filter istilah
- **Halaman novel** — daftar bab dengan estimasi baca
- **Reader** — dark mode, kontrol ukuran font, progress, navigasi prev/next

---

## Struktur repo

```
novels/<slug>/
  README.md          # frontmatter: title, universe, genre, status, deskripsi…
  bible.md           # kanon novel: karakter, sistem, tempat, timeline
  outline.md         # rencana bab + penanda Complete
  continuity-report.md # audit kontinuitas (wajib)
  arcs.md            # peta arc — wajib untuk novel serial (`serial: true`)
  world-state.md     # memori kerja state saat ini — wajib untuk novel serial
  chapter-N.md       # bab 1.500–2.500 kata
  cover.webp/jpg     # sampul (opsional)

src/                 # situs Astro (halaman, komponen, lib)
scripts/check-novels.mjs  # verifikasi otomatis sebelum commit
NOVEL-AUDIT.md       # audit lintas novel (bocoran entitas, band bab, keputusan kanon)
novels/kidungverse/compendium.md  # istilah bersama multiverse + klaster nama gema
novels/auren/bible.md             # kanon sistem Auren (tier, cap ras, Sight)
```

## Standar novel (kontrak file)

- **1.500–2.500 kata per bab** (pengecualian terdokumentasi di NOVEL-AUDIT seksi 1–2)
- **bible + outline + continuity-report wajib** untuk tiap novel
- **Entitas unik milik novelnya masing-masing** (Iron Monarch, Konsorsium Kunci, Obsidian Syndicate…) — jangan bocor ke novel lain; nama gema yang disengaja dicatat di compendium
- **Vokatif mengikuti gelar** (Master X → "Master", Empu X → "Empu", tanpa gelar → "Guru") — jangan mencampur di satu novel

## Verifikasi otomatis

```bash
npm run verify      # node scripts/check-novels.mjs
```

Memeriksa untuk semua 43 novel:

1. continuity-report ada
2. outline memverifikasi Complete + jumlah bab cocok dengan disk
3. band bab 1.500–2.500 kata
4. frontmatter `chapter: N` cocok dengan nama file
5. header bible "Terakhir diperbarui: bab N" sinkron
6. judul bab outline vs frontmatter (peringatan)
7. **entitas unik per novel** — 36 entitas wajib muncul di bab pemiliknya saja + keluarga "Obsidian" tertutup
8. **vokatif mentor campur** (Guru/Master/Empu) + **klaster nama gema compendium** masih hidup

Exit code 1 bila ada pelanggaran; lewati dengan `SKIP_NOVEL_CHECK=1`.

## Menjalankan

```bash
npm install
npm run dev        # situs lokal (Astro)
npm run build      # build statis ke dist/
npm run preview    # pratinjau build
npm run check      # tipe-check Astro
npm run verify     # verifikasi novel
```

## Menambah novel baru

1. Buat `novels/<slug>/` dengan `README.md` (frontmatter: `universe`, `status`, `order`, `description`…), `bible.md`, `outline.md`, dan `chapter-1.md`
   - **Latar default: universe imajiner non-bumi.** Prosa ditulis dalam Bahasa
     Indonesia, tapi lokasi, sistem kekuatan, dan istilah dunia dibangun
     sendiri — bukan kosakata Indonesia dan bukan nama tempat bumi. Latar
     bumi nyata (mis. urban fantasy di Jakarta) hanya atas permintaan
     eksplisit; lihat skill `novel-factory-v4-pro-plus` → worldbuilding.
2. Tulis bab 1.500–2.500 kata dengan frontmatter `chapter: N`
3. Pastikan nama karakter/entitas tidak bentrok — cek [compendium](novels/kidungverse/compendium.md) dan jalankan `npm run verify`
4. Saat selesai: lengkapi `continuity-report.md`, tandai `status: "Complete"` di README, dan sinkronkan [NOVEL-AUDIT.md](NOVEL-AUDIT.md)

### Mode serial panjang (2000+ bab)

Untuk novel yang direncanakan ribuan bab, scaffold dengan `--serial`:

```bash
npm run novel:scaffold -- --serial --title "Judul" --arcs 8 --cpa 250
```

Menambah `serial: true` di README plus `arcs.md` (peta arc bab 1 → target) dan
`world-state.md` (memori kerja state saat ini). Outline bab menjadi jendela arc
aktif saja. Gate otomatis di `npm run verify`: tiap bab wajib jatuh di dalam
tepat satu rentang arc arcs.md, dan header world-state "Terakhir diperbarui: bab N"
wajib sinkron — jangan tulis bab di luar arc terdeklarasi. Panduan lengkap:
`.claude/skills/novel-factory-v4-pro-plus/workflows/serial-long-form.md`.

Audit drift per arc (membandingkan bab satu arc dengan world-state.md):

```bash
npm run novel:audit -- <slug> [--arc N] [--report]
```

Mencetak kandidat drift: tokoh yang tidak muncul di arc, tokoh berstatus
mati yang muncul lagi, level LitRPG yang bocor, entitas bernama yang belum
dicatat world-state, item/Chekhov yang hilang dari arc. Laporan = pertanyaan,
bukan vonis — konfirmasi manual sebelum memperbaiki world-state.md.
`--report` menulis salinan ke `novels/<slug>/drift-report.md`. `--summary`
mencetak ringkasan saja (hitungan per kategori + temuan level/entitas yang
belum ditinjau) — untuk cek cepat tiap N bab selama menulis
(workflow `continue-writing` menjalankannya otomatis tiap 5 bab).

**Gate commit & publish:** temuan **level & entitas** yang belum ditinjau
menggagalkan commit (pre-commit `.githooks/pre-commit`), CI (`novel-qc.yml`),
dan `novel:publish` — novel terbit harus bebas drift yang belum dikonfirmasi.
Tandai temuan yang memang keputusan sadar (twist sengaja, diperbaiki arc
berikutnya):

```bash
npm run novel:audit -- <slug> --accept <ID> --reason "alasan"
```

menambah baris ke `novels/<slug>/audit-review.md`. Untuk keputusan menyeluruh
— seluruh arc sengaja ditulis sebagai satu twist — tandai sekaligus dengan
satu alasan: `npm run novel:audit -- <slug> --accept-all --reason "alasan"`
(mencakup semua temuan level/entitas arc; yang sudah ditinjau dilewati).
Hapus baris review setelah temuan benar-benar diperbaiki (catatan basi =
peringatan). Kategori lain (tokoh hilang, item, chekhov) tetap pertanyaan —
tidak menggagalkan commit. Lewati paksa gate: `SKIP_AUDIT_GATE=1 git commit ...`.
