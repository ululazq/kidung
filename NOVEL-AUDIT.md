# Novel Audit

Kondisi `novels/` per **2026-08-10**, setelah seluruh repositori ditulis ulang dan dituntaskan (audit sebelumnya 2026-08-06 menggambarkan 230 bab di 10 novel yang sudah tidak relevan). Angka di sini dihitung ulang langsung dari file.

**Metode:** hitung bab & kata per novel; band standar repo = **1.500–2.500 kata/bab**; wajib ada `bible.md`, `outline.md`, cover (`public/covers/<slug>.webp`), dan — sejak audit 2026-08-09 — `continuity-report.md`.

---

## Ringkasan

| Metrik | Nilai |
|---|---|
| Novel dengan bab | **43** |
| Total bab | **652** |
| Total kata | **±1.151.000** |
| Novel ber-status `Complete` | 43/43 |
| Novel dengan `bible.md` | 43/43 ✅ |
| Novel dengan `outline.md` | 43/43 ✅ |
| Novel dengan cover | 43/43 ✅ |
| Bab di bawah band (<1.500) | **18** (di 5 novel) |
| Bab di atas band (>2.500) | 19 (gods-in-jars 15 = pengecualian terdokumentasi; lantern-of-night 3 = disengaja; the-warden 1) |
| Novel dengan `continuity-report.md` | **14/43** |
| Novel tanpa tanggal `completed:` | 3 (bloodfall, the-deep-vow, the-rejoining) |
| Placeholder/lorem/TODO di bab | **0** ✅ |
| Folder tanpa bab | auren, skyroot (konsep), kidungverse (indeks universe) |

---

## 1. Bab di bawah band — satu-satunya kekurangan isi yang tersisa

**18 bab** di bawah 1.500 kata. Inilah daftar kerja utama.

| Novel | Bab terdampak | Kata | Prioritas |
|---|---|---|---|
| **the-host** | 8: ch7 (1.384), ch8 (886), ch9 (954), ch10 (847), ch12 (938), ch13 (783), ch14 (963), ch15 (791) | 8.546 → butuh ~3.500 kata lagi | **1** — separuh pad sudah selesai (ch1–6), lanjutkan |
| **the-aetherium-vow** | 6: ch3 (1.490), ch4 (1.487), ch5 (1.462), ch10 (1.484), ch13 (1.472), ch15 (1.471) | semuanya 1.460–1.490, butuh ~100 kata/bab | **2** — selisih tipis, pad cepat |
| **the-cinder-relic** | 2: ch3 (1.467), ch10 (1.499) | selisih ~15–35 kata/bab | 3 |
| **the-duet** | 1: ch13 (1.496) | selisih 4 kata | 3 |
| **the-remembering** | 1: ch5 (1.498) | selisih 2 kata | 3 |

Perhatian: batas 1.500 kata **termasuk frontmatter** (4 baris `---`). Enam bab aetherium dan empat bab kecil lainnya berada dalam 2–40 kata dari batas — cukup tambahan beberapa kalimat, bukan adegan baru.

## 2. Bab di atas band

| Novel | Bab | Catatan |
|---|---|---|
| gods-in-jars | 15/15 (rata-rata ±4.900) | **Pengecualian terdokumentasi** — novel format panjang, dibiarkan |
| lantern-of-night | 3 (ch1 4.847, ch2 3.505, ch3 3.907) | Disengaja: pembukaan atmosferik; dicatat di bible & continuity-report |
| the-warden | 1 | Satu bab di atas 2.500 — belum diaudit |

## 3. Outline: status "selesai" tidak konsisten

16 novel tidak memuat penanda `selesai` di outline-nya sama sekali: sang-pemangku-fajar, sang-pembawa-angin, sang-penyimpan-bilah, the-astral-sovereign, the-clockwork-astra, the-forge, the-godherd, the-knock, the-neon-cipher, the-prism, the-unhollowed, the-unstolen, the-warden, bloodfall (3/16), the-deep-vow (1/16), the-rejoining (2/16), the-duet (2/16), the-remembering (2/16), the-unbound (1/16), the-unwritten (2/16), the-last-teacher (1/16), the-scribes (4/16), the-unheard (4/16), pasar-subuh (2/10), pegadaian-bunga (4/12), sang-garuda (5/10), tangan-guntur (8/12).

Sebagian besar outline 16-bab tidak punya kolom status sama sekali (formatnya ringkasan bab, bukan tabel status) — ini bukan salah, tapi membuat status "Complete" di README tidak bisa diverifikasi dari outline. Rekomendasi: seragamkan kolom status, atau tandai README dengan jumlah bab terverifikasi.

## 4. Continuity report: 29 dari 43 belum ada

