# Workflow: Lanjut Menulis

Untuk "lanjutkan novel X" tanpa nomor bab tertentu, atau untuk menulis beberapa bab berturut-turut.

---

## 1. Tentukan posisi

```bash
ls novels/<slug>/chapter-*.md | sort -V | tail -3
wc -w novels/<slug>/chapter-*.md | tail -5
```

Bab berikutnya = nomor tertinggi + 1. Perhatikan lubang nomor: kalau ada `chapter-7.md` tapi tidak ada `chapter-6.md`, tanya pengguna sebelum melanjutkan — situs akan menampilkannya berurutan tanpa peringatan.

## 2. Periksa kesehatan novel sebelum menambah

Menambah bab di atas novel yang rusak memperbesar kerusakan. Cek cepat:

```bash
# Padding di bab-bab terakhir — output harus kosong
grep -oE '[^.!?]{25,}[.!?]' novels/<slug>/chapter-*.md | sed 's/^.*md://;s/^ *//' | sort | uniq -d | head

# Bible dan outline ada?
ls novels/<slug>/bible.md novels/<slug>/outline.md
```

- **Ada duplikat** → tawarkan `workflows/revise-chapter.md` lebih dulu. Kalau pengguna tetap ingin lanjut, catat di `NOVEL-AUDIT.md` dan lanjutkan.
- **Bible tidak ada** → buat sekarang dari `templates/bible.md`, rekonstruksi dari README + 3 bab terakhir. Jangan lanjut tanpa ini.
- **Outline tidak ada** → buat dari `templates/outline.md`, minimal untuk 5 bab ke depan.

## 3. Rekonstruksi keadaan sekarang

Baca dua bab terakhir dan catat:

| Hal | Nilai |
|---|---|
| Lokasi di akhir bab terakhir | |
| Waktu (hari, jam, musim) | |
| Siapa hadir, siapa terpisah | |
| Luka atau kerugian yang belum sembuh | |
| Pertanyaan terbuka yang menggantung | |
| Chekhov's gun yang menunggu | |

Cocokkan dengan bible. Kalau berbeda, bible yang salah — perbarui bible, jangan ubah bab yang sudah terbit.

## 4. Tulis

Jalankan `workflows/write-chapter.md` untuk bab N.

## 5. Kalau menulis beberapa bab berturut-turut

- **Selesaikan satu bab penuh — termasuk quality gate dan pembaruan bible — sebelum mulai bab berikutnya.** Menulis beberapa bab sekaligus adalah cara tercepat kehilangan konsistensi.
- Setiap 5 bab, jalankan audit tingkat novel di `reference/quality-gate.md`.
- Setiap 10 bab (dan sebelum masuk babak baru), jalankan `workflows/continuity-check.md` — laporan konsistensi lintas bab.
- Variasikan tipe adegan antar bab; jangan dua bab beruntun dengan intensitas sama.
- Berhenti di batas babak dan konfirmasi arah dengan pengguna sebelum masuk babak berikutnya.

### Mode serial: audit drift otomatis tiap N bab

Untuk novel dengan `serial: true` (mode serial panjang), audit drift bukan lagi
opsi akhir-arc — jalankan **otomatis tiap N bab ditulis** (default N = 5,
sesuaikan dengan ritme arc: arc aksi padat bisa tiap 3, arc tenang tiap 10):

```bash
npm run novel:audit -- <slug> --summary
```

1. **Jalankan setelah bab kelipatan N selesai + world-state diperbarui.**
2. **Tampilkan ringkasannya** — hitungan per kategori (Konteks/Tokoh/Level/
   Entitas/Item/Chekhov) dan status temuan level/entitas.
3. **Bila ada temuan level/entitas yang belum ditinjau** (baris `⚠ ... BELUM
   ditinjau`): BERHENTI menulis. Tinjau tiap temuan:
   - Temuan benar → perbaiki `world-state.md` (atau bab) sekarang, jangan
     ditunda — itulah fungsi audit di tengah arc.
   - Keputusan sadar (twist sengaja, diperbaiki arc berikutnya) → tandai:
     `npm run novel:audit -- <slug> --accept <ID> --reason "..."`.
   - Seluruh arc memang satu keputusan menyeluruh (mis. twist besar yang
     sengaja)? Tandai sekaligus:
     `npm run novel:audit -- <slug> --accept-all --reason "alasan"`.
   - Jangan lanjut ke bab berikutnya sebelum temuan level/entitas bersih —
     gate yang sama akan memblokir commit.
