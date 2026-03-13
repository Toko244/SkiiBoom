<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Testimonials';

    protected static ?string $recordTitleAttribute = 'author_name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Testimonial')
                            ->icon('heroicon-o-chat-bubble-left-right')
                            ->schema([
                                Forms\Components\Textarea::make('text')
                                    ->label('Testimonial Text')
                                    ->required()
                                    ->rows(5)
                                    ->columnSpanFull()
                                    ->placeholder('What the customer said...'),
                            ]),

                        Forms\Components\Section::make('Author')
                            ->icon('heroicon-o-user')
                            ->schema([
                                Forms\Components\TextInput::make('author_name')
                                    ->label('Name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('author_role')
                                    ->label('Role / Title')
                                    ->maxLength(255)
                                    ->placeholder('e.g., Ski Enthusiast, First-time Skier'),
                                Forms\Components\FileUpload::make('author_image')
                                    ->label('Photo')
                                    ->image()
                                    ->disk('public')
                                    ->directory('testimonials')
                                    ->imageResizeMode('cover')
                                    ->imageCropAspectRatio('1:1')
                                    ->circleCropper(),
                            ])
                            ->columns(2),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Display Settings')
                            ->icon('heroicon-o-adjustments-horizontal')
                            ->schema([
                                Forms\Components\Select::make('rating')
                                    ->options([
                                        5 => '5 Stars',
                                        4 => '4 Stars',
                                        3 => '3 Stars',
                                        2 => '2 Stars',
                                        1 => '1 Star',
                                    ])
                                    ->native(false)
                                    ->default(5),
                                Forms\Components\Select::make('page')
                                    ->label('Show on Page')
                                    ->options([
                                        'homepage' => 'Homepage',
                                        'lessons' => 'Lessons',
                                        'gallery' => 'Gallery',
                                        'about' => 'About Us',
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
                Tables\Columns\ImageColumn::make('author_image')
                    ->label('')
                    ->disk('public')
                    ->circular()
                    ->size(40)
                    ->defaultImageUrl(fn () => 'https://placehold.co/40x40/e2e8f0/94a3b8?text=?'),
                Tables\Columns\TextColumn::make('author_name')
                    ->label('Author')
                    ->searchable()
                    ->weight('bold')
                    ->description(fn (Testimonial $record) => $record->author_role),
                Tables\Columns\TextColumn::make('text')
                    ->label('Testimonial')
                    ->limit(60)
                    ->wrap(),
                Tables\Columns\TextColumn::make('rating')
                    ->formatStateUsing(fn ($state) => str_repeat('', (int) $state))
                    ->color('warning'),
                Tables\Columns\TextColumn::make('page')
                    ->badge()
                    ->color('info'),
                Tables\Columns\ToggleColumn::make('active')
                    ->label('Published')
                    ->onColor('success')
                    ->offColor('danger'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('page')
                    ->options([
                        'homepage' => 'Homepage',
                        'lessons' => 'Lessons',
                        'gallery' => 'Gallery',
                        'about' => 'About Us',
                    ]),
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
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->striped()
            ->emptyStateHeading('No testimonials yet')
            ->emptyStateDescription('Add customer testimonials to showcase social proof.')
            ->emptyStateIcon('heroicon-o-chat-bubble-left-right');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