Sudah ada (14): kidung-bayang-batavia, lantern-of-night, pustaka-kabut-senja, sang-pembawa-pelita, serat-penempa-hampa, the-aegis-of-aether, the-aetherium-vow, the-astral-sovereign, the-cinder-relic, the-copper-relic, the-iron-karma, the-resonance-blade, the-shadow-compiler, the-shadow-forger.

Belum ada (29) — mayoritas novel 12–24 bab yang dirilis awal (bloodfall, gods-in-jars, kidung-tanah-karam, pasar-subuh, pegadaian-bunga, sang-garuda, sang-pemangku-fajar, sang-pembawa-angin, sang-penyimpan-bilah, tangan-guntur, the-clockwork-astra, the-deep-vow, the-duet, the-forge, the-godherd, the-host, the-knock, the-last-teacher, the-neon-cipher, the-prism, the-rejoining, the-remembering, the-scribes, the-unbound, the-unheard, the-unhollowed, the-unstolen, the-unwritten, the-warden).

## 5. Hal kecil

- **`completed:` kosong** di frontmatter: bloodfall, the-deep-vow, the-rejoining (3 novel selesai tanpa tanggal rilis).
- **Folder konsep tanpa bab:** `auren/` dan `skyroot/` (README + bible + compendium + timeline, tanpa chapter-1) — tidak muncul di situs, tidak ber-status. Putuskan: tulis babnya atau pindah ke arsip.
- **Cover:** semua 43 novel punya cover webp ✅ (6 terakhir ditambahkan 2026-08-10).

---

## Prioritas perbaikan

1. **Tuntaskan the-host** (8 bab, ~3.500 kata) — bab 1–6 sudah di band, tinggal 7–15.
2. **Pad selisih tipis** aetherium (6 bab), cinder (2), duet (1), remembering (1) — total ~700 kata.
3. **Isi `completed:`** di 3 novel (bloodfall, deep-vow, rejoining).
4. **Tulis continuity-report** untuk 29 novel yang belum (prioritas: yang baru dirilis/ber-relik unik).
5. **Putuskan nasib auren & skyroot** — konsep yang tidak pernah ditulis.
6. **Seragamkan status outline** atau verifikasi ulang klaim Complete via jumlah bab.

---

## Saran fitur website

Situs saat ini: beranda (search + filter genre/universe + kartu novel + cover), halaman novel (daftar bab), halaman bab, halaman universe, halaman tentang. Fitur yang layak ditambah, diurutkan dari yang paling berdampak:

1. **Mode baca (reader mode)** — halaman bab kini satu halaman penuh; tambah navigasi "Bab Sebelumnya / Berikutnya" di bawah konten + progress bar posisi baca. Ini fitur paling murah dan paling sering dipakai.
2. **Peta universe interaktif** — halaman `/universe/[name]` sudah ada; tambah grafik relasi antar novel (relik unik, karakter gema, istilah bersama dari compendium) supaya pembaca bisa menelusuri "alur paralel Bawah-Batavia" dari satu novel ke novel lain.
3. **Kontinuitas otomatis di halaman novel** — tampilkan "terakhir diaudit" + jumlah bab dalam band; novel dengan bab di bawah band (the-host, aetherium) diberi badge "sedang direvisi".
4. **Pencarian lintas konten** — search sekarang hanya judul/protagonis; perluas ke sinopsis, karakter pendukung, dan istilah (mis. cari "Konsorsium Kunci" → semua novel yang menyebutnya).
5. **Kutipan favorit / highlight** — setiap bab punya banyak kalimat kuat; tombol "salin kutipan" + daftar kutipan populer per novel menambah keterlibatan pembaca.
6. **Estimasi baca per bab** — `readingMinutes` sudah ada untuk novel; turunkan ke level bab (kata/bab ÷ 200) agar pembaca tahu komitmen waktunya.
7. **RSS/Atom feed** — repo terus menerima novel baru; feed "bab baru" membuat pengunjung tetap kembali tanpa harus cek manual.
8. **Dark mode & tipografi baca panjang** — bab 1.500–2.500 kata × 43 novel = konten panjang; pengaturan ukuran teks dan lebar kolom yang nyaman untuk baca panjang adalah investasi kecil dengan dampak besar.

---

## Cara membuat ulang angka di dokumen ini

```bash
cd novels
# bab di bawah band per novel
for d in */; do d="${d%/}"; [ -f "$d/chapter-1.md" ] || continue
  n=$(ls "$d"/chapter-*.md | wc -l); for i in $(seq 1 $n); do
    c=$(wc -w < "$d/chapter-$i.md" 2>/dev/null); [ "$c" -lt 1500 ] && echo "$d ch$i: $c"
  done; done
# ringkasan
echo "novel: $(for d in */; do [ -f "$d/chapter-1.md" ] && echo x; done | wc -l)"
echo "bab: $(ls */chapter-*.md | wc -l)  kata: $(wc -w */chapter-*.md | tail -1)"
echo "continuity-report: $(ls */continuity-report.md | wc -l)"
```
