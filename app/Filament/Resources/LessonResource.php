<?php

namespace App\Filament\Resources;

use App\Enums\LessonLevel;
use App\Filament\Resources\LessonResource\Pages;
use App\Models\Lesson;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class LessonResource extends Resource
{
    protected static ?string $model = Lesson::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

    protected static ?string $navigationGroup = 'Catalog';

    protected static ?int $navigationSort = 5;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Lesson Details')
                    ->icon('heroicon-o-book-open')
                    ->description('Basic lesson information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->label('Lesson Name')
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
                            ->native(false)
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')->required(),
                                Forms\Components\TextInput::make('slug')->required(),
                            ]),
                        Forms\Components\Select::make('skill_level')
                            ->label('Skill Level')
                            ->options(LessonLevel::class)
                            ->required()
                            ->native(false),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Pricing & Capacity')
                    ->icon('heroicon-o-banknotes')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->label('Price per Hour')
                            ->numeric()
                            ->prefix('₾')
                            ->required()
                            ->step(0.01),
                        Forms\Components\TextInput::make('duration')
                            ->label('Duration')
                            ->numeric()
                            ->suffix('hours'),
                        Forms\Components\TextInput::make('max_participants')
                            ->label('Max Group Size')
                            ->numeric()
                            ->suffix('people')
                            ->helperText('Maximum number of participants per session'),
                        Forms\Components\Toggle::make('available')
                            ->label('Available for Booking')
                            ->default(true)
                            ->onColor('success')
                            ->offColor('danger')
                            ->inline(false),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Description')
                    ->icon('heroicon-o-document-text')
                    ->collapsed()
                    ->schema([
                        Forms\Components\RichEditor::make('description')
                            ->label('Description')
                            ->toolbarButtons([
                                'bold', 'italic', 'underline',
                                'bulletList', 'orderedList',
                                'h2', 'h3', 'link',
                            ])
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Lesson')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn (Lesson $record) => $record->instructor?->name),
                Tables\Columns\TextColumn::make('skill_level')
                    ->label('Level')
                    ->badge()
                    ->color(fn (LessonLevel $state): string => match ($state) {
                        LessonLevel::Beginner => 'success',
                        LessonLevel::Intermediate => 'info',
                        LessonLevel::Advanced => 'warning',
                        LessonLevel::Expert => 'danger',
                    }),
                Tables\Columns\TextColumn::make('price')
                    ->label('Price/Hour')
                    ->money('GEL')
                    ->sortable()
                    ->color('success'),
                Tables\Columns\TextColumn::make('duration')
                    ->label('Duration')
                    ->suffix('h')
                    ->sortable(),
                Tables\Columns\TextColumn::make('max_participants')
                    ->label('Max Size')
                    ->suffix(' people'),
                Tables\Columns\ToggleColumn::make('available')
                    ->onColor('success')
                    ->offColor('danger'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('skill_level')
                    ->label('Level')
                    ->options(LessonLevel::class)
                    ->multiple(),
                Tables\Filters\TernaryFilter::make('available'),
                Tables\Filters\SelectFilter::make('instructor_id')
                    ->label('Instructor')
                    ->relationship('instructor', 'name')
                    ->searchable()
                    ->preload(),
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
            ->emptyStateHeading('No lessons added')
            ->emptyStateDescription('Create your first lesson to start offering classes.')
            ->emptyStateIcon('heroicon-o-book-open');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLessons::route('/'),
            'create' => Pages\CreateLesson::route('/create'),
            'edit' => Pages\EditLesson::route('/{record}/edit'),
        ];
    }
}
