<?php

namespace App\Services;

use App\Enums\BookingStatus;
use App\Mail\BookingCreatedMail;
use App\Models\Booking;
use App\Models\Equipment;
use App\Models\Lesson;
use App\Models\LessonPackage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class BookingService
{
    public function __construct(
        private CurrencyService $currencyService
    ) {}

    public function createBooking(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            $numberOfDays = $data['number_of_days'];
            $subtotal = 0;

            // Calculate equipment totals
            $equipmentItems = [];
            if (! empty($data['equipment'])) {
                foreach ($data['equipment'] as $item) {
                    $equipment = Equipment::findOrFail($item['equipment_id']);
                    if (! $equipment->available) {
                        throw ValidationException::withMessages([
                            'equipment' => ["Equipment '{$equipment->name_en}' is not available."],
                        ]);
                    }
                    $quantity = $item['quantity'] ?? 1;
                    $lineTotal = $equipment->price_per_day * $quantity * $numberOfDays;
                    $subtotal += $lineTotal;
                    $equipmentItems[] = [
                        'equipment_id' => $equipment->id,
                        'quantity' => $quantity,
                        'price_per_day' => $equipment->price_per_day,
                        'line_total' => $lineTotal,
                    ];
                }
            }

            // Calculate lesson totals
            $lessonItems = [];
            if (! empty($data['lesson'])) {
                $lesson = Lesson::findOrFail($data['lesson']['lesson_id']);
                if (! $lesson->available) {
                    throw ValidationException::withMessages([
                        'lesson' => ["Lesson '{$lesson->title_en}' is not available."],
                    ]);
                }
                $subtotal += $lesson->price;
                $lessonItems[] = [
                    'lesson_id' => $lesson->id,
                    'lesson_package_id' => null,
                    'price' => $lesson->price,
                ];
            }

            if (! empty($data['lesson_package_id'])) {
                $package = LessonPackage::findOrFail($data['lesson_package_id']);
                if (! $package->available) {
                    throw ValidationException::withMessages([
                        'lesson_package_id' => ["Lesson package '{$package->name_en}' is not available."],
                    ]);
                }
                $subtotal += $package->price;
                $lessonItems[] = [
                    'lesson_id' => null,
                    'lesson_package_id' => $package->id,
                    'price' => $package->price,
                ];
            }

            $currency = $data['currency'] ?? 'GEL';
            $exchangeRate = $this->currencyService->getRate($currency);
            $taxRate = config('booking.tax_rate', 0.18);
            $taxAmount = round($subtotal * $taxRate, 2);
            $totalAmount = $subtotal + $taxAmount;

            $booking = Booking::create([
                'booking_ref' => Booking::generateRef(),
                'user_id' => auth()->id(),
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'start_date' => $data['start_date'],
                'end_date' => $data['end_date'],
                'arrival_date' => $data['arrival_date'] ?? $data['start_date'],
                'number_of_days' => $numberOfDays,
                'subtotal' => $subtotal,
                'discount' => 0,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'currency' => $currency,
                'exchange_rate' => $exchangeRate,
                'status' => BookingStatus::Pending,
                'payment_method' => $data['payment_method'] ?? null,
                'customer_message' => $data['customer_message'] ?? null,
                'language' => $data['language'] ?? app()->getLocale(),
            ]);

            foreach ($equipmentItems as $item) {
                $booking->equipmentItems()->create($item);
            }

            foreach ($lessonItems as $item) {
                $booking->lessonItems()->create($item);
            }

            // Send confirmation email (queued)
            Mail::to($booking->email)->queue(new BookingCreatedMail($booking));

            return $booking;
        });
    }

    public function cancelBooking(Booking $booking): Booking
    {
        $nonCancellable = [
            BookingStatus::Completed->value,
            BookingStatus::Cancelled->value,
            BookingStatus::Refunded->value,
        ];

        if (in_array($booking->status->value, $nonCancellable)) {
            throw ValidationException::withMessages([
                'status' => ['This booking cannot be cancelled.'],
            ]);
        }

        $booking->update([
            'status' => BookingStatus::Cancelled,
            'cancelled_at' => now(),
        ]);

        return $booking;
    }
}
