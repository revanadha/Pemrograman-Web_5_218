<?php

namespace App\Services;

use App\Models\Media;

class Library
{
    private array $catalog = [];

    public function __construct(array $initialMedia = [])
    {
        foreach ($initialMedia as $media) {
            if ($media instanceof Media) {
                $this->addMedia($media);
            }
        }
    }

    public function addMedia(Media $media): void
    {
        $this->catalog[$media->getId()] = $media;
    }

    public function getAllMedia(): array
    {
        return $this->catalog;
    }

    public function findById(string $id): ?Media
    {
        return $this->catalog[$id] ?? null;
    }

    public function searchByTitle(string $keyword): array
    {
        $results = [];
        $loweredKeyword = strtolower(trim($keyword));

        foreach ($this->catalog as $media) {
            if (str_contains(strtolower($media->getTitle()), $loweredKeyword)) {
                $results[] = $media;
            }
        }

        return $results;
    }

    public function filterByType(string $type): array
    {
        $results = [];
        $loweredType = strtolower(trim($type));

        foreach ($this->catalog as $media) {
            if (str_contains(strtolower($media->getType()), $loweredType)) {
                $results[] = $media;
            }
        }

        return $results;
    }

    public function getTotalMediaCount(): int
    {
        return count($this->catalog);
    }
}

