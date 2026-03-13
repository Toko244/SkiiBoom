<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\ContentService;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    public function __construct(
        private ContentService $contentService
    ) {}

    public function page(string $page): JsonResponse
    {
        $content = $this->contentService->getPageContentForApi($page);

        return response()->json([
            'success' => true,
            'data' => $content,
        ]);
    }

    public function section(string $page, string $section): JsonResponse
    {
        $apiContent = $this->contentService->getPageContentForApi($page);
        $content = $apiContent[$section] ?? [];

        return response()->json([
            'success' => true,
            'data' => $content,
        ]);
    }

    public function settings(?string $group = null): JsonResponse
    {
        $settings = $this->contentService->getSettings($group);

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }
}
