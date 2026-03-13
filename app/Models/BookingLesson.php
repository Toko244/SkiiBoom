<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingLesson extends Model
{
    protected $fillable = [
        'booking_id', 'lesson_id', 'lesson_package_id', 'price',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
        ];
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function lessonPackage()
    {
        return $this->belongsTo(LessonPackage::class);
    }
}
