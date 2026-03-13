<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InstructorResource extends JsonResource
{
    use Concerns\ResolvesStorageUrls;

    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'image' => $this->storageUrl($this->image_path),
            'alt' => $this->name . ' - Instructor',
            'specialization' => $this->specialization,
            'experience' => $this->experience_years . ' years',
            'languages' => $this->languages ?? [],
            'rating' => (float) $this->rating,
            'totalLessons' => (int) $this->total_lessons,
            'certifications' => $this->certifications ?? [],
            'bio' => $this->bio ?? '',
        ];
    }
}
