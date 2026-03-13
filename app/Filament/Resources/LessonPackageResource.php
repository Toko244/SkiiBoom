<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LessonPackageResource\Pages;
use App\Models\LessonPackage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class LessonPackageResource extends Resource
{
    protected static ?string $model = LessonPackage::class;

    protected static ?string $navigationIcon = 'heroicon-o-gift';

    protected static ?string $navigationGroup = 'Catalog';

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Package Info')
                            ->icon('heroicon-o-gift')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label('Package Name')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->maxLength(255),
                                Forms\Components\Select::make('instructor_id')
                                    ->label('Instructor')
                                    ->relationship('instructor', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->native(false),
                                Forms\Components\Select::make('skill_level_id')
                                    ->label('Skill Level')
                                    ->relationship('skillLevel', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->native(false),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Description')
                            ->icon('heroicon-o-document-text')
                            ->collapsed()
                            ->schema([
                                Forms\Components\RichEditor::make('description')
                                    ->label('Description')
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Section::make('Session Details')
                            ->icon('heroicon-o-clock')
                            ->schema([
                                Forms\Components\TextInput::make('session_count')
                                    ->label('Number of Sessions')
                                    ->numeric()
                                    ->suffix('sessions'),
                                Forms\Components\TextInput::make('duration_per_session')
                                    ->label('Duration per Session')
                                    ->maxLength(255)
                                    ->placeholder('e.g., 2 hours'),
                                Forms\Components\TextInput::make('group_size')
                                    ->label('Group Size')
                                    ->maxLength(255)
                                    ->placeholder('e.g., 1-4 people'),
                            ])
                            ->columns(3),

                        Forms\Components\Section::make('Features')
                            ->icon('heroicon-o-star')
                            ->collapsed()
                            ->schema([
                                Forms\Components\TagsInput::make('features')
                                    ->label('Included Features')
                                    ->placeholder('Add a feature')
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Pricing')
                            ->icon('heroicon-o-banknotes')
                            ->schema([
                                Forms\Components\TextInput::make('price')
                                    ->label('Package Price')
                                    ->numeric()
                                    ->prefix('₾')
                                    ->required()
                                    ->step(0.01),
                                Forms\Components\TextInput::make('original_price')
                                    ->label('Original Price')
                                    ->numeric()
                                    ->prefix('₾')
                                    ->helperText('Show crossed-out price'),
                                Forms\Components\TextInput::make('savings')
                                    ->label('Savings Amount')
                                    ->numeric()
                                    ->prefix('₾')
                                    ->helperText('How much the customer saves'),
                            ]),

                        Forms\Components\Section::make('Visibility')
                            ->icon('heroicon-o-eye')
                            ->schema([
                                Forms\Components\Toggle::make('is_popular')
                                    ->label('Mark as Popular')
                                    ->helperText('Shows a "Popular" badge')
                                    ->default(false)
                                    ->onColor('warning')
                                    ->inline(false),
                                Forms\Components\Toggle::make('available')
                                    ->label('Available for Booking')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger')
                                    ->inline(false),
                                Forms\Components\TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0),
                            ]),
                    ])
                    ->columnSpan(['lg' => 1]),
            ])
            ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Package')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn (LessonPackage $record) => $record->instructor?->name),
                Tables\Columns\TextColumn::make('skillLevel.name')
                    ->label('Level')
                    ->badge()
                    ->color('info'),
                Tables\Columns\TextColumn::make('price')
                    ->money('GEL')
                    ->sortable()
                    ->color('success')
                    ->description(fn (LessonPackage $record) => $record->savings ? "Save ₾{$record->savings}" : null),
                Tables\Columns\TextColumn::make('session_count')
                    ->label('Sessions')
                    ->suffix(' sessions')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_popular')
                    ->label('Popular')
                    ->boolean()
                    ->trueIcon('heroicon-o-fire')
                    ->falseIcon('heroicon-o-minus')
                    ->trueColor('warning'),
                Tables\Columns\ToggleColumn::make('available')
                    ->onColor('success')
                    ->offColor('danger'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('available'),
                Tables\Filters\TernaryFilter::make('is_popular')
                    ->label('Popular'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->striped()
            ->emptyStateHeading('No packages yet')
            ->emptyStateDescription('Create lesson packages to offer bundled deals.')
            ->emptyStateIcon('heroicon-o-gift');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLessonPackages::route('/'),
            'create' => Pages\CreateLessonPackage::route('/create'),
            'edit' => Pages\EditLessonPackage::route('/{record}/edit'),
        ];
    }
}
