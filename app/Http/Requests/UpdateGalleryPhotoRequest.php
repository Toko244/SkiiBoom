<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGalleryPhotoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => 'sometimes|in:pending,approved,rejected',
            'title' => 'sometimes|nullable|string|max:200',
            'description' => 'sometimes|nullable|string|max:1000',
            'category' => 'sometimes|in:skiing,equipment,lessons,slopes',
            'season' => 'sometimes|in:winter,spring,summer,autumn',
            'sort_order' => 'sometimes|integer|min:0',
        ];
    }
}
