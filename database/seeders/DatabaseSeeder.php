<?php

namespace Database\Seeders;

use App\Models\Media;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $kusuma = User::create([
            'name' => 'Kusuma',
            'email' => 'kusuma@flipplay.test',
            'membership_tier' => 'VIP Member',
            'password' => 'password123',
        ]);

        $revan = User::create([
            'name' => 'Revan',
            'email' => 'revan@flipplay.test',
            'membership_tier' => 'Premium',
            'password' => 'password123',
        ]);

        $starlight = Media::create([
            'title' => 'Starlight Horizon',
            'type' => 'anime',
            'genre' => 'Sci-Fi / Action',
            'rating' => 8.9,
            'release_year' => 2024,
            'creator' => 'Astral Animation',
            'total_units' => 24,
            'status' => 'Completed',
        ]);

        $blade = Media::create([
            'title' => 'Blade of Northern Wind',
            'type' => 'manga',
            'genre' => 'Action / Fantasy',
            'rating' => 9.1,
            'release_year' => 2022,
            'creator' => 'Kenjiro Sato',
            'total_units' => 120,
            'status' => 'Ongoing',
        ]);

        Media::create([
            'title' => 'Cyber Symphony',
            'type' => 'anime',
            'genre' => 'Sci-Fi / Music',
            'rating' => 8.4,
            'release_year' => 2023,
            'creator' => 'Nexus Works',
            'total_units' => 12,
            'status' => 'Completed',
        ]);

        Media::create([
            'title' => 'The Alchemist of White Moon',
            'type' => 'manga',
            'genre' => 'Fantasy / Mystery',
            'rating' => 8.7,
            'release_year' => 2021,
            'creator' => 'Elena Vance',
            'total_units' => 85,
            'status' => 'Completed',
        ]);

        $frieren = Media::create([
            'title' => "Frieren: Beyond Journey's End",
            'type' => 'anime',
            'genre' => 'Adventure / Fantasy',
            'rating' => 9.3,
            'release_year' => 2023,
            'creator' => 'Madhouse',
            'total_units' => 28,
            'status' => 'Completed',
        ]);

        $kusuma->media()->attach([$starlight->id, $blade->id]);
        $revan->media()->attach([$frieren->id]);
    }
}
