<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentSpecification extends Model
{
    protected $fillable = [
        'equipment_id', 'label', 'value', 'sort_order',
    ];

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }
}
