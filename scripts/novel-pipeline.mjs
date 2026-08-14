#!/usr/bin/env node
/**
 * Novel Pipeline — orkestrasi satu perintah dari ide mentah sampai terbit.
 *
 *   npm run novel:scaffold -- --title "Judul" [--genre ...] [--chapters 20] ...
 *   npm run novel:check <slug> [--strict]
 *   npm run novel:audit <slug> [--arc N] [--report]
 *   npm run novel:publish <slug>
 *   npm run novel:status
 *
 * Alur pakai:
 *   1. `novel:scaffold` membuat skeleton novel (README, bible, outline, cover-prompt,
 *      continuity-report) di novels/<slug>/ — belum ada bab, jadi belum muncul di situs.
 *   2. Isi bible + outline (atau minta asisten menulisnya), lalu tulis bab demi bab
 *      mengikuti .claude/skills/novel-factory-v4-pro-plus/ (bisa via Spark scheduler,
 *      lihat spark-scheduler-prompt.md).
 *   3. `novel:check <slug>` menjalankan QC struktural (check-novels.mjs) + cek mekanis
 *      per bab (kalimat berulang, heading di body, dialog). Tanpa --strict semua
 *      peringatan; --strict menjadikannya error.
 *   4. `novel:publish <slug>` = gate terakhir: QC strict harus lolos penuh, lalu
 *      README di-set Complete + completed hari ini, dan `npm run build` dijalankan
 *      untuk memastikan novel benar-benar terbit di situs. Push ke main →
 *      CI (novel-qc.yml) verifikasi lagi → Vercel deploy otomatis.
 *
 * QC struktural (selalu error bila gagal): continuity-report, outline memverifikasi
 * Complete, band 1.500–2.500 kata/bab (pengecualian gods-in-jars, lantern-of-night),
 * frontmatter bab, header bible, entitas unik, keluarga Obsidian, vokatif, klaster nama,
 * universe↔order (novel ber-universe wajib punya `order`), parallel simetris
 * (novel yang mendeklarasikan `parallel` wajib dibalas pasangannya).
 */

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const NOVELS_DIR = "novels";
const BAND = { min: 1500, max: 2500 };
const EXCEPTIONS = {
  "gods-in-jars": { min: 4500, max: 5500 },
  "lantern-of-night": { min: 1500, max: Infinity },
};
const TODAY = new Date().toISOString().slice(0, 10);

const HELP = `
Novel Pipeline — orkestrasi dari ide sampai terbit.

  scaffold
    npm run novel:scaffold -- --title "Judul Novel" [opsi...]
    Opsi: --slug <slug>  --genre "Fantasy / Steampunk"  --universe "Kidungverse"
          --parallel <slug-pasangan>  (isi parallel dua arah: README baru + pasangan)
          --tone "gelap, berdebu"  --protagonist "Nama"  --description "Sinopsis"
          --chapters 20   (default 20)   --language "Indonesian"
    Mode serial panjang (2000+ bab):
          --serial              aktifkan mode serial (arcs.md + world-state.md)
          --arcs 8              jumlah arc   (default 8)
          --cpa 250             bab per arc  (default 250)  → total = arcs × cpa
    Membuat skeleton novel; bab ditulis menyusul. Slug diturunkan dari judul
    bila tidak diberikan (kebab-case, ASCII, tanpa angka).

  check
    npm run novel:check -- <slug> [--strict]
    QC struktural + cek mekanis per bab. Tanpa --strict cek mekanis berupa
    peringatan; --strict menjadikan pelanggaran (kalimat berulang, heading di
    body, dialog nyaris hilang) sebagai error.

  audit  (mode serial panjang)
    npm run novel:audit -- <slug> [--arc N] [--report] [--summary]
    Audit kontinuitas per arc: bandingkan bab satu arc dengan world-state.md
    dan cetak daftar drift potensial (tokoh hilang/mati-muncul-lagi, level
    bocor, entitas baru, item/chekhov tak muncul). Laporan = pertanyaan, bukan
    vonis. --arc N: pilih arc (default: arc yang menaungi bab terakhir);
    --report: tulis temuan ke novels/<slug>/drift-report.md;
    --summary: cetak ringkasan saja (hitungan per kategori + temuan
    level/entitas yang belum ditinjau) — untuk cek cepat tiap N bab di
    workflows/continue-writing.md.
    Tandai temuan yang memang disengaja:
      npm run novel:audit -- <slug> --accept <ID> --reason "alasan"
    Tandai SEMUA temuan level/entitas arc dengan satu alasan (keputusan
    menyeluruh, mis. seluruh arc sengaja ditulis sebagai twist):
      npm run novel:audit -- <slug> --accept-all [--arc N] --reason "alasan"
    Gate pre-commit (tanpa slug — audit semua novel serial):
      npm run novel:audit -- --gate
    Gagal (exit 1) bila ada temuan level/entitas yang belum ditinjau di
    novels/<slug>/audit-review.md. Dipanggil otomatis pre-commit + CI.

  publish
    npm run novel:publish -- <slug>
    Gate terakhir: QC strict + --complete harus lolos penuh, lalu README di-set
    status "Complete" + completed hari ini, dan build situs dijalankan.
    Novel serial juga wajib lolos gate audit drift (temuan level/entitas yang
    belum ditinjau di audit-review.md menggagalkan publish).
    Publikasi ke publik terjadi lewat push ke main (CI + Vercel).

  status
    npm run novel:status
    Dasbor posisi semua novel di pipeline: jumlah bab, kata, band, outline,
    continuity-report, status.
`;

