<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Testimonial::active();

        if ($request->filled('page')) {
            $query->forPage($request->page);
        }

        $testimonials = $query->orderBy('sort_order')->get();

        return response()->json([
            'success' => true,
            'data' => TestimonialResource::collection($testimonials),
        ]);
    }
}
