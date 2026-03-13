<?php

namespace App\Filament\Resources\SkillLevelResource\Pages;

use App\Filament\Resources\SkillLevelResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditSkillLevel extends EditRecord
{
    protected static string $resource = SkillLevelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
