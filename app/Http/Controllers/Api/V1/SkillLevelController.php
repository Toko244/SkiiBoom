<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillLevelResource;
use App\Models\SkillLevel;
use Illuminate\Http\JsonResponse;

class SkillLevelController extends Controller
{
    public function index(): JsonResponse
    {
        $levels = SkillLevel::orderBy('sort_order')->get();

        return response()->json([
            'success' => true,
            'data' => SkillLevelResource::collection($levels),
        ]);
    }
}
