# Simulasi FlipPlay Backend Engine - Modul 3 (PHP OOP)

Repositori ini berisi implementasi prototipe engine backend berbasis **PHP Object-Oriented Programming (OOP)** untuk studi kasus **FlipPlay** (platform streaming anime dan digital manga reader), sesuai ketentuan tugas **Demo Modul 3 Pemrograman Web Laboratorium Informatika UMM**.

---

## 1. Struktur Proyek

Struktur kode telah dipisahkan secara rapi antara *frontend* dan *backend* sesuai prinsip pengorganisasian kode PHP (Modul 3 Bagian 3.1 & 3.2):

```text
MODUL 3(DEMO)/
├── backend/                       # Seluruh kode PHP Engine terisolasi di sini
│   ├── Models/                    # Namespace: App\Models
│   │   ├── Media.php              # Abstract parent class untuk entitas media
│   │   ├── Anime.php              # Subclass video streaming anime (Inheritance)
│   │   ├── Manga.php              # Subclass digital reader manga (Inheritance)
│   │   └── User.php               # Entitas pengguna & manajemen koleksi
│   ├── Services/                  # Namespace: App\Services
│   │   └── Library.php            # Catalog engine & query pencarian media
│   └── index.php                  # Entry point simulasi CLI dengan PSR-4 autoloader
├── src/                           # Frontend murni (HTML, CSS, JS, Assets)
│   ├── data/
│   ├── images/
│   ├── data.json
│   ├── index.html
│   ├── main.css
│   ├── output.css
│   └── script.js
├── index.php                      # Forwarder entry point di root
└── README.md                      # Dokumentasi & panduan
```

---

## 2. Pemenuhan Ketentuan Demo (Halaman 28)

| No | Ketentuan Demo Modul 3 | Implementasi pada Kode |
|---|---|---|
| 1 | **Minimal 3 class** | Menggunakan 5 class: `Media`, `Anime`, `Manga`, `User`, `Library`. |
| 2 | **Menerapkan constructor (`__construct`)** | Setiap class memiliki `__construct()` dengan inisialisasi properti terstruktur dan pemanggilan `parent::__construct()` pada child class. |
| 3 | **Memiliki property dan method** | Properti untuk metadata entitas dan method fungsional (`streamEpisode()`, `readChapter()`, `searchByTitle()`, `consumeMedia()`, dll). |
| 4 | **Access modifier secara tepat** | `protected` pada properti parent (`Media`), `private` pada child class dan internal storage, `public` untuk interface method. Terdapat validasi pada setter. |
| 5 | **Inheritance & Polimorfisme** | `Anime extends Media` dan `Manga extends Media`. Mengimplementasikan method abstrak `getType()` dan `getDetails()` dengan output spesifik sesuai jenis media. |
| 6 | **Type Hinting & Return Type** | Semua parameter memiliki tipe data eksplisit (`string`, `int`, `float`, `array`, `Media`) dan semua method memiliki return type (`: void`, `: string`, `: array`, `: ?Media`, `: bool`). |
| 7 | **Namespace** | Menggunakan sub-namespace terorganisir: `App\Models` untuk entitas data dan `App\Services` untuk logika katalog. |
| 8 | **Satu file utama (`index.php`)** | Didukung baik melalui root `index.php` maupun `backend/index.php`. |

---

## 3. Cara Menjalankan Simulasi

Jalankan perintah berikut melalui terminal:

```bash
php index.php
```

atau langsung dari dalam folder backend:

```bash
php backend/index.php
```
