Salin ke `novels/<slug>/arcs.md` saat novel memakai mode serial panjang
(README `serial: true`). Situs tidak merendernya — tapi `scripts/check-novels.mjs`
membacanya, jadi baris tabel adalah kontrak.

**Baris tabel tidak boleh diubah formatnya**: `| <Arc> | <X–Y> | <Judul> | <Tujuan> |
<Keadaan akhir dunia> | <Status> |`. Gate otomatis: setiap bab di disk wajib jatuh
di dalam tepat satu rentang arc; bab di luar rentang = error.

---

```markdown
# Arcs: <Judul Novel>

Mode serial panjang — peta arc dari bab 1 sampai target. Satu baris per arc;
bab berurutan, tidak boleh tumpang tindih, tidak boleh ada bab di luar arc.
**Tambahkan baris arc sebelum arc itu ditulis.**

Target: <N> bab · <M> arc × <bab per arc>

## Peta Arc

| Arc | Bab | Judul arc | Tujuan | Keadaan akhir dunia | Status |
|---|---|---|---|---|---|
| 1 | 1–250 | <judul> | <yang harus tercapai> | <keadaan dunia saat selesai> | Planned |
| 2 | 251–500 | <judul> | <...> | <...> | Planned |
| 3 | 501–750 | <judul> | <...> | <...> | Planned |

## Catatan lintas arc

- <foreshadow panjang yang ditanam di arc awal untuk arc jauh — Chekhov's Gun lintas arc>
- <entitas/institusi yang harus bertahan sampai akhir>
- <aturan yang tidak boleh dilanggar di arc mana pun>
```

---

## Catatan

- **Status**: `Planned` / `In Progress` / `Complete`. Sekali `Complete`, jangan
  mengubah rentang babnya — bab sudah tercommit; rencana yang meleset diperbaiki
  di arc berikutnya.
- **Jangan menggeser arc lama.** Geser yang baru. Ini yang membuat rentang bab
  tetap sinkron dengan file `chapter-*.md` di disk.
- Jendela bab per arc ditulis di `outline.md` (tabel bab = arc aktif saja),
  bukan di file ini. File ini hanya peta besar.
