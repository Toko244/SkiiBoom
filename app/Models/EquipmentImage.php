<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentImage extends Model
{
    protected $fillable = [
        'equipment_id', 'image_path', 'alt_text',
        'is_primary', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
        ];
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
