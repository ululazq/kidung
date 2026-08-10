# Novel Audit

Kondisi `novels/` per **2026-08-10**, setelah seluruh repositori ditulis ulang dan dituntaskan (audit sebelumnya 2026-08-06 menggambarkan 230 bab di 10 novel yang sudah tidak relevan). Angka di sini dihitung ulang langsung dari file.

**Metode:** hitung bab & kata per novel; band standar repo = **1.500–2.500 kata/bab**; wajib ada `bible.md`, `outline.md`, cover (`public/covers/<slug>.webp`), dan — sejak audit 2026-08-09 — `continuity-report.md`.

---

## Ringkasan

| Metrik | Nilai |
|---|---|
| Novel dengan bab | **43** |
| Total bab | **652** |
| Total kata | **±1.156.000** |
| Novel ber-status `Complete` | 43/43 |
| Novel dengan `bible.md` | 43/43 ✅ |
| Novel dengan `outline.md` | 43/43 ✅ |
| Novel dengan cover | 43/43 ✅ |
| Bab di bawah band (<1.500) | **0** ✅ |
| Bab di atas band (>2.500) | 18 (gods-in-jars 15 = pengecualian terdokumentasi; lantern-of-night 3 = disengaja) |
| Novel dengan `continuity-report.md` | **43/43** ✅ |
| Novel tanpa tanggal `completed:` | **0** ✅ |
| Placeholder/lorem/TODO di bab | **0** ✅ |
| Folder tanpa bab | auren, skyroot (konsep), kidungverse (indeks universe) |

---

## 1. Bab di bawah band — bersih

Seluruh 43 novel kini dalam band 1.500–2.500 kata per bab; **0 bab di bawah standar**. Daftar kerja 18 bab dari audit sebelumnya dituntaskan 2026-08-10:

- **10 bab selisih tipis** (aetherium ch3/4/5/10/13/15, cinder ch3/10, duet ch13, remembering ch5) dipad ke 1.501–1.536 dengan beat penutup sesuai suara tiap novel. Sekaligus penutup cinder ch3 yang nyaris verbatim dengan aetherium ch3 ditulis ulang agar khas api Raka.
- **the-host ch7–15** (8 bab, 783–1.384 → 1.500–2.060) dituntaskan bersama audit: timeline ch7–10 disatukan dengan bible (+17 → +20), ledger harga disatukan (Shadow Step debut **ch8**; 12 utas = 12 tahun; 244 tahun dibagi separuh Rahwana → 122 tahun = **150 tahun biologis** Arif), akhir ch7 tidak lagi berangkat ke Prambanan (bentrok ch8), typo & slip register dibersihkan. Total the-host kini ±23.154 kata, 15/15 bab dalam band.

## 2. Bab di atas band

| Novel | Bab | Catatan |
|---|---|---|
| gods-in-jars | 15/15 (rata-rata ±4.900) | **Pengecualian terdokumentasi** — novel format panjang, dibiarkan |
| lantern-of-night | 3 (ch1 4.847, ch2 3.505, ch3 3.907) | Disengaja: pembukaan atmosferik; dicatat di bible & continuity-report |

The-warden ch14 (2.613) **diaudit 2026-08-10 dan dipangkas ke 2.473** — dalam band repo. Pemangkasan hanya menghapus pengulangan nyaris-verbatim (melanggar aturan bible "tidak mengulang kalimat") dan frasa yang baru saja ditegakkan; semua beat kanon utuh (sumpah pembukaan, pengembalian ingatan, kejatuhan Ilara, Seren bebas, hook Hollow King). Bible kini mencatat bab klimaks boleh memanjang sampai 2.500. |

## 3. Outline: status "selesai" — 43/43 memverifikasi Complete (2026-08-10)

Seluruh 43 outline kini memverifikasi status Complete dengan penanda per-bab yang seragam dan bisa dihitung (`grep -c selesai outline.md` ≥ jumlah bab):

- **Format bullet** (22 outline) — setiap bab diberi `**Status**: selesai` (langsung setelah header bab; format `## Bab` yang sudah memakai pola sang-garuda/tangan-guntur disisipkan di akhir blok).
- **Format tabel** (5 outline) — kolom `Status` dengan `| selesai |` per baris: the-astral-sovereign (24), the-clockwork-astra (10, kolom beat-code di-rename `Status` → `Beat` lalu ditambah kolom `Status` selesai), the-neon-cipher (10, sama), pasar-subuh (10, kolom ditambah), pegadaian-bunga (12, sel kosong diisi).
- Hasil: 322 penanda ditambahkan di format bullet + 64 baris tabel; nol outline tersisa yang belum memverifikasi. Sebelumnya: 13 tanpa penanda sama sekali + 14 parsial (daftar lama sudah usang).

