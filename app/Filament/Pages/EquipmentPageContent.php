<?php

namespace App\Filament\Pages;

use Filament\Forms;

class EquipmentPageContent extends BaseContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';
    protected static ?string $navigationLabel = 'Equipment Rental';
    protected static ?string $title = 'Equipment Rental Content';
    protected static ?int $navigationSort = 2;

    protected static function getPageSlug(): string
    {
        return 'equipment-rental';
    }

    protected static function getPageTitle(): string
    {
        return 'Equipment Rental';
    }

    public static function getSlug(): string
    {
        return 'content/equipment-rental';
    }

    protected function formSchema(): array
    {
        return [
            Forms\Components\Section::make('Hero')
                ->schema([
                    Forms\Components\TextInput::make('hero.title')->label('Title'),
                    Forms\Components\Textarea::make('hero.description')->label('Description')->rows(3),
                    Forms\Components\Repeater::make('hero.trust_badges')
                        ->label('Trust Badges')
                        ->simple(Forms\Components\TextInput::make('value')->required())
                        ->defaultItems(0)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Search')
                ->schema([
                    Forms\Components\TextInput::make('search.placeholder')->label('Placeholder'),
                    Forms\Components\TextInput::make('search.button')->label('Button Label'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Filters')
                ->schema([
                    Forms\Components\TextInput::make('filters.header')->label('Header'),
                    Forms\Components\TextInput::make('filters.clear_all')->label('Clear All'),
                    Forms\Components\TextInput::make('filters.category_label')->label('Category Label'),
                    Forms\Components\TextInput::make('filters.price_label')->label('Price Label'),
                    Forms\Components\TextInput::make('filters.size_label')->label('Size Label'),
                    Forms\Components\TextInput::make('filters.availability_label')->label('Availability Label'),
                    Forms\Components\TextInput::make('filters.available_only')->label('Available Only'),
                    Forms\Components\TextInput::make('filters.all_items')->label('All Items'),
                    Forms\Components\TextInput::make('filters.rating_label')->label('Rating Label'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Sort')
                ->schema([
                    Forms\Components\TextInput::make('sort.featured')->label('Featured'),
                    Forms\Components\TextInput::make('sort.price_low')->label('Price Low'),
                    Forms\Components\TextInput::make('sort.price_high')->label('Price High'),
                    Forms\Components\TextInput::make('sort.rating')->label('Rating'),
                    Forms\Components\TextInput::make('sort.newest')->label('Newest'),
                    Forms\Components\TextInput::make('sort.popularity')->label('Popularity'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Results')
                ->schema([
                    Forms\Components\TextInput::make('results.title_suffix')->label('Title Suffix'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Labels')
                ->schema([
                    Forms\Components\TextInput::make('labels.per_day')->label('Per Day'),
                    Forms\Components\TextInput::make('labels.book_now')->label('Book Now'),
                    Forms\Components\TextInput::make('labels.quick_view')->label('Quick View'),
                    Forms\Components\TextInput::make('labels.available')->label('Available'),
                    Forms\Components\TextInput::make('labels.unavailable')->label('Unavailable'),
                    Forms\Components\TextInput::make('labels.reviews')->label('Reviews'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Details Modal')
                ->schema([
                    Forms\Components\TextInput::make('details_modal.title')->label('Title'),
                    Forms\Components\TextInput::make('details_modal.description')->label('Description'),
                    Forms\Components\TextInput::make('details_modal.key_features')->label('Key Features'),
                    Forms\Components\TextInput::make('details_modal.specifications')->label('Specifications'),
                    Forms\Components\TextInput::make('details_modal.select_size')->label('Select Size'),
                    Forms\Components\TextInput::make('details_modal.quantity')->label('Quantity'),
                    Forms\Components\TextInput::make('details_modal.currently_unavailable')->label('Currently Unavailable'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Comparison')
                ->schema([
                    Forms\Components\TextInput::make('comparison.compare_label')->label('Compare Label'),
                    Forms\Components\TextInput::make('comparison.clear_all')->label('Clear All'),
                    Forms\Components\TextInput::make('comparison.compare_now')->label('Compare Now'),
                    Forms\Components\TextInput::make('comparison.close')->label('Close'),
                    Forms\Components\TextInput::make('comparison.title')->label('Title'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Empty State')
                ->schema([
                    Forms\Components\TextInput::make('empty_state.title')->label('Title'),
                    Forms\Components\TextInput::make('empty_state.message')->label('Message'),
                    Forms\Components\TextInput::make('empty_state.clear_button')->label('Clear Button'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Trust Signals')
                ->schema([
                    Forms\Components\TextInput::make('trust_signals.card_1_title')->label('Card 1 Title'),
                    Forms\Components\TextInput::make('trust_signals.card_1_description')->label('Card 1 Description'),
                    Forms\Components\TextInput::make('trust_signals.card_2_title')->label('Card 2 Title'),
                    Forms\Components\TextInput::make('trust_signals.card_2_description')->label('Card 2 Description'),
                    Forms\Components\TextInput::make('trust_signals.card_3_title')->label('Card 3 Title'),
                    Forms\Components\TextInput::make('trust_signals.card_3_description')->label('Card 3 Description'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Meta')
                ->schema([
                    Forms\Components\TextInput::make('meta.title')->label('Meta Title'),
                    Forms\Components\Textarea::make('meta.description')->label('Meta Description')->rows(2),
                ])->collapsible()->collapsed(),
        ];
    }
}
