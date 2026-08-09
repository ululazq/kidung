# Workflow: Revisi Bab

Untuk memperbaiki bab yang sudah ada — daftar kerjanya di `NOVEL-AUDIT.md`. Dua masalah terbesar sekarang: 175 bab di bawah 1.200 kata dan 160 bab dengan H1 di body.

Aturan dasar: **rewrite, bukan tambal.** Bab dengan paragraf berulang tidak bisa diselamatkan dengan menghapus duplikatnya — yang tersisa cuma 400 kata tanpa adegan. Yang dipertahankan adalah kejadian dan posisi cerita, bukan kalimatnya.

---

## 1. Diagnosis

```bash
FILE=novels/<slug>/chapter-N.md

grep -oE '[^.!?]{25,}[.!?]' "$FILE" | sed 's/^ *//' | sort | uniq -d   # duplikat
grep -n '^#' "$FILE"                                              # H1 di body
grep -c '"' "$FILE"                                               # jumlah dialog
wc -w "$FILE"                                                     # panjang
head -12 "$FILE"                                                  # frontmatter + pembuka
```

Klasifikasikan:

| Temuan | Tindakan |
|---|---|
| Duplikat masif, nol dialog | **Rewrite penuh** (langkah 3) |
| Pembuka ringkasan beat ber-`...` | Hapus paragraf itu, tulis pembuka adegan baru |
| `# Bab N:` di body | Hapus barisnya saja |
| Nama tidak cocok bible | Ganti nama, cek dampaknya ke bab lain |
| Frontmatter salah | Perbaiki sesuai `reference/output-contract.md` |
| Prosa lemah tapi utuh | Perbaikan bertarget (langkah 4) |

Perbaikan mekanis (H1, frontmatter) bisa langsung dikerjakan. Rewrite penuh perlu langkah 2.

## 2. Pastikan kanon ada

Rewrite butuh bible. Kalau `novels/<slug>/bible.md` belum ada, buat dari `templates/bible.md` dengan merekonstruksi dari README dan bab-bab sekitarnya. Ketika README dan bab bertentangan — seperti Kaelen Sora vs Leo Vance di `the-chrono-engine` — **README yang menang**, dan konfirmasi ke pengguna sebelum menyeragamkan.

## 3. Rewrite penuh

0. **Arsipkan draf lama dulu** (praktik dari `novel-architect`: jangan pernah menghapus versi lama tanpa jejak).

   ```bash
   mkdir -p .scratch/archive/<slug>
   cp novels/<slug>/chapter-N.md .scratch/archive/<slug>/chapter-N-$(date +%Y%m%d).md
   ```

   Kalau repo memakai git, versi lama juga tetap ada di history — arsip ini untuk perbandingan cepat tanpa membongkar git.

1. **Ekstrak yang harus dipertahankan.** Baca bab lama, tulis satu kalimat: apa yang berubah di bab ini menurut cerita? Lalu catat lokasi, tokoh hadir, dan apa yang diketahui pembaca di akhir bab.
2. **Cek bab tetangga.** Bab N−1 dan N+1 menentukan batas: keadaan awal dan keadaan akhir yang tidak boleh digeser, kecuali bab tetangga ikut direvisi.
3. **Tulis ulang dari nol** mengikuti `workflows/write-chapter.md` langkah 3–4. Jangan menyalin kalimat dari draf lama — kalimat lama itulah masalahnya.
4. **Pertahankan `title` dan `chapter`** kecuali judulnya memang salah.

## 4. Perbaikan bertarget

Untuk bab yang strukturnya sehat:

- Buang filter word (`merasakan bagaimana`, `tampak seperti`, `mulai untuk`) — lihat `reference/prose-craft.md`.
- Pecah paragraf raksasa; variasikan panjang kalimat.
- Ganti kalimat yang menilai tokoh dengan tindakan.
- Ganti penutup generik (`menyongsong hari baru`, pertanyaan retoris) dengan penutup spesifik.
- Tambah dialog kalau di bawah minimum — sebagai adegan baru, bukan tempelan.

### Prinsip revisi lembut (dari `novel-architect`)

Perbaikan bertarget adalah **revisi, bukan penulisan ulang** — suara penulis dipertahankan di atas segalanya:

- **Revisi pelan-pelan; jangan menimpa maksud.** Perbaiki bahasa, ritme, kejelasan emosi — bukan isi cerita.
- **Jelaskan emosi tanpa menjelaskannya.** Pertegas subteks; jangan tambah kalimat yang menilai.
- **Jangan tambah kejadian, tokoh, atau adegan baru.** Batas revisi: kata-kata yang sudah ada.
- **Jangan selesaikan konflik masa depan** dan jangan ungkap yang belum waktunya.
- **Hormati ambiguitas yang disengaja** — kalau penulis sengaja menggantung, biarkan menggantung.
- **Jangan menyeragamkan** suara tokoh ke satu pola; perbaiki tiap suara sesuai cirinya sendiri (`reference/character.md`).

## 5. Quality gate

Jalankan `reference/quality-gate.md` lengkap. Bab hasil revisi tunduk pada standar yang sama dengan bab baru.

## 6. Efek riak

Setelah bab tersimpan:

- Nama atau fakta yang berubah → cek bab lain: `grep -rn "NamaLama" novels/<slug>/`.
- Perbarui `bible.md` dan `outline.md`.
- Kalau revisi menggeser keadaan akhir bab, bab berikutnya kemungkinan ikut perlu direvisi. Catat, jangan diamkan.
- Coret entri bab tersebut di `NOVEL-AUDIT.md`.

## 7. Regresi

```bash
npm run build
```

---

## Merevisi satu novel penuh

Urut dari bab 1 ke belakang — kanon mengalir maju. Kerjakan satu bab per satuan kerja, dan perbarui bible setelah tiap bab. Merevisi 13 bab sekaligus tanpa memperbarui bible di antaranya akan menghasilkan drift baru.

---

## Checklist

- [ ] Diagnosis dijalankan, jenis kerusakan diklasifikasikan
- [ ] Bible ada sebelum rewrite
- [ ] Bab tetangga diperiksa; batas keadaan awal/akhir dihormati
- [ ] Tidak ada kalimat yang diselamatkan dari draf rusak
- [ ] Quality gate lapis 1 bersih
- [ ] Efek riak ke bab lain diperiksa
- [ ] Entri di `NOVEL-AUDIT.md` dicoret
