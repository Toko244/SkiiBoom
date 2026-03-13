<?php

namespace App\Models;

use App\Enums\LessonLevel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', 'title',
        'description',
        'instructor_id', 'skill_level', 'duration', 'max_participants',
        'price', 'image_path', 'available', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'skill_level' => LessonLevel::class,
            'price' => 'decimal:2',
            'available' => 'boolean',
        ];
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('available', true);
    }
}
