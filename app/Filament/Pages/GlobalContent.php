<?php

namespace App\Filament\Pages;

use Filament\Forms;

class GlobalContent extends BaseContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-globe-alt';
    protected static ?string $navigationLabel = 'Global (Nav & Footer)';
    protected static ?string $title = 'Global Content';
    protected static ?int $navigationSort = 7;

    protected static function getPageSlug(): string
    {
        return 'global';
    }

    protected static function getPageTitle(): string
    {
        return 'Global';
    }

    public static function getSlug(): string
    {
        return 'content/global';
    }

    protected function formSchema(): array
    {
        return [
            Forms\Components\Section::make('Navigation')
                ->schema([
                    Forms\Components\TextInput::make('nav.home')->label('Home'),
                    Forms\Components\TextInput::make('nav.equipment')->label('Equipment Rental'),
                    Forms\Components\TextInput::make('nav.lessons')->label('Ski Lessons'),
                    Forms\Components\TextInput::make('nav.about')->label('About Us'),
                    Forms\Components\TextInput::make('nav.gallery')->label('Gallery'),
                    Forms\Components\TextInput::make('nav.book_online')->label('Book Online'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Footer')
                ->schema([
                    Forms\Components\Textarea::make('footer.company_description')->label('Company Description')->rows(2),
                    Forms\Components\TextInput::make('footer.quick_links')->label('Quick Links Label'),
                    Forms\Components\TextInput::make('footer.contact_us')->label('Contact Us Label'),
                    Forms\Components\TextInput::make('footer.follow_us')->label('Follow Us Label'),
                    Forms\Components\TextInput::make('footer.address')->label('Address'),
                    Forms\Components\TextInput::make('footer.phone')->label('Phone'),
                    Forms\Components\TextInput::make('footer.email')->label('Email'),
                    Forms\Components\TextInput::make('footer.copyright')->label('Copyright'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('404 Page')
                ->schema([
                    Forms\Components\TextInput::make('404.heading')->label('Heading'),
                    Forms\Components\TextInput::make('404.title')->label('Title'),
                    Forms\Components\TextInput::make('404.message')->label('Message'),
                    Forms\Components\TextInput::make('404.go_back')->label('Go Back Button'),
                    Forms\Components\TextInput::make('404.go_home')->label('Go Home Button'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Not Found')
                ->schema([
                    Forms\Components\TextInput::make('not_found.title')->label('Title'),
                ])->collapsible()->collapsed(),
        ];
    }
}
