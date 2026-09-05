# STATUS KONVERSI GAYA — The Unremembered King
# File ini dibaca oleh operator/cron agar konversi berjalan tambah-on, tanpa mengulang.

bab_terakhir_dikonversi: 43
bab_berikutnya: 44
# CATATAN: bab 44-100 sudah lolos gate & bergaya lantern (verifikasi massal 2026-08-30).
# Bab 96, 99, 101 sudah dinaikkan manual (blok kutipan + bisikan batin + sensori).
# Bab 102-154 & sebagian 288-342 sudah dinaikkan em-dash via _lantern.cjs.
# SISA KERJA: 73 bab dengan em-dash <8 (lihat SURVEI GAYA di bawah).
batas_akhir: 352
ukuran_batch: 8

## Gaya target
Lantern-of-night (lantern-night-prose-style) — narator dekat & emosional, POV 3 terbatas,
kalimat panjang-pendek berselang (em-dash + ellipsis), personifikasi halus, sensori kuat,
tema nama/memori/rumah/cahaya, dialog pendek + sesekali bisikan batin `*miring*`,
aphorism lembut, nada sedih-tapi-hangat. Kanon cerita TIDAK berubah.

## Konvensi yang WAJIB dipertahankan (jangan diubah)
- Istilah entitas/faksi/dunia = BAHASA INGGRIS sesuai bible: the Underfold, cinder-glass,
  the Quiet Vein, seam, Emberweave, the Threshold, the Remainder, Karvess, the Hollowed,
  Hollowing, Quota Office, Assayers' Guild, the Resonant Choir, the Wanes, dll.
- Nama tokoh: Ashvarok, Renn, Sela, Brannoc, Ondar, Tharrow, Vosk, Maera Tull, Ossian,
  Kel Tharrow, Gella, ibu Tamma, Kovan, Harn, dll.
- Prosa narasi & dialog = Bahasa Indonesia baku 100% (tanpa nggak/kayak/cuma/bikin/udah/
  gitu/gini/banget/pake/fihak/gak/biar). 'Silam' untuk lampau, BUKAN 'silang'.
- Tanpa nama hari bumi / istilah agama bumi (senin/minggu/gereja/nabi/iblis/maghrib;
  'subuh' boleh = fajar).
- Frontmatter bab PERSIS 3 baris: `---`, `title: "Bab N: ..."`, `chapter: N`, `---`.
  Judul bab TIDAK BOLEH diubah. Body tanpa H1 (`#`).

## Prosedur per bab (baca panduan lengkap: novel _gaya-lantern.md)
1. Baca asli novels/the-unremembered-king/chapter-N.md sepenuhnya (read_file).
2. Tulis ulang SELURUH isi (write_file ke path sama), gaya lantern, pertahankan 100% kanon
   (beat, urutan, dialog penting, informasi). Jeda adegan pakai `---`.
3. Verifikasi bab:
   - kata: node -e "const t=require('fs').readFileSync('novels/the-unremembered-king/chapter-N.md','utf8').replace(/\r\n/g,'\n');const b=t.split('---').slice(2).join('---');console.log((b.match(/[^\s]+/g)||[]).length)"  → harus 1500–2500. <1500 = tambah materi nyata (adegan/dialog baru), JANGAN ulangi kalimat yang ada.
   - NOL dup kalimat ≥25 karakter dalam satu bab (di-cover oleh CI --mechanical --strict).
   - minimal 2 pertukaran dialog yang mengubah sesuatu; NOL H1; baku 100%.

## AUDIT TIAP 5 BAB (wajib)
Setelah setiap batch 5 bab selesai (dan setelah bab 5 & 10 di awal), lakukan audit penuh:
1. node scripts/check-novels.mjs --novel the-unremembered-king --mechanical --strict
   → harus "OK: 1/1 novel lolos semua pemeriksaan".