// ---------------------------------------------------------------- scaffold

function opt(argv, name) {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : null;
}

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // buang diakritik (é → e)
    .replace(/[^a-z]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

function validateSlug(slug) {
  if (!/^[a-z][a-z-]*$/.test(slug)) {
    console.error(
      `Slug tidak valid: "${slug}". Wajib kebab-case, ASCII, tanpa angka (mis. "sang-penjaga-malam").`,
    );
    process.exit(1);
  }
}

function scaffold(argv) {
  const title = opt(argv, "--title");
  if (!title) {
    console.error('Pakai: npm run novel:scaffold -- --title "Judul Novel" [opsi...]');
    process.exit(1);
  }

  const slug = opt(argv, "--slug") || slugify(title);
  if (!slug) {
    console.error("Tidak bisa menurunkan slug dari judul — berikan --slug secara eksplisit.");
    process.exit(1);
  }
  validateSlug(slug);
  if (existsSync(join(NOVELS_DIR, slug))) {
    console.error(`Folder novels/${slug}/ sudah ada.`);
    process.exit(1);
  }

  const genre = opt(argv, "--genre") || "Fiksi";
  const universe = opt(argv, "--universe");
  const parallel = opt(argv, "--parallel");
  const tone = opt(argv, "--tone") || "";
  const protagonist = opt(argv, "--protagonist") || "";
  const description = opt(argv, "--description") || "";
  const chapters = Number(opt(argv, "--chapters") || 20);
  const language = opt(argv, "--language") || "Indonesian";

  // Mode serial panjang: outline per-arc + world-state persist. Total bab =
  // arcs × cpa (default 8 × 250 = 2000); outline awal hanya jendela arc 1.
  const serial = argv.includes("--serial");
  const arcCount = serial ? Number(opt(argv, "--arcs") || 8) : 0;
  const cpa = serial ? Number(opt(argv, "--cpa") || 250) : 0;
  const totalTarget = serial ? arcCount * cpa : chapters;

  if (parallel) {
    if (parallel === slug) {
      console.error("--parallel tidak boleh menunjuk ke novel itu sendiri.");
      process.exit(1);
    }
    if (!existsSync(join(NOVELS_DIR, parallel))) {
      console.error(`Novel pasangan "${parallel}" tidak ditemukan di novels/.`);
      process.exit(1);
    }
  }

  const dir = join(NOVELS_DIR, slug);
  mkdirSync(dir, { recursive: true });

  writeFileSync(join(dir, "README.md"), readmeTemplate({ title, slug, genre, universe, tone, protagonist, description, language, parallel, serial }));
  writeFileSync(join(dir, "bible.md"), bibleTemplate(title));
  writeFileSync(join(dir, "outline.md"), outlineTemplate(title, serial, arcCount, cpa, totalTarget));
  if (serial) {
    writeFileSync(join(dir, "arcs.md"), arcsTemplate(title, arcCount, cpa, totalTarget));
    writeFileSync(join(dir, "world-state.md"), worldStateTemplate(title));
  }
  writeFileSync(join(dir, "cover-prompt.md"), coverPromptTemplate(title));
  writeFileSync(join(dir, "continuity-report.md"), continuityStub(title));

  console.log(`\n✓ Skeleton ${slug} dibuat di novels/${slug}/`);
  console.log("  README.md · bible.md · outline.md · cover-prompt.md · continuity-report.md");
  if (serial) console.log("  + serial: arcs.md · world-state.md (mode serial panjang)");
  if (parallel) {
    if (addParallelDeclaration(parallel, slug)) {
      console.log(`✓ novels/${parallel}/README.md ← deklarasi parallel dua arah ditambahkan`);
    } else {
      console.log(`✓ novels/${parallel}/README.md sudah menyebut "${slug}" — tidak diubah`);
    }
  }
  console.log("");
  console.log("Langkah berikutnya:");
  console.log(`  1. Isi bible.md (kanon nama, sistem kekuatan, protagonis/antagonis) dan outline.md`);
  console.log(`     — jangan tulis bab sebelum keduanya siap (lihat skill novel-factory-v4-pro-plus).`);
  if (serial) {
    console.log(`  2. [SERIAL] Isi arcs.md (peta arc bab 1–${totalTarget}) lalu world-state.md.`);
    console.log(`     Alur tulis: bab mengikuti jendela arc aktif di outline.md; tiap arc selesai,`);
    console.log(`     tambahkan baris bab arc berikutnya + audit kontinuitas (workflows/serial-long-form.md).`);
    console.log(`     Gate otomatis: bab di luar rentang arc arcs.md = gagal verifikasi.`);
  }
  if (universe) {
    console.log(`     ⚠ Novel dalam universe "${universe}" wajib mengisi \`order\` di README.md`);
    console.log(`       (nomor urut baca serial) — tanpa itu novel tidak muncul di halaman universe.`);
  }
  if (parallel) {
    console.log(`     ✓ \`parallel: "${parallel}"\` sudah ditulis di README baru; pasangan ikut`);
    console.log(`       membalas deklarasi (dua arah) — pastikan \`order\` juga terisi.`);
  } else if (universe) {
    console.log(`       Bila paralel dengan novel lain, jalankan scaffold dengan`);
    console.log(`       --parallel "<slug pasangan>" atau isi frontmatter secara manual.`);
  }
  console.log(`  2. Tulis chapter-1.md → novel langsung muncul di situs saat build.`);
  console.log(`  3. Cek tiap tahap:  npm run novel:check ${slug}`);
  console.log(`  4. Novel selesai:   npm run novel:publish ${slug}`);
}

function readmeTemplate({ title, slug, genre, universe, tone, protagonist, description, language, parallel, serial }) {
  // Novel ber-universe wajib mengisi `order` (urutan baca serial) — tanpa itu
  // novel tidak muncul di halaman universe; QC (novel:check/publish/verify)
  // menggagalkan bila masih kosong. `parallel` diisi slug novel yang menceritakan
  // peristiwa yang sama dari sisi lain (dua arah: pasangannya juga harus menyebut
  // novel ini) — dibiarkan kosong bila novel tidak paralel. `serial: true`
  // mengaktifkan mode serial panjang (arcs.md + world-state.md wajib).
  const universeLine = universe ? `universe: "${universe}"\norder: ""\n` : "";
  const parallelLine = universe || parallel ? `parallel: ${parallel ? `"${parallel}"` : '""'}\n` : "";
  const serialLine = serial ? `serial: true\n` : "";
  return `---
title: "${title}"
slug: "${slug}"
${universeLine}${parallelLine}${serialLine}genre: "${genre}"
tone: "${tone}"
language: "${language}"
protagonist: "${protagonist}"
description: "${description}"
status: "In Progress"
started: "${TODAY}"
completed: ""
---

# ${title}

**<Satu baris kait bergaya sampul.>**

## Sinopsis

<Paragraf 1: dunia dan protagonis sebelum semuanya berubah.>
<Paragraf 2: kejadian pemicu dan apa yang jadi taruhan.>
<Paragraf 3: kekuatan penentang dan harga yang harus dibayar protagonis.>

## Karakter

- **<Nama> (<usia>)**: <peran satu baris>
- **<Nama> (<usia>)**: <peran satu baris>
- **<Nama>**: <antagonis, satu baris>

## Sistem <Nama Sistem Kekuatan>

<Dua sampai empat baris: apa yang bisa dilakukan, apa harganya, apa batasnya.
Versi lengkap ada di bible.md.>
`;
}

function bibleTemplate(title) {
  return `# Bible: ${title}

Terakhir diperbarui: bab 0
Sudah diungkap ke pembaca sampai: bab 0

## Kanon Nama

Ejaan baku. Semua nama proper di bab mana pun harus ada di sini.

### Karakter
| Nama baku | Peran | Catatan |
|---|---|---|
| <Nama> | <peran> | <usia/ciri> |

### Tempat
| Nama baku | Catatan |
|---|---|
| <Tempat> | <ciri, jangan tertukar dengan tempat lain — latar imajiner, bukan bumi nyata> |

### Faksi
| Nama baku | Tujuan | Cara mengenali |
|---|---|---|
| <Faksi> | <tujuan> | <ciri> |

### Item & istilah
| Nama baku | Apa itu |
|---|---|
| <Istilah> | <definisi> |

## Protagonis

- **Wound**: <satu kejadian konkret di masa lalu>
- **Lie**: "<keyakinan salah, orang pertama>"
- **Want**: <tujuan luar yang menggerakkan plot>
- **Need**: <yang sebenarnya dibutuhkan, berlawanan dengan Want>
- **Kepribadian**: <3–4 sifat yang terlihat di halaman, bukan label psikologi>
- **Kekuatan / Kelemahan**: <yang membuatnya mampu · yang membuatnya jatuh>
- **Suara**: <panjang kalimat> · <register: aku/kamu atau saya/Anda> · <satu kebiasaan bicara>

## Antagonis

- **Wound / Lie / Want / Need**: <sama seperti di atas>
- **Kepribadian / Kekuatan / Kelemahan**: <kompetensinya terbukti lewat kerugian nyata, bukan reputasi>
- **Pembelaan dirinya**: <satu paragraf yang terdengar masuk akal>
- **Jadwalnya**: <apa yang dia capai di bab berapa, andaikan protagonis tidak menghalangi>

## Tokoh pendukung

| Nama | Tujuan sendiri | Penanda suara | Ciri fisik/kebiasaan |
|---|---|---|---|
| <Nama> | <tujuan> | <suara> | <ciri> |

## Relasi

| Pasangan | Saling menginginkan apa | Menyembunyikan apa | Siapa yang berkuasa |
|---|---|---|---|
| <A & B> | <keinginan> | <rahasia> | <siapa> |

## Sistem Kekuatan: <Nama>

- **Bisa**: <batas atas yang jelas>
- **Harga**: <dibayar segera, terlihat, bertambah>
- **Siapa yang bisa memakai**: <...>
- **Tidak bisa**: <daftar batas eksplisit — ini yang membuat klimaks dipercaya>
- **Sudah didemonstrasikan di bab**: <...>

## Timeline

| Bab | Hari/waktu | Lokasi akhir | Siapa hadir |
|---|---|---|---|
| 1 | <waktu> | <lokasi> | <siapa> |

Jarak tempuh antar lokasi: <isi, ini sumber paradoks paling umum>

## Chekhov's Gun

| Ditanam di bab | Apa | Sudah ditembakkan? |
|---|---|---|
| <bab> | <apa> | <ya/belum> |

Aturan: apa pun yang diberi penekanan tak biasa harus terpakai dalam 10 bab.

## Siapa tahu apa

| Fakta | Diketahui siapa | Sejak bab |
|---|---|---|
| <fakta> | <siapa> | <bab> |

## Suara & Gaya Novel

- **POV / tense**: <orang pertama / ketiga terbatas> · <masa kini / lampau>. Pemegang POV per bab dicatat di outline.
- **Register**: <aku/kamu, saya/Anda, gue/lo; campur kode teknis atau daerah — dan kapan register bergeser>
- **Tekstur bahasa**: <padat-minimalis / kaya-sensorik / di antaranya; panjang kalimat khas>
- **Ritme**: <adegan aksi: kalimat pendek, kata kerja kuat · refleksi: boleh panjang, maksimal dua berturut-turut>
- **Batas genre (dilarang di novel ini)**: <larangan konkret, misal: tidak ada penjelasan gaib eksplisit>
- <konvensi khusus, misal: istilah teknis selalu miring saat pertama muncul>
`;
}

function outlineTemplate(title, serial, arcCount, cpa, totalTarget) {
  // Mode serial: tabel bab hanya jendela arc 1 (cpa baris). Saat arc 1 selesai,
  // baris bab arc berikutnya ditambahkan — tabel tumbuh per arc, tidak dihapus.
  const rows = [];
  const rowCount = serial ? cpa : totalTarget;
  for (let n = 1; n <= rowCount; n++) {
    rows.push(`| ${n} | <POV> | <adegan> | <perubahan status X → Y> | |`);
  }
  const targetLine = serial
    ? `Target: ${totalTarget} bab @ 1.500–2.500 kata (serial panjang, ${arcCount} arc × ${cpa} bab)`
    : `Target: ${totalTarget} bab @ 1.500–2.500 kata`;
  return `# Outline: ${title}

${targetLine}

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
| <bab> | <capaian> |

## Subplot

| Subplot | Kenalan (bab) | Sentuhan (bab) | Resolusi (bab) |
|---|---|---|---|
| <subplot> | <bab> | <bab> | <bab> |

${serial ? `## Arc aktif

Mode serial: tabel bab di bawah hanya jendela ARC 1. Saat arc 1 rampung,
proyek arc berikutnya di arcs.md lalu tambahkan baris bab arc 2 di bawah ini
(jangan hapus baris yang sudah ditulis). Jangan tulis bab di luar arc aktif.

` : ``}## Bab

Satu baris per bab. Format: perubahan status → status lama jadi status baru.
Status diisi "selesai" setelah bab ditulis dan lolos quality gate.

| Bab | POV | Adegan | Perubahan status | Status |
|---|---|---|---|---|
${rows.join("\n")}
`;
}

/**
 * Peta arc keseluruhan (mode serial panjang). Baris tabel adalah KONTRAK:
 * check-novels.mjs membaca rentang bab dari baris `| N | X–Y | ... |` — format
 * baris tidak boleh diubah. Tambahkan baris arc sebelum arc itu ditulis.
 */
function arcsTemplate(title, arcCount, cpa, totalTarget) {
  const rows = [];
  for (let a = 1; a <= arcCount; a++) {
    const start = (a - 1) * cpa + 1;
    const end = a * cpa;
    rows.push(
      `| ${a} | ${start}–${end} | <judul arc> | <tujuan yang harus tercapai> | <keadaan akhir dunia saat arc selesai> | Planned |`,
    );
  }
  return `# Arcs: ${title}

Mode serial panjang — peta arc dari bab 1 sampai target. Satu baris per arc;
bab berurutan, tidak boleh tumpang tindih, tidak boleh ada bab di luar arc.
**Tambahkan baris arc sebelum arc itu ditulis** — bab di luar rentang arc
terdeklarasi menggagalkan verifikasi (check-novels).

Target: ${totalTarget} bab · ${arcCount} arc × ${cpa} bab

## Peta Arc

| Arc | Bab | Judul arc | Tujuan | Keadaan akhir dunia | Status |
|---|---|---|---|---|---|
${rows.join("\n")}

## Catatan lintas arc

- <foreshadow panjang yang ditanam di arc awal untuk arc jauh — Chekhov's Gun lintas arc>
- <entitas/institusi yang harus bertahan sampai akhir>
- <aturan yang tidak boleh dilanggar di arc mana pun>
`;
}

/**
 * "Memori kerja" serial — state yang benar SEKARANG, bukan rencana. Wajib
 * sinkron dengan bab terakhir yang ditulis (header "Terakhir diperbarui: bab N"
 * dicek otomatis). Rencana masa depan tinggal di arcs.md/outline.md, bukan di sini.
 */
function worldStateTemplate(title) {
  return `# World State: ${title}

Terakhir diperbarui: bab 0
Arc aktif: —

Catatan: file ini adalah memori kerja serial — satu-satunya tempat yang wajib
sinkron dengan bab terakhir yang ditulis. Update tiap selesai menulis bab
(atau tiap batch). Yang tertulis di sini harus benar "sekarang", bukan "nanti".

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
`;
}

function coverPromptTemplate(title) {
  return `# ${title} — Cover Image Prompt

## Concept

<Dua sampai empat kalimat Bahasa Indonesia: siapa yang terlihat, sedang apa,
di mana, dan kontras visual apa yang membawa tema novel. Bukan sinopsis plot —
hanya yang kelihatan di satu gambar diam.>

## Prompt (siap tempel ke AI image generator)

\`\`\`
<Prompt Bahasa Inggris, satu paragraf, siap salin. Wajib memuat, berurutan:
subjek (usia, etnis, rambut, pakaian — spesifik) · aksi dan pose · latar dan
propertinya · sumber cahaya dan arahnya · mood · palet warna dalam kata ·
gaya seni · "No text on the image." · "Portrait orientation (3:4 aspect ratio).">
\`\`\`

## Style

- **Genre**: <sama dengan field \`genre\` di README>
- **Mood**: <2-4 kata sifat>
- **Art style**: <digital painting semi-realistis / cat air / dsb. Sebutkan juga yang BUKAN>
- **Lighting**: <arah dan sifat cahaya; sebut sumber utamanya>

## Color Palette

| Role | Hex | Description |
|------|-----|-------------|
| Background | \`#000000\` | <peran warna ini di gambar> |
| Warm accent | \`#000000\` | <...> |
| Cold accent | \`#000000\` | <...> |
| Earth tone | \`#000000\` | <...> |
| Highlight | \`#000000\` | <...> |

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

## Lokasi File CoverSetelah generate, simpan sebagai \`public/covers/<slug>.webp\`.
`;
}

function continuityStub(title) {
  return `# Continuity Report: ${title}

Status: belum ada bab (skeleton dari scaffold).

Laporan ini wajib diperbarui tiap ±10 bab dan sebelum novel dinyatakan selesai
(lihat workflows/continuity-check.md di skill novel-factory-v4-pro-plus) —
tanpa laporan yang lengkap, novel tidak bisa dipublikasikan (novel:publish).
`;
}

/**
 * Balas deklarasi parallel di README novel pasangan: tambah/menambahkan slug
 * novel baru ke field `parallel`. Bila pasangan belum punya field, ditambahkan
 * setelah `universe` (atau `slug` bila tanpa universe). Bila sudah punya nilai
 * lain, digabung menjadi array. Mengembalikan true bila README diubah.
 */
function addParallelDeclaration(partnerSlug, newSlug) {
  const p = join(NOVELS_DIR, partnerSlug, "README.md");
  if (!existsSync(p)) {
    console.error(`✗ ${p} tidak ada — tidak bisa menambah deklarasi parallel.`);
    process.exit(1);
  }
  const text = readFileSync(p, "utf8");
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.error(`✗ ${p} tidak punya frontmatter — tidak bisa menambah deklarasi parallel.`);
    process.exit(1);
  }
  const fm = fmMatch[1];
  const lineRe = /^parallel:\s*(.*)$/m;
  const m = fm.match(lineRe);

  let newFm;
  if (m) {
    if (m[1].trim().includes(newSlug)) return false; // sudah menyebut — biarkan
    newFm = fm.replace(lineRe, `parallel: ${mergeParallelValue(m[1].trim(), newSlug)}`);
  } else if (fm.match(/^(order:[^\n]*\n)/m)) {
    newFm = fm.replace(/^(order:[^\n]*\n)/m, `$1parallel: "${newSlug}"\n`);
  } else if (fm.match(/^(universe:[^\n]*\n)/m)) {
    newFm = fm.replace(/^(universe:[^\n]*\n)/m, `$1parallel: "${newSlug}"\n`);
  } else if (fm.match(/^(slug:[^\n]*\n)/m)) {
    newFm = fm.replace(/^(slug:[^\n]*\n)/m, `$1parallel: "${newSlug}"\n`);
  } else {
    newFm = `parallel: "${newSlug}"\n` + fm;
  }

  writeFileSync(
    p,
    text.slice(0, fmMatch.index) + "---\n" + newFm + "\n---" + text.slice(fmMatch.index + fmMatch[0].length),
  );
  return true;
}

