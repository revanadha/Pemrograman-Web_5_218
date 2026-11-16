<?php

spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

use App\Models\Anime;
use App\Models\Manga;
use App\Models\Media;
use App\Models\User;
use App\Services\Library;

function printSeparator(): void
{
    echo str_repeat('-', 70) . PHP_EOL;
}

echo PHP_EOL;
printSeparator();
echo "   FLIPPLAY BACKEND ENGINE PROTOTYPE - PHP OOP SIMULATION" . PHP_EOL;
echo "   Modul 3 Pemrograman Web  " . PHP_EOL;
printSeparator();

$library = new Library();

echo PHP_EOL . "1. PROSES: Menambahkan Media ke dalam Library (Catalog)" . PHP_EOL;
echo "   Menambahkan item Anime dan Manga turunan dari class Media..." . PHP_EOL;

$anime1 = new Anime(
    'media-001',
    'Starlight Horizon',
    'Sci-Fi / Action',
    8.9,
    2024,
    24,
    24,
    'Astral Animation'
);

$manga1 = new Manga(
    'media-002',
    'Blade of Northern Wind',
    'Action / Fantasy',
    9.1,
    2022,
    120,
    'Kenjiro Sato',
    'Ongoing'
);

$anime2 = new Anime(
    'media-003',
    'Cyber Symphony',
    'Sci-Fi / Music',
    8.4,
    2023,
    12,
    22,
    'Nexus Works'
);

$manga2 = new Manga(
    'media-004',
    'The Alchemist of White Moon',
    'Fantasy / Mystery',
    8.7,
    2021,
    85,
    'Elena Vance',
    'Completed'
);

$anime3 = new Anime(
    'media-005',
    'Frieren: Beyond Journey\'s End',
    'Adventure / Fantasy',
    9.3,
    2023,
    28,
    24,
    'Madhouse'
);

$library->addMedia($anime1);
$library->addMedia($manga1);
$library->addMedia($anime2);
$library->addMedia($manga2);
$library->addMedia($anime3);

echo "   Berhasil menambahkan {$library->getTotalMediaCount()} item ke katalog FlipPlay." . PHP_EOL;

echo PHP_EOL . "2. PROSES: Menampilkan Daftar Media yang Tersedia" . PHP_EOL;
printSeparator();
printf("%-10s | %-16s | %-30s | %-6s\n", 'ID', 'TIPE', 'JUDUL', 'RATING');
printSeparator();

foreach ($library->getAllMedia() as $media) {
    printf(
        "%-10s | %-16s | %-30s | %.1f/10\n",
        $media->getId(),
        $media->getType(),
        $media->getTitle(),
        $media->getRating()
    );
}
printSeparator();

$searchQuery = 'horizon';
echo PHP_EOL . "3. PROSES: Mencari Media Berdasarkan Judul (Keyword: '{$searchQuery}')" . PHP_EOL;
$searchResults = $library->searchByTitle($searchQuery);

if (empty($searchResults)) {
    echo "   Media dengan kata kunci '{$searchQuery}' tidak ditemukan." . PHP_EOL;
} else {
    echo "   Ditemukan " . count($searchResults) . " hasil pencarian:" . PHP_EOL;
    foreach ($searchResults as $result) {
        echo "   -> [{$result->getId()}] {$result->getTitle()} ({$result->getType()}) - Rating: {$result->getRating()}/10" . PHP_EOL;
    }
}

echo PHP_EOL . "4. PROSES: Menampilkan Informasi Detail Media (Polymorphism getDetails)" . PHP_EOL;
echo "   --- Detail Anime ---" . PHP_EOL;
echo $anime1->getDetails() . PHP_EOL . PHP_EOL;
echo "   --- Detail Manga ---" . PHP_EOL;
echo $manga1->getDetails() . PHP_EOL;

echo PHP_EOL . "5. PROSES: Manajemen Koleksi & Konsumsi Media Pengguna" . PHP_EOL;
$user = new User('usr-101', 'Kusuma', 'VIP Member');

echo "   Pengguna Aktif: {$user->getName()} ({$user->getMembershipTier()})" . PHP_EOL;

echo "   -> Menambahkan '{$anime1->getTitle()}' ke koleksi pribadi..." . PHP_EOL;
$user->addToCollection($anime1);

echo "   -> Menambahkan '{$manga1->getTitle()}' ke koleksi pribadi..." . PHP_EOL;
$user->addToCollection($manga1);

echo "   -> Menambahkan '{$anime3->getTitle()}' ke koleksi pribadi..." . PHP_EOL;
$user->addToCollection($anime3);

echo PHP_EOL . "   Daftar Koleksi Milik {$user->getName()}:" . PHP_EOL;
$index = 1;
foreach ($user->getCollection() as $item) {
    echo "   {$index}. [{$item->getType()}] {$item->getTitle()} ({$item->getGenre()})" . PHP_EOL;
    $index++;
}

echo PHP_EOL . "   Simulasi Streaming / Membaca Media:" . PHP_EOL;
echo "   * " . $user->consumeMedia($anime1, 1) . PHP_EOL;
echo "   * " . $user->consumeMedia($manga1, 45) . PHP_EOL;
echo "   * " . $user->consumeMedia($anime3, 10) . PHP_EOL;

echo PHP_EOL . "   Riwayat Aktivitas Pengguna:" . PHP_EOL;
foreach ($user->getHistory() as $log) {
    echo "   - {$log}" . PHP_EOL;
}

printSeparator();
echo "   SIMULASI FLIPPLAY ENGINE SELESAI DENGAN SUKSES" . PHP_EOL;
printSeparator();

