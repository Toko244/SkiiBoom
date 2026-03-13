<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminGalleryPhotoResource extends JsonResource
{
    use Concerns\ResolvesStorageUrls;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image_path' => $this->storageUrl($this->image_path),
            'title' => $this->title,
            'description' => $this->description,
            'author_name' => $this->author_name,
            'author_avatar' => $this->author_avatar,
            'date' => $this->date?->toDateString(),
            'likes_count' => (int) $this->likes_count,
            'category' => $this->category,
            'season' => $this->season,
            'status' => $this->status,
            'sort_order' => $this->sort_order,
            'user_id' => $this->user_id,
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->full_name,
                'email' => $this->user->email,
            ]),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