/** Gabungkan nilai YAML `parallel` lama dengan slug baru (string → array). */
function mergeParallelValue(existing, newSlug) {
  const t = existing.trim();
  if (t.startsWith("[")) {
    if (t.includes(newSlug)) return t;
    return t.replace(/\]\s*$/, `, "${newSlug}"]`);
  }
  const slug = t.replace(/^"+|"+$/g, "").trim();
  if (slug === newSlug) return t;
  if (!slug) return `"${newSlug}"`;
  return `["${slug}", "${newSlug}"]`;
}

// ---------------------------------------------------------------- check

function check(argv) {
  const slug = argv[0];
  const strict = argv.includes("--strict");
  if (!slug) {
    console.error("Pakai: npm run novel:check <slug> [--strict]");
    process.exit(1);
  }
  const args = ["scripts/check-novels.mjs", "--novel", slug, "--mechanical"];
  if (strict) args.push("--strict");
  const res = spawnSync(process.execPath, args, { stdio: "inherit" });
  process.exit(res.status ?? 1);
}

// ---------------------------------------------------------------- audit

function audit(argv) {
  const slug = argv[0];
  const gate = argv.includes("--gate");
  if (!slug && !gate) {
    console.error("Pakai: npm run novel:audit -- <slug> [--arc N] [--report]  |  -- <slug> --accept <ID>  |  -- --gate");
    process.exit(1);
  }
  const res = spawnSync(process.execPath, ["scripts/audit-arc.mjs", ...argv], {
    stdio: "inherit",
  });
  process.exit(res.status ?? 1);
}

