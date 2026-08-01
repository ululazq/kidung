# Kidung — Koleksi Novel

Rumah cerita. Rumah novel. Rumah imajinasi.

## Struktur

```
novels/
└── <nama-novel>/
    ├── README.md        # metadata: judul, sinopsis, genre, status
    ├── chapter-1.md     # isi chapter
    ├── chapter-2.md
    └── ...
```

## Cara Menambah Novel

```bash
cd novels
mkdir <nama-novel>
cd <nama-novel>
# buat README.md + chapter-1.md, lalu:
git add .
git commit -m "Tambah novel <nama-novel>"
git push origin main
```

## Novel

- [The Host](./novels/the-host/) — Dark fantasy wayang reincarnation
