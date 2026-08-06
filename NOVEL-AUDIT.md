# Novel Audit

Kondisi `novels/` per 2026-08-06, dihitung ulang setelah pemilik repo menghapus 91 bab sampah. **Tidak ada file di `novels/` yang diubah oleh audit ini.** Ini daftar kerja untuk perbaikan berikutnya.

Cara memperbaiki: `.claude/skills/novel-factory-v4-pro-plus/workflows/revise-chapter.md`.

> **Angka di sini cepat basi.** Gemini Spark menulis ke `novels/the-void-alchemist/` secara otomatis (~1,6 bab/jam saat tidak kena rate limit) dan tidak membaca skill ini. Hitung ulang dengan script di bagian akhir sebelum memakai angka mana pun. Lihat §8 sebelum menyalahkan Spark atas isi tabel di bawah — mayoritas kerusakan bukan dari dia.

---

## Ringkasan

230 bab di 10 novel. Empat folder lain (`the-aegis-of-aether`, `the-chrono-engine`, `the-rust-alchemist`, `the-shadow-weaver`) tinggal `README.md` + `cover-prompt.md` — babnya sudah dihapus, dan folder tanpa bab memang tidak muncul di indeks situs (`src/lib/novels.ts:165`).

| Masalah | Bab terdampak | Dari 230 |
|---|---|---|
| Di bawah 1.200 kata (batas gagal keras F6) | **175** | 76% |
| `# Bab N:` (H1) di body — judul dobel di situs | **160** | 70% |
| Tanpa dialog sama sekali | **71** | 31% |
| Pembuka berupa ringkasan beat ber-`...` | **69** | 30% |
| Di atas 3.000 kata | 46 | 20% |
| Kalimat/paragraf diulang verbatim | 42 | 18% |
| Novel tanpa `bible.md` | **14 dari 14** | 100% |
| Novel tanpa `outline.md` | **14 dari 14** | 100% |
| Novel tanpa `cover-prompt.md` | 0 dari 14 | 0% |

Satu bab bisa kena beberapa masalah sekaligus.

Yang berubah sejak hitungan sebelumnya: penghapusan 91 bab membuang hampir semua novel dengan duplikasi berat, jadi **padding turun dari 45% ke 18%**. Sebagai gantinya masalah dominan sekarang adalah **bab terlalu pendek** — 76%, naik dari 54%. Dua penyakit yang berlawanan arah; yang tersisa condong ke arah tipis, bukan gemuk.

---

## Per novel

| Novel | Bab | Duplikat | H1 | Tanpa dialog | <1.200 | >3.000 | Prioritas |
|---|---|---|---|---|---|---|---|
| `the-iron-karma` | 15 | 15 | 15 | 0 | 0 | 15 | **1 — rewrite penuh** |
| `the-thread-shop` | 13 | 12 | 13 | 0 | 0 | 13 | **1 — rewrite penuh** |
| `gods-in-jars` | 15 | 11 | 15 | 0 | 0 | 15 | **1 — rewrite penuh** |
| `the-astral-sovereign` | 70 | 0 | 70 | 69 | 70 | 0 | **2 — hapus H1, tambah dialog, perpanjang** |
| `the-host` | 15 | 1 | 15 | 0 | 12 | 0 | 3 — perbaikan bertarget |
| `lantern-of-night` | 15 | 2 | 15 | 0 | 8 | 3 | 3 — perbaikan bertarget |
| `the-neon-cipher` | 8 | 1 | 8 | 1 | 6 | 0 | 3 — perbaikan bertarget |
| `the-clockwork-astra` | 6 | 0 | 6 | 1 | 6 | 0 | 3 — perbaikan bertarget |
| `the-void-alchemist` | 4 | 0 | 4 | 0 | 4 | 0 | 4 — aktif ditulis Spark, lihat §8 |
| `kidung-bayang-batavia` | 70 | 0 | 0 | 0 | 70 | 0 | 4 — perpanjang saja |

`kidung-bayang-batavia` masih satu-satunya novel yang bersih di ketiga pemeriksaan mekanis (duplikat, H1, dialog), dan `chapter-3.md`-nya tetap layak dikutip sebagai contoh prosa "baik" di `reference/prose-craft.md`.

**Tapi ia bukan acuan panjang.** Ke-70 babnya berkisar 367–578 kata — median 428, jauh di bawah batas gagal keras 1.200. Pakai dia sebagai contoh kalimat dan adegan, bukan sebagai target ukuran bab.

---

## 1. Bab terlalu pendek — masalah terbesar sekarang

175 bab di bawah 1.200 kata. Terkonsentrasi di dua novel besar yang masing-masing 70 bab: `kidung-bayang-batavia` (367–578 kata) dan `the-astral-sovereign` (semuanya <1.200).

Ini bukan sekadar angka kurang. Bab 400–800 kata umumnya hanya memuat satu suasana dan satu potongan percakapan — tidak cukup ruang untuk perubahan status yang bisa dirumuskan dalam satu kalimat. Memperbaikinya berarti menambah adegan, bukan menambah kalimat ke adegan yang sudah ada.