// ---------------------------------------------------------------- publish

function publish(argv) {
  const slug = argv[0];
  if (!slug) {
    console.error("Pakai: npm run novel:publish <slug>");
    process.exit(1);
  }
  const dir = join(NOVELS_DIR, slug);
  if (!existsSync(dir)) {
    console.error(`novels/${slug}/ tidak ditemukan.`);
    process.exit(1);
  }

  console.log(`\n=== Publish ${slug} — gate QC strict ===\n`);
  const gate = spawnSync(
    process.execPath,
    ["scripts/check-novels.mjs", "--novel", slug, "--mechanical", "--strict", "--complete"],
    { stdio: "inherit" },
  );
  if (gate.status !== 0) {
    console.error("\n✗ QC gagal — novel belum layak terbit. Perbaiki dulu, lalu ulangi publish.");
    process.exit(1);
  }

  // Gate audit drift (khusus novel serial): temuan level/entitas yang belum
  // ditinjau di audit-review.md menggagalkan publish — novel terbit harus
  // bebas drift yang belum dikonfirmasi. Tinjau: npm run novel:audit --
  // <slug> --accept <ID> --reason "...", atau perbaiki world-state/bab.
  if (readmeSerial(dir)) {
    console.log(`\n=== Publish ${slug} — gate audit drift ===\n`);
    const drift = spawnSync(process.execPath, ["scripts/audit-arc.mjs", slug, "--gate"], {
      stdio: "inherit",
    });
    if (drift.status !== 0) {
      console.error("\n✗ Gate audit drift gagal — tinjau temuan level/entitas atau perbaiki world-state/bab, lalu ulangi publish.");
      process.exit(1);
    }
  }

  const readmePath = join(dir, "README.md");
  const readme = readFileSync(readmePath, "utf8");
  const fm = readme.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) {
    console.error(`✗ ${readmePath} tidak punya frontmatter — tidak bisa di-set Complete.`);
    process.exit(1);
  }
  let body = fm[1].replace(/^status: ".*"$/m, `status: "Complete"`);
  body = body.replace(/^completed: ".*"$/m, `completed: "${TODAY}"`);
  writeFileSync(
    readmePath,
    readme.slice(0, fm.index) + "---\n" + body + "\n---" + readme.slice(fm.index + fm[0].length),
  );
  console.log(`✓ README.md → status "Complete", completed "${TODAY}"`);

  console.log("\n=== Build situs ===\n");
  // Windows: spawn npm.cmd langsung bisa gagal EINVAL di lingkungan tertentu
  // (Git Bash / beberapa konfigurasi) — jalankan lewat cmd.exe dengan string
  // tetap (tidak ada input pengguna, jadi aman). Linux/CI: npm langsung.
  const build =
    process.platform === "win32"
      ? spawnSync("cmd.exe", ["/d", "/s", "/c", "npm run build"], { stdio: "inherit" })
      : spawnSync("npm", ["run", "build"], { stdio: "inherit" });
  if (build.status !== 0) {
    console.error("\n✗ Build gagal — novel ada di disk tapi situs tidak terbit.");
    process.exit(1);
  }

  console.log(`\n✓ ${slug} TERBIT.`);
  console.log(`  - Pratinjau lokal : npm run preview → /novel/${slug}`);
  console.log(`  - Publikasi publik: push ke main → CI novel-qc.yml verifikasi → Vercel deploy.`);
}

