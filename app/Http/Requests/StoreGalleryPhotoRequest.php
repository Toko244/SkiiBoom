<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGalleryPhotoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:200',
            'description' => 'nullable|string|max:1000',
            'image' => 'required|image|mimes:jpeg,jpg,png,webp|max:10240',
            'category' => 'required|in:skiing,equipment,lessons,slopes',
            'season' => 'nullable|in:winter,spring,summer,autumn',
            'author_name' => 'nullable|string|max:150',
        ];
    }
}