Jangan pernah menutup selisih dengan mengulang kalimat. Itulah yang menghasilkan masalah §5.

## 2. H1 di body — judul dobel

160 bab diawali `# Bab N: Judul` di body. Situs sudah merender judul lewat `<h1>{chapter.title}</h1>` (`src/pages/chapter/[novelSlug]/[chapterSlug].astro:48`), jadi pembaca melihat judul dua kali.

Ini satu-satunya masalah di daftar ini yang bisa diperbaiki secara mekanis: hapus baris H1 pertama dan baris kosong sesudahnya. Tidak mengubah isi cerita.

Deteksi:

```bash
for f in novels/*/chapter-*.md; do sed '1,4d' "$f" | grep -q '^# ' && echo "$f"; done
```

## 3. Tanpa dialog

71 bab tidak punya satu pun baris dialog — hampir seluruhnya `the-astral-sovereign` (69 dari 70). Bab-bab ini rangkaian narasi suasana: pembaca diberi tahu bahwa sesuatu terjadi, bukan diperlihatkan.

## 4. Pembuka berupa ringkasan beat

69 bab dibuka dengan paragraf yang merangkum isi bab dalam potongan ber-`...`. Ini outline yang bocor ke prosa. Sekarang seluruhnya di `the-astral-sovereign`.

Contoh, paragraf pertama `the-astral-sovereign/chapter-1.md`:

> Hujan asam mengguyur lorong-lorong sempit Jakarta Sub-5... Malam di Jakarta Sub-5 selalu berbau tembaga cair, oli mesin tua, dan uap air beracun yang membubung dari saluran limbah bawah tanah.

Kalimat pertama adalah label beat, bukan prosa. Kalimat kedua sudah mengerjakan tugasnya dengan benar. Perbaikannya sering cukup dengan membuang kalimat pertama.

## 5. Padding: paragraf diulang verbatim

42 bab, turun dari 144 setelah penghapusan. Penyebabnya target 5.000–6.000 kata di `CONFIG.md` lama tanpa materi cerita yang cukup — model mengejar angka dengan menyalin-tempel.

Sisa kasusnya terkonsentrasi di tiga novel yang semuanya juga >3.000 kata — korelasi yang bukan kebetulan:

| Novel | Bab duplikat | Kasus terparah |
|---|---|---|
| `the-iron-karma` | 15 dari 15 | ~70 kalimat berulang tiap bab |
| `the-thread-shop` | 12 dari 13 | `chapter-9.md` — 276 kalimat berulang |
| `gods-in-jars` | 11 dari 15 | `chapter-15.md` — 68 kalimat berulang |

Bab semacam ini tidak bisa ditambal dengan menghapus duplikatnya — sisanya sekitar 400 kata tanpa adegan. Harus ditulis ulang.

Deteksi:

```bash
sed '1,4d' novels/<slug>/chapter-N.md | grep -oE '[^.!?]{25,}[.!?]' | sed 's/^ *//' | sort | uniq -d
```

## 6. Tidak ada `bible.md` atau `outline.md` di satu novel pun

14 dari 14 novel tidak punya file kanon maupun file beat. Inilah akar drift nama, dan alasan skill mewajibkan keduanya sebelum bab mana pun ditulis. Template: `.claude/skills/novel-factory-v4-pro-plus/templates/`.

Sebaliknya, `cover-prompt.md` ada di **14 dari 14** — satu-satunya konvensi repo yang dipatuhi 100%, dan sebabnya ia sekarang jadi langkah wajib di `workflows/new-novel.md`.

## 7. Drift nama — pelajaran dari `the-chrono-engine`

Novel ini sudah tidak punya bab lagi (dihapus), tapi kasusnya layak dicatat karena inilah alasan `bible.md` diwajibkan.

README menyebut protagonis **Kaelen Sora** dan pendamping **Lyra Vance**. `chapter-1.md` memakai nama itu. Mulai `chapter-2.md` dan seterusnya, nama berganti jadi **Leo Vance** dan **Maya Kirana** — dan tidak pernah kembali. Antagonis ikut bergeser: Baron Vane / Obsidian Ministry di README menjadi Master Chronos / Chrono Syndicate di bab.

Tidak ada satu file pun yang memegang daftar nama baku, jadi tidak ada yang bisa mendeteksi pergeseran itu selain membaca ulang 14 bab.

Kalau novel ini ditulis ulang: `README.md` dan `cover-prompt.md`-nya masih ada dan jadi acuan. Tulis `bible.md` lebih dulu.

## 8. Bab yang dihasilkan Gemini Spark

Spark menulis otomatis dan **tidak membaca skill `novel-factory-v4-pro-plus`** — tapi ia membaca `README.md` novelnya. Saat ini satu-satunya novel yang ditulis Spark adalah `the-void-alchemist`.