## 4. Continuity report: 43/43 tuntas (2026-08-10)

Semua 43 novel kini punya `continuity-report.md`. Batch terakhir (13 novel Kidungverse 12–24 bab) ditulis 2026-08-10: gods-in-jars, kidung-tanah-karam, pasar-subuh, pegadaian-bunga, sang-garuda, sang-pemangku-fajar, sang-pembawa-angin, sang-penyimpan-bilah, tangan-guntur, the-clockwork-astra, the-godherd, the-last-teacher, the-neon-cipher. Bersama batch itu dua koreksi bible diterapkan:
- **the-neon-cipher/bible.md** — header `Terakhir diperbarui: bab 7` → `bab 10 (TUNTAS)` (isi bible sudah memuat demonstrasi sampai bab 10; hanya header yang tertinggal).
- **sang-pembawa-angin/bible.md** — demo bab 12 menulis "makam Ika"; bab 12 yang terbit memakai **Eleyna** (nama kanon tabel karakter) → dikoreksi ke Eleyna.

Setiap laporan mencakup: Ringkasan, Konsistensi terkonfirmasi (nama kanon, sistem kekuatan, rantai setup→payoff, siapa-tahu-apa, timeline, panjang bab), Perbaikan yang diterapkan, Potensi masalah, dan Catatan lintas novel (nama gema, pinjaman faksi lintas novel, tema klaster tanpa-trade-off).

## 5. Hal kecil

- **`completed:`** kini terisi di semua 43 novel ✅ (bloodfall, the-deep-vow, the-rejoining diisi 2026-08-09 — tanggal rilis mereka, sama dengan `started`, sesuai git log).
- **Folder konsep tanpa bab:** `auren/` dan `skyroot/` (README + bible + compendium + timeline, tanpa chapter-1) — tidak muncul di situs, tidak ber-status. Putuskan: tulis babnya atau pindah ke arsip.
- **Cover:** semua 43 novel punya cover webp ✅ (6 terakhir ditambahkan 2026-08-10).

---

## 6. Audit universe Auren (2026-08-10)

Universe Auren (11 novel: the-prism, the-warden, the-unstolen, the-forge, the-knock, the-unhollowed, the-unwritten, the-unheard, the-scribes, the-duet, the-remembering) diaudit menyeluruh: tier+level, usia-ke-level, mekanik Chosen, Voice of the Hollow, dan aturan Sight. Dokumen kanon: `novels/auren/bible.md`.

**Audit tier+level — nol kombinasi invalid tersisa.** ~40 kombinasi tier+level di luar tabel kanon diperbaiki di 6 novel (the-unstolen, the-forge, the-knock, the-unheard, the-scribes; the-prism & the-warden dari audit sebelumnya). Tabel kanon: Iron 1–10, Bronze 11–20, Silver 21–30, Gold 31–40, Emerald 41–50, Sapphire 51–60, Amethyst 61–70, Diamond 71–80, Starfall 81–90, Ascent 91–100. Contoh: Rook (Silver 34/35–37/"37 → Bronze 41" → Gold/Emerald), Talia (Bronze 21 → Silver 33 → Silver 21 → Gold 33), Yara (Silver 14 → Bronze 14), Vask (Gold 42 → Emerald 42), Wren the-knock ("Gold 30, dua tier" → Silver 30, dua level; endpoint Gold 42 → Emerald 42), Iris (Iron 12 → Bronze 12 — angka rusak tetap valid, fluktuasi tetap tema), Wren the-unheard (Amethyst 71 → Diamond 71), NPC gema (Bronze 8/9 → Iron 8/9, Gold 44/43 → Emerald 44/43). Verifikasi otomatis: `grep` semua `Tier N` di 11 novel = kosong untuk kombinasi invalid.

