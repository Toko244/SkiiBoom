<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGalleryPhotoRequest;
use App\Http\Resources\GalleryPhotoResource;
use App\Models\GalleryPhoto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = GalleryPhoto::approved();

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('season') && $request->season !== 'all') {
            $query->where('season', $request->season);
        }

        $sort = $request->input('sort', 'recent');
        $query = match ($sort) {
            'popular' => $query->orderBy('likes_count', 'desc'),
            'oldest' => $query->orderBy('date', 'asc'),
            default => $query->orderBy('date', 'desc'),
        };

        $perPage = min($request->input('per_page', 20), 50);
        $photos = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => GalleryPhotoResource::collection($photos),
            'meta' => [
                'current_page' => $photos->currentPage(),
                'last_page' => $photos->lastPage(),
                'per_page' => $photos->perPage(),
                'total' => $photos->total(),
            ],
        ]);
    }

    public function show(GalleryPhoto $photo): JsonResponse
    {
        abort_unless($photo->status->value === 'approved', 404);

        return response()->json([
            'success' => true,
            'data' => new GalleryPhotoResource($photo),
        ]);
    }

    public function store(StoreGalleryPhotoRequest $request): JsonResponse
    {
        $imagePath = $request->file('image')->store('gallery', 'public');

        $photo = GalleryPhoto::create([
            'image_path' => $imagePath,
            'title' => $request->title,
            'author_name' => $request->author_name ?? $request->user()?->full_name ?? 'Anonymous',
            'date' => now(),
            'category' => $request->category,
            'season' => $request->season ?? 'winter',
            'description' => $request->description,
            'status' => 'pending',
            'user_id' => $request->user()?->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => new GalleryPhotoResource($photo),
            'message' => 'Photo submitted for review.',
        ], 201);
    }

    public function like(GalleryPhoto $photo, Request $request): JsonResponse
    {
        $request->user()->likedPhotos()->syncWithoutDetaching([$photo->id]);
        $photo->increment('likes_count');

        return response()->json([
            'success' => true,
            'data' => ['likes' => $photo->fresh()->likes_count],
        ]);
    }

    public function unlike(GalleryPhoto $photo, Request $request): JsonResponse
    {
        $detached = $request->user()->likedPhotos()->detach($photo->id);
        if ($detached) {
            $photo->decrement('likes_count');
        }

        return response()->json([
            'success' => true,
            'data' => ['likes' => $photo->fresh()->likes_count],
        ]);
    }
}
