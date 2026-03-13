<?php

namespace App\Filament\Resources;

use App\Enums\BookingStatus;
use App\Enums\Currency;
use App\Enums\PaymentMethod;
use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationGroup = 'Bookings';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'booking_ref';

    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('status', 'pending')->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['booking_ref', 'first_name', 'last_name', 'email'];
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Customer Information')
                            ->icon('heroicon-o-user')
                            ->description('Customer contact details')
                            ->schema([
                                Forms\Components\TextInput::make('booking_ref')
                                    ->label('Booking Reference')
                                    ->disabled()
                                    ->prefixIcon('heroicon-o-hashtag')
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('first_name')
                                    ->required()
                                    ->maxLength(255)
                                    ->prefixIcon('heroicon-o-user'),
                                Forms\Components\TextInput::make('last_name')
                                    ->required()
                                    ->maxLength(255)
                                    ->prefixIcon('heroicon-o-user'),
                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->required()
                                    ->maxLength(255)
                                    ->prefixIcon('heroicon-o-envelope'),
                                Forms\Components\TextInput::make('phone')
                                    ->tel()
                                    ->maxLength(255)
                                    ->prefixIcon('heroicon-o-phone'),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Booking Dates')
                            ->icon('heroicon-o-calendar')
                            ->schema([
                                Forms\Components\DatePicker::make('start_date')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d M Y'),
                                Forms\Components\DatePicker::make('end_date')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d M Y'),
                                Forms\Components\DatePicker::make('arrival_date')
                                    ->native(false)
                                    ->displayFormat('d M Y'),
                                Forms\Components\TextInput::make('number_of_days')
                                    ->numeric()
                                    ->suffix('days')
                                    ->disabled(),
                            ])
                            ->columns(2),

                        Forms\Components\Section::make('Notes')
                            ->icon('heroicon-o-chat-bubble-bottom-center-text')
                            ->schema([
                                Forms\Components\Textarea::make('customer_message')
                                    ->label('Customer Message')
                                    ->disabled()
                                    ->rows(3)
                                    ->columnSpanFull()
                                    ->placeholder('No message from customer'),
                                Forms\Components\Textarea::make('admin_notes')
                                    ->label('Admin Notes')
                                    ->rows(3)
                                    ->columnSpanFull()
                                    ->placeholder('Add internal notes here...'),
                            ]),
                    ])
                    ->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Status')
                            ->icon('heroicon-o-signal')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options(BookingStatus::class)
                                    ->required()
                                    ->native(false),
                                Forms\Components\Select::make('payment_method')
                                    ->options(PaymentMethod::class)
                                    ->native(false),
                            ]),

                        Forms\Components\Section::make('Financial Summary')
                            ->icon('heroicon-o-banknotes')
                            ->schema([
                                Forms\Components\TextInput::make('subtotal')
                                    ->numeric()
                                    ->prefix('₾')
                                    ->disabled(),
                                Forms\Components\TextInput::make('discount')
                                    ->numeric()
                                    ->prefix('₾')
                                    ->helperText('Enter discount amount'),
                                Forms\Components\TextInput::make('tax_amount')
                                    ->label('Tax')
                                    ->numeric()
                                    ->prefix('₾')
                                    ->disabled(),
                                Forms\Components\TextInput::make('total_amount')
                                    ->label('Total')
                                    ->numeric()
                                    ->prefix('₾')
                                    ->disabled()
                                    ->extraAttributes(['class' => 'font-bold']),
                                Forms\Components\Select::make('currency')
                                    ->options(Currency::class)
                                    ->native(false),
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
                Tables\Columns\TextColumn::make('booking_ref')
                    ->label('Ref')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Booking reference copied')
                    ->weight('bold')
                    ->color('primary'),
                Tables\Columns\TextColumn::make('full_name')
                    ->label('Customer')
                    ->getStateUsing(fn ($record) => $record->first_name . ' ' . $record->last_name)
                    ->searchable(query: function ($query, string $search) {
                        $query->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%");
                    })
                    ->description(fn ($record) => $record->email),
                Tables\Columns\TextColumn::make('start_date')
                    ->label('Dates')
                    ->date('d M Y')
                    ->description(fn ($record) => $record->end_date?->format('d M Y'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_amount')
                    ->label('Total')
                    ->money('GEL')
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (BookingStatus $state): string => match ($state) {
                        BookingStatus::Pending => 'warning',
                        BookingStatus::Confirmed, BookingStatus::Paid => 'success',
                        BookingStatus::InProgress => 'primary',
                        BookingStatus::Completed => 'gray',
                        BookingStatus::Cancelled, BookingStatus::Refunded => 'danger',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->since()
                    ->sortable()
                    ->tooltip(fn ($record) => $record->created_at?->format('d M Y H:i')),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(BookingStatus::class)
                    ->multiple()
                    ->preload(),
                Tables\Filters\Filter::make('date_range')
                    ->form([
                        Forms\Components\DatePicker::make('from')
                            ->native(false),
                        Forms\Components\DatePicker::make('to')
                            ->native(false),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn ($q, $date) => $q->whereDate('start_date', '>=', $date))
                            ->when($data['to'], fn ($q, $date) => $q->whereDate('start_date', '<=', $date));
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];
                        if ($data['from'] ?? null) {
                            $indicators[] = Tables\Filters\Indicator::make('From ' . \Carbon\Carbon::parse($data['from'])->format('d M Y'))
                                ->removeField('from');
                        }
                        if ($data['to'] ?? null) {
                            $indicators[] = Tables\Filters\Indicator::make('Until ' . \Carbon\Carbon::parse($data['to'])->format('d M Y'))
                                ->removeField('to');
                        }
                        return $indicators;
                    }),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\Action::make('confirm')
                        ->label('Confirm')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(fn (Booking $record) => $record->update(['status' => BookingStatus::Confirmed, 'confirmed_at' => now()]))
                        ->visible(fn (Booking $record) => $record->status === BookingStatus::Pending),
                    Tables\Actions\Action::make('cancel')
                        ->label('Cancel')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->modalDescription('Are you sure you want to cancel this booking? This action cannot be undone.')
                        ->action(fn (Booking $record) => $record->update(['status' => BookingStatus::Cancelled, 'cancelled_at' => now()]))
                        ->visible(fn (Booking $record) => !in_array($record->status, [BookingStatus::Cancelled, BookingStatus::Completed, BookingStatus::Refunded])),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->poll('30s')
            ->striped()
            ->emptyStateHeading('No bookings yet')
            ->emptyStateDescription('Bookings will appear here when customers place orders.')
            ->emptyStateIcon('heroicon-o-calendar-days');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}
