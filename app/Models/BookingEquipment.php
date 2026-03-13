<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingEquipment extends Model
{
    protected $table = 'booking_equipment';

    protected $fillable = [
        'booking_id', 'equipment_id', 'quantity', 'price_per_day', 'line_total',
    ];

    protected function casts(): array
    {
        return [
            'price_per_day' => 'decimal:2',
            'line_total' => 'decimal:2',
        ];
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
