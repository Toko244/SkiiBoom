<?php

namespace App\Models;

use App\Enums\EquipmentCategory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Equipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'equipment';

    protected $fillable = [
        'slug', 'name',
        'description',
        'category', 'price_per_day', 'rating', 'reviews_count',
        'available', 'sizes', 'features',
        'is_featured', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'category' => EquipmentCategory::class,
            'price_per_day' => 'decimal:2',
            'rating' => 'decimal:1',
            'available' => 'boolean',
            'is_featured' => 'boolean',
            'sizes' => 'array',
            'features' => 'array',
        ];
    }

    public function images()
    {
        return $this->hasMany(EquipmentImage::class)->orderBy('sort_order');
    }

    public function specifications()
    {
        return $this->hasMany(EquipmentSpecification::class)->orderBy('sort_order');
    }

    public function primaryImage()
    {
        return $this->hasOne(EquipmentImage::class)->where('is_primary', true);
    }

    public function scopeAvailable($query)
    {
        return $query->where('available', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeInCategory($query, $categories)
    {
        return $query->whereIn('category', (array) $categories);
    }

    public function scopePriceBetween($query, $min, $max)
    {
        return $query->whereBetween('price_per_day', [$min, $max]);
    }

    public function scopeMinRating($query, $rating)
    {
        return $query->where('rating', '>=', $rating);
    }

    public function scopeSearch($query, $term)
    {
        return $query->where(function ($q) use ($term) {
            $q->where('name', 'LIKE', "%{$term}%")
              ->orWhere('description', 'LIKE', "%{$term}%");
        });
    }
}
