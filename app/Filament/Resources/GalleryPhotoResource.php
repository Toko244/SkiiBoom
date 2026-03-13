<?php

namespace App\Filament\Resources;

use App\Enums\GalleryPhotoStatus;
use App\Filament\Resources\GalleryPhotoResource\Pages;
use App\Models\GalleryPhoto;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;

class GalleryPhotoResource extends Resource
{
    protected static ?string $model = GalleryPhoto::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Gallery';

    protected static ?string $recordTitleAttribute = 'title';

    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('status', 'pending')->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Photo')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                Forms\Components\FileUpload::make('image_path')
                                    ->label('Image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('gallery')
                                    ->imagePreviewHeight('300')
                                    ->required()
                                    ->columnSpanFull(),
                            ]),

                        Forms\Components\Section::make('Content')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->label('Title')
                                    ->maxLength(200)
                                    ->placeholder('Give this photo a title'),
                                Forms\Components\Textarea::make('description')
                                    ->label('Description')
                                    ->maxLength(1000)
                                    ->rows(3)
                                    ->columnSpanFull()
                                    ->placeholder('Describe what is shown in this photo'),
                            ]),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status & Category')
                            ->icon('heroicon-o-adjustments-horizontal')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options(GalleryPhotoStatus::class)
                                    ->required()
                                    ->native(false),
                                Forms\Components\Select::make('category')
                                    ->options([
                                        'skiing' => 'Skiing',
                                        'equipment' => 'Equipment',
                                        'lessons' => 'Lessons',
                                        'slopes' => 'Slopes',
                                    ])
                                    ->native(false),
                                Forms\Components\Select::make('season')
                                    ->options([
                                        'winter' => 'Winter',
                                        'spring' => 'Spring',
                                        'summer' => 'Summer',
                                        'autumn' => 'Autumn',
                                    ])
                                    ->native(false),
                            ]),

                        Forms\Components\Section::make('Author & Meta')
                            ->icon('heroicon-o-user')
                            ->collapsed()
                            ->schema([
                                Forms\Components\TextInput::make('author_name')
                                    ->label('Author Name')
                                    ->maxLength(150),
                                Forms\Components\Select::make('user_id')
                                    ->label('Linked User')
                                    ->relationship('user', 'email')
                                    ->searchable()
                                    ->nullable()
                                    ->preload(),
                                Forms\Components\DatePicker::make('date')
                                    ->label('Date')
                                    ->native(false)
                                    ->default(now()),
                                Forms\Components\TextInput::make('likes_count')
                                    ->label('Likes')
                                    ->numeric()
                                    ->disabled()
                                    ->prefixIcon('heroicon-o-heart'),
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
                Tables\Columns\ImageColumn::make('image_path')
                    ->label('')
                    ->disk('public')
                    ->square()
                    ->size(60),
                Tables\Columns\TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->limit(40)
                    ->description(fn (GalleryPhoto $record) => $record->author_name),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'skiing' => 'primary',
                        'equipment' => 'info',
                        'lessons' => 'success',
                        'slopes' => 'warning',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('season')
                    ->badge()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (GalleryPhotoStatus $state): string => match ($state) {
                        GalleryPhotoStatus::Pending => 'warning',
                        GalleryPhotoStatus::Approved => 'success',
                        GalleryPhotoStatus::Rejected => 'danger',
                    }),
                Tables\Columns\TextColumn::make('likes_count')
                    ->label('Likes')
                    ->icon('heroicon-o-heart')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Submitted')
                    ->since()
                    ->sortable()
                    ->tooltip(fn ($record) => $record->created_at?->format('d M Y H:i')),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(GalleryPhotoStatus::class)
                    ->multiple()
                    ->preload(),
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'skiing' => 'Skiing',
                        'equipment' => 'Equipment',
                        'lessons' => 'Lessons',
                        'slopes' => 'Slopes',
                    ])
                    ->multiple(),
                Tables\Filters\SelectFilter::make('season')
                    ->options([
                        'winter' => 'Winter',
                        'spring' => 'Spring',
                        'summer' => 'Summer',
                        'autumn' => 'Autumn',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('approve')
                    ->label('Approve')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Approve Photo')
                    ->modalDescription('This photo will become visible to all visitors.')
                    ->action(fn (GalleryPhoto $record) => $record->update(['status' => GalleryPhotoStatus::Approved]))
                    ->visible(fn (GalleryPhoto $record) => $record->status !== GalleryPhotoStatus::Approved),
                Tables\Actions\Action::make('reject')
                    ->label('Reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->modalHeading('Reject Photo')
                    ->modalDescription('This photo will be hidden from visitors.')
                    ->action(fn (GalleryPhoto $record) => $record->update(['status' => GalleryPhotoStatus::Rejected]))
                    ->visible(fn (GalleryPhoto $record) => $record->status !== GalleryPhotoStatus::Rejected),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('approve')
                        ->label('Approve Selected')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(fn (Collection $records) => $records->each(fn (GalleryPhoto $record) => $record->update(['status' => GalleryPhotoStatus::Approved])))
                        ->deselectRecordsAfterCompletion(),
                    Tables\Actions\BulkAction::make('reject')
                        ->label('Reject Selected')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->action(fn (Collection $records) => $records->each(fn (GalleryPhoto $record) => $record->update(['status' => GalleryPhotoStatus::Rejected])))
                        ->deselectRecordsAfterCompletion(),
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
            ->poll('30s')
            ->emptyStateHeading('No photos yet')
            ->emptyStateDescription('Photos submitted by users will appear here for review.')
            ->emptyStateIcon('heroicon-o-photo');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGalleryPhotos::route('/'),
            'create' => Pages\CreateGalleryPhoto::route('/create'),
            'edit' => Pages\EditGalleryPhoto::route('/{record}/edit'),
        ];
    }
}
