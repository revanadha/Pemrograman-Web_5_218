<?php

namespace App\Models;

class Manga extends Media
{
    private int $chapterCount;
    private string $author;
    private string $status;

    public function __construct(
        string $id,
        string $title,
        string $genre,
        float $rating,
        int $releaseYear,
        int $chapterCount,
        string $author,
        string $status = 'Ongoing'
    ) {
        parent::__construct($id, $title, $genre, $rating, $releaseYear);
        $this->chapterCount = $chapterCount;
        $this->author = $author;
        $this->status = $status;
    }

    public function getType(): string
    {
        return 'Manga (Reader)';
    }

    public function getChapterCount(): int
    {
        return $this->chapterCount;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getDetails(): string
    {
        return sprintf(
            "[%s] %s (%d)\n  - Genre   : %s\n  - Rating  : %.1f/10\n  - Author  : %s\n  - Chapters: %d Bab | Status: %s",
            $this->getType(),
            $this->title,
            $this->releaseYear,
            $this->genre,
            $this->rating,
            $this->author,
            $this->chapterCount,
            $this->status
        );
    }

    public function readChapter(int $chapter): string
    {
        if ($chapter < 1 || $chapter > $this->chapterCount) {
            return "Bab {$chapter} tidak ditemukan. (Tersedia: 1 - {$this->chapterCount})";
        }
        return "Membaca '{$this->title}' - Bab {$chapter}/{$this->chapterCount} karya {$this->author} [Status: {$this->status}]";
    }
}

