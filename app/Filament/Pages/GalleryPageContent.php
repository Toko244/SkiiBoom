<?php

namespace App\Filament\Pages;

use Filament\Forms;

class GalleryPageContent extends BaseContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-camera';
    protected static ?string $navigationLabel = 'Gallery Page';
    protected static ?string $title = 'Gallery Page Content';
    protected static ?int $navigationSort = 5;

    protected static function getPageSlug(): string
    {
        return 'gallery';
    }

    protected static function getPageTitle(): string
    {
        return 'Gallery';
    }

    public static function getSlug(): string
    {
        return 'content/gallery';
    }

    protected function formSchema(): array
    {
        return [
            Forms\Components\Section::make('Hero')
                ->schema([
                    Forms\Components\TextInput::make('hero.title')->label('Title'),
                    Forms\Components\Textarea::make('hero.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\TextInput::make('hero.upload_button')->label('Upload Button Label'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Filters')
                ->schema([
                    Forms\Components\TextInput::make('filters.category_label')->label('Category Label'),
                    Forms\Components\TextInput::make('filters.season_label')->label('Season Label'),
                    Forms\Components\TextInput::make('filters.sort_label')->label('Sort Label'),
                    Forms\Components\Repeater::make('filters.categories')
                        ->label('Categories')
                        ->schema([
                            Forms\Components\TextInput::make('id')->label('ID')->required(),
                            Forms\Components\TextInput::make('label')->label('Label')->required(),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['label'] ?? null)
                        ->columnSpanFull(),
                    Forms\Components\Repeater::make('filters.seasons')
                        ->label('Seasons')
                        ->schema([
                            Forms\Components\TextInput::make('id')->label('ID')->required(),
                            Forms\Components\TextInput::make('label')->label('Label')->required(),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['label'] ?? null)
                        ->columnSpanFull(),
                    Forms\Components\Repeater::make('filters.sort_options')
                        ->label('Sort Options')
                        ->schema([
                            Forms\Components\TextInput::make('id')->label('ID')->required(),
                            Forms\Components\TextInput::make('label')->label('Label')->required(),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['label'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Community')
                ->schema([
                    Forms\Components\TextInput::make('community.title')->label('Title'),
                    Forms\Components\TextInput::make('community.count_label')->label('Count Label'),
                    Forms\Components\TextInput::make('community.empty_title')->label('Empty Title'),
                    Forms\Components\TextInput::make('community.empty_subtitle')->label('Empty Subtitle'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Lightbox')
                ->schema([
                    Forms\Components\TextInput::make('lightbox.likes')->label('Likes Label'),
                    Forms\Components\TextInput::make('lightbox.views')->label('Views Label'),
                    Forms\Components\TextInput::make('lightbox.share_title')->label('Share Title'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Submission')
                ->schema([
                    Forms\Components\TextInput::make('submission.title')->label('Title'),
                    Forms\Components\TextInput::make('submission.name_label')->label('Name Label'),
                    Forms\Components\TextInput::make('submission.email_label')->label('Email Label'),
                    Forms\Components\TextInput::make('submission.title_label')->label('Title Label'),
                    Forms\Components\TextInput::make('submission.category_label')->label('Category Label'),
                    Forms\Components\TextInput::make('submission.description_label')->label('Description Label'),
                    Forms\Components\TextInput::make('submission.upload_label')->label('Upload Label'),
                    Forms\Components\TextInput::make('submission.upload_hint')->label('Upload Hint'),
                    Forms\Components\TextInput::make('submission.upload_size')->label('Upload Size'),
                    Forms\Components\TextInput::make('submission.cancel_button')->label('Cancel Button'),
                    Forms\Components\TextInput::make('submission.submit_button')->label('Submit Button'),
                    Forms\Components\TextInput::make('submission.success_title')->label('Success Title'),
                    Forms\Components\Textarea::make('submission.success_message')->label('Success Message')->rows(2),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Instagram')
                ->schema([
                    Forms\Components\TextInput::make('instagram.title')->label('Title'),
                    Forms\Components\TextInput::make('instagram.handle')->label('Handle'),
                    Forms\Components\TextInput::make('instagram.follow_button')->label('Follow Button'),
                    Forms\Components\TextInput::make('instagram.view_all')->label('View All'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Reviews')
                ->schema([
                    Forms\Components\TextInput::make('reviews.title')->label('Title'),
                    Forms\Components\Textarea::make('reviews.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\TextInput::make('reviews.google_rating')->label('Google Rating'),
                    Forms\Components\TextInput::make('reviews.google_count')->label('Google Count'),
                    Forms\Components\TextInput::make('reviews.facebook_rating')->label('Facebook Rating'),
                    Forms\Components\TextInput::make('reviews.facebook_count')->label('Facebook Count'),
                    Forms\Components\TextInput::make('reviews.tripadvisor_rating')->label('TripAdvisor Rating'),
                    Forms\Components\TextInput::make('reviews.tripadvisor_count')->label('TripAdvisor Count'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Meta')
                ->schema([
                    Forms\Components\TextInput::make('meta.title')->label('Meta Title'),
                    Forms\Components\Textarea::make('meta.description')->label('Meta Description')->rows(2),
                ])->collapsible()->collapsed(),
        ];
    }
}
