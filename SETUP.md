# Panduan pemasangan

## A. GitHub Pages
1. Upload semua file kecuali `worker.js` dan `wrangler.toml.example` ke repository GitHub.
2. Pastikan `login.html`, `dashboard.html`, folder `css`, dan `js` berada di root repository.
3. Aktifkan GitHub Pages dari Settings > Pages.
4. Buka URL Pages yang diberikan GitHub.

## B. Cloudflare Worker
1. Cloudflare > Workers & Pages > Create > Worker.
2. Buat Worker baru.
3. Buka Edit code dan ganti kode dengan `worker.js`.
4. Deploy.
5. Catat URL Worker, misalnya `https://nama-worker.nama-akun.workers.dev`.

## C. KV
1. Cloudflare > Workers & Pages > KV.
2. Create namespace, misalnya `REDIRECT_LINKS`.
3. Buka Worker > Settings > Bindings > Add binding > KV namespace.
4. Variable name harus persis: `LINKS_KV`.
5. Pilih namespace yang baru dibuat.
6. Deploy ulang Worker.

## D. Password
Di Worker > Settings > Variables and Secrets > Add secret:
- Name: `ADMIN_PASSWORD`
- Value: password admin kamu

Jangan masukkan password ke file JavaScript/GitHub.

## E. Hubungkan GitHub Pages ke Worker
Edit `js/config.js`:
`WORKER_URL` harus diisi dengan URL Worker kamu, tanpa slash di akhir.

Contoh:
`const WORKER_URL = "https://nama-worker.nama-akun.workers.dev";`

Commit perubahan tersebut ke GitHub.

## F. Penggunaan
1. Buka GitHub Pages.
2. Login.
3. Masukkan URL tujuan.
4. Isi alias/slug atau biarkan otomatis.
5. Klik Generate Link.
6. Link tersimpan di Cloudflare KV.
7. Link redirect dapat dibuka kapan saja melalui Worker.

## Catatan
- Login memakai token sesi yang ditandatangani Worker; password tidak disimpan di browser.
- Data link disimpan di KV.
- Untuk penggunaan besar, D1 lebih cocok untuk query/analytics yang kompleks.
