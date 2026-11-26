# FlipPlay REST API — Modul 4 (Laravel 12)

Prototipe REST API untuk studi kasus **FlipPlay** menggunakan **Laravel 12**, Eloquent ORM (relasi Many-to-Many), Form Request Validation, dan API Resource (`whenLoaded`).

## Persiapan Database (MySQL via XAMPP)

1. Buka **XAMPP Control Panel**, lalu klik **Start** pada service **MySQL**.
2. Buat database bernama `flipplay_db` di phpMyAdmin (`http://localhost/phpmyadmin`) atau jalankan perintah SQL `CREATE DATABASE flipplay_db;`.
3. Pastikan konfigurasi `.env` sudah sesuai:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=flipplay_db
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. Jalankan migrasi dan seeder:
   ```bash
   php artisan migrate:fresh --seed
   ```
5. Jalankan server Laravel:
   ```bash
   php artisan serve
   ```
   API aktif di `http://127.0.0.1:8000/api`.

## Daftar Endpoint (`php artisan route:list --path=api`)

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/media` | Daftar media (mendukung `?search=...` & `?type=anime\|manga`) | `200` |
| `POST` | `/api/media` | Tambah media baru | `201` / `422` |
| `GET` | `/api/media/{media}` | Detail media + daftar user pengoleksi (`whenLoaded`) | `200` / `404` |
| `PATCH` | `/api/media/{media}` | Update data media | `200` / `422` |
| `DELETE` | `/api/media/{media}` | Hapus media | `200` / `404` |
| `GET` | `/api/users/{user}/collection` | Daftar koleksi media milik user | `200` / `404` |
| `POST` | `/api/users/{user}/collection` | Tambah media ke koleksi user (`attach`) | `201` / `409` / `422` |
| `DELETE` | `/api/users/{user}/collection/{media}` | Hapus media dari koleksi user (`detach`) | `200` / `404` |

## Skenario Uji Postman

Tambahkan header `Accept: application/json` dan `Content-Type: application/json`:

1. **GET** `http://127.0.0.1:8000/api/media` $\rightarrow$ Happy path (200).
2. **GET** `http://127.0.0.1:8000/api/media?search=horizon` $\rightarrow$ Filter judul (200).
3. **POST** `http://127.0.0.1:8000/api/media` (Body valid) $\rightarrow$ Happy path (201).
4. **POST** `http://127.0.0.1:8000/api/media` (Judul kosong / duplikat) $\rightarrow$ Failure path (422).
5. **GET** `http://127.0.0.1:8000/api/media/1` $\rightarrow$ Detail + relasi `collected_by` (200).
6. **PATCH** `http://127.0.0.1:8000/api/media/1` (`{"rating": 9.5}`) $\rightarrow$ Update (200).
7. **POST** `http://127.0.0.1:8000/api/users/2/collection` (`{"media_id": 3}`) $\rightarrow$ Attach (201).
8. **POST** `http://127.0.0.1:8000/api/users/2/collection` (`{"media_id": 3}` lagi) $\rightarrow$ Duplicate failure path (409).
9. **GET** `http://127.0.0.1:8000/api/users/2/collection` $\rightarrow$ Lihat koleksi user (200).
10. **DELETE** `http://127.0.0.1:8000/api/users/2/collection/3` $\rightarrow$ Detach (200).
11. **DELETE** `http://127.0.0.1:8000/api/media/6` $\rightarrow$ Hapus media (200).
