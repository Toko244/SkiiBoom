<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InstructorResource\Pages;
use App\Models\Instructor;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class InstructorResource extends Resource
{
    protected static ?string $model = Instructor::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Catalog';

    protected static ?int $navigationSort = 4;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Personal Info')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label('Full Name')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('specialization')
                                    ->label('Specialization')
                                    ->maxLength(255)
                                    ->placeholder('e.g., Advanced & Off-Piste'),
                                Forms\Components\TextInput::make('experience_years')
                                    ->label('Years of Experience')
                                    ->numeric()
                                    ->suffix('years'),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Bio')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Forms\Components\Textarea::make('bio')
                                    ->label('Biography')
                                    ->rows(4)
                                    ->columnSpanFull()
                                    ->placeholder('Write a brief biography...'),
                            ]),

                        Forms\Components\Section::make('Skills & Languages')
                            ->icon('heroicon-o-academic-cap')
                            ->schema([
                                Forms\Components\TagsInput::make('languages')
                                    ->label('Languages Spoken')
                                    ->placeholder('Add a language'),
                                Forms\Components\TagsInput::make('certifications')
                                    ->label('Certifications')
                                    ->placeholder('Add a certification'),
                            ])
                            ->columns(2),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Photo')
                            ->icon('heroicon-o-camera')
                            ->schema([
                                Forms\Components\FileUpload::make('image_path')
                                    ->label('Profile Photo')
                                    ->image()
                                    ->disk('public')
                                    ->directory('instructors')
                                    ->imageResizeMode('cover')
                                    ->imageCropAspectRatio('1:1')
                                    ->imagePreviewHeight('200')
                                    ->circleCropper(),
                            ]),

                        Forms\Components\Section::make('Stats')
                            ->icon('heroicon-o-chart-bar')
                            ->schema([
                                Forms\Components\TextInput::make('rating')
                                    ->numeric()
                                    ->step(0.1)
                                    ->minValue(0)
                                    ->maxValue(5)
                                    ->suffix('/ 5')
                                    ->prefixIcon('heroicon-o-star'),
                                Forms\Components\TextInput::make('total_lessons')
                                    ->label('Lessons Taught')
                                    ->numeric()
                                    ->prefixIcon('heroicon-o-book-open'),
                                Forms\Components\Toggle::make('active')
                                    ->label('Active Instructor')
                                    ->default(true)
                                    ->onColor('success')
                                    ->offColor('danger')
                                    ->inline(false),
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
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('')
                    ->disk('public')
                    ->circular()
                    ->size(45)
                    ->defaultImageUrl(fn () => 'https://placehold.co/45x45/e2e8f0/94a3b8?text=?'),
                Tables\Columns\TextColumn::make('name')
                    ->label('Instructor')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn (Instructor $record) => $record->specialization),
                Tables\Columns\TextColumn::make('experience_years')
                    ->label('Experience')
                    ->suffix(' years')
                    ->sortable(),
                Tables\Columns\TextColumn::make('rating')
                    ->label('Rating')
                    ->formatStateUsing(fn ($state) => $state ? "{$state}/5" : '-')
                    ->sortable()
                    ->icon('heroicon-o-star')
                    ->iconPosition('after')
                    ->color(fn ($state) => $state >= 4.5 ? 'warning' : 'gray'),
                Tables\Columns\TextColumn::make('total_lessons')
                    ->label('Lessons')
                    ->sortable()
                    ->numeric(),
                Tables\Columns\ToggleColumn::make('active')
                    ->onColor('success')
                    ->offColor('danger'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('active'),
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
            ->emptyStateHeading('No instructors added')
            ->emptyStateDescription('Add your first instructor to get started.')
            ->emptyStateIcon('heroicon-o-user-group');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInstructors::route('/'),
            'create' => Pages\CreateInstructor::route('/create'),
            'edit' => Pages\EditInstructor::route('/{record}/edit'),
        ];
    }
}
