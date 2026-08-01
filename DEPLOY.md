# Kidung — Push to GitHub

## After creating GitHub repo

Run these commands in terminal:

```bash
cd "C:\Users\MyBook Hype AMD\.openclaw\workspace\kidung"

# Add remote (ganti URL dengan repo kamu)
git remote add origin https://github.com/<username>/kidung.git

# Push pertama kali
git push -u origin main
```

## Future updates

```bash
# Edit file di VSCode
# Commit changes:
git add .
git commit -m "Update chapter 1"
git push
```

## Deploy ke Vercel (optional)

1. Login ke vercel.com
2. Import GitHub repo `kidung`
3. Build settings: skip (static files)
4. Deploy!

Akses: https://<project>.vercel.app/novels/the-host/chapter-1.md
