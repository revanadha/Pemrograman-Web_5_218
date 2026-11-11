<?php

namespace App\Models;

class User
{
    private string $userId;
    private string $name;
    private string $membershipTier;
    private array $collection = [];
    private array $history = [];

    public function __construct(string $userId, string $name, string $membershipTier = 'Premium')
    {
        $this->userId = $userId;
        $this->name = $name;
        $this->membershipTier = $membershipTier;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getMembershipTier(): string
    {
        return $this->membershipTier;
    }

    public function addToCollection(Media $media): bool
    {
        if (isset($this->collection[$media->getId()])) {
            return false;
        }

        $this->collection[$media->getId()] = $media;
        return true;
    }

    public function removeFromCollection(string $mediaId): bool
    {
        if (isset($this->collection[$mediaId])) {
            unset($this->collection[$mediaId]);
            return true;
        }

        return false;
    }

    public function getCollection(): array
    {
        return $this->collection;
    }

    public function consumeMedia(Media $media, int $unitNumber): string
    {
        $log = '';
        if ($media instanceof Anime) {
            $log = $media->streamEpisode($unitNumber);
        } elseif ($media instanceof Manga) {
            $log = $media->readChapter($unitNumber);
        } else {
            $log = "Mengakses media '{$media->getTitle()}'.";
        }

        $this->history[] = date('H:i:s') . ' | ' . $log;
        return $log;
    }

    public function getHistory(): array
    {
        return $this->history;
    }
}

