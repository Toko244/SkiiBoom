<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TimelineEventResource\Pages;
use App\Models\TimelineEvent;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TimelineEventResource extends Resource
{
    protected static ?string $model = TimelineEvent::class;

    protected static ?string $navigationIcon = 'heroicon-o-clock';

    protected static ?string $navigationGroup = 'About Us';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Timeline Event')
                    ->icon('heroicon-o-clock')
                    ->description('Add a milestone in your company history')
                    ->schema([
                        Forms\Components\TextInput::make('year')
                            ->numeric()
                            ->required()
                            ->minValue(1900)
                            ->maxValue(2100)
                            ->placeholder(now()->year),
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('e.g., Company Founded'),
                        Forms\Components\TextInput::make('icon')
                            ->maxLength(255)
                            ->placeholder('Icon identifier'),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull()
                            ->placeholder('Describe what happened this year'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('year')
                    ->sortable()
                    ->badge()
                    ->color('primary')
                    ->size('lg'),
                Tables\Columns\TextColumn::make('title')
                    ->label('Milestone')
                    ->searchable()
                    ->weight('bold')
                    ->description(fn (TimelineEvent $record) => \Illuminate\Support\Str::limit($record->description, 60)),
            ])
            ->defaultSort('year', 'asc')
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
            ->striped()
            ->emptyStateHeading('No timeline events')
            ->emptyStateDescription('Add milestones to tell your company story.')
            ->emptyStateIcon('heroicon-o-clock');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTimelineEvents::route('/'),
            'create' => Pages\CreateTimelineEvent::route('/create'),
            'edit' => Pages\EditTimelineEvent::route('/{record}/edit'),
        ];
    }
}
