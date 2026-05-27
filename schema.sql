-- docker network create basoyen_network
-- docker run -d --name basoyen_mysql --network basoyen_network -e MYSQL_ROOT_PASSWORD=1122334 -e MYSQL_DATABASE=basoyen_db -e MYSQL_USER=basoyen_user -e MYSQL_PASSWORD=basoyen_pass -p 3306:3306 mysql:8



-- ============================================
-- DATABASE: BASO YEN REDESIGN
-- Dibuat untuk project MERN stack (MySQL)
-- ============================================


INSERT INTO products (name, slug, category_id, description, price, is_featured, is_active) 
VALUES ('Baso Polos', 'baso-polos', 1, 'Bakso sapi pilihan tanpa isian', 25000, true, true);


CREATE DATABASE IF NOT EXISTS basoyen_db

USE basoyen_db;

CREATE TABLE product_categories (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,          
  slug      VARCHAR(100) NOT NULL UNIQUE,    
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Isi kategori awal
INSERT INTO product_categories (name, slug) VALUES
  ('Bakso',  'bakso'),
  ('Mie',    'mie'),
  ('Sosis',  'sosis'),
  ('Paket',  'paket');


CREATE TABLE products (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  slug          VARCHAR(150) NOT NULL UNIQUE,   -- untuk URL: /produk/baso-super
  category_id   INT,
  description   TEXT,
  price         DECIMAL(12, 2),                 -- harga, boleh NULL kalau harga by request
  image_url     VARCHAR(255),                   -- path file gambar yg diupload
  is_featured   BOOLEAN DEFAULT FALSE,          -- tampil di halaman Home?
  is_active     BOOLEAN DEFAULT TRUE,           -- tampilkan di website?
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL
);


CREATE TABLE recipes (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(200) NOT NULL,
  slug          VARCHAR(200) NOT NULL UNIQUE,
  ingredients   TEXT NOT NULL,   -- bahan-bahan (bisa disimpan sebagai teks biasa atau JSON)
  steps         TEXT NOT NULL,   -- langkah memasak
  image_url     VARCHAR(255),
  is_published  BOOLEAN DEFAULT FALSE,  -- draft dulu sebelum tayang
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL, 
  role          ENUM('admin', 'superadmin') DEFAULT 'admin',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE articles (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(250) NOT NULL,
  slug          VARCHAR(250) NOT NULL UNIQUE,
  content       LONGTEXT NOT NULL,       -- isi artikel panjang
  thumbnail_url VARCHAR(255),
  author_id     INT,
  is_published  BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- --------------------------------------------
-- TABEL 6: contacts
-- Pesan masuk dari form kontak / request sampel
-- --------------------------------------------
CREATE TABLE contacts (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  business_name VARCHAR(150),              -- nama cafe/resto/usaha (opsional)
  phone         VARCHAR(20),
  email         VARCHAR(150) NOT NULL,
  city          VARCHAR(100),
  message       TEXT NOT NULL,
  status        ENUM('new', 'read', 'replied') DEFAULT 'new',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