// ---------------------------------------------------------------- status

function chapterNumber(file) {
  const m = file.match(/^chapter-(\d+)\.md$/);
  return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
}

/**
 * Progres serial untuk status(): "serial · arc 2/8" — arc yang menaungi bab
 * terakhir, atau "serial" bila arcs.md belum punya baris arc. Parse baris tabel
 * arcs.md (format kontrak sama dengan check-novels.mjs).
 */
function arcProgress(base, lastN) {
  const p = join(base, "arcs.md");
  if (!existsSync(p)) return "serial";
  const arcs = [];
  for (const m of readFileSync(p, "utf8").matchAll(/^\|\s*\d+\s*\|\s*(\d+)\s*[-–—]\s*(\d+)\s*\|/gm)) {
    arcs.push({ start: parseInt(m[1], 10), end: parseInt(m[2], 10) });
  }
  if (arcs.length === 0) return "serial";
  const idx = arcs.findIndex((a) => lastN >= a.start && lastN <= a.end);
  return idx >= 0 ? `serial · arc ${idx + 1}/${arcs.length}` : "serial";
}

// Hitungan kata platform-independent (identik Windows & Linux CI), mereplikasi
// konvensi `wc -w` Git Bash: token yang seluruhnya em/en-dash ("—"/"–")
// tidak dihitung (GNU wc Linux menghitungnya — penyebab CI vs lokal beda hasil).
function countWords(path) {
  const text = readFileSync(path, "utf8");
  return text
    .split(/\s+/)
    .filter(Boolean)
    .filter((tok) => !/^[—–]+$/.test(tok))
    .length;
}