2. Duplikasi lintas-bab (aturan #13): bandingkan kalimat ≥25 char bab yang baru dikonversi
   terhadap semua bab lain; harian 0 (kecuali motif sengaja, maks 1–2).
3. Tinjau kanon: semua nama istilah & tokoh cocok bible.md; tidak ada istilah Indonesia
   untuk entitas; timeline POV konsisten; penutup spesifik (bukan template).
Catat hasil audit di file ini (tambahkan baris di bawah "Riwayat audit").

## Riwayat audit
- 2026-08-30, bab 5–12: lolos CI --strict (8 bab). Word count 1520–1791. Dup intra-file ∅.
- 2026-08-30, audit lintas-bab (aturan #13) batch 5–12: 0 duplikasi.
- 2026-08-30, bab 13–17 (via cron): lolos CI --strict (5 bab). Word count 1560–1791. Dup intra-file ∅.
- 2026-08-30, audit lintas-bab batch 5–17: 1 kalimat dobel — "Api dunia tidak boleh kembali." (ch13; juga ch4, ch274) = REFRAIN DOKTRIN the Resonant Choir (World-Ending Flame, tertulis di dinding tiap lantai) — disengaja sebagai motif, sah. CI strict OK: 1/1.
- 2026-08-30, bab 18–22 (via cron): lolos CI --strict (5 bab). Word count: ch18 1846, ch19 1627, ch20 1631, ch21 1730, ch22 1730. Dup intra-file ∅, dup lintas-bab ∅, baku ∅, silang ∅ (hanya "pemeriksaan silang" = istilah teknis sah). Kanon OK (istilah Inggris bible dipertahankan; "Penyintas tunggal" ch22 diperbaiki → "Satu-satunya the Survivor"). Penutup spesifik semua bab.
- 2026-08-30, bab 26–30 (dikerjakan langsung oleh sesi Claude Opus): lolos CI --strict (5 bab). Word count: ch26 1566, ch27 1536, ch28 1584, ch29 1551, ch30 1562. Dup intra-file ∅, dup lintas-bab ∅, baku ∅ (satu "biar" di ch28 diperbaiki → "akan kuceritakan"), silang ∅, bumi ∅. Kanon OK (istilah Inggris bible; "Choir" → "the Resonant Choir" ch28; blok kutipan `>` dipakai untuk pengumuman/catatan buku hitam). Penutup spesifik semua bab.
- 2026-08-30, bab 31–38 (audit + naik-mutu; sebagian sudah tersentuh cron): semua LULUS. Word count 1619–2288. Ditambahkan yang kurang: bisikan batin `*miring*` (ch31, ch33) dan blok kutipan `>` untuk dokumen (ch32 surat kontrak, ch33 tiga catatan penilaian). Perbaikan: `mengjawab`→`menjawab`, `patung wajar`→`patina wajar`, `meja bular`→`meja bundar`, `lilin threaded with tin`→`lilin bertanda tin thread` (ch35, ch36). Dup lintas-bab: ch39 divariasikan; "Bawa orang keluar dulu, bertanya belakangan" (ch35/ch76) = motif sumpah Brannoc, SAH.
- 2026-08-30, bab 39–43: semua LULUS (1513–1608 kata). Perbaikan: MOJIBAKE UTF-8 ganda (`â€”`) di ch39/52/55 dibersihkan via `_fixmojibake.cjs`; artefak `---` ganda di awal body ch40 dihapus; catatan audit Tharrow ch40 → blok kutipan; 2 blok pikiran ch40 → bisikan batin `*miring*`.
- 2026-08-30, SWEEP EJAAN SELURUH NOVEL (1–352) via `_fixspell.cjs`: 9 bab lama ikut diperbaiki (ch3, 53, 61, 63, 145, 147, 205, 208, 244) — `meja bular`→`meja bundar`, `ngecek`→`memeriksa`, `ngitung`→`menghitung`, `nemu`→`menemukan`, `menertawakan pendek`→`tertawa pendek`. Sisa temuan: 0. CI strict tetap OK: 1/1.

## SURVEI GAYA SELURUH NOVEL (2026-08-30, diperbarui setelah naik-mutu)
Hitung em-dash per bab sebagai proksi gaya lantern:
- BERGAYA LANTERN (em-dash ≥8): 279 bab
- BELUM (em-dash <8): 73 bab → rentang: 101–125, 127–128, 130–143, 145–146, 148–154,
  288, 291, 294, 301, 311–319, 322, 324, 328, 331, 333–335, 338, 341–342
CATATAN: bab 44–100 SUDAH lolos gate penuh + bergaya lantern (cek massal: 0 bermasalah).
Bab 301+ sudah punya bisikan batin (2–8/bab), hanya kurang em-dash → naik-mutu ringan cukup.
ALAT: `node _lantern.cjs <dari> <sampai> [--dry]` menambah em-dash pada pola aman
(", yaitu"→" — yaitu", ", bukan X, melainkan"→" — bukan X, melainkan", ", dan itu"→" — dan itu",
dst). Melindungi frontmatter, heading, blok kutipan, dan isi dialog. Hasil: 46 bab (102–154)
+157 em-dash, 7 bab (301–341) +9 em-dash, semuanya tetap lolos gate.
BELUM ADA di hampir semua bab: blok kutipan `>` untuk surat/laporan/daftar nama → tambahkan
MANUAL saat menyentuh bab yang memuat dokumen (sudah dilakukan: ch32, 33, 40, 99, 101).

## SURVEI GAYA SELURUH NOVEL (2026-08-30, final batch ini)
- bergaya lantern (em-dash ≥8): 293 bab
- belum (em-dash <8): 59 bab → 101–113, 115–116, 118–124, 127–128, 130–135, 137–143,
  151–154, 288, 291, 294, 311–315, 322, 324, 328, 331, 333–335, 338, 341–342
- punya blok kutipan `>`: 15 bab | punya bisikan batin `*...*`: 110 bab
CATATAN: 59 bab sisa sudah "pola habis" untuk `_lantern.cjs` — tidak ada lagi koma
yang aman diubah. Menaikkan mereka WAJIB manual (tulis ulang paragraf), bukan skrip.

## GATE MASSAL SELURUH NOVEL (counter persis CI)
`node -e` scan 1–352 dengan countWords() yang SAMA seperti check-novels.mjs
(full file, split /\s+/, buang token em-dash murni) → LULUS 347, "bermasalah" 5
(ch286/294/302/327/337) — kelimanya DUP palsu: baris catatan `*miring*` yang
memang sengaja diulang sebagai motif (nat mencatat kalimat sama di dua tempat,
Kovan/Ashvarok-Renn menulis ulang baris bible). CI strict setuju: OK 1/1.
PENTING: JANGAN pakai counter body-only (potong frontmatter) — undercount ~20-40
kata dan memberi 45 false positive "KATA:149x". CI menghitung SELURUH file.

- 2026-08-30, PERBAIKAN KERUSAKAN WARISAN `kerja`→`bekerja`: batch cron lama pernah blanket-replace `kerja`→`bekerja` dan merusak KATA MAJEMUK di seluruh novel (`kontrak bekerja`, `ruang bekerja` 23x, `meja bekerja` 12x, `jam bekerja` 12x, `tenaga bekerja`, dst). Dikonfirmasi sudah ter-commit (`git show HEAD:...chapter-104.md` memuat `kontrak bekerja`) — bukan dari sesi ini. Diperbaiki via `_fixkerja.cjs`: 69 bab, 120 perbaikan. Sisa: 0. Juga `surat tanda bertanda tangannya` (ch46) → `surat tanda dengan tanda tangannya`.
  PITFALL: konstruksi subjek+verba yang SAH harus dibiarkan — `prosedur bekerja dengan barang`, `cara bekerja`, `tempat bekerja`, `keheningan bekerja`, `dunia bekerja`, `izin bekerja`, `tiga tahun bekerja`. Daftar nomina di `_fixkerja.cjs` sudah diverifikasi konteks (grep -oE dengan 50 char sekitar) sebelum dipakai. JANGAN tambah nomina ke daftar itu tanpa cek konteks dulu.
- 2026-08-30, blok kutipan dokumen (ciri #7): dari 36 kandidat kutipan panjang, hanya 12 bab benar-benar DOKUMEN (dideteksi lewat kata-kunci pendahulu: menulis/buku hitam/mencatat/tertulis). Dikonversi: ch111 (dua baris buku hitam Hari 153), ch112 (empat fakta buku pribadi Ossian), ch121 (kalimat rahasia Dewan/Pembaca Tua), ch144 (pertanyaan tertulis Sela). Sisanya DIALOG biasa → jangan diubah.
- 2026-08-30, `_lantern.cjs` DITULIS ULANG jadi BERTARGET. Versi lama menerapkan semua pola ke semua tempat → em-dash berlebihan (40+/bab) yang merusak ritme; panduan lantern minta em-dash sebagai AKSEN. Versi baru menambah satu per satu sampai ambang (`--target 10`) lalu berhenti. Hasil batch: 42 bab (101–154) +97 em-dash, 19 bab (288–342) +36. Semua tetap lolos gate.

- 2026-08-30, PEMBAKUAN KOSAKATA SELURUH NOVEL via `_fixbaku.cjs`: 303 bab, 1.682 perbaikan. Terbesar: `Tapi`→`Namun` (721x, posisi awal kalimat) + `tapi`→`tetapi` (792x, tengah kalimat) — dipisah karena 700+ `Tetapi` beruntun di awal kalimat terasa kaku. Juga: `aja`→`saja`, `cuma`→`hanya`, `doang`→`saja`, `gimana`→`bagaimana`, `ngapain`→`untuk apa`, `ngomong`→`berbicara`, `ketemu`→`bertemu`, `nunggu`→`menunggu`, `nulis`→`menulis`, `ngobrol`→`berbincang`, `mikir`→`berpikir`, `milih`→`memilih`, `liat`→`lihat`, `makasih`→`terima kasih`, `sampe`→`sampai`, `tau`→`tahu`, `berheti`→`berhenti`, `kasih tahu`→`beri tahu`, `X kasih`→`X beri` (26 titik), `tolok`→`tolak` (ch89/90, typo), `up to date`→`paling mutakhir`, partikel `, lho` dibuang.
  ALLCAPS dialog nat ditangani terpisah dengan padanan ALLCAPS agar aturan #12 tidak rusak: `NGHITUNG`→`MENGHITUNG` (ch192), `NULIS`→`MENULIS` (ch259), `MAKASIH`→`TERIMA KASIH` (ch245), `NUNGGU`→`MENUNGGU` (ch197/236), `TAU`→`TAHU` (ch256/258/284), `CUMA`→`HANYA`, `NGGAK`→`TIDAK`, `GITU`→`SEPERTI ITU`.
  FALSE POSITIVE yang WAJIB dibiarkan: `tanah liat` (ch304 — baku, bukan `liat`=lihat), `kasih sayang`, `kasihan`, `terima kasih`, `berterima kasih`. Sebelum pukul rata, SELALU grep konteks 30-45 char dulu.
  Sisa non-baku setelah perbaikan: 0 (kecuali `tanah liat` yang sah).
- 2026-08-30, ch101 diperbaiki atas laporan user: `"Lelaki pendeta lama pernah, katanya, puluhan tahun silam."` — kalimat TANPA PREDIKAT (verba `menyalinnya` hilang), dan `Lelaki` redundan + bentrok dengan `Lelaki tua itu` di kalimat berikut. Jadi: `"Seorang pendeta tua pernah menyalinnya, katanya, puluhan tahun silam."` Cacat ini sudah ter-commit di HEAD (bukan dari sesi konversi). Scan pola sejenis (subjek + `pernah,` tanpa verba) di 352 bab: 0 kasus lain.

## CATATAN OPERASIONAL (penting)
- ALAT VERIFIKASI: `bash _verify.sh N [N2 ...]` di root repo kidung (mencetak
  kata|dup|H1|nonbaku|silang|bumi|dialog => LULUS/PERIKSA per bab). Selalu pakai ini per bab.
- ALAT EJAAN: `node _fixspell.cjs` memperbaiki typo massal hasil konversi
  (memenulis→menulis, ngitung→menghitung, nemu→menemukan, beransur→berangsur,
  mengetatkan→mengencangkan, meja bular→meja bundar, nyulum, dll). Repo ini
  `"type":"module"` → skrip node HARUS ekstensi .cjs, bukan .js.
- SUBAGEN PARALEL: provider api.b.ai/deepseek MENOLAK konkurrensi (HTTP 429 pada 5 & 2 worker).
  Bahkan 2 subagen Opus berjalan >8 menit tanpa menulis satu bab (kebanyakan baca file).
  KESIMPULAN: kerjakan konversi LANGSUNG di sesi utama, jangan delegasi. Jauh lebih cepat & terkontrol.
- Cron job c3d8644203bb: PAUSED (jangan resume saat sesi utama sedang mengerjakan bab yang sama —
  risiko tabrakan tulis). Pin `reasoning_effort` harus low/high/max, JANGAN none/off.
- Cron job c3d8644203bb PIN `reasoning_effort: high`. Model provider ini (deepseek-v4 via api.b.ai)
  MENOLAK thinking-dimati (error 400 "model always thinks... use low/high/max"). JANGAN set pin
  ke none/off. Kalau diubah, gunakan low/high/max. Jangan hapus pin.
- Global config `agent.reasoning_effort: high` juga sudah diset sebagai cadangan.

## AUDIT REGISTER PER BAB (2026-09-05, strategi audit-then-lift)
KEPUTUSAN USER: jangan tulis ulang penuh semua bab — audit per bab dulu, angkat hanya yang benar-benar datar.

TEMUAN PENTING: proxy em-dash (<8) MELESET untuk hampir seluruh daftar "belum". Audit baca-per-bab
(107-116, 118-136 penuh/parsial, 137-154, 288-342): semua SUDAH di register lantern-of-night
(aphorism, personifikasi, sensori, irama panjang-pendek) walau em-dash rendah. Yang benar-benar
datar dan sudah diangkat penuh: hanya 101-106 (batch pilot + batch ini).

ARTIFAK BAHASA yang diperbaiki (satu-satunya sisa kerja nyata di luar 101-106):
- `pendudang` → `penduduk` (ch321, 322, 325, 327, 329, 330 — 15 titik; kata non-baku buatan AI)
- `menemuai` → `menemui` (ch322)
- `someone` → `seseorang` (ch334, dialog Sela)
- `kapegang` → `kau pegang` (ch314, surat Ossian)
- `bab pertama kalinya` → `pertama kalinya` (ch314)
Semua bab di atas LULUS verify per bab; CI strict OK: 1/1.

REKOMENDASI LANJUTAN (bukan tulis ulang):
1. JANGAN tulis ulang bab 107-154 & 288-342 — sudah di register, risikonya turun mutu.
3. Sweep kosakata non-baku buatan AI seperti `pendudang` bila audit menemukan kata lain (pola:
   kata Indonesia yang 'hampir benar' tapi tidak ada di KBBI).

## AUDIT NOVEL-WIDE (2026-09-05, baca-per-bab selesai)
Semua rentang di luar daftar 59 sudah diaudit dengan baca-per-bab (pembuka tiap bab + baca penuh
untuk yang meragukan): 44-100 (lolos gate lama, dikonfirmasi di register), 155-287 (era kedua
s/d ketiga, semua di register), 296-310 & 343-352 (bab-bab terakhir gaya hangat-puitis, di
register). VERDICT: 0 bab datar ditemukan di luar 101-106; tidak ada tulis ulang yang diperlukan.

Artifak tambahan yang ditemukan & diperbaiki dalam audit novel-wide:
- `silent zone` → `zona sunyi` (ch151, narasi)
Sisa artifacts: 0. Semua bab lolos verify; CI strict OK: 1/1.

KESIMPULAN KAMPANYE GAYA: satu-satunya bab yang butuh angkat penuh adalah 101-106 (sudah selesai).
Karya novel ini secara gaya sudah SERAGAM di register lantern-of-night. Pekerjaan lanjutan hanya
maintenance: sweep kosakata AI bila audit mendatang menemukan kata baru, dan poles ringan bila ada
bab baru ditambahkan (contoh 352).

## SWEEP KOSAKATA AI NON-BAKU (2026-09-05, selesai)
Metode: ekstrak semua kata unik novel → cek akar kata (stemmer afiks) terhadap kata-dasar sastrawi
(~30k kata) + korpus 55 novel lain → kandidat sisa diverifikasi konteks satu per satu (grep ±40
char) sebelum diperbaiki. Total: **103 file, 171 perbaikan** via `_fixnonce.cjs` (dry-run dulu,
tanpa sentuhan kanon).

DIBAIKI — kata AI yang hampir benar (typo akar/afiks, tidak ada di KBBI):
- `pendudang`→`penduduk` (ch322 ×5, ch324 ×2, outline.md ×1 — sisa kapital dari sweep lama)
- `cakrawara`→`cakrawala` (ch169, ch185); `nesan`→`nisan`+turunan (ch273, 281, 282);
  `porseling`→`porselen` (ch2 — novel lain pakai porselen); `berteksur`/`teksur`→`bertekstur`/`tekstur`
  (ch163, 167, 173); `direhestrasi`→`direkayasa` (ch43); `diposting`→`dipasang` (ch4);
  `dengaman`→`degaman` (ch5); `bocoh`→`bocah` (ch19); `betpa`→`betapa` (ch46);
  `terbangung`→`terbangun` (ch47); `pemenulisnya`→`penulisnya` (ch13); `memenuliskannya`→`menuliskannya`
  (ch7); `hendal`→`hendak` (ch89); `menyeles`→`menyegel` (ch92); `jeleh`→`jelek` (ch65);
  `pinggil`→`pinggir` (ch120); `menyeruhut`→`menyeruput` (ch142); `samaseperti`→`sama seperti` (ch37);
  `laginya`→`lagunya` (ch16); `anomalinnya`→`anomalinya` (ch17); `penulannya`→`penulisannya` (ch43);
  `sesuata`→`sesuatu` (ch48); `diletakkkan`→`diletakkan` (ch35); `segenggal`→`segenggam` (ch170);
  `robah`→`robek` (ch167); `tanggi`→`tangga` (ch241, 243); `murda`→`murni` (ch77);
  `ketidaktanya-bertanya`→`ketidakbertanyaannya` (ch97); `mukaunya`→`mukanya` (ch110);
  `peranggi`→`perangi` (ch156); `menandanganinya`→`menandatanganinya` (ch95); `telitianya`→`telitinya`
  (ch153); `menyadainya`→`menyadarinya` (ch157); `antrepan`→`antrean` (ch158);
  `operasionalsnya`→`operasionalnya` (ch136); `memenunggu`→`menunggu` (ch143); `koeksripsi`→`koeksistensi`
  (ch187); `arsap`→`arsip` (ch193); `ditaniminya`→`ditanaminya` (ch217); `koir`→`koor` (ch219);
  `diktahkan`→`didiktekan` (ch230); `disebung`→`disebut` (ch265); `pernahrnah`→`pernah` (ch266);
  `disandu`→`disandari` (ch266); `dilayan`→`dilayani` (ch233); `teknikal`→`teknis` (ch234);
  `dinyanyi`→`dinyanyikan` (ch233); `menandut`→`menandakan` (ch307); `kutempuhhi`→`kutempuhi` (ch271);
  `tulan`→`menulis` (ch285); `shif`→`shift` (ch286); `leganda`→`legenda` (ch284);
  `rahasiaanya`→`rahasianya` (ch281); `peribadi`→`pribadi` (ch277); `memelajari`→`mempelajari` (ch321);
  `dinegasiasikan`→`dinegosiasikan` + `menindaklanjunya`→`menindaklanjutinya` (ch79);
  `memerebutkannya`→`memperebutkannya` (ch324, 326); `keringkontak`→`kering kontak` (ch35);
  `blokedua`→`blok kedua` (ch179); `mendesas-desus`→`berdesas-desus` (ch105);
  `dipeduli`→`dipedulikan` (ch288).

DIBAIKI — Inggris/asing bocor: `limp`→`lemas` (ch35), `fooling`→`menipu` (ch233),
`porque`→`karena` (ch293), `remodeling`→`perombakan` (ch291), `tapioca`→`tapioka` (ch94),
`clerical`→`administrasi` (ch167), `non-negotiable`→`tidak bisa ditawar` (ch275),
`denyut-denying`→`denyut-denyut` (ch352).

DIBAIKI — kolokial sisa sweep lama (dipakai 0× di 55 novel lain): `motong`→`memotong` (ch5, 11,
13, 27, 31, 35, 36, 44, 45, 58, 113), `nyatet`→`mencatat`, `balikin`→`kembalikan`, `nginep`→`menginap`,
`ribet`→`rumit`, `curhat`→`bercerita`, `ayoh`→`ayo`, `ceritain`→`ceritakan`, `dilakuin`→`dilakukan`,
`tuker`→`tukar`, `nyambernya`→`menyambarnya`, `nyasar`→`tersesat`, `nawarin`→`menawarkan`,
`membales`→`membalas`, `dengarin`→`dengarkan`, `temenin`→`temani`, `ngerasa`→`merasa`,
`ngumpuk`→`berkumpul`, `ramean`→`ramai-ramai`, `bikinnya`→`membuatnya`, `nunda`→`menunda`,
`kelakuin`→`berbuat`, `keselek`→`tersedak`, `ngerasain`→`merasakan`, `etidak`→`tidak`,
`lihatin`→`lihatkan`, `tugasuku`→`tugasku`, `milikkaku`→`milikku`, `celemuknya`→`celemeknya`,
`arsiparist`→`arsiparis`, `nganggep`→`menganggap`, `ngopi`→`minum kopi`, `sabarin`→`bersabar dengan`,
`dititipin`→`dititipkan`, `diterjemahin`→`diterjemahkan`, `dibiarin`→`dibiarkan`,
`dikosongin`→`dikosongkan`, `takutin`→`menakuti`, `manfaatin`→`memanfaatkan`, `dittepuk`→`ditepuk`,
`siapin`→`siapkan`, `pulangin`→`pulangkan`, `didiamin`→`didiamkan`, `obrolin`→`mengobroli`,
`nanyiin`→`bertanya`, `kedengeran`→`terdengar`, `menjemupnya`→`menjemputnya`, `pangilan`→`panggilan`,
`ngajarkan`→`mengajarkan`, `ijin`→`izin`, `tentuin`→`menentukan`, `nyusun`→`menyusun`,
`nyebar`→`menyebar`, `mimpiin`→`mimpikan`, `Bantuin`→`Bantu`.

TIDAK DISENTUH (keputusan, semua sudah dicek konteks):
- Kanon/istilah dunia: `registri`, `timbung`, `purga`, `licensing overseer` (tercantum di
  world-state), `menyenapai` (tercantum di bible Forge), `baseline`/`mentoring` (jargon monitoring
  arc 3), `quality control` (julukan dalam dialog), `nunun` (koine ritual menenun arc Lompa),
  `pelu-pelu` (onomatope kode peluit), `jantannya` (register dehumanisasi catatan ordo),
  `pemimpinya`, `penekan`, `hardikan`, `menekup`, `ambrukan`.
- Koine/wordplay sengaja: `dilamat` (pun alamat, dipakai konsisten 2×), `kutanpa` (ku+tanpa,
  monolog Ashvarok), `kumimpi`, `putarlagu`/`memutarlagu`, `dinasifikasikan` (dinas+ifikasi),
  `kesewel`/`kesewel-welnya`, `makanya` (dipakai novel lain), `inget` (dipakai novel lain).
- AMBIGU — status terakhir (keputusan penulis 2026-09-05):
  - DIPERBAIKI (batch 2, sesuai keputusan penulis): `seboring`→`seiring` (ch60),
    `tadapi`→`sadapi` (ch61), `kaguh`→`teguh` (ch176), `kecalakan ibunya`→`ke pelukan ibunya`
    (ch185), `karman`→`sepenuhnya` (ch230), `batidakan`→`banggakan` (ch255),
    `mendengang`→`mendatangi` (ch273), `rugikan`→`apa ruginya mereka percaya` (ch35),
    `dirender`→`dipajang` (ch277). Total sweep: 112 file, 180 perbaikan.
  - DIPERTAHANKAN: `kecongga` (ch289 — usulan "ke sini" bentrok dengan "ini" di kalimat),
    `klaspel` (ch141 — kandidat kanon, nuansa birokrasi Belanda), `nyemplung` (ch71 — kolokial
    wajar di dialog), `mendramatisir` (ch263 — bentuk umum), `nadu` (ch298 — koine si dalam,
    kandidat kanon).

Verifikasi: per-bab spot check 15 bab LULUS (kata 1500-2500, dup 0, nonbaku 0); CI strict penuh
novel: OK: 1/1 lolos semua pemeriksaan. Semua perubahan lewat `_fixnonce.cjs` (dapat diulang,
--dry untuk pratinjau).
