<?php

namespace App\Http\Resources\Concerns;

use Illuminate\Support\Facades\Storage;

trait ResolvesStorageUrls
{
    protected function storageUrl(?string $path): string
    {
        if (!$path || $path === '') {
            return '';
        }

        if (str_starts_with($path, 'http')) {
            return $path;
        }

        return rtrim(config('app.url'), '/') . Storage::disk('public')->url($path);
    }
}
