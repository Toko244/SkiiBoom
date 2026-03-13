<?php

namespace App\Observers;

use App\Models\Booking;

class BookingObserver
{
    public function creating(Booking $booking): void
    {
        if (empty($booking->booking_ref)) {
            $booking->booking_ref = Booking::generateRef();
        }
    }
}
