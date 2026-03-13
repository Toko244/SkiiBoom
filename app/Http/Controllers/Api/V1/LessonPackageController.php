<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\LessonPackageResource;
use App\Models\LessonPackage;
use Illuminate\Http\JsonResponse;

class LessonPackageController extends Controller
{
    public function index(): JsonResponse
    {
        $packages = LessonPackage::orderBy('sort_order')->get();

        return response()->json([
            'success' => true,
            'data' => LessonPackageResource::collection($packages),
        ]);
    }

    public function available(): JsonResponse
    {
        $packages = LessonPackage::available()
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => LessonPackageResource::collection($packages),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $package = LessonPackage::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new LessonPackageResource($package),
        ]);
    }
}