**Keputusan kanon lintas novel:**
- **Ilara** — Sil'vael ~350+ (kanon the-warden), bukan "Humans ~40" (bible the-unhollowed dikoreksi); Amethyst 63 (the-warden) → Sapphire 55 (the-unhollowed) setelah melepas level curian saat menebus diri.
- **Vesper** — Wraithborn ~55 (bukan Humans); level publik Gold tier = topeng/samaran (Hearth Wraithborn tak terbaca Sight, kanon 5a — "Gold tier" = catatan Order), asli Sapphire 58; diperbaiki di bible the-unstolen + the-unhollowed + kalimat kecepatan ch10.
- **Toren** (the-duet) — Diamond (puncak cap Humans 80), bukan Starfall (81+ mustahil tanpa mencuri).
- **Veylan** (the-unwritten) — pengecualian umur penjaga artefak kunci (~1.500 th vs ~800 Sil'vael) didokumentasikan di bible + tabel ras universe.
- **Eryx Valmor** — Starfall 90 (menembus cap 80 lewat mencuri), bukan "satu-satunya Ascent" (Ascent = 91–100).
- **Hierarki Cult**: Hollow King → Hollow Queen (Ilara) → **Voice of the Hollow** (Old Mara, the-prism → Vesper, the-unstolen) → 3 **Voice regional** (Voice of the North = Ilara; 2 lain belum bernama). Bisikan Heart of the World = Hollow King sendiri, bukan gelar. Dua terminologi the-warden ch7/8 dikoreksi (Ilara = Voice regional, bukan "Voice of the Hollow").
- **Aturan Sight 3a** (kanon baru): Sight membaca catatan sistem; pengecualian keterbacaan: Wraithborn, Unwritten, Liminal, Vael, hollow ekstrem (Old Mara — "Diamond, level 80+, tak bisa kubaca"), pembacaan parsial Prism (Arden — Kindling Stone tak bisa memuatnya, sistem mencatat "Level 1 Iron, Swordarm"). Mask hanya Vesper + Arden — keduanya konsisten aturan.
- **Resolusi Lorin** (the-warden/the-unstolen): level Sil'vael ~800 yang tak terbaca Sight dijawab — **ujung terdalam "Hearth yang bermimpi"**: pemahaman delapan abad membuat sistem tak bisa menuliskannya sebagai angka (catatan jadi "bekas mimpi" tak terbaca); cermin Prism (Arden: terlalu besar untuk Kindling Stone). Jarang = hanya Sil'vael yang hidup ~800 th dan mencapai kedalaman itu. Dikunci di bible the-warden + auren/bible.md (aturan 3a + baris ras).
- **Nama gema Auren**: Old Mara (the-prism, Voice of the Hollow, tewas) vs Mara (the-unhollowed, Chosen rekindled) — dicatat di auren/bible.md, jangan disatukan.

---

## 7. Audit mask kekuatan Kidungverse (2026-08-10)

Audit "level publik vs kekuatan asli" untuk universe Kidungverse (30 novel): **nol inkonsistensi ditemukan**.

- **Kidungverse tidak punya sistem level numerik** — nol "Level N"/tier di seluruh 30 bible. Topeng level ala Auren (publik < asli lewat stat yang terbaca) secara struktural tidak berlaku; sistem kekuatan Kidungverse naratif (sirkuit memori, godframe, aetherium, cinder, relik, Jiwa, Ancient Skills berharga tahun).
- **Hanya 2 karakter bermask** (kekuatan publik rendah, asli tinggi) — keduanya konsisten dengan sistemnya:
  - **Mu Yuan** (the-godherd): Jiwa Tongkat Gembala (Kelas Bawah) = **Lonceng Gembala yang menyamar** — bible eksplisit "pusaka klan Mu yang menyamar" (300 th); penaksiran bab 1/5 membaca rendah karena relik menyamar (cahaya abu-abu redup). ✓
  - **Gu Yan** (the-last-teacher): Jiwa Batu Tinta (Kelas Bawah) = terakhir **Jalur Tinta yang terhapus**; aksara 师 samar di dasar batu (bab 1:36-38) = tell kanon; penaksir tidak mengenal jalur yang sudah dihapus dari pengetahuan sistem. ✓
- **Kasus lain yang tampak "tersembunyi" = premis naratif, bukan mask**, dan tidak bertabrakan dengan sistem novelnya: Shadow Compiler Arisya (proses yang rampung bab 13, bukan stat tersembunyi), Sealmark Sorin (bloodfall — rahasia identitas, mark tetap bekerja), vessel lantern-of-night, dewa dalam guci gods-in-jars, dual consciousness the-host.
- Verifikasi: nol sistem numerik, nol relik "teredup/tersembunyi" di 8 novel relik, nol penanda "(tampak)/(nyata)" selain dua kasus di atas.
- **Verifikasi bab-ke-bab (susulan):** penaksiran "Kelas Bawah" konsisten di semua titik — Mu Yuan bab 1:26 & bab 5:32 (batu registrasi, cahaya abu-abu redup) memberi vonis identik; Gu Yan bab 1:30 & gema penaksir bab 4:94 ("Kelas Bawah" + "jimat") tidak menamai jalur. Tidak ada yang membaca relik/aksara terlalu dini: aksara 师 baru dinamai bab 16:134 (bab akhir); Gu Yan sendiri tidak bisa membacanya (bab 1:38); pengakuan Wei Wudi (bab 8:96, menyebut warisan Klan Mu) dan dewa matahari (bab 12:92, "lonceng sungguhan") adalah pengenalan lore oleh tokoh berpengetahuan di titik tengah/klimaks — topeng menipu sistem penaksir, bukan pembaca lore. ✓
- **Sapu penaksiran publik non-level (susulan):** Jiwa adalah satu-satunya sistem penaksiran kekuatan orang di Kidungverse. Semua "Sangha/Guild/peringkat" lain ternyata bukan sistem penilaian yang bisa dimanipulasi: (a) **Penempa Sangha** (aetherium-vow, cinder-relic, aegis, copper-relic, resonance-blade, shadow-forger, serat-penempa-hampa, sang-pembawa-pelita, pustaka-kabut-senja, iron-karma, clockwork-astra, neon-cipher, host) = jaringan penempa sirkuit, tanpa peringkat; (b) **Dewan Sangha** (astral-sovereign) & **Sangha Network** (kidung-tanah-karam) = dewan/arsip, bukan penilaian; (c) **Mark Skyroot** (skyroot, bloodfall, the-unbound, the-deep-vow, the-rejoining) = kekuatan terukir terlihat di tubuh — Mark itu sendiri tampilannya, tidak ada seremoni penaksiran terpisah ("ujian sekte" the-deep-vow = ujian perbuatan, bukan baca stat); (d) **pegadaian-bunga** = "penaksir" menilai *barang* (dari bau/bunga), bukan kekuatan orang — manipulasi yang terjadi adalah eksploitasi aturan toko (kontrak Ibu Retno), konsisten dan diselesaikan; (e) **kidung-tanah-karam** = "lembar penilaian" guru karawitan atas suara Sekar — penilaian subjektif yang justru disubversi tematis ("Air tidak peduli"), bukan sistem yang bisa digame. Kesimpulan: pola "penaksiran publik non-level yang bisa dimanipulasi" hanya ada sekali (Jiwa, 2 novel) dan sudah diaudit; nol sistem lain yang sejenis → nol inkonsistensi.

---

## 8. Audit sistem Mark Skyroot (2026-08-10)

Audit kanon sistem Mark di universe Skyroot — 4 novel inti (the-unbound B1, bloodfall B2, the-deep-vow B3, the-rejoining B4) terhadap `skyroot/bible.md` (dokumen kanon universe, bukan novel — status "Universe", tanpa chapter): **nol inkonsistensi, nol perubahan**.

- **Tiga discipline** konsisten di semua bab: Bloodline→Clanmark→Heartland (warisan: berat, tua; tidak bisa dilatih, hanya dihidupkan — Tove the-unbound ch4:12; "Clanmark diwariskan" Ilka the-deep-vow ch3:20), Craft→Guildmark→Skyreach (alat: tepat, hidup; tumbuh dari karya — pelajaran Tove; rasa "menyala" vs Clanmark yang "bernapas" bloodfall ch1:20), Vow→Vowmark→Underreach (pantang: tenang, dingin; tiap kaul satu Mark, dibayar terus selama sumpah dipegang — Ilka ch3:20; the-deep-vow ch6:58 "berat, tua" untuk Clanmark vs Vowmark "luka yang dijaga"). Aturan orang terikat satu jalur dinyatakan eksplisit (the-deep-vow ch11:20: "satu orang hanya bisa memegang satu jalur — the Binding memilih sekali"); Ossian memegang tiga discipline = bukti Unbound, bukan pelanggaran. Nol pelanggaran (tak ada orang terikat bermark dua jalur, Vowmark tak pernah diwariskan, Guildmark tak pernah bersumpah dua).
- **"Mark menetap"** konsisten: saat orang terikat mati Marks-nya menguap (the-unbound ch1:86 "seperti asap dari api yang padam"); jika Unbound menyentuh saat itu, Mark bisa menetap (ch1:102, ch3:28 Tove: "seharusnya menguap ke dunia, menetap di tanganmu"); alasannya konsisten — Unbound tidak punya jalur yang mengklaim (ch12:14 Idrith; the-rejoining ch7:56). Echo di bloodfall ch3:56, the-deep-vow ch2:44/ch7:34, the-rejoining ch6:10. The Compass dibedakan rapi dari kompas fisik (Mark emas di telapak vs kompas-kompas tua penunjuk-bawah: the-unbound ch12:62-66, ch14:84, ch15:86).
- **The Binding 14–16**: anak "baru melewati usia empat belas tahun" di upacara Master Binding (the-unbound ch1:12); Ilka terikat di 14 (the-deep-vow ch3:30). ✓
- **The Sealmark**: visual persis — "Merah tua-amber. Tiga garis menyatu ke satu titik. Satu garis horizontal di bawahnya" (bloodfall ch12:10); tidak memberi kekuatan tempur; efek pasif penguraian Marks terdekat (Dain the-deep-vow ch9:58); terpakai ke segel Book 4 (the-rejoining ch1:26). ✓
- **The Seam**: orang terikat sakit/terurai (Seren kehilangan, Tove berjuang — the-rejoining ch10:26), Unbound tak terpengaruh (Sorin menembus berkali-kali). ✓
- Catatan: skyroot tetap konsep kanon universe (belum ada chapter) — konsisten dengan Prioritas #2 (nasib skyroot belum diputuskan).

---

## 9. Tabel perbandingan mekanik kekuatan 3 universe (2026-08-10)

Batas kanon agar aturan tiap universe tidak bocor satu sama lain. Sumber: `auren/bible.md`, `skyroot/bible.md`, `kidungverse/compendium.md` + `bible.md`.

| Dimensi | **Auren** (11 novel) | **Skyroot** (4 novel + kanon) | **Kidungverse** (30 novel) |
|---|---|---|---|
| **Unit kekuatan** | Level 1–100 + Class, dari **Hearth** | **Marks** — garis/glif/cahaya terukir di kulit | **Relik, sirkuit, aetherium, godframe, Jiwa** — tanpa angka sama sekali |
| **Asal kekuatan** | **Deeds jujur**: bertahan dari bahaya nyata, melindungi yang lemah, menaklukkan ancaman | **Intensi terlatih**: darah (Clanmark), karya (Guildmark), pantang (Vowmark) | Ikatan dengan relik/tempaan warisan **Empu Aether**; jaringan **Penempa Sangha**; Jiwa (bakat upacara) |
| **Momen pembuka** | **Kindling** usia 12 — Hearth menyala, level+class terungkap | **The Binding** usia 14–16 — tubuh memilih satu jalur | Bervariasi: upacara Jiwa di remaja (the-godherd/the-last-teacher); relik "memilih" pemiliknya saat krisis |
| **Keterbacaan publik** | **Sight** (Seer ~1:1000) membaca **catatan sistem**: angka, tier, class | Mark **terlihat di tubuh** — tampilan itu sendiri yang publik | Tidak ada pembacaan stat; kekuatan tampil lewat tindakan, bukan angka |
| **Pengecualian keterbacaan** | Wraithborn, Unwritten, Liminal, Vael, hollow ekstrem, pembacaan parsial Prism; Sil'vael ~800 th (Lorin); topeng hanya Vesper & Arden (aturan 3a) | **The Seam** (Marks tidur), **Quiet Zones** (Marks tak bisa lahir); Mark Unbound tak terbaca jalur | Mask naratif: Mu Yuan (Lonceng Gembala menyamar), Gu Yan (aksara 师) — menipu sistem penaksir Jiwa, bukan pembaca lore |
| **Batas per orang** | Cap ras: Humans 80, Sil'vael 90, Durn 70, Hearthkin 60, Wraithborn 100 | Satu discipline per orang terikat (the Binding sekali, tak berubah); **Unbound** = pengecualian (bisa >1 jalur) | Relik & godframe model **unik per novel**; kosakata bersama (godframe, Aether, Lupa Corp, Sangha) boleh dipakai |
| **Cara curang (ada, tapi diatur)** | Hollow Cult mencuri Hearth (**Chosen**); level curian runtuh tanpa isi ulang; Eryx tembus cap via curian (Starfall 90) | **Mark menetap** hanya ke Unbound saat pemilik wafat; the Sealmark terpakai ke segel (bukan hilang) | Eksploitasi aturan: kontrak Ibu Retno (pegadaian-bunga); Lupa Corp memperdagangkan memori (klaim spesifik milik novel asalnya) |
| **Ancaman eksistensial** | Hollow King (Heart of the World), Hollow Cult, lagu yang salah (nada keheningan — the-unwritten/duet) | **The Stillness** (mengurai Marks), Quiet Zones, the Rejoining sebagai taruhan | Iron Monarch (shadow), Konsorsium Kunci (aetherium), Obsidian Covenant (cinder), Lupa Corp, faksi Obsidian (tidak ada awalan Obsidian baru) |
| **Jangan bocor ke universe lain** | Level/Tier/Sight/Class, Scepter, Crown of the Hollow, Voice hierarchy, Chosen | Marks/discipline, the Sealmark, the Compass, the First Seal, the Seam, the Stillness, House Veyr, First-Marked | Relik spesifik, nama godframe (Iron Monarch, Steam-Colossus, Iron-Godframe, dst), aetherium sebagai relik (energi Aether boleh lintas steampunk), Jiwa, ketukan 2-1 |

**Aturan anti-bocor:** (1) sistem **Auren** = satu-satunya dengan Level/Tier/Sight — jangan bawa ke Skyroot/Kidungverse; (2) **Marks** hanya hidup di Skyroot; (3) relik & godframe **unik per novel Kidungverse** — model spesifik jangan dipinjam; (4) istilah lintas universe yang boleh: motif multiverse sadar (ketukan 2-1, nama gema), bukan mekanik.

**Verifikasi sapu anti-bocor (susulan, 2026-08-10):** nol bocoran nyata di ketiga arah. (a) Istilah Auren (Kindling, Hearth, Scepter, Hollow King/Cult, Chosen, Stone of Sight, Voice of the Hollow, Level N, tier, Sight, deeds) di novel non-Auren: nol — semua hit palsu ("Hearthhold" = ibukota Heartland Skyroot, "chosen-one" = trope generik, "deeds" hanya di novel Auren sendiri). (b) Istilah Skyroot (Clanmark/Guildmark/Vowmark/Sealmark, the Seam, the Stillness, the Binding, the Sundering, the First Seal, Unbound, the Compass, discipline, the Mark) di non-Skyroot: nol. (c) Istilah Kidungverse (godframe, aetherium, Lupa Corp, Empu Aether, Penempa Sangha, nama relik/godframe, Bawah-Batavia, Neo-Batavia, ketukan 2-1) di Auren+Skyroot: nol — "ketukan" di Auren = motif ketukan universe sendiri (alarm the-knock, First Listeners the-duet), bukan kode irama 2-1; "dua ketukan di bahu" the-unbound ch5 = isyarat posisi Lightermen, bukan ritme. (d) "Aether"/"Sangha"/"relik" di Auren+Skyroot: nol.

---

## Prioritas perbaikan

1. ~~Tulis continuity-report~~ **tuntas 2026-08-10: 43/43** (Auren 11, Skyroot 4, Kidungverse 13 + 2 koreksi bible).
2. **Putuskan nasib auren & skyroot** — konsep yang tidak pernah ditulis.
3. ~~Seragamkan status outline~~ **tuntas 2026-08-10: 43/43 outline memverifikasi Complete** (penanda `selesai` per bab, format bullet + tabel).

---

## Saran fitur website

Situs saat ini: beranda (search + filter genre/universe + kartu novel + cover), halaman novel (daftar bab), halaman bab, halaman universe, halaman tentang. Fitur yang layak ditambah, diurutkan dari yang paling berdampak:

1. **Mode baca (reader mode)** — halaman bab kini satu halaman penuh; tambah navigasi "Bab Sebelumnya / Berikutnya" di bawah konten + progress bar posisi baca. Ini fitur paling murah dan paling sering dipakai.
2. **Peta universe interaktif** — halaman `/universe/[name]` sudah ada; tambah grafik relasi antar novel (relik unik, karakter gema, istilah bersama dari compendium) supaya pembaca bisa menelusuri "alur paralel Bawah-Batavia" dari satu novel ke novel lain.
3. **Kontinuitas otomatis di halaman novel** — tampilkan "terakhir diaudit" + jumlah bab dalam band. Semua 43 novel dalam band dan semuanya sudah punya continuity-report (43/43) — badge "diaudit 2026-08-10" bisa langsung dipasang di semua halaman.
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
