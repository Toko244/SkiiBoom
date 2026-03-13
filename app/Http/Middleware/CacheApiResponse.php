<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class CacheApiResponse
{
    public function handle(Request $request, Closure $next, int $ttl = 300): Response
    {
        if ($request->header('Cache-Control') === 'no-cache') {
            return $next($request);
        }

        if (! $request->isMethod('GET')) {
            return $next($request);
        }

        $cacheKey = 'api:' . md5($request->fullUrl());

        return Cache::remember($cacheKey, $ttl, function () use ($request, $next) {
            return $next($request);
        });
    }
}