Novel lain **bukan** karya Spark. Timestamp-nya membongkar itu: `kidung-bayang-batavia` dan `the-astral-sovereign` masing-masing 70 bab yang lahir dalam rentang **3–4 menit** (3 Agustus 21:16–21:21). Itu script yang menumpahkan hasil generasi massal, bukan penulisan bertahap. Pola yang sama di `the-iron-karma` (15 bab / 6 menit), `the-thread-shop` (13 bab / 4 menit), `gods-in-jars`, `the-neon-cipher`, `the-clockwork-astra`. Semua penyakit di §1–§5 berasal dari cara kerja itu, bukan dari Spark.

Spark bekerja jauh lebih lambat: 4 bab dalam 2,5 jam (6 Agustus 08:16–10:43), jadi **~1,6 bab/jam** dan sering tertahan rate limit.

| File | Kata | H1 | Baris dialog | Duplikat |
|---|---|---|---|---|
| `chapter-1.md` | 821 | ya | 2 | 0 |
| `chapter-2.md` | 799 | ya | 7 | 0 |
| `chapter-3.md` | 457 | ya | 3 | 0 |
| `chapter-4.md` | 433 | ya | 2 | 0 |

**Yang sudah benar** — dan ini bagian yang mahal untuk diperbaiki kalau salah:

- Frontmatter valid. 4 baris, `title` dan `chapter` terkutip rapi.
- Nol duplikasi di keempat bab.
- **Kanon terjaga.** Protagonis `Renjiro Aksara` di README muncul konsisten di bab; tidak ada drift seperti `the-chrono-engine`. Nama pendukung (`Empu Sorogo`, `Ordo Alkimia`, `Obsidian Sanhedrin`, `Alya Kirana`) stabil lintas bab.

**Yang salah** — keduanya level prompt, bukan level kemampuan:

- **Selalu `# Bab N:` di body.** 4 dari 4. Melanggar aturan keras 3; judul dobel di situs.
- **Selalu di bawah 1.200 kata, dan makin memendek:** 821 → 799 → 457 → 433. Tren turun, bukan fluktuasi. Kalau dibiarkan, bab 10 akan di kisaran 200 kata.

Dua baris tambahan di prompt Spark menutup keduanya:

1. Jangan tulis heading `#` apa pun di body; judul sudah ada di frontmatter.
2. Panjang tiap bab 1.500–2.500 kata. Jangan pernah memenuhinya dengan mengulang kalimat.

Baris ketiga yang layak ditambahkan begitu filenya ada: baca `bible.md` dan `outline.md` sebelum menulis. Sekarang Spark menjaga kanon hanya dari README, yang tidak memuat aturan sistem kekuatan maupun beat per bab — cukup untuk 4 bab, tidak cukup untuk 40.

---

## Urutan kerja yang disarankan

1. **Setel prompt Spark** (§8) — dua baris, menutup satu-satunya sumber kerusakan yang masih bertambah. Jangan hentikan Spark; kanonnya sudah terjaga.
2. **Hapus H1 di 160 bab.** Mekanis, aman, langsung memperbaiki tampilan situs.
3. **Buat `bible.md` + `outline.md` untuk tiap novel** dengan merekonstruksi kanon dari README + bab yang ada. Tanpa ini, revisi apa pun menciptakan drift baru.
4. **Rewrite prioritas 1** (43 bab: `the-iron-karma`, `the-thread-shop`, `gods-in-jars`) — bab per bab, dari bab 1 maju, perbarui bible setelah tiap bab.
5. **`the-astral-sovereign`** (70 bab): hapus H1, buang kalimat pembuka ringkasan, tambah adegan berdialog, perpanjang ke target.
6. **Perpanjang `kidung-bayang-batavia`** (70 bab) tanpa merusak prosanya — satu-satunya novel yang gayanya sudah benar.

Coret entri di sini setiap kali sebuah bab lulus `reference/quality-gate.md`.

---

## Cara membuat ulang laporan ini

```bash
cd novels
printf '%-26s %5s %5s %5s %6s %6s %6s\n' NOVEL BAB DUP H1 NODLG "<1200" ">3000"
for d in */; do
  d=${d%/}; n=0; dup=0; h1=0; nod=0; sh=0; lg=0
  for f in "$d"/chapter-*.md; do
    [ -e "$f" ] || continue
    n=$((n+1))
    body=$(sed '1,4d' "$f")
    [ -n "$(printf '%s' "$body" | grep -oE '[^.!?]{25,}[.!?]' | sed 's/^ *//' | sort | uniq -d)" ] && dup=$((dup+1))
    printf '%s' "$body" | grep -q '^# ' && h1=$((h1+1))
    [ "$(printf '%s' "$body" | grep -c '"')" -eq 0 ] && nod=$((nod+1))
    w=$(printf '%s' "$body" | wc -w)
    [ "$w" -lt 1200 ] && sh=$((sh+1))
    [ "$w" -gt 3000 ] && lg=$((lg+1))
  done
  [ "$n" -eq 0 ] && continue
  printf '%-26s %5s %5s %5s %6s %6s %6s\n' "$d" $n $dup $h1 $nod $sh $lg
done
```
