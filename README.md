# Admin Panel Redirect — GitHub Pages + Cloudflare Worker + KV

## Arsitektur
GitHub Pages hanya menyajikan tampilan. Cloudflare Worker menangani login, penyimpanan link di KV, dan redirect.

## Struktur
- `login.html` — login admin
- `dashboard.html` — dashboard
- `css/style.css` — UI
- `js/config.js` — URL Worker
- `js/app.js` — login
- `js/dashboard.js` — dashboard/generator/daftar link
- `worker.js` — Cloudflare Worker
- `wrangler.toml.example` — contoh konfigurasi KV
- `SETUP.md` — panduan pemasangan

## Penting
Versi final ini menggunakan Cloudflare KV. Sebelum dipakai, buat KV namespace dan pasang binding bernama `LINKS_KV` pada Worker. Set secret `ADMIN_PASSWORD`.

Jangan menaruh password admin di GitHub.
