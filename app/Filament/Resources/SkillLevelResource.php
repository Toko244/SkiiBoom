<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SkillLevelResource\Pages;
use App\Models\SkillLevel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class SkillLevelResource extends Resource
{
    protected static ?string $model = SkillLevel::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationGroup = 'Catalog';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Skill Level')
                    ->icon('heroicon-o-academic-cap')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Level Name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? '')))
                            ->placeholder('e.g., Beginner, Intermediate'),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        Forms\Components\TextInput::make('price')
                            ->numeric()
                            ->prefix('₾')
                            ->step(0.01),
                        Forms\Components\TextInput::make('duration')
                            ->maxLength(255)
                            ->placeholder('e.g., 2 hours'),
                        Forms\Components\TextInput::make('icon')
                            ->maxLength(255)
                            ->placeholder('Icon identifier'),
                        Forms\Components\TextInput::make('color')
                            ->type('color')
                            ->label('Theme Color'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Description & Features')
                    ->icon('heroicon-o-document-text')
                    ->schema([
                        Forms\Components\RichEditor::make('description')
                            ->label('Description')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold', 'italic',
                                'bulletList', 'orderedList',
                            ]),
                        Forms\Components\TagsInput::make('features')
                            ->label('What You Will Learn')
                            ->placeholder('Add a feature')
                            ->helperText('Key takeaways for this skill level')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Level')
                    ->searchable()
                    ->weight('bold')
                    ->description(fn (SkillLevel $record) => $record->duration),
                Tables\Columns\TextColumn::make('price')
                    ->money('GEL')
                    ->color('success'),
                Tables\Columns\TextColumn::make('features')
                    ->label('Features')
                    ->formatStateUsing(fn ($state) => is_array($state) ? count($state) . ' items' : '-')
                    ->color('gray'),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->reorderable('sort_order')
            ->defaultSort('sort_order')
            ->striped()
            ->emptyStateHeading('No skill levels defined')
            ->emptyStateDescription('Create skill levels like Beginner, Intermediate, and Advanced.')
            ->emptyStateIcon('heroicon-o-academic-cap');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSkillLevels::route('/'),
            'create' => Pages\CreateSkillLevel::route('/create'),
            'edit' => Pages\EditSkillLevel::route('/{record}/edit'),
        ];
    }
}
