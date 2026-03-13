<?php

namespace App\Exceptions;

use Exception;

class EquipmentUnavailableException extends Exception
{
    public function render()
    {
        return response()->json([
            'success' => false,
            'message' => $this->getMessage(),
            'code' => 'EQUIPMENT_UNAVAILABLE',
        ], 409);
    }
}
