# FlipPlay REST API — Modul 4 (Laravel 12)

Repositori ini berisi implementasi prototipe **REST API** untuk studi kasus **FlipPlay** (platform katalog anime dan manga) menggunakan **Laravel 12**, sesuai ketentuan tugas **Demo Modul 4 Pemrograman Web**.

---

## 1. Gambaran Umum & Fitur Utama

- **Katalog Media (`Media`)**: Pengelolaan data anime dan manga beserta atribut metadata (judul, tipe, genre, rating, tahun rilis, kreator, jumlah unit, dan status) dengan dukungan pencarian dan filter.
- **Relasi Many-to-Many (`User` ↔ `Media`)**: Setiap pengguna dapat menyimpan banyak media ke dalam koleksinya, dan satu media dapat dikoleksi oleh banyak pengguna melalui tabel pivot `media_user`.
- **Validasi Terpisah (Form Request)**: Validasi input dipisahkan ke dalam class Form Request (`StoreMediaRequest`, `UpdateMediaRequest`, dan `AddToCollectionRequest`).
- **Transformasi Respons (API Resource)**: Format respons JSON diseragamkan melalui `MediaResource` dan `UserResource` dengan *conditional eager loading* (`whenLoaded`).
- **Pengujian Otomatis (Feature Test)**: Dilengkapi pengujian otomatis pada `FlipPlayApiTest` untuk memverifikasi perilaku utama API.

---

## 2. Struktur Utama Proyek

```text
MODUL 4(DEMO)/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/       # MediaController & UserCollectionController
│   │   ├── Requests/              # Validasi input (Form Request)
│   │   └── Resources/             # Transformasi respons JSON (API Resource)
│   └── Models/                    # Model Eloquent (User & Media)
├── database/
│   ├── migrations/                # Skema tabel users, media, dan pivot media_user
│   └── seeders/                   # Data awal (DatabaseSeeder)
├── routes/
│   └── api.php                    # Definisi route REST API
└── tests/
    └── Feature/FlipPlayApiTest.php
```

---

## 3. Cara Menjalankan

1. Salin file `.env.example` menjadi `.env`, lalu sesuaikan konfigurasi koneksi database MySQL lokal.
2. Jalankan migrasi dan seeder untuk membuat tabel serta data awal:
   ```bash
   php artisan migrate:fresh --seed
   ```
3. Jalankan server pengembangan Laravel:
   ```bash
   php artisan serve
   ```
