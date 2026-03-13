<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = FAQ::active();

        if ($request->filled('page')) {
            $query->forPage($request->page);
        }

        $faqs = $query->orderBy('sort_order')->get()->map(fn ($faq) => [
            'id' => $faq->id,
            'question' => $faq->question,
            'answer' => $faq->answer,
        ]);

        return response()->json([
            'success' => true,
            'data' => $faqs,
        ]);
    }
}
