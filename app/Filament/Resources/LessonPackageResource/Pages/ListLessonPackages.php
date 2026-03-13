<?php

namespace App\Filament\Resources\LessonPackageResource\Pages;

use App\Filament\Resources\LessonPackageResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLessonPackages extends ListRecords
{
    protected static string $resource = LessonPackageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
