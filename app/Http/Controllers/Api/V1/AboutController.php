<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Models\Certification;
use App\Models\Facility;
use App\Models\Partner;
use App\Models\TeamMember;
use App\Models\TimelineEvent;
use Illuminate\Http\JsonResponse;

class AboutController extends Controller
{
    public function team(): JsonResponse
    {
        $members = TeamMember::active()->orderBy('sort_order')->get();

        return response()->json([
            'success' => true,
            'data' => TeamMemberResource::collection($members),
        ]);
    }

    public function certifications(): JsonResponse
    {
        $certs = Certification::orderBy('sort_order')->get()->map(fn ($c) => [
            'id' => $c->id,
            'icon' => $c->icon ?? '',
            'title' => $c->name,
            'description' => $c->description,
            'issuer' => $c->issuer,
        ]);

        return response()->json(['success' => true, 'data' => $certs]);
    }

    public function partners(): JsonResponse
    {
        $partners = Partner::active()->orderBy('sort_order')->get()->map(fn ($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'logo' => $p->logo_path ?? '',
            'alt' => $p->name . ' logo',
            'url' => $p->url,
            'category' => 'partner',
        ]);

        return response()->json(['success' => true, 'data' => $partners]);
    }

    public function facilities(): JsonResponse
    {
        $facilities = Facility::with('images')->orderBy('sort_order')->get()->map(fn ($f) => [
            'id' => $f->id,
            'title' => $f->name,
            'description' => $f->description,
            'areaSize' => $f->area_size,
            'image' => $f->images->first()?->image_path ?? '',
            'alt' => $f->name,
            'images' => $f->images->map(fn ($img) => [
                'url' => $img->image_path,
                'alt' => $img->alt_text ?? '',
            ]),
        ]);

        return response()->json(['success' => true, 'data' => $facilities]);
    }

    public function timeline(): JsonResponse
    {
        $events = TimelineEvent::orderBy('sort_order')->get()->map(fn ($e) => [
            'id' => $e->id,
            'year' => (string) $e->year,
            'title' => $e->title,
            'description' => $e->description,
            'icon' => $e->icon ?? '',
        ]);

        return response()->json(['success' => true, 'data' => $events]);
    }
}
