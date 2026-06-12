# 🥩 Baso Yen — Backend API

> 🔗 **Frontend Repository:** [baso-yen-frontend](https://github.com/RezaR2P/baso-yen-frontend)

---

## 📋 Tech Stack

| Teknologi    | Versi   | Fungsi                        |
| ------------ | ------- | ----------------------------- |
| Node.js      | v18+    | Runtime JavaScript            |
| Express.js   | ^5.2.1  | Framework backend             |
| MySQL        | 8       | Database                      |
| mysql2       | ^3.22.4 | Driver MySQL untuk Node.js    |
| jsonwebtoken | ^9.0.3  | Autentikasi admin (JWT)       |
| bcryptjs     | ^3.0.3  | Enkripsi password             |
| multer       | ^2.1.1  | Upload foto                   |
| slugify      | ^1.6.9  | Generate slug dari judul      |
| cors         | ^2.8.6  | Cross-Origin Resource Sharing |
| dotenv       | ^17.4.2 | Environment variables         |
| nodemon      | ^3.1.14 | Auto restart saat development |
| Docker       | -       | Container database MySQL      |

---

## ⚙️ Prasyarat

Pastikan sudah terinstall:

- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Cara Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/RezaR2P/baso-yen-backend.git
cd baso-yen-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database (Docker)

Buat network Docker:

```bash
docker network create basoyen_network
```

Jalankan container MySQL:

```bash
docker run -d \
  --name basoyen_mysql \
  --network basoyen_network \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=basoyen_db \
  -e MYSQL_USER=basoyen_user \
  -e MYSQL_PASSWORD=basoyen_pass \
  -p 3306:3306 \
  mysql:8
```

Tunggu 10-15 detik lalu import schema awal:

```bash
docker exec -i basoyen_mysql mysql -u basoyen_user -pbasoyen_pass basoyen_db < schema.sql
```

### 4. Setup Environment

Buat file `.env` di root folder:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=basoyen_user
DB_PASSWORD=basoyen_pass
DB_NAME=basoyen_db
JWT_SECRET=isi_dengan_string_acak_panjang
JWT_EXPIRES_IN=1d
```

Generate `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Integrasi dengan Frontend

Frontend pada repo `baso-yen-frontend` diasumsikan berjalan di `http://localhost:5173`.

Buat file `.env` di frontend dengan nilai seperti ini:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SERVER_URL=http://localhost:3000
```

Catatan:

- `VITE_API_URL` dipakai untuk request ke endpoint backend, misalnya `/api/products` dan `/api/auth/login`
- `VITE_SERVER_URL` dipakai untuk membentuk URL file upload seperti `http://localhost:3000/uploads/nama-file.jpg`
- Backend saat ini hanya mengizinkan origin `http://localhost:5173`, jadi kalau frontend pindah port, CORS juga perlu disesuaikan di `server.js`
- Request admin harus mengirim header `Authorization: Bearer <token>`

### 6. Buat Admin Pertama

```bash
node src/scripts/createAdmin.js
```

### 7. Jalankan Server

```bash
# Development (auto restart)
npm run dev

# Production
npm start
```

Server berjalan di `http://localhost:3000`

### 8. Akses File Upload

File yang diupload dapat diakses melalui path `/uploads`.

Contoh:

```text
http://localhost:3000/uploads/1700000000000-123456789.jpg
```

Gunakan `VITE_SERVER_URL` di frontend untuk menyusun URL gambar dari field seperti `image_url` dan `thumbnail_url`.

---

## 📁 Struktur Folder

```
backend/
├── src/
│   ├── config/
│   │   └── db.js               # Koneksi MySQL
│   ├── controllers/            # Logika bisnis
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── recipes.js
│   │   ├── articles.js
│   │   └── contacts.js
│   ├── middleware/
│   │   ├── auth.js             # JWT middleware
│   │   └── upload.js           # Multer middleware
│   ├── models/                 # Query database
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── recipes.js
│   │   ├── articles.js
│   │   ├── contacts.js
│   │   └── users.js
│   ├── routes/                 # Endpoint API
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── recipes.js
│   │   ├── articles.js
│   │   └── contacts.js
│   ├── scripts/
│   │   └── createAdmin.js      # Script buat admin
│   └── uploads/                # Folder foto upload
├── .env
├── .gitignore
├── schema.sql
├── package.json
└── server.js
```

---

## 🌐 API Endpoints

### Auth

| Method | Endpoint        | Auth | Deskripsi   |
| ------ | --------------- | ---- | ----------- |
| POST   | /api/auth/login | ❌   | Login admin |

### Products

| Method | Endpoint                   | Auth | Deskripsi            |
| ------ | -------------------------- | ---- | -------------------- |
| GET    | /api/products              | ❌   | Semua produk aktif   |
| GET    | /api/products/slug/:slug   | ❌   | Produk by slug       |
| GET    | /api/products/category/:id | ❌   | Produk by kategori   |
| GET    | /api/products/:id          | ❌   | Produk by ID         |
| GET    | /api/products/admin/all    | ✅   | Semua produk (admin) |
| POST   | /api/products              | ✅   | Tambah produk + foto |
| PUT    | /api/products/:id          | ✅   | Update produk + foto |
| DELETE | /api/products/:id          | ✅   | Hapus produk         |

### Categories

| Method | Endpoint            | Auth | Deskripsi       |
| ------ | ------------------- | ---- | --------------- |
| GET    | /api/categories     | ❌   | Semua kategori  |
| GET    | /api/categories/:id | ❌   | Kategori by ID  |
| POST   | /api/categories     | ✅   | Tambah kategori |
| PUT    | /api/categories/:id | ✅   | Update kategori |
| DELETE | /api/categories/:id | ✅   | Hapus kategori  |

### Recipes

| Method | Endpoint                | Auth | Deskripsi             |
| ------ | ----------------------- | ---- | --------------------- |
| GET    | /api/recipes            | ❌   | Semua resep published |
| GET    | /api/recipes/slug/:slug | ❌   | Resep by slug         |
| GET    | /api/recipes/:id        | ❌   | Resep by ID           |
| GET    | /api/recipes/admin/all  | ✅   | Semua resep (admin)   |
| POST   | /api/recipes            | ✅   | Tambah resep + foto   |
| PUT    | /api/recipes/:id        | ✅   | Update resep + foto   |
| DELETE | /api/recipes/:id        | ✅   | Hapus resep           |

### Articles

| Method | Endpoint                 | Auth | Deskripsi                  |
| ------ | ------------------------ | ---- | -------------------------- |
| GET    | /api/articles            | ❌   | Semua artikel published    |
| GET    | /api/articles/slug/:slug | ❌   | Artikel by slug            |
| GET    | /api/articles/:id        | ❌   | Artikel by ID              |
| GET    | /api/articles/admin/all  | ✅   | Semua artikel (admin)      |
| POST   | /api/articles            | ✅   | Tambah artikel + thumbnail |
| PUT    | /api/articles/:id        | ✅   | Update artikel + thumbnail |
| DELETE | /api/articles/:id        | ✅   | Hapus artikel              |

### Contacts

| Method | Endpoint                 | Auth | Deskripsi            |
| ------ | ------------------------ | ---- | -------------------- |
| GET    | /api/contacts            | ✅   | Semua pesan masuk    |
| GET    | /api/contacts/:id        | ✅   | Pesan by ID          |
| POST   | /api/contacts            | ❌   | Kirim pesan (publik) |
| PATCH  | /api/contacts/:id/status | ✅   | Update status pesan  |
| DELETE | /api/contacts/:id        | ✅   | Hapus pesan          |

---

## 🗄️ Struktur Database

| Tabel                | Deskripsi                    |
| -------------------- | ---------------------------- |
| `products`           | Data produk                  |
| `product_categories` | Kategori produk              |
| `recipes`            | Data resep                   |
| `articles`           | Data artikel                 |
| `users`              | Akun admin                   |
| `contacts`           | Pesan masuk dari form kontak |

---

## 🔐 Akun Admin Default

```
Email    : admin@basoyen.com
Password : admin1234
```

---

## 📝 Perintah Docker

```bash
# Start MySQL
docker start basoyen_mysql

# Stop MySQL
docker stop basoyen_mysql

# Masuk ke MySQL
docker exec -it basoyen_mysql mysql -u basoyen_user -pbasoyen_pass basoyen_db

# Lihat log
docker logs basoyen_mysql
```

---

## 🔮 Next Update

- [ ] Express validator — validasi input
- [ ] Slug duplicate handling
- [ ] Rate limiting + honeypot anti spam
- [ ] Pagination
- [ ] Nodemailer notifikasi email
- [ ] Error handler middleware terpusat
- [ ] Cloudinary cloud storage

---

## 👤 Author

Dibuat oleh **Reza** — [@RezaR2P](https://github.com/RezaR2P)
