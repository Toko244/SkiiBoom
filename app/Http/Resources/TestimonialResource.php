<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestimonialResource extends JsonResource
{
    use Concerns\ResolvesStorageUrls;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'country' => $this->country ?? '',
            'location' => $this->country ?? '',
            'image' => $this->storageUrl($this->image_path),
            'alt' => $this->name,
            'rating' => (float) $this->rating,
            'text' => $this->text,
            'comment' => $this->text,
            'date' => $this->date?->format('F Y'),
            'lessonType' => $this->lesson_type ?? '',
            'platform' => $this->platform ?? '',
            'page' => $this->page,
        ];
    }
}
