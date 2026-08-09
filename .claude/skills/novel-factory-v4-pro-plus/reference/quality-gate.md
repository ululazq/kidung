# Quality Gate

Jalankan sebelum menyimpan file apa pun ke `novels/`. Ada dua lapis: kondisi gagal keras (tidak boleh disimpan sama sekali) dan audit kualitas (perbaiki kalau bisa).

---

## Lapis 1 — Kondisi gagal keras

Satu saja terpenuhi, **jangan simpan**. Perbaiki dulu.

| # | Gagal kalau | Cara cek |
|---|---|---|
| F1 | Ada kalimat yang muncul lebih dari sekali | pindai + perintah di bawah |
| F2 | Paragraf pembuka berisi ringkasan beat ber-`...` | baca paragraf 1 |
| F3 | Ada baris diawali `#` di body bab | cari `^#` |
| F4 | Ada nama proper yang tidak ada di `bible.md` | cocokkan daftar |
| F5 | Tidak ada dialog | cari `"` |
| F6 | Jumlah kata < 1.200 atau > 3.000 | `wc -w` |
| F7 | Frontmatter tidak sesuai kontrak | lihat `output-contract.md` |
| F8 | Bab menyelesaikan konflik yang belum dibangun | baca kalimat penutup |

**Soal F6 vs target 1.500–2.500 di `SKILL.md`.** Dua angka itu bukan kontradiksi, tapi dua lapis berbeda:

- **1.500–2.500 = target.** Rentang yang dituju setiap bab. Meleset artinya beat-nya kegemukan atau ketipisan — kembali ke `outline.md`, pecah atau gabungkan.
- **1.200–3.000 = batas gagal keras.** Di luar rentang ini bab **tidak boleh disimpan** sama sekali.

Bab 1.350 kata boleh disimpan tapi harus disadari kurang; bab 1.150 kata tidak boleh. Jangan pernah menutup selisihnya dengan mengulang kalimat — itu langsung memicu F1.

### Perintah bantu

```bash
FILE=novels/<slug>/chapter-N.md

# Body saja, tanpa 4 baris frontmatter. Semua cek di bawah pakai ini.
BODY=$(sed '1,4d' "$FILE")

# F1 — kalimat duplikat. Output HARUS kosong.
echo "$BODY" | grep -oE '[^.!?]{25,}[.!?]' | sed 's/^ *//' | sort | uniq -d

# F1b — paragraf duplikat. Output HARUS kosong.
echo "$BODY" | grep -v '^$' | sort | uniq -d

# F3 — heading di body. Output HARUS kosong.
echo "$BODY" | grep -n '^#'

# F5 — baris berdialog. Harus > 0, idealnya belasan.
echo "$BODY" | grep -c '"'

# F6 — jumlah kata body (angka inilah yang dihitung situs).
echo "$BODY" | wc -w
```

`sed '1,4d'` mengasumsikan frontmatter persis empat baris seperti kontrak (`---`, `title`, `chapter`, `---`). Kalau tidak empat baris, frontmatter-nya sudah salah — itu F7.

Kalau shell tidak tersedia, lakukan manual: baca kalimat pertama setiap paragraf berurutan dan cari yang kembar.

---

## Lapis 2 — Audit kualitas

Bukan pemblokir, tapi perbaiki yang bisa.

**Prosa**
- [ ] Tidak ada filter word bertumpuk (`merasakan bagaimana`, `tampak seperti`, `mulai untuk`) — lihat `prose-craft.md`.
- [ ] Panjang kalimat bervariasi; tidak semua 25–35 kata.
- [ ] Minimal dua indra selain penglihatan dipakai.
- [ ] Tidak ada paragraf yang menilai tokoh dengan kata sifat (`berani`, `bijaksana`) alih-alih menunjukkannya.
- [ ] Kalimat penutup spesifik — bukan `menyongsong hari baru`, bukan pertanyaan retoris ke pembaca.

**Adegan**
- [ ] Bab punya satu perubahan status yang bisa dirumuskan dalam satu kalimat.
- [ ] Tiap adegan berbentuk GCD atau RDD, bukan rangkaian suasana.
- [ ] Jeda adegan pakai `---`, bukan baris kosong ganda.

**Dialog**
- [ ] Ada minimal dua pertukaran yang mengubah informasi, hubungan, atau keputusan.
- [ ] Suara tokoh bisa dibedakan tanpa tag.
- [ ] Tidak ada tokoh yang menjelaskan hal yang sudah sama-sama diketahui.

**Kanon**
- [ ] Semua nama, ejaan, dan istilah cocok `bible.md`.
- [ ] Aturan sistem kekuatan tidak dilanggar; harga tetap dibayar.
- [ ] Timeline dan jarak tempuh konsisten dengan bab sebelumnya.
- [ ] POV konsisten; tidak ada informasi di luar jangkauan pemegang POV.

**Kontinuitas**
- [ ] Cocok dengan akhir bab sebelumnya (lokasi, luka, waktu, siapa hadir).
- [ ] Chekhov's gun baru dicatat ke `bible.md`.
- [ ] Tidak mengulang pengungkapan yang sudah terjadi di bab sebelumnya.

---

## Setelah lulus

1. Simpan bab.
2. Perbarui `novels/<slug>/bible.md`: nama baru, foreshadow baru, posisi timeline, "sudah diungkap sampai bab N".
3. Perbarui `novels/<slug>/outline.md`: tandai bab selesai; sesuaikan beat berikutnya kalau ada yang bergeser.
4. Kalau novel selesai, ubah `status` dan isi `completed` di README.

---

## Audit tingkat novel

Jalankan tiap 5 bab:

```bash
# Nama yang muncul di seluruh novel — bandingkan dengan bible.
grep -ohE '\b[A-Z][a-z]+ [A-Z][a-z]+\b' novels/<slug>/chapter-*.md | sort | uniq -c | sort -rn | head -30

# Bab yang panjangnya menyimpang.
wc -w novels/<slug>/chapter-*.md
```

Lonjakan nama yang tidak ada di bible = drift. Bab yang jauh lebih panjang dari sisanya hampir selalu padding.

---

## Sebelum novel dinyatakan selesai

- [ ] Tiap bab lulus Lapis 1.
- [ ] `README.md`: `status: "Complete"` dan `completed` diisi tanggal.
- [ ] `cover-prompt.md` ada dan terisi.
- [ ] Tidak ada blok meta di ekor bab (`Ringkasan perubahan`, `End Hook`, catatan adegan).
- [ ] Tidak ada script sementara ikut ter-commit (`debug*.py`, `trim*.ps1`, dan sejenisnya).
- [ ] Bab 1 dan bab terakhir dibaca berurutan — akhir harus menggemakan awal.
- [ ] `npm run build` sukses. Build menangkap frontmatter yang rusak; jalankan sebelum commit, bukan sesudah.
