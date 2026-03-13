<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Guest bookings allowed
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|max:200',
            'phone' => 'nullable|string|max:20',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after_or_equal:start_date',
            'arrival_date' => 'nullable|date',
            'number_of_days' => 'required|integer|min:1|max:30',
            'currency' => 'required|in:GEL,EUR,USD',
            'payment_method' => 'nullable|in:card,paypal,bank_transfer,on_arrival',
            'customer_message' => 'nullable|string|max:1000',
            'language' => 'nullable|in:en,ka,ru',
            'equipment' => 'nullable|array',
            'equipment.*.equipment_id' => 'required|exists:equipment,id',
            'equipment.*.quantity' => 'required|integer|min:1|max:10',
            'lesson' => 'nullable|array',
            'lesson.lesson_id' => 'required_with:lesson|exists:lessons,id',
            'lesson_package_id' => 'nullable|exists:lesson_packages,id',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if (empty($this->equipment) && empty($this->lesson) && empty($this->lesson_package_id)) {
                $validator->errors()->add('equipment', 'At least one equipment item or lesson must be selected.');
            }
        });
    }
}
