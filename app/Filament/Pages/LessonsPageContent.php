<?php

namespace App\Filament\Pages;

use Filament\Forms;

class LessonsPageContent extends BaseContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationLabel = 'Ski Lessons';
    protected static ?string $title = 'Ski Lessons Content';
    protected static ?int $navigationSort = 3;

    protected static function getPageSlug(): string
    {
        return 'ski-lessons';
    }

    protected static function getPageTitle(): string
    {
        return 'Ski Lessons';
    }

    public static function getSlug(): string
    {
        return 'content/ski-lessons';
    }

    protected function formSchema(): array
    {
        return [
            Forms\Components\Section::make('Hero')
                ->schema([
                    Forms\Components\TextInput::make('hero.title')->label('Title'),
                    Forms\Components\Textarea::make('hero.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\TextInput::make('hero.button1')->label('Button 1'),
                    Forms\Components\TextInput::make('hero.button2')->label('Button 2'),
                    Forms\Components\FileUpload::make('hero.background_image')
                        ->label('Background Image')
                        ->image()
                        ->disk('public')
                        ->directory('content/ski-lessons')
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->maxSize(5120),
                    Forms\Components\TextInput::make('hero.background_alt')->label('Background Alt Text'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Skill Levels')
                ->schema([
                    Forms\Components\TextInput::make('skill_levels.title')->label('Title'),
                    Forms\Components\TextInput::make('skill_levels.subtitle')->label('Subtitle'),
                    Forms\Components\TextInput::make('skill_levels.select_level')->label('Select Level Label'),
                    Forms\Components\Repeater::make('skill_levels.levels')
                        ->label('Levels')
                        ->schema([
                            Forms\Components\TextInput::make('title')->label('Title')->required(),
                            Forms\Components\Textarea::make('description')->label('Description')->rows(2),
                            Forms\Components\TextInput::make('duration')->label('Duration'),
                            Forms\Components\TextInput::make('price')->label('Price'),
                            Forms\Components\Repeater::make('features')
                                ->label('Features')
                                ->simple(Forms\Components\TextInput::make('value')->required())
                                ->defaultItems(0),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Instructors')
                ->schema([
                    Forms\Components\TextInput::make('instructors.title')->label('Title'),
                    Forms\Components\TextInput::make('instructors.subtitle')->label('Subtitle'),
                    Forms\Components\TextInput::make('instructors.view_profile')->label('View Profile Label'),
                    Forms\Components\TextInput::make('instructors.lessons_taught')->label('Lessons Taught Label'),
                    Forms\Components\Repeater::make('instructors.data')
                        ->label('Instructors')
                        ->schema([
                            Forms\Components\TextInput::make('name')->label('Name')->required(),
                            Forms\Components\TextInput::make('specialization')->label('Specialization'),
                            Forms\Components\TextInput::make('experience')->label('Experience'),
                            Forms\Components\Repeater::make('languages')
                                ->label('Languages')
                                ->simple(Forms\Components\TextInput::make('value')->required())
                                ->defaultItems(0),
                            Forms\Components\TextInput::make('rating')->label('Rating')->numeric(),
                            Forms\Components\TextInput::make('totalLessons')->label('Total Lessons')->numeric(),
                            Forms\Components\Repeater::make('certifications')
                                ->label('Certifications')
                                ->simple(Forms\Components\TextInput::make('value')->required())
                                ->defaultItems(0),
                            Forms\Components\FileUpload::make('image')
                                ->label('Photo')
                                ->image()
                                ->disk('public')
                                ->directory('content/ski-lessons/instructors')
                                ->imageResizeMode('cover')
                                ->imageCropAspectRatio('1:1')
                                ->maxSize(2048),
                            Forms\Components\TextInput::make('alt')->label('Alt Text'),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['name'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Packages')
                ->schema([
                    Forms\Components\TextInput::make('packages.title')->label('Title'),
                    Forms\Components\TextInput::make('packages.subtitle')->label('Subtitle'),
                    Forms\Components\TextInput::make('packages.book_package')->label('Book Package'),
                    Forms\Components\TextInput::make('packages.most_popular')->label('Most Popular'),
                    Forms\Components\TextInput::make('packages.sessions')->label('Sessions Label'),
                    Forms\Components\TextInput::make('packages.duration')->label('Duration Label'),
                    Forms\Components\TextInput::make('packages.per_package')->label('Per Package'),
                    Forms\Components\TextInput::make('packages.save')->label('Save Label'),
                    Forms\Components\Repeater::make('packages.data')
                        ->label('Packages')
                        ->schema([
                            Forms\Components\TextInput::make('name')->label('Name')->required(),
                            Forms\Components\Textarea::make('description')->label('Description')->rows(2),
                            Forms\Components\TextInput::make('sessions')->label('Sessions')->numeric(),
                            Forms\Components\TextInput::make('duration')->label('Duration'),
                            Forms\Components\TextInput::make('price')->label('Price'),
                            Forms\Components\TextInput::make('savings')->label('Savings'),
                            Forms\Components\Toggle::make('popular')->label('Popular'),
                            Forms\Components\Repeater::make('features')
                                ->label('Features')
                                ->simple(Forms\Components\TextInput::make('value')->required())
                                ->defaultItems(0),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['name'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Safety')
                ->schema([
                    Forms\Components\TextInput::make('safety.title')->label('Title'),
                    Forms\Components\Textarea::make('safety.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\Repeater::make('safety.features')
                        ->label('Features')
                        ->schema([
                            Forms\Components\TextInput::make('title')->label('Title')->required(),
                            Forms\Components\Textarea::make('description')->label('Description')->rows(2),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['title'] ?? null)
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
                            Forms\Components\TextInput::make('country')->label('Country'),
                            Forms\Components\TextInput::make('rating')->label('Rating')->numeric(),
                            Forms\Components\TextInput::make('date')->label('Date'),
                            Forms\Components\Textarea::make('comment')->label('Comment')->rows(2),
                            Forms\Components\TextInput::make('lessonType')->label('Lesson Type'),
                            Forms\Components\FileUpload::make('image')
                                ->label('Photo')
                                ->image()
                                ->disk('public')
                                ->directory('content/ski-lessons/testimonials')
                                ->imageResizeMode('cover')
                                ->imageCropAspectRatio('1:1')
                                ->maxSize(2048),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['name'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('FAQ')
                ->schema([
                    Forms\Components\TextInput::make('faq.title')->label('Title'),
                    Forms\Components\TextInput::make('faq.subtitle')->label('Subtitle'),
                    Forms\Components\Repeater::make('faq.items')
                        ->label('FAQ Items')
                        ->schema([
                            Forms\Components\TextInput::make('question')->label('Question')->required(),
                            Forms\Components\Textarea::make('answer')->label('Answer')->rows(3)->required(),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['question'] ?? null)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('CTA')
                ->schema([
                    Forms\Components\TextInput::make('cta.title')->label('Title'),
                    Forms\Components\Textarea::make('cta.description')->label('Description')->rows(2),
                    Forms\Components\TextInput::make('cta.button1')->label('Button 1'),
                    Forms\Components\TextInput::make('cta.button2')->label('Button 2'),
                    Forms\Components\Repeater::make('cta.trust_badges')
                        ->label('Trust Badges')
                        ->simple(Forms\Components\TextInput::make('value')->required())
                        ->defaultItems(0)
                        ->columnSpanFull(),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Meta')
                ->schema([
                    Forms\Components\TextInput::make('meta.title')->label('Meta Title'),
                    Forms\Components\Textarea::make('meta.description')->label('Meta Description')->rows(2),
                ])->collapsible()->collapsed(),
        ];
    }
}
