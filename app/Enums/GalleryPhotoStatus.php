<?php

namespace App\Enums;

enum GalleryPhotoStatus: string
{
    case Pending = 'pending';
    case Approved = 'approved';
    case Rejected = 'rejected';
}
