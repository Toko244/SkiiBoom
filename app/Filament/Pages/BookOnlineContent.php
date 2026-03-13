<?php

namespace App\Filament\Pages;

use Filament\Forms;

class BookOnlineContent extends BaseContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';
    protected static ?string $navigationLabel = 'Book Online';
    protected static ?string $title = 'Book Online Content';
    protected static ?int $navigationSort = 4;

    protected static function getPageSlug(): string
    {
        return 'book-online';
    }

    protected static function getPageTitle(): string
    {
        return 'Book Online';
    }

    public static function getSlug(): string
    {
        return 'content/book-online';
    }

    protected function formSchema(): array
    {
        return [
            Forms\Components\Section::make('Heading')
                ->schema([
                    Forms\Components\TextInput::make('heading.title')->label('Title'),
                    Forms\Components\Textarea::make('heading.subtitle')->label('Subtitle')->rows(2),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Currency')
                ->schema([
                    Forms\Components\TextInput::make('currency.gel')->label('GEL Label'),
                    Forms\Components\TextInput::make('currency.eur')->label('EUR Label'),
                    Forms\Components\TextInput::make('currency.usd')->label('USD Label'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Steps')
                ->schema([
                    Forms\Components\TextInput::make('steps.step_1_label')->label('Step 1 Label'),
                    Forms\Components\TextInput::make('steps.step_2_label')->label('Step 2 Label'),
                    Forms\Components\TextInput::make('steps.step_3_label')->label('Step 3 Label'),
                    Forms\Components\TextInput::make('steps.step_4_label')->label('Step 4 Label'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Step 1 - Select Items')
                ->schema([
                    Forms\Components\TextInput::make('step_1.equipment_title')->label('Equipment Title'),
                    Forms\Components\TextInput::make('step_1.lessons_title')->label('Lessons Title'),
                    Forms\Components\TextInput::make('step_1.per_day')->label('Per Day'),
                    Forms\Components\TextInput::make('step_1.per_session')->label('Per Session'),
                    Forms\Components\TextInput::make('step_1.selected')->label('Selected'),
                    Forms\Components\TextInput::make('step_1.select')->label('Select'),
                    Forms\Components\TextInput::make('step_1.select_lesson')->label('Select Lesson'),
                    Forms\Components\TextInput::make('step_1.unavailable')->label('Unavailable'),
                    Forms\Components\TextInput::make('step_1.fully_booked')->label('Fully Booked'),
                    Forms\Components\TextInput::make('step_1.instructor')->label('Instructor Label'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Step 2 - Choose Dates')
                ->schema([
                    Forms\Components\TextInput::make('step_2.title')->label('Title'),
                    Forms\Components\TextInput::make('step_2.start_date_label')->label('Start Date Label'),
                    Forms\Components\TextInput::make('step_2.end_date_label')->label('End Date Label'),
                    Forms\Components\Textarea::make('step_2.info_text')->label('Info Text')->rows(2),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Step 3 - Customer Details')
                ->schema([
                    Forms\Components\TextInput::make('step_3.title')->label('Title'),
                    Forms\Components\TextInput::make('step_3.first_name_label')->label('First Name Label'),
                    Forms\Components\TextInput::make('step_3.last_name_label')->label('Last Name Label'),
                    Forms\Components\TextInput::make('step_3.arrival_date_label')->label('Arrival Date Label'),
                    Forms\Components\TextInput::make('step_3.days_label')->label('Days Label'),
                    Forms\Components\TextInput::make('step_3.message_label')->label('Message Label'),
                    Forms\Components\TextInput::make('step_3.first_name_placeholder')->label('First Name Placeholder'),
                    Forms\Components\TextInput::make('step_3.last_name_placeholder')->label('Last Name Placeholder'),
                    Forms\Components\TextInput::make('step_3.days_placeholder')->label('Days Placeholder'),
                    Forms\Components\Textarea::make('step_3.message_placeholder')->label('Message Placeholder')->rows(2),
                    Forms\Components\Textarea::make('step_3.info_text')->label('Info Text')->rows(2),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Validation')
                ->schema([
                    Forms\Components\TextInput::make('validation.name_min')->label('Name Min'),
                    Forms\Components\TextInput::make('validation.arrival_required')->label('Arrival Required'),
                    Forms\Components\TextInput::make('validation.days_min')->label('Days Min'),
                    Forms\Components\TextInput::make('validation.message_min')->label('Message Min'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Navigation')
                ->schema([
                    Forms\Components\TextInput::make('navigation.previous')->label('Previous'),
                    Forms\Components\TextInput::make('navigation.next_step')->label('Next Step'),
                    Forms\Components\TextInput::make('navigation.submit_booking')->label('Submit Booking'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Summary')
                ->schema([
                    Forms\Components\TextInput::make('summary.title')->label('Title'),
                    Forms\Components\TextInput::make('summary.empty')->label('Empty Message'),
                    Forms\Components\TextInput::make('summary.equipment_label')->label('Equipment Label'),
                    Forms\Components\TextInput::make('summary.lesson_label')->label('Lesson Label'),
                    Forms\Components\TextInput::make('summary.subtotal')->label('Subtotal'),
                    Forms\Components\TextInput::make('summary.tax')->label('Tax'),
                    Forms\Components\TextInput::make('summary.total')->label('Total'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Payment')
                ->schema([
                    Forms\Components\TextInput::make('payment.title')->label('Title'),
                    Forms\Components\Repeater::make('payment.methods')
                        ->label('Payment Methods')
                        ->schema([
                            Forms\Components\TextInput::make('id')->label('ID')->required(),
                            Forms\Components\TextInput::make('name')->label('Name')->required(),
                            Forms\Components\TextInput::make('description')->label('Description'),
                        ])
                        ->defaultItems(0)
                        ->collapsible()
                        ->itemLabel(fn(array $state): ?string => $state['name'] ?? null)
                        ->columnSpanFull(),
                    Forms\Components\TextInput::make('payment.security_text')->label('Security Text'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Confirmation')
                ->schema([
                    Forms\Components\TextInput::make('confirmation.title')->label('Title'),
                    Forms\Components\Textarea::make('confirmation.subtitle')->label('Subtitle')->rows(2),
                    Forms\Components\TextInput::make('confirmation.booking_id_label')->label('Booking ID Label'),
                    Forms\Components\TextInput::make('confirmation.next_steps_title')->label('Next Steps Title'),
                    Forms\Components\Repeater::make('confirmation.next_steps')
                        ->label('Next Steps')
                        ->simple(Forms\Components\TextInput::make('value')->required())
                        ->defaultItems(0)
                        ->columnSpanFull(),
                    Forms\Components\TextInput::make('confirmation.email_sending')->label('Email Sending'),
                    Forms\Components\TextInput::make('confirmation.email_sent')->label('Email Sent'),
                    Forms\Components\Textarea::make('confirmation.email_error')->label('Email Error')->rows(2),
                    Forms\Components\TextInput::make('confirmation.new_booking_btn')->label('New Booking Button'),
                    Forms\Components\TextInput::make('confirmation.home_btn')->label('Home Button'),
                ])->collapsible()->collapsed(),

            Forms\Components\Section::make('Meta')
                ->schema([
                    Forms\Components\TextInput::make('meta.title')->label('Meta Title'),
                    Forms\Components\Textarea::make('meta.description')->label('Meta Description')->rows(2),
                ])->collapsible()->collapsed(),
        ];
    }
}