function wordCounts(paths) {
  return new Map(paths.map((p) => [p, countWords(p)]));
}

/** README frontmatter `serial: true`? */
function readmeSerial(base) {
  const p = join(base, "README.md");
  if (!existsSync(p)) return false;
  return /^serial:\s*true\s*$/m.test(readFileSync(p, "utf8"));
}

function status() {
  const dirs = readdirSync(NOVELS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((n) => !n.startsWith(".")) // folder temp/sistem (mis. .tmp.drivedownload)
    .sort();

  const rows = [];
  for (const name of dirs) {
    const base = join(NOVELS_DIR, name);
    let title = name;
    let novelStatus = "—";
    const readmePath = join(base, "README.md");
    if (existsSync(readmePath)) {
      // README lama ada yang memakai "--- " dengan spasi di belakang — toleransi.
      const fm = readFileSync(readmePath, "utf8").match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*/)?.[1] || "";
      const v = (k) => fm.match(new RegExp(`^${k}:\\s*"([^"]*)"\\s*$`, "m"))?.[1] ?? "";
      title = v("title") || name;
      novelStatus = v("status") || "—";
    }

    const chapters = readdirSync(base)
      .filter((f) => /^chapter-\d+\.md$/.test(f))
      .sort((a, b) => chapterNumber(a) - chapterNumber(b));

    if (chapters.length === 0) {
      const s0 = novelStatus === "—" ? "" : novelStatus;
      const tag0 = readmeSerial(base) ? " · serial" : "";
      rows.push({ slug: name, title, bab: "0", kata: "0", band: "—", outline: "—", kont: "—", status: `scaffold${s0 ? ` (${s0})` : ""}${tag0}` });
      continue;
    }

    const paths = chapters.map((c) => join(base, c));
    const counts = wordCounts(paths);
    const words = paths.reduce((sum, p) => sum + (counts.get(p) ?? 0), 0);
    const range = EXCEPTIONS[name] || BAND;
    const outOfBand = paths.filter((p) => {
      const w = counts.get(p) ?? 0;
      return w < range.min || w > range.max;
    }).length;

    const outlinePath = join(base, "outline.md");
    const selesai = existsSync(outlinePath)
      ? (readFileSync(outlinePath, "utf8").match(/selesai/g) || []).length
      : -1;
    const continuity = existsSync(join(base, "continuity-report.md")) ? "✓" : "✗";
    const serialTag = readmeSerial(base) ? ` · ${arcProgress(base, chapterNumber(chapters[chapters.length - 1]))}` : "";

    rows.push({
      slug: name,
      title,
      bab: String(chapters.length),
      kata: words.toLocaleString("id-ID"),
      band: outOfBand === 0 ? "✓" : `${outOfBand}✗`,
      outline: selesai < 0 ? "—" : `${selesai}/${chapters.length}`,
      kont: continuity,
      status: `${novelStatus}${serialTag}`,
    });
  }

  const pad = (s, n) => String(s).padEnd(n);
  console.log("\nPipeline novel — status semua folder novels/\n");
  console.log(
    `${pad("slug", 26)}${pad("bab", 5)}${pad("kata", 10)}${pad("band", 5)}${pad("outline", 10)}${pad("kont", 5)}status`,
  );
  console.log("-".repeat(70));
  for (const r of rows) {
    console.log(
      `${pad(r.slug, 26)}${pad(r.bab, 5)}${pad(r.kata, 10)}${pad(r.band, 5)}${pad(r.outline, 10)}${pad(r.kont, 5)}${r.status}`,
    );
  }
  console.log(
    "\nband = bab di luar 1.500–2.500 kata · outline = penanda selesai/jumlah bab · kont = continuity-report",
  );
}

// ---------------------------------------------------------------- main

const [cmd, ...rest] = process.argv.slice(2);
switch (cmd) {
  case "scaffold":
    scaffold(rest);
    break;
  case "check":
    check(rest);
    break;
  case "audit":
    audit(rest);
    break;
  case "publish":
    publish(rest);
    break;
  case "status":
    status();
    break;
  case "help":
  case undefined:
    console.log(HELP);
    break;
  default:
    console.error(`Perintah tidak dikenal: "${cmd}"\n`);
    console.log(HELP);
    process.exit(1);
}
