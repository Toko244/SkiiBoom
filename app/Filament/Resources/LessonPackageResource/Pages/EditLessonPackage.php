<?php

namespace App\Filament\Resources\LessonPackageResource\Pages;

use App\Filament\Resources\LessonPackageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLessonPackage extends EditRecord
{
    protected static string $resource = LessonPackageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
