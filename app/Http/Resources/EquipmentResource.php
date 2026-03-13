<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentResource extends JsonResource
{
    use Concerns\ResolvesStorageUrls;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'category' => $this->category,
            'price' => (float) $this->price_per_day,
            'image' => $this->whenLoaded('primaryImage', function () {
                return $this->storageUrl($this->primaryImage?->image_path);
            }, $this->storageUrl($this->images->first()?->image_path)),
            'alt' => $this->whenLoaded('primaryImage', function () {
                return $this->primaryImage?->alt_text ?? '';
            }, ''),
            'rating' => (float) $this->rating,
            'reviews' => (int) $this->reviews_count,
            'available' => $this->available,
            'features' => $this->features ?? [],
            'sizes' => $this->sizes ?? [],
            'description' => $this->description ?? '',
            'specifications' => $this->whenLoaded('specifications', function () {
                return $this->specifications->map(fn ($spec) => [
                    'label' => $spec->label,
                    'value' => $spec->value,
                ]);
            }),
            'images' => $this->whenLoaded('images', function () {
                return $this->images->map(fn ($img) => [
                    'url' => $this->storageUrl($img->image_path),
                    'alt' => $img->alt_text ?? '',
                ]);
            }),
        ];
    }
}
