<?php

namespace App\Models;

use App\Enums\BookingStatus;
use App\Enums\Currency;
use App\Enums\PaymentMethod;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_ref', 'user_id', 'first_name', 'last_name', 'email', 'phone',
        'start_date', 'end_date', 'arrival_date', 'number_of_days',
        'subtotal', 'discount', 'tax_amount', 'total_amount',
        'currency', 'exchange_rate', 'status', 'payment_method',
        'customer_message', 'admin_notes', 'language',
        'confirmed_at', 'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'arrival_date' => 'date',
            'subtotal' => 'decimal:2',
            'discount' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'total_amount' => 'decimal:2',
            'exchange_rate' => 'decimal:4',
            'status' => BookingStatus::class,
            'currency' => Currency::class,
            'payment_method' => PaymentMethod::class,
            'confirmed_at' => 'datetime',
            'cancelled_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function equipmentItems()
    {
        return $this->hasMany(BookingEquipment::class);
    }

    public function lessonItems()
    {
        return $this->hasMany(BookingLesson::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public static function generateRef(): string
    {
        do {
            $ref = 'SKI' . substr((string) time(), -8);
        } while (static::where('booking_ref', $ref)->exists());

        return $ref;
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
