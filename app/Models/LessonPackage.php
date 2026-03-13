<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LessonPackage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug', 'name',
        'description',
        'instructor_id', 'skill_level_id', 'sessions', 'total_hours',
        'price', 'savings', 'features',
        'is_popular', 'available', 'image_path', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'savings' => 'decimal:2',
            'features' => 'array',
            'is_popular' => 'boolean',
            'available' => 'boolean',
        ];
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function skillLevel()
    {
        return $this->belongsTo(SkillLevel::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('available', true);
    }
}