4. **Temuan non-blokir** (tokoh hilang, item, chekhov) → catat untuk ditangani
   di audit akhir arc (langkah ~70% di `serial-long-form.md`); tidak perlu
   menghentikan alur menulis.
5. Setelah 2×N bab (atau saat arc hampir selesai), jalankan juga versi penuh
   dengan laporan tersimpan: `npm run novel:audit -- <slug> --arc N --report`.

Alur singkat per batch:

```
Tulis bab N..N+4 → update world-state → npm run novel:audit -- <slug> --summary
→ tampilkan ringkasan → bereskan temuan level/entitas → lanjut batch berikutnya
```

### Mode paralel (opsional)

Diadaptasi dari `novel-architect`: tulis bab 1 dulu dengan tangan untuk mengunci suara, lalu luncurkan agent paralel untuk bab-bab berikutnya — asalkan **semua syarat di bawah terpenuhi**:

- Outline sudah penuh sampai bab terakhir yang akan ditulis, tiap bab punya perubahan status yang jelas.
- Bible lengkap dan mutakhir.
- ≥ 3 bab tersisa (untuk 1–2 bab, sekuensial lebih cepat dan aman).
- Lingkungan mendukung agent latar belakang (mis. `delegate_task` dengan `run_in_background=true`).

**Larangan keras:** jangan pernah menggenerasi banyak bab sekaligus tanpa bible/outline penuh. Itu persis sumber 70 bab rusak di `the-astral-sovereign` — massal tanpa kanon = duplikasi dan drift.

Setiap agent harus **mandiri** — prompt-nya memuat semua file konteks, syarat, dan larangan:

```
TUGAS: Tulis bab N dari novel <slug> sebagai prosa lengkap (1.500–2.500 kata).

FILE KONTEKS WAJIB DIBACA:
- novels/<slug>/bible.md        (kanon nama, sistem kekuatan, Chekhov's gun, "sudah diungkap sampai bab N")
- novels/<slug>/outline.md      (beat bab N — hanya beat ini)
- novels/<slug>/README.md       (metadata)
- novels/<slug>/chapter-(N-1).md (kontinuitas keadaan akhir)
- .claude/skills/novel-factory-v4-pro-plus/reference/prose-craft.md
- .claude/skills/novel-factory-v4-pro-plus/reference/quality-gate.md

ATURAN KERAS: [7 aturan dari SKILL.md — anti-duplikasi, tanpa H1, nama dari bible,
dialog, 1.500–2.500 kata, penutup spesifik]

OUTPUT: novels/<slug>/chapter-N.md — frontmatter persis \`title\` + \`chapter\`.

MUST DO: baca semua file konteks sebelum menulis; sambungkan lokasi, waktu, luka,
dan pertanyaan terbuka di akhir bab N−1.
MUST NOT: menambah kejadian di luar outline; mengganti suara yang sudah kunci;
meringkas alih-alih menampilkan; menulis "# Bab N" di body.
```

Setelah semua bab jadi, jalankan **review paralel** — satu agent per bab, prompt-nya: baca draf + bab tetangga + bible + outline, periksa bahasa/emosi/dialog/pacing, **revisi lembut** (jangan tambah kejadian, jangan ganti suara, hormati ambiguitas), simpan ulang. Lalu satu `workflows/continuity-check.md` untuk seluruh rentang.

Setelah semua agent selesai, tetap jalankan quality gate lapis 1 di tiap bab (`reference/quality-gate.md`) — output agent tidak pernah dikecualikan dari aturan.

## 6. Kalau novel selesai

1. Jalankan `workflows/continuity-check.md` untuk seluruh novel.
2. Tindaklanjuti isu yang penulis pilih lewat `workflows/revise-chapter.md`.
3. Perbarui `novels/<slug>/README.md`: `status: "Complete"` dan `completed` diisi tanggal.

---

## Checklist

- [ ] Nomor bab berikutnya benar, tidak ada lubang
- [ ] Bible dan outline ada dan mutakhir
- [ ] Keadaan akhir bab terakhir direkonstruksi sebelum menulis
- [ ] Tiap bab lulus quality gate sebelum bab berikutnya dimulai
- [ ] Kontinuitas dicek tiap 10 bab dan sebelum novel selesai
- [ ] [serial] `npm run novel:audit -- <slug> --summary` dijalankan tiap N bab (default 5)
- [ ] [serial] Temuan level/entitas ditinjau (`--accept`) atau diperbaiki sebelum lanjut
- [ ] `npm run build` sukses
