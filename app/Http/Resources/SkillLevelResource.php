<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SkillLevelResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->slug,
            'title' => $this->name,
            'description' => $this->description,
            'icon' => $this->icon ?? '',
            'duration' => $this->duration,
            'price' => (string) ((int) $this->price) . ' GEL',
            'priceNumeric' => (float) $this->price,
            'features' => $this->features ?? [],
            'color' => $this->color ?? '',
        ];
    }
}
