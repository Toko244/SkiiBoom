<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonPackageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'sessions' => $this->sessions,
            'duration' => $this->total_hours,
            'price' => (string) ((int) $this->price) . ' GEL',
            'priceNumeric' => (float) $this->price,
            'savings' => $this->savings ? ((string) ((int) $this->savings) . ' GEL') : '',
            'features' => $this->features ?? [],
            'popular' => $this->is_popular,
        ];
    }
}
