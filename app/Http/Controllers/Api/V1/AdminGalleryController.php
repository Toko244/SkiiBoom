<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateGalleryPhotoRequest;
use App\Http\Resources\AdminGalleryPhotoResource;
use App\Models\GalleryPhoto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminGalleryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = GalleryPhoto::with('user');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('season')) {
            $query->where('season', $request->season);
        }

        $query->orderBy('created_at', 'desc');

        $perPage = min($request->input('per_page', 20), 50);
        $photos = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => AdminGalleryPhotoResource::collection($photos),
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
        $photo->load('user');

        return response()->json([
            'success' => true,
            'data' => new AdminGalleryPhotoResource($photo),
        ]);
    }

    public function update(UpdateGalleryPhotoRequest $request, GalleryPhoto $photo): JsonResponse
    {
        $data = $request->validated();

        $photo->update($data);

        return response()->json([
            'success' => true,
            'data' => new AdminGalleryPhotoResource($photo->fresh('user')),
            'message' => 'Photo updated successfully.',
        ]);
    }

    public function destroy(GalleryPhoto $photo): JsonResponse
    {
        $photo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Photo deleted successfully.',
        ]);
    }
}
