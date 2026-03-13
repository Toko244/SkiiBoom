<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'name', 'country', 'image_path', 'rating',
        'text',
        'date', 'lesson_type', 'platform', 'page',
        'active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'decimal:1',
            'date' => 'date',
            'active' => 'boolean',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeForPage($query, $page)
    {
        return $query->where('page', $page);
    }
}
