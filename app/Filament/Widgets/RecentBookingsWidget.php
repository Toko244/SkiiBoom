<?php

namespace App\Filament\Widgets;

use App\Enums\BookingStatus;
use App\Models\Booking;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentBookingsWidget extends BaseWidget
{
    protected static ?string $heading = 'Recent Bookings';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 'full';
    protected static ?string $pollingInterval = '30s';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Booking::query()->latest()->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('booking_ref')
                    ->label('Ref')
                    ->copyable()
                    ->copyMessage('Copied')
                    ->weight('bold')
                    ->color('primary'),
                Tables\Columns\TextColumn::make('first_name')
                    ->label('Customer')
                    ->formatStateUsing(fn ($record) => $record->first_name . ' ' . $record->last_name)
                    ->description(fn ($record) => $record->email),
                Tables\Columns\TextColumn::make('total_amount')
                    ->label('Total')
                    ->money('GEL')
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
                    ->label('When')
                    ->since()
                    ->tooltip(fn ($record) => $record->created_at?->format('d M Y H:i')),
            ])
            ->defaultSort('created_at', 'desc')
            ->paginated(false)
            ->striped()
            ->emptyStateHeading('No bookings yet')
            ->emptyStateDescription('Recent bookings will appear here.')
            ->emptyStateIcon('heroicon-o-calendar-days');
    }
}
