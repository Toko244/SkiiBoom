<?php

namespace App\Filament\Pages;

use Filament\Forms;

class AboutUsPageContent extends BaseContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-information-circle';
    protected static ?string $navigationLabel = 'About Us Page';
    protected static ?string $title = 'About Us Content';
    protected static ?int $navigationSort = 6;

    protected static function getPageSlug(): string
    {
        return 'about-us';
    }

    protected static function getPageTitle(): string
    {
        return 'About Us';
    }

    public static function getSlug(): string
    {
        return 'content/about-us';
    }

    protected function formSchema(): array
    {
        return [
            Forms\Components\Section::make('Hero')
                ->schema([
                    Forms\Components\TextInput::make('hero.title')->label('Title'),
                    Forms\Components\Textarea::make('hero.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\FileUpload::make('hero.background_image')
                        ->label('Background Image')
                        ->image()
                        ->disk('public')
                        ->directory('content/about-us')
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->maxSize(5120),
                    Forms\Components\TextInput::make('hero.background_alt')->label('Background Alt Text'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Brand Story')
                ->schema([
                    Forms\Components\TextInput::make('brand_story.title')->label('Title'),
                    Forms\Components\Textarea::make('brand_story.narrative')->label('Narrative')->rows(3),
                    Forms\Components\FileUpload::make('brand_story.main_image')
                        ->label('Main Image')
                        ->image()
                        ->disk('public')
                        ->directory('content/about-us')
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('4:3')
                        ->maxSize(5120),
                    Forms\Components\TextInput::make('brand_story.main_image_alt')->label('Main Image Alt'),
                    Forms\Components\Repeater::make('brand_story.story_points')
                        ->label('Story Points')
                        ->schema([
                            Forms\Components\TextInput::make('title')->label('Title')->required(),
                            Forms\Components\Textarea::make('description')->label('Description')->rows(2)->required(),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Team')
                ->schema([
                    Forms\Components\TextInput::make('team.title')->label('Title'),
                    Forms\Components\TextInput::make('team.subtitle')->label('Subtitle'),
                    Forms\Components\TextInput::make('team.certifications_label')->label('Certifications Label'),
                    Forms\Components\Repeater::make('team.members')
                        ->label('Team Members')
                        ->schema([
                            Forms\Components\TextInput::make('name')->label('Name')->required(),
                            Forms\Components\TextInput::make('role')->label('Role'),
                            Forms\Components\TextInput::make('experience')->label('Experience'),
                            Forms\Components\Textarea::make('bio')->label('Bio')->rows(2),
                            Forms\Components\Repeater::make('certifications')
                                ->label('Certifications')
                                ->simple(Forms\Components\TextInput::make('value')->required())
                                ->defaultItems(0),
                            Forms\Components\FileUpload::make('image')
                                ->label('Photo')
                                ->image()
                                ->disk('public')
                                ->directory('content/about-us/team')
                                ->imageResizeMode('cover')
                                ->imageCropAspectRatio('1:1')
                                ->maxSize(2048),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['name'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Certifications')
                ->schema([
                    Forms\Components\TextInput::make('certifications.title')->label('Title'),
                    Forms\Components\Textarea::make('certifications.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\TextInput::make('certifications.issued_by')->label('Issued By Label'),
                    Forms\Components\Repeater::make('certifications.data')
                        ->label('Certifications')
                        ->schema([
                            Forms\Components\TextInput::make('title')->label('Title')->required(),
                            Forms\Components\Textarea::make('description')->label('Description')->rows(2),
                            Forms\Components\TextInput::make('issuer')->label('Issuer'),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Partnerships')
                ->schema([
                    Forms\Components\TextInput::make('partnerships.title')->label('Title'),
                    Forms\Components\Textarea::make('partnerships.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\Repeater::make('partnerships.data')
                        ->label('Partners')
                        ->schema([
                            Forms\Components\TextInput::make('name')->label('Name')->required(),
                            Forms\Components\TextInput::make('category')->label('Category'),
                            Forms\Components\FileUpload::make('image')
                                ->label('Logo')
                                ->image()
                                ->disk('public')
                                ->directory('content/about-us/partners')
                                ->imageResizeMode('contain')
                                ->maxSize(2048),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['name'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Facilities')
                ->schema([
                    Forms\Components\TextInput::make('facilities.title')->label('Title'),
                    Forms\Components\TextInput::make('facilities.subtitle')->label('Subtitle'),
                    Forms\Components\Repeater::make('facilities.data')
                        ->label('Facilities')
                        ->schema([
                            Forms\Components\TextInput::make('title')->label('Title')->required(),
                            Forms\Components\Textarea::make('description')->label('Description')->rows(2),
                            Forms\Components\FileUpload::make('image')
                                ->label('Photo')
                                ->image()
                                ->disk('public')
                                ->directory('content/about-us/facilities')
                                ->imageResizeMode('cover')
                                ->imageCropAspectRatio('16:9')
                                ->maxSize(5120),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Timeline')
                ->schema([
                    Forms\Components\TextInput::make('timeline.title')->label('Title'),
                    Forms\Components\Textarea::make('timeline.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\Repeater::make('timeline.events')
                        ->label('Timeline Events')
                        ->schema([
                            Forms\Components\TextInput::make('year')->label('Year')->required(),
                            Forms\Components\TextInput::make('title')->label('Title')->required(),
                            Forms\Components\Textarea::make('description')->label('Description')->rows(2),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => ($state['year'] ?? '') . ' - ' . ($state['title'] ?? ''))
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Testimonials')
                ->schema([
                    Forms\Components\TextInput::make('testimonials.title')->label('Title'),
                    Forms\Components\TextInput::make('testimonials.subtitle')->label('Subtitle'),
                    Forms\Components\Repeater::make('testimonials.data')
                        ->label('Testimonials')
                        ->schema([
                            Forms\Components\TextInput::make('name')->label('Name')->required(),
                            Forms\Components\TextInput::make('location')->label('Location'),
                            Forms\Components\TextInput::make('rating')->label('Rating')->numeric(),
                            Forms\Components\Textarea::make('text')->label('Text')->rows(2),
                            Forms\Components\TextInput::make('date')->label('Date'),
                            Forms\Components\FileUpload::make('image')
                                ->label('Photo')
                                ->image()
                                ->disk('public')
                                ->directory('content/about-us/testimonials')
                                ->imageResizeMode('cover')
                                ->imageCropAspectRatio('1:1')
                                ->maxSize(2048),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['name'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('CTA')
                ->schema([
                    Forms\Components\TextInput::make('cta.title')->label('Title'),
                    Forms\Components\Textarea::make('cta.description')->label('Description')->rows(2),
                    Forms\Components\TextInput::make('cta.button1')->label('Button 1'),
                    Forms\Components\TextInput::make('cta.button2')->label('Button 2'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Meta')
                ->schema([
                    Forms\Components\TextInput::make('meta.title')->label('Meta Title'),
                    Forms\Components\Textarea::make('meta.description')->label('Meta Description')->rows(2),
                ])->collapsible()->collapsed(),
        ];
    }
}
