<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Instructor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'slug', 'name', 'image_path',
        'specialization',
        'experience_years', 'languages', 'rating', 'total_lessons',
        'certifications', 'bio',
        'active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'languages' => 'array',
            'certifications' => 'array',
            'rating' => 'decimal:1',
            'active' => 'boolean',
        ];
    }

    public function lessonPackages()
    {
        return $this->hasMany(LessonPackage::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }
}
