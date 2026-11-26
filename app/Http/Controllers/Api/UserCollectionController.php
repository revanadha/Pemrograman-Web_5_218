<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddToCollectionRequest;
use App\Http\Resources\UserResource;
use App\Models\Media;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserCollectionController extends Controller
{
    public function index(User $user): UserResource
    {
        $user->load('media');

        return new UserResource($user);
    }

    public function attach(AddToCollectionRequest $request, User $user): JsonResponse
    {
        $mediaId = (int) $request->validated('media_id');

        if ($user->media()->where('media.id', $mediaId)->exists()) {
            return response()->json([
                'message' => 'Media tersebut sudah ada di dalam koleksi pengguna ini.',
            ], 409);
        }

        $user->media()->attach($mediaId);
        $user->load('media');

        return (new UserResource($user))
            ->additional(['message' => 'Media berhasil ditambahkan ke koleksi pengguna.'])
            ->response()
            ->setStatusCode(201);
    }

    public function detach(User $user, Media $media): JsonResponse
    {
        if (! $user->media()->where('media.id', $media->id)->exists()) {
            return response()->json([
                'message' => 'Media tidak ditemukan di dalam koleksi pengguna ini.',
            ], 404);
        }

        $user->media()->detach($media->id);

        return response()->json([
            'message' => 'Media berhasil dihapus dari koleksi pengguna.',
        ], 200);
    }
}
