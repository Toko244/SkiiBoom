<?php

namespace App\Filament\Pages;

use Filament\Forms;

class HomepageContent extends BaseContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-home';
    protected static ?string $navigationLabel = 'Homepage';
    protected static ?string $title = 'Homepage Content';
    protected static ?int $navigationSort = 1;

    protected static function getPageSlug(): string
    {
        return 'homepage';
    }

    protected static function getPageTitle(): string
    {
        return 'Homepage';
    }

    public static function getSlug(): string
    {
        return 'content/homepage';
    }

    protected function formSchema(): array
    {
        return [
            Forms\Components\Section::make('Hero')
                ->schema([
                    Forms\Components\TextInput::make('hero.title')->label('Title'),
                    Forms\Components\Textarea::make('hero.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\TextInput::make('hero.cta1')->label('CTA Button 1'),
                    Forms\Components\TextInput::make('hero.cta2')->label('CTA Button 2'),
                    Forms\Components\TextInput::make('hero.stat_1_value')->label('Stat 1 Value'),
                    Forms\Components\TextInput::make('hero.stat_1_label')->label('Stat 1 Label'),
                    Forms\Components\TextInput::make('hero.stat_2_value')->label('Stat 2 Value'),
                    Forms\Components\TextInput::make('hero.stat_2_label')->label('Stat 2 Label'),
                    Forms\Components\TextInput::make('hero.stat_3_value')->label('Stat 3 Value'),
                    Forms\Components\TextInput::make('hero.stat_3_label')->label('Stat 3 Label'),
                    Forms\Components\FileUpload::make('hero.slide_1_image')
                        ->label('Slide 1 Image')
                        ->image()
                        ->disk('public')
                        ->directory('content/homepage')
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->maxSize(5120),
                    Forms\Components\TextInput::make('hero.slide_1_alt')->label('Slide 1 Alt Text'),
                    Forms\Components\FileUpload::make('hero.slide_2_image')
                        ->label('Slide 2 Image')
                        ->image()
                        ->disk('public')
                        ->directory('content/homepage')
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->maxSize(5120),
                    Forms\Components\TextInput::make('hero.slide_2_alt')->label('Slide 2 Alt Text'),
                    Forms\Components\FileUpload::make('hero.slide_3_image')
                        ->label('Slide 3 Image')
                        ->image()
                        ->disk('public')
                        ->directory('content/homepage')
                        ->imageResizeMode('cover')
                        ->imageCropAspectRatio('16:9')
                        ->maxSize(5120),
                    Forms\Components\TextInput::make('hero.slide_3_alt')->label('Slide 3 Alt Text'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Quick Booking')
                ->schema([
                    Forms\Components\TextInput::make('quick_booking.title')->label('Title'),
                    Forms\Components\TextInput::make('quick_booking.subtitle')->label('Subtitle'),
                    Forms\Components\TextInput::make('quick_booking.equipment')->label('Equipment Label'),
                    Forms\Components\TextInput::make('quick_booking.lessons')->label('Lessons Label'),
                    Forms\Components\TextInput::make('quick_booking.date')->label('Date Label'),
                    Forms\Components\TextInput::make('quick_booking.duration')->label('Duration Label'),
                    Forms\Components\TextInput::make('quick_booking.check_availability')->label('Check Availability'),
                    Forms\Components\TextInput::make('quick_booking.book_now')->label('Book Now'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Featured Equipment')
                ->schema([
                    Forms\Components\TextInput::make('featured_equipment.title')->label('Title'),
                    Forms\Components\TextInput::make('featured_equipment.subtitle')->label('Subtitle'),
                    Forms\Components\TextInput::make('featured_equipment.view_all')->label('View All Label'),
                    Forms\Components\TextInput::make('featured_equipment.per_day')->label('Per Day Label'),
                    Forms\Components\TextInput::make('featured_equipment.features_label')->label('Features Label'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Lessons Preview')
                ->schema([
                    Forms\Components\TextInput::make('lessons_preview.title')->label('Title'),
                    Forms\Components\TextInput::make('lessons_preview.subtitle')->label('Subtitle'),
                    Forms\Components\TextInput::make('lessons_preview.view_all_instructors')->label('View All Instructors'),
                    Forms\Components\TextInput::make('lessons_preview.experience')->label('Experience Label'),
                    Forms\Components\TextInput::make('lessons_preview.languages')->label('Languages Label'),
                    Forms\Components\TextInput::make('lessons_preview.book_lesson')->label('Book Lesson'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Why Choose Us')
                ->schema([
                    Forms\Components\TextInput::make('why_choose_us.title')->label('Title'),
                    Forms\Components\TextInput::make('why_choose_us.subtitle')->label('Subtitle'),
                    Forms\Components\Repeater::make('why_choose_us.features')
                        ->label('Features')
                        ->schema([
                            Forms\Components\TextInput::make('title')->label('Title')->required(),
                            Forms\Components\Textarea::make('description')->label('Description')->rows(2)->required(),
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
                    Forms\Components\TextInput::make('testimonials.previous')->label('Previous Label'),
                    Forms\Components\TextInput::make('testimonials.next')->label('Next Label'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Gallery Preview')
                ->schema([
                    Forms\Components\TextInput::make('gallery_preview.title')->label('Title'),
                    Forms\Components\TextInput::make('gallery_preview.subtitle')->label('Subtitle'),
                    Forms\Components\TextInput::make('gallery_preview.view_full_gallery')->label('View Full Gallery'),
                    Forms\Components\TextInput::make('gallery_preview.category_equipment')->label('Category: Equipment'),
                    Forms\Components\TextInput::make('gallery_preview.category_action')->label('Category: Action'),
                    Forms\Components\TextInput::make('gallery_preview.category_scenery')->label('Category: Scenery'),
                    Forms\Components\TextInput::make('gallery_preview.category_lessons')->label('Category: Lessons'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('CTA')
                ->schema([
                    Forms\Components\TextInput::make('cta.title')->label('Title'),
                    Forms\Components\Textarea::make('cta.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\TextInput::make('cta.book_equipment')->label('Book Equipment Button'),
                    Forms\Components\TextInput::make('cta.book_lessons')->label('Book Lessons Button'),
                    Forms\Components\TextInput::make('cta.contact_us')->label('Contact Us Button'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Meta')
                ->schema([
                    Forms\Components\TextInput::make('meta.title')->label('Meta Title'),
                    Forms\Components\Textarea::make('meta.description')->label('Meta Description')->rows(2),
                ])->collapsible()->collapsed(),
        ];
    }
}
