<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name', 'role',
        'image_path', 'bio',
        'certifications', 'experience_years', 'active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'certifications' => 'array',
            'active' => 'boolean',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }
}
