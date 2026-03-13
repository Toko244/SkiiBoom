<?php

namespace App\Models;

use App\Enums\GalleryPhotoStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GalleryPhoto extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'image_path', 'title',
        'author_name', 'author_avatar', 'date', 'likes_count',
        'category', 'season', 'description',
        'status', 'user_id', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'status' => GalleryPhotoStatus::class,
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'photo_likes', 'photo_id', 'user_id');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', GalleryPhotoStatus::Approved);
    }
}
