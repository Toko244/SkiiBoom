<?php

namespace App\Exceptions;

use Exception;

class LessonUnavailableException extends Exception
{
    public function render()
    {
        return response()->json([
            'success' => false,
            'message' => $this->getMessage(),
            'code' => 'LESSON_UNAVAILABLE',
        ], 409);
    }
}
