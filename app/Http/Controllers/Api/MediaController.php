<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MediaController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Media::query();

        $search = $request->query('search') ?? $request->query('title');
        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        if ($type = $request->query('type')) {
            $query->where('type', strtolower($type));
        }

        return MediaResource::collection($query->orderBy('id')->get());
    }

    public function store(StoreMediaRequest $request): JsonResponse
    {
        $media = Media::create($request->validated());

        return (new MediaResource($media))
            ->additional(['message' => 'Media berhasil ditambahkan ke katalog FlipPlay.'])
            ->response()
            ->setStatusCode(201);
    }

    public function show(Media $media): MediaResource
    {
        $media->load('users');

        return new MediaResource($media);
    }

    public function update(UpdateMediaRequest $request, Media $media): MediaResource
    {
        $media->update($request->validated());

        return (new MediaResource($media->fresh()))
            ->additional(['message' => 'Data media berhasil diperbarui.']);
    }

    public function destroy(Media $media): JsonResponse
    {
        $media->delete();

        return response()->json([
            'message' => 'Media berhasil dihapus dari katalog FlipPlay.',
        ], 200);
    }
}
