<?php

namespace App\Services;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ContentService
{
    private array $memoryCache = [];

    private function contentPath(string $page): string
    {
        return storage_path("app/content/{$page}.json");
    }

    public function getPageContent(string $page): array
    {
        if (isset($this->memoryCache[$page])) {
            return $this->memoryCache[$page];
        }

        $path = $this->contentPath($page);

        if (!file_exists($path)) {
            return [];
        }

        $data = json_decode(file_get_contents($path), true);

        if (!is_array($data)) {
            return [];
        }

        $this->memoryCache[$page] = $data;

        return $data;
    }

    /**
     * Get page content with image paths resolved to full URLs for API responses.
     */
    public function getPageContentForApi(string $page): array
    {
        $data = $this->getPageContent($page);

        $this->resolveImageUrls($data);

        return $data;
    }

    /**
     * Recursively resolve relative image paths to full Storage URLs.
     */
    private function resolveImageUrls(array &$data): void
    {
        foreach ($data as $key => &$value) {
            if (is_array($value)) {
                $this->resolveImageUrls($value);
            } elseif (is_string($value) && preg_match('/image/i', $key) && !str_starts_with($value, 'http') && $value !== '') {
                $value = rtrim(config('app.url'), '/') . Storage::disk('public')->url($value);
            }
        }
    }

    public function getSectionContent(string $page, string $section): array
    {
        $content = $this->getPageContent($page);

        return $content[$section] ?? [];
    }

    public function savePageContent(string $page, array $data): void
    {
        $path = $this->contentPath($page);

        file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        unset($this->memoryCache[$page]);
    }

    public function saveSectionContent(string $page, string $section, array $data): void
    {
        $content = $this->getPageContent($page);
        $content[$section] = $data;

        $this->savePageContent($page, $content);
    }

    public function getSettings(?string $group = null): array
    {
        $cacheKey = "settings:" . ($group ?? 'all');

        return Cache::remember($cacheKey, 3600, function () use ($group) {
            $query = SiteSetting::query();

            if ($group) {
                $query->where('group', $group);
            }

            return $query->pluck('value', 'key')->toArray();
        });
    }

    public function invalidateSettingsCache(?string $group = null): void
    {
        Cache::forget("settings:" . ($group ?? 'all'));
        Cache::forget("settings:all");
    }
}
