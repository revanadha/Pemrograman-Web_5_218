<?php

namespace Tests\Feature;

use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FlipPlayApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_and_filter_media(): void
    {
        $this->seed();

        $response = $this->getJson('/api/media');
        $response->assertStatus(200)
            ->assertJsonCount(5, 'data')
            ->assertJsonMissingPath('data.0.collected_by');

        $filtered = $this->getJson('/api/media?search=horizon&type=anime');
        $filtered->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Starlight Horizon');
    }

    public function test_can_create_media_and_reject_invalid_or_duplicate(): void
    {
        $payload = [
            'title' => 'Chainsaw Man',
            'type' => 'anime',
            'genre' => 'Dark Fantasy / Action',
            'rating' => 8.8,
            'release_year' => 2022,
            'creator' => 'MAPPA',
            'total_units' => 12,
            'status' => 'Completed',
        ];

        $this->postJson('/api/media', $payload)
            ->assertStatus(201)
            ->assertJsonPath('data.title', 'Chainsaw Man');

        $this->postJson('/api/media', array_merge($payload, ['title' => '']))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title']);

        $this->postJson('/api/media', $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }

    public function test_show_media_includes_eager_loaded_users(): void
    {
        $this->seed();
        $media = Media::where('title', 'Starlight Horizon')->firstOrFail();

        $this->getJson("/api/media/{$media->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.title', 'Starlight Horizon')
            ->assertJsonCount(1, 'data.collected_by')
            ->assertJsonPath('data.collected_by.0.name', 'Kusuma');
    }

    public function test_can_update_and_delete_media(): void
    {
        $this->seed();
        $media = Media::firstOrFail();

        $this->patchJson("/api/media/{$media->id}", [
            'rating' => 9.5,
            'status' => 'Completed',
        ])
            ->assertStatus(200)
            ->assertJsonPath('data.rating', 9.5);

        $this->deleteJson("/api/media/{$media->id}")
            ->assertStatus(200);

        $this->getJson("/api/media/{$media->id}")
            ->assertStatus(404);
    }

    public function test_user_collection_attach_duplicate_and_detach(): void
    {
        $this->seed();
        $user = User::where('email', 'revan@flipplay.test')->firstOrFail();
        $media = Media::where('title', 'Cyber Symphony')->firstOrFail();

        $this->getJson("/api/users/{$user->id}/collection")
            ->assertStatus(200)
            ->assertJsonCount(1, 'data.collection');

        $this->postJson("/api/users/{$user->id}/collection", ['media_id' => $media->id])
            ->assertStatus(201)
            ->assertJsonCount(2, 'data.collection');

        $this->postJson("/api/users/{$user->id}/collection", ['media_id' => $media->id])
            ->assertStatus(409);

        $this->deleteJson("/api/users/{$user->id}/collection/{$media->id}")
            ->assertStatus(200);

        $this->deleteJson("/api/users/{$user->id}/collection/{$media->id}")
            ->assertStatus(404);
    }
}
