<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationGroup = 'Settings';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'key';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Setting')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->description('Configure site-wide settings')
                    ->schema([
                        Forms\Components\Select::make('group')
                            ->options([
                                'general' => 'General',
                                'contact' => 'Contact Info',
                                'social' => 'Social Media',
                                'seo' => 'SEO',
                                'booking' => 'Booking',
                                'exchange_rates' => 'Exchange Rates',
                            ])
                            ->required()
                            ->native(false),
                        Forms\Components\TextInput::make('key')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255)
                            ->helperText('Unique identifier for this setting'),
                        Forms\Components\KeyValue::make('value')
                            ->columnSpanFull()
                            ->addActionLabel('Add Value')
                            ->keyLabel('Property')
                            ->valueLabel('Value'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('group')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'general' => 'gray',
                        'contact' => 'info',
                        'social' => 'primary',
                        'seo' => 'success',
                        'booking' => 'warning',
                        'exchange_rates' => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('key')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->since()
                    ->sortable()
                    ->tooltip(fn ($record) => $record->updated_at?->format('d M Y H:i')),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('group')
                    ->options([
                        'general' => 'General',
                        'contact' => 'Contact Info',
                        'social' => 'Social Media',
                        'seo' => 'SEO',
                        'booking' => 'Booking',
                        'exchange_rates' => 'Exchange Rates',
                    ])
                    ->multiple(),
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
            ->defaultSort('group')
            ->groups(['group'])
            ->striped()
            ->emptyStateHeading('No settings configured')
            ->emptyStateDescription('Add site-wide configuration settings.')
            ->emptyStateIcon('heroicon-o-cog-6-tooth');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSiteSettings::route('/'),
            'create' => Pages\CreateSiteSetting::route('/create'),
            'edit' => Pages\EditSiteSetting::route('/{record}/edit'),
        ];
    }
}
