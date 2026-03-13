<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\LessonResource;
use App\Models\Lesson;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Lesson::with('instructor')->available();

        if ($request->filled('skill_level')) {
            $levels = explode(',', $request->skill_level);
            $query->whereIn('skill_level', $levels);
        }

        if ($request->filled('instructor_id')) {
            $query->where('instructor_id', $request->instructor_id);
        }

        $lessons = $query->orderBy('sort_order')->get();

        return response()->json([
            'success' => true,
            'data' => LessonResource::collection($lessons),
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $lesson = Lesson::with('instructor')
            ->where('slug', $slug)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => new LessonResource($lesson),
        ]);
    }
}
