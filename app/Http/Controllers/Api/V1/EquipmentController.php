<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Equipment::with(['images', 'specifications']);

        // By default show all items; when availability=available, show only available
        if ($request->input('availability') === 'available') {
            $query->available();
        }

        if ($request->filled('search')) {
            $query->search($request->search);
        }

        if ($request->filled('category')) {
            $categories = is_array($request->category) ? $request->category : explode(',', $request->category);
            $query->inCategory($categories);
        }

        if ($request->filled('price_min') || $request->filled('price_max')) {
            $query->priceBetween(
                $request->input('price_min', 0),
                $request->input('price_max', 9999)
            );
        }

        if ($request->filled('size')) {
            $sizes = is_array($request->size) ? $request->size : explode(',', $request->size);
            $query->where(function ($q) use ($sizes) {
                foreach ($sizes as $size) {
                    $q->orWhereJsonContains('sizes', $size);
                }
            });
        }

        if ($request->filled('min_rating')) {
            $query->minRating($request->min_rating);
        }

        $sort = $request->input('sort', 'popular');
        $query = match ($sort) {
            'price_asc', 'price-low' => $query->orderBy('price_per_day', 'asc'),
            'price_desc', 'price-high' => $query->orderBy('price_per_day', 'desc'),
            'rating' => $query->orderBy('rating', 'desc'),
            'newest' => $query->orderBy('created_at', 'desc'),
            default => $query->orderBy('reviews_count', 'desc'),
        };

        $perPage = min($request->input('per_page', 12), 50);
        $equipment = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => EquipmentResource::collection($equipment),
            'meta' => [
                'current_page' => $equipment->currentPage(),
                'last_page' => $equipment->lastPage(),
                'per_page' => $equipment->perPage(),
                'total' => $equipment->total(),
            ],
        ]);
    }

    public function featured(): JsonResponse
    {
        $equipment = Equipment::with(['images'])
            ->available()
            ->featured()
            ->orderBy('rating', 'desc')
            ->limit(4)
            ->get();

        return response()->json([
            'success' => true,
            'data' => EquipmentResource::collection($equipment),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $equipment = Equipment::with(['images', 'specifications'])
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new EquipmentResource($equipment),
        ]);
    }

    public function categories(): JsonResponse
    {
        $categories = Equipment::available()
            ->selectRaw('category, COUNT(*) as count')
            ->groupBy('category')
            ->pluck('count', 'category');

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}
