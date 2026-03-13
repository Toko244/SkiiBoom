<?php

namespace App\Filament\Resources\SkillLevelResource\Pages;

use App\Filament\Resources\SkillLevelResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListSkillLevels extends ListRecords
{
    protected static string $resource = SkillLevelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
