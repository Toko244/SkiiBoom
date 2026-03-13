<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeamMemberResource extends JsonResource
{
    use Concerns\ResolvesStorageUrls;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'image' => $this->storageUrl($this->image_path),
            'alt' => $this->name . ' - Team Member',
            'bio' => $this->bio,
            'certifications' => $this->certifications ?? [],
            'experience' => $this->experience_years ? ($this->experience_years . '+ years') : '',
        ];
    }
}
