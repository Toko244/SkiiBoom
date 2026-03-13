<?php

namespace App\Filament\Resources;

use App\Enums\EquipmentCategory;
use App\Filament\Resources\EquipmentResource\Pages;
use App\Models\Equipment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class EquipmentResource extends Resource
{
    protected static ?string $model = Equipment::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';

    protected static ?string $navigationGroup = 'Catalog';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'name';

    public static function getNavigationBadge(): ?string
    {
        return (string) static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'info';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Equipment')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Basic Info')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Forms\Components\Group::make()
                                    ->schema([
                                        Forms\Components\TextInput::make('name')
                                            ->label('Name')
                                            ->required()
                                            ->maxLength(255)
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                                        Forms\Components\TextInput::make('slug')
                                            ->required()
                                            ->unique(ignoreRecord: true)
                                            ->maxLength(255)
                                            ->helperText('Auto-generated from name. Edit only if needed.'),
                                    ])
                                    ->columns(2),
                                Forms\Components\Group::make()
                                    ->schema([
                                        Forms\Components\Select::make('category')
                                            ->options(EquipmentCategory::class)
                                            ->required()
                                            ->native(false)
                                            ->searchable(),
                                        Forms\Components\TextInput::make('price_per_day')
                                            ->label('Price per Day')
                                            ->numeric()
                                            ->prefix('₾')
                                            ->required()
                                            ->step(0.01),
                                    ])
                                    ->columns(2),
                                Forms\Components\Group::make()
                                    ->schema([
                                        Forms\Components\TextInput::make('rating')
                                            ->numeric()
                                            ->step(0.1)
                                            ->minValue(0)
                                            ->maxValue(5)
                                            ->suffix('/ 5'),
                                        Forms\Components\TextInput::make('reviews_count')
                                            ->label('Reviews')
                                            ->numeric()
                                            ->default(0),
                                        Forms\Components\TextInput::make('sort_order')
                                            ->numeric()
                                            ->default(0),
                                    ])
                                    ->columns(3),
                                Forms\Components\Group::make()
                                    ->schema([
                                        Forms\Components\Toggle::make('available')
                                            ->label('Available for Rent')
                                            ->default(true)
                                            ->onColor('success')
                                            ->offColor('danger')
                                            ->inline(false),
                                        Forms\Components\Toggle::make('is_featured')
                                            ->label('Featured on Homepage')
                                            ->default(false)
                                            ->onColor('warning')
                                            ->inline(false),
                                    ])
                                    ->columns(2),
                            ]),

                        Forms\Components\Tabs\Tab::make('Description')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Forms\Components\RichEditor::make('description')
                                    ->label('Description')
                                    ->required()
                                    ->toolbarButtons([
                                        'bold', 'italic', 'underline', 'strike',
                                        'bulletList', 'orderedList',
                                        'h2', 'h3',
                                        'link', 'blockquote',
                                        'undo', 'redo',
                                    ])
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Tabs\Tab::make('Features & Sizes')
                            ->icon('heroicon-o-tag')
                            ->schema([
                                Forms\Components\TagsInput::make('features')
                                    ->label('Features')
                                    ->placeholder('Type a feature and press Enter')
                                    ->helperText('Add key features that describe this equipment'),
                                Forms\Components\TagsInput::make('sizes')
                                    ->label('Available Sizes')
                                    ->placeholder('Type a size and press Enter')
                                    ->helperText('e.g., S, M, L, XL or 160cm, 170cm'),
                            ]),

                        Forms\Components\Tabs\Tab::make('Images')
                            ->icon('heroicon-o-photo')
                            ->badge(fn (?Equipment $record) => $record?->images?->count())
                            ->schema([
                                Forms\Components\Repeater::make('images')
                                    ->relationship()
                                    ->schema([
                                        Forms\Components\FileUpload::make('image_path')
                                            ->label('Image')
                                            ->image()
                                            ->disk('public')
                                            ->directory('equipment')
                                            ->imageResizeMode('cover')
                                            ->imageCropAspectRatio('4:3')
                                            ->required(),
                                        Forms\Components\TextInput::make('alt_text')
                                            ->label('Alt Text')
                                            ->maxLength(255)
                                            ->placeholder('Describe the image for accessibility'),
                                        Forms\Components\Toggle::make('is_primary')
                                            ->label('Primary Image')
                                            ->helperText('Shown as the main thumbnail')
                                            ->default(false),
                                        Forms\Components\TextInput::make('sort_order')
                                            ->numeric()
                                            ->default(0),
                                    ])
                                    ->columns(2)
                                    ->columnSpanFull()
                                    ->defaultItems(0)
                                    ->addActionLabel('Add Image')
                                    ->reorderable()
                                    ->collapsible()
                                    ->cloneable()
                                    ->itemLabel(fn (array $state): ?string => $state['alt_text'] ?? 'Image'),
                            ]),

                        Forms\Components\Tabs\Tab::make('Specifications')
                            ->icon('heroicon-o-clipboard-document-list')
                            ->badge(fn (?Equipment $record) => $record?->specifications?->count())
                            ->schema([
                                Forms\Components\Repeater::make('specifications')
                                    ->relationship()
                                    ->schema([
                                        Forms\Components\TextInput::make('label')
                                            ->label('Specification')
                                            ->required()
                                            ->maxLength(255)
                                            ->placeholder('e.g., Weight, Material, Length'),
                                        Forms\Components\TextInput::make('value')
                                            ->label('Value')
                                            ->required()
                                            ->maxLength(255)
                                            ->placeholder('e.g., 3.5kg, Carbon Fiber, 170cm'),
                                    ])
                                    ->columns(2)
                                    ->columnSpanFull()
                                    ->defaultItems(0)
                                    ->addActionLabel('Add Specification')
                                    ->reorderable()
                                    ->collapsible()
                                    ->cloneable()
                                    ->itemLabel(fn (array $state): ?string => isset($state['label'], $state['value']) ? "{$state['label']}: {$state['value']}" : null),
                            ]),
                    ])
                    ->persistTabInQueryString()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('primaryImage.image_path')
                    ->label('')
                    ->disk('public')
                    ->square()
                    ->size(50)
                    ->defaultImageUrl(fn () => 'https://placehold.co/50x50/e2e8f0/94a3b8?text=No+img'),
                Tables\Columns\TextColumn::make('name')
                    ->label('Equipment')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->description(fn (Equipment $record) => $record->category?->value),
                Tables\Columns\TextColumn::make('price_per_day')
                    ->label('Price/Day')
                    ->money('GEL')
                    ->sortable()
                    ->color('success'),
                Tables\Columns\TextColumn::make('rating')
                    ->label('Rating')
                    ->sortable()
                    ->formatStateUsing(fn ($state) => $state ? "{$state}/5" : '-')
                    ->description(fn (Equipment $record) => $record->reviews_count ? "{$record->reviews_count} reviews" : null),
                Tables\Columns\ToggleColumn::make('available')
                    ->label('Available')
                    ->onColor('success')
                    ->offColor('danger'),
                Tables\Columns\ToggleColumn::make('is_featured')
                    ->label('Featured')
                    ->onColor('warning'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options(EquipmentCategory::class)
                    ->multiple()
                    ->preload(),
                Tables\Filters\TernaryFilter::make('available')
                    ->label('Availability'),
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured'),
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
            ->emptyStateHeading('No equipment added')
            ->emptyStateDescription('Start by adding your first equipment item.')
            ->emptyStateIcon('heroicon-o-wrench-screwdriver');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEquipment::route('/'),
            'create' => Pages\CreateEquipment::route('/create'),
            'edit' => Pages\EditEquipment::route('/{record}/edit'),
        ];
    }
}
