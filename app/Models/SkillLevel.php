<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillLevel extends Model
{
    protected $fillable = [
        'slug', 'name',
        'description',
        'icon', 'duration', 'price', 'features',
        'color', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'features' => 'array',
        ];
    }

    public function lessonPackages()
    {
        return $this->hasMany(LessonPackage::class);
    }
}
