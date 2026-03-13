<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\InstructorResource;
use App\Models\Instructor;
use Illuminate\Http\JsonResponse;

class InstructorController extends Controller
{
    public function index(): JsonResponse
    {
        $instructors = Instructor::active()
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => InstructorResource::collection($instructors),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $instructor = Instructor::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new InstructorResource($instructor),
        ]);
    }
}
