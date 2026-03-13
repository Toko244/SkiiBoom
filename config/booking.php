<?php

return [
    'tax_rate' => env('BOOKING_TAX_RATE', 0.18),
    'default_currency' => env('BOOKING_DEFAULT_CURRENCY', 'GEL'),
    'min_days' => 1,
    'max_days' => 30,
];
