<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    use Concerns\ResolvesStorageUrls;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description ?? '',
            'instructor' => $this->whenLoaded('instructor', function () {
                return $this->instructor->name;
            }),
            'instructorId' => $this->instructor_id,
            'level' => $this->skill_level,
            'duration' => $this->duration,
            'maxParticipants' => $this->max_participants,
            'price' => (float) $this->price,
            'image' => $this->storageUrl($this->image_path),
            'available' => $this->available,
        ];
    }
}
