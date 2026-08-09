# Workflow: Discovery Novel

**Refleksi sebelum konstruksi. Kebenaran emosional sebelum logika naratif.** — diadaptasi dari skill `novel-architect`.

Gunakan ketika ide masih mentah — sebelum `bible.md`, `outline.md`, atau bab mana pun. Tujuan fase ini bukan menulis, tapi menemukan *mengapa* cerita ini ada, lalu menguncinya jadi satu file visi (`novels/<slug>/discovery.md`) yang menjadi sumber `bible.md`.

Jangan lompat ke scaffolding kalau premisnya masih berupa perasaan samar. Novel yang dibangun dari ide yang belum digali menghasilkan bab tipis — dan bab tipis adalah akar padding (lihat `NOVEL-AUDIT.md`).

---

## Mode

| Mode | Kapan | Proses |
|---|---|---|
| **Interaktif** | Ide mentah, pengguna hadir dan mau diajak bicara | Bagian per bagian, konfirmasi tiap bagian |
| **Quick** | Pengguna sudah tahu jawabannya, atau tidak mau ditanya | Tanya sekali semua jawaban, tulis langsung |

Spark (scheduler) **tidak** memakai workflow ini — ia menulis otomatis dari `bible.md` + `outline.md` yang sudah ada. Discovery adalah fase manusia + asisten.

---

## Format Konfirmasi (wajib di mode interaktif)

Setelah mengusulkan **satu bagian**, selalu tutup dengan:

> Apakah ini sesuai yang kamu pegang?
> 1. **Ya** — setujui dan lanjut ke bagian berikutnya
> 2. **Ubah** — sebut bagian mana yang disesuaikan
> 3. **Tulis ulang** — saya buat ulang dengan pendekatan lain

Aturan memori: simpan bagian yang sudah disetujui **di memori dulu**. Tulis `discovery.md` **sekali saja, saat semua bagian lengkap** — bukan per bagian. Jangan pernah menulis file dari bagian yang belum disetujui.

Nada: tenang, reflektif, tanpa buru-buru. Pantulkan kembali apa yang pengguna pegang dengan kata-kata sendiri sebelum menambahkan apa pun. Jangan memaksakan rumus.

---

## Bagian 1 — North Star

Minta premis mentah pengguna (beberapa kalimat cukup). Jangan dibentuk dulu — pantulkan kembali apa adanya:

> Yang aku dengar: [pantulan 2–3 kalimat, tanpa mengubah apa pun]

Lalu Format Konfirmasi. Yang disetujui di sini adalah **kompas** — semua bagian berikut harus konsisten dengannya.

## Bagian 2 — Premis jadi

Kembangkan North Star menjadi premis empat unsur (`reference/story-architecture.md`): **siapa** yang **menginginkan apa**, **dihalangi apa**, dengan **taruhan apa** kalau gagal.

Kalau satu unsur belum bisa diisi, jangan menebak — tanya. Premis yang belum punya keempat unsur akan melar tanpa arah.

## Bagian 3 — Tema

Pertanyaan: *Di luar plotnya, cerita ini sebenarnya tentang apa?* Rumuskan sebagai satu pernyataan + 2–3 pertanyaan kunci yang dijawab cerita.

Tema bukan moral. Kalau usulan terasa seperti nasihat, geser ke arah pertanyaan yang *dijelajahi*, bukan jawaban yang *dipaksakan*.

## Bagian 4 — Struktur

Usulkan struktur: tiga babak (default untuk 20–40 bab di repo ini — lihat `reference/story-architecture.md`), atau alternatif (hero's journey, arc karakter murni, bingkai non-linear). Jelaskan *bagaimana* struktur itu bekerja untuk cerita ini, bukan sekadar nama strukturnya.

## Bagian 5 — Genre

Tentukan: genre primer (yang memimpin janji dan bentuk klimaks), tone, **batas** (apa yang tidak akan terjadi di novel ini — ini yang melindungi cerita dari genre lain yang menyusup), dan janji pembaca (apa yang pembaca berhak harapkan).

Batas ditulis sebagai larangan konkret: `tidak ada penjelasan gaib yang eksplisit`, `tidak ada aksi perang massal`, `tidak ada romansa`. Baca `reference/genre-packs.md` untuk jebakan khas genre.

## Bagian 6 — Suara & Gaya

Tentukan:

- **POV dan tense** — orang pertama / ketiga terbatas; masa kini / lampau. Satu POV, konsisten (`reference/character.md`).
- **Register** — `aku/kamu`, `saya/Anda`, `gue/lo`; campur kode teknis atau daerah.
- **Tekstur bahasa** — padat-minimalis, kaya-sensorik, atau di antaranya; panjang kalimat khas.
- **Ritme** — cepat-terpotong untuk aksi, panjang-mengalir untuk refleksi (`reference/prose-craft.md`).
- **Pengaruh** — novel/nada yang jadi rujukan gaya (opsional, tapi membantu konsistensi lintas bab).

Yang disetujui di sini mengisi seksi **Suara & Gaya** di `bible.md` — jangan biarkan hanya hidup di `discovery.md`.

---

## Quick mode

Tanya sekali, semua bagian sekaligus (premis, tema, struktur, genre + batasnya, POV/register). Kalau jawabannya lengkap, tulis `discovery.md` langsung. Kalau ada yang kosong, gunakan mode interaktif untuk bagian itu saja.

---

## Setelah selesai

1. Tulis `novels/<slug>/discovery.md` dari `templates/discovery.md` — sekali, saat semua bagian disetujui.
2. Lanjut ke `workflows/new-novel.md`: slug → `bible.md` (isi dari discovery: premis → Protagonis/Antagonis, tema → bagian mana pun yang relevan, suara → seksi Suara & Gaya) → `outline.md` → dst.
3. `discovery.md` adalah dokumen visi yang **beku** — kalau arah berubah di tengah novel, perbarui `bible.md`, bukan discovery. Discovery adalah jejak *mengapa*; bible adalah kanon *apa yang terjadi sekarang*.

---

## Checklist

- [ ] North Star dipantulkan dan disetujui sebelum bagian lain
- [ ] Premis punya empat unsur: siapa, ingin apa, dihalangi apa, taruhan apa
- [ ] Tema dirumuskan sebagai pertanyaan yang dijelajahi, bukan moral
- [ ] Genre punya batas konkret, bukan cuma label
- [ ] Suara: POV, tense, register, tekstur diputuskan
- [ ] Format konfirmasi dipakai di tiap bagian
- [ ] `discovery.md` ditulis sekali, hanya setelah semua bagian disetujui
