<?php

namespace App\Models;

abstract class Media
{
    protected string $id;
    protected string $title;
    protected string $genre;
    protected float $rating;
    protected int $releaseYear;

    public function __construct(
        string $id,
        string $title,
        string $genre,
        float $rating,
        int $releaseYear
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->genre = $genre;
        $this->setRating($rating);
        $this->releaseYear = $releaseYear;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getGenre(): string
    {
        return $this->genre;
    }

    public function getRating(): float
    {
        return $this->rating;
    }

    public function getReleaseYear(): int
    {
        return $this->releaseYear;
    }

    public function setRating(float $rating): void
    {
        if ($rating < 0.0 || $rating > 10.0) {
            throw new \InvalidArgumentException('Rating must be between 0.0 and 10.0.');
        }
        $this->rating = $rating;
    }

    abstract public function getType(): string;

    abstract public function getDetails(): string;
}

