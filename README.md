# Kidung — Koleksi Novel

Rumah cerita. Rumah novel. Rumah imajinasi.

## Struktur

```
novels/
└── <nama-novel>/
    ├── README.md        # metadata: judul, sinopsis, genre, status
    └── chapter-1.md     # isi chapter
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

- [The Host](/novel/the-host) — Dark fantasy wayang reincarnation

## Tech

- **Framework:** Astro 4.12
- **Styling:** Tailwind CSS (custom)
- **Content:** Markdown
- **Deploy:** Vercel
