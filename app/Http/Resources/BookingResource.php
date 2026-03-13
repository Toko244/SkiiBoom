<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'bookingId' => $this->booking_ref,
            'status' => $this->status,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'startDate' => $this->start_date?->toDateString(),
            'endDate' => $this->end_date?->toDateString(),
            'arrivalDate' => $this->arrival_date?->toDateString(),
            'numberOfDays' => $this->number_of_days,
            'subtotal' => (float) $this->subtotal,
            'discount' => (float) $this->discount,
            'taxAmount' => (float) $this->tax_amount,
            'totalAmount' => (float) $this->total_amount,
            'currency' => $this->currency,
            'exchangeRate' => (float) $this->exchange_rate,
            'paymentMethod' => $this->payment_method,
            'customerMessage' => $this->customer_message,
            'language' => $this->language,
            'equipment' => $this->whenLoaded('equipmentItems', function () {
                return $this->equipmentItems->map(fn ($item) => [
                    'id' => $item->equipment_id,
                    'name' => $item->equipment?->name_en ?? '',
                    'quantity' => $item->quantity,
                    'pricePerDay' => (float) $item->price_per_day,
                    'lineTotal' => (float) $item->line_total,
                ]);
            }),
            'lessons' => $this->whenLoaded('lessonItems', function () {
                return $this->lessonItems->map(fn ($item) => [
                    'id' => $item->lesson_id ?? $item->lesson_package_id,
                    'title' => $item->lesson?->title_en ?? $item->lessonPackage?->name_en ?? '',
                    'price' => (float) $item->price,
                ]);
            }),
            'createdAt' => $this->created_at?->toIso8601String(),
        ];
    }
}
