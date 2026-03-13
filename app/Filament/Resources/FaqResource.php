<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages;
use App\Models\FAQ;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class FaqResource extends Resource
{
    protected static ?string $model = FAQ::class;

    protected static ?string $navigationIcon = 'heroicon-o-question-mark-circle';

    protected static ?string $navigationGroup = 'Settings';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationLabel = 'FAQs';

    protected static ?string $modelLabel = 'FAQ';

    protected static ?string $pluralModelLabel = 'FAQs';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('FAQ Content')
                    ->icon('heroicon-o-question-mark-circle')
                    ->schema([
                        Forms\Components\TextInput::make('question')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull()
                            ->placeholder('Type the frequently asked question'),
                        Forms\Components\RichEditor::make('answer')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold', 'italic', 'underline',
                                'bulletList', 'orderedList',
                                'link',
                            ]),
                    ]),

                Forms\Components\Section::make('Display Settings')
                    ->icon('heroicon-o-adjustments-horizontal')
                    ->schema([
                        Forms\Components\Select::make('page')
                            ->label('Show on Page')
                            ->options([
                                'lessons' => 'Ski Lessons',
                                'equipment' => 'Equipment Rental',
                                'booking' => 'Book Online',
                                'general' => 'General',
                            ])
                            ->native(false),
                        Forms\Components\Toggle::make('active')
                            ->label('Published')
                            ->default(true)
                            ->onColor('success')
                            ->offColor('danger')
                            ->inline(false),
                        Forms\Components\TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('question')
                    ->label('Question')
                    ->searchable()
                    ->limit(60)
                    ->weight('bold')
                    ->wrap(),
                Tables\Columns\TextColumn::make('page')
                    ->badge()
                    ->color(fn (?string $state): string => match ($state) {
                        'lessons' => 'info',
                        'equipment' => 'warning',
                        'booking' => 'success',
                        'general' => 'gray',
                        default => 'gray',
                    }),
                Tables\Columns\ToggleColumn::make('active')
                    ->label('Published')
                    ->onColor('success')
                    ->offColor('danger'),
            ])
            ->reorderable('sort_order')
            ->defaultSort('sort_order')
            ->filters([
                Tables\Filters\SelectFilter::make('page')
                    ->options([
                        'lessons' => 'Ski Lessons',
                        'equipment' => 'Equipment Rental',
                        'booking' => 'Book Online',
                        'general' => 'General',
                    ])
                    ->multiple(),
                Tables\Filters\TernaryFilter::make('active')
                    ->label('Published'),
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
            ->striped()
            ->emptyStateHeading('No FAQs yet')
            ->emptyStateDescription('Add frequently asked questions for your customers.')
            ->emptyStateIcon('heroicon-o-question-mark-circle');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFaqs::route('/'),
            'create' => Pages\CreateFaq::route('/create'),
            'edit' => Pages\EditFaq::route('/{record}/edit'),
        ];
    }
}
