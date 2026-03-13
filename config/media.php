<?php

return [
    'max_size' => 10240, // KB (10MB)
    'allowed_mimes' => ['jpg', 'jpeg', 'png', 'webp'],
    'image_quality' => 85,
    'thumbnail' => [
        'width' => 400,
        'height' => 300,
    ],
    'max_dimensions' => [
        'width' => 4000,
        'height' => 4000,
    ],
    'disk' => env('MEDIA_DISK', 'public'),
];
