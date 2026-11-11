<?php

namespace App\Models;

class Anime extends Media
{
    private int $episodeCount;
    private int $durationPerEp;
    private string $studio;

    public function __construct(
        string $id,
        string $title,
        string $genre,
        float $rating,
        int $releaseYear,
        int $episodeCount,
        int $durationPerEp,
        string $studio
    ) {
        parent::__construct($id, $title, $genre, $rating, $releaseYear);
        $this->episodeCount = $episodeCount;
        $this->durationPerEp = $durationPerEp;
        $this->studio = $studio;
    }

    public function getType(): string
    {
        return 'Anime (Video)';
    }

    public function getEpisodeCount(): int
    {
        return $this->episodeCount;
    }

    public function getDurationPerEp(): int
    {
        return $this->durationPerEp;
    }

    public function getStudio(): string
    {
        return $this->studio;
    }

    public function getDetails(): string
    {
        return sprintf(
            "[%s] %s (%d)\n  - Genre   : %s\n  - Rating  : %.1f/10\n  - Studio  : %s\n  - Format  : %d Episode (~%d Menit/Episode)",
            $this->getType(),
            $this->title,
            $this->releaseYear,
            $this->genre,
            $this->rating,
            $this->studio,
            $this->episodeCount,
            $this->durationPerEp
        );
    }

    public function streamEpisode(int $episode): string
    {
        if ($episode < 1 || $episode > $this->episodeCount) {
            return "Episode {$episode} tidak ditemukan. (Tersedia: 1 - {$this->episodeCount})";
        }
        return "Streaming '{$this->title}' - Episode {$episode}/{$this->episodeCount} [Studio: {$this->studio}, Durasi: {$this->durationPerEp} min]";
    }
}

