<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentVersion extends Model
{
    protected $fillable = [
        'versionable_type', 'versionable_id', 'data', 'reason', 'changed_by',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }

    public function versionable()
    {
        return $this->morphTo();
    }

    public function changedByUser()
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
