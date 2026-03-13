<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GalleryPhotoResource extends JsonResource
{
    use Concerns\ResolvesStorageUrls;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image' => $this->storageUrl($this->image_path),
            'alt' => $this->title,
            'title' => $this->title,
            'author' => $this->author_name,
            'authorAvatar' => $this->author_avatar ?? '',
            'authorAvatarAlt' => $this->author_name,
            'date' => $this->date?->toDateString(),
            'likes' => (int) $this->likes_count,
            'category' => $this->category,
            'season' => $this->season,
            'description' => $this->description ?? '',
            'status' => $this->status,
        ];
    }
}
