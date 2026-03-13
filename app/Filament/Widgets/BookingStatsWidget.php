<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\Equipment;
use App\Models\GalleryPhoto;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BookingStatsWidget extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected static ?string $pollingInterval = '30s';

    protected function getStats(): array
    {
        $totalBookings = Booking::count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        $monthlyRevenue = Booking::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->where('status', '!=', 'cancelled')
            ->sum('total_amount');
        $pendingPhotos = GalleryPhoto::where('status', 'pending')->count();
        $activeEquipment = Equipment::where('available', true)->count();
        $totalEquipment = Equipment::count();

        // Build last 7 days booking trend
        $bookingTrend = collect(range(6, 0))->map(fn ($i) =>
            Booking::whereDate('created_at', now()->subDays($i))->count()
        )->toArray();

        return [
            Stat::make('Total Bookings', $totalBookings)
                ->description('All time')
                ->descriptionIcon('heroicon-o-calendar-days')
                ->chart($bookingTrend)
                ->color('primary'),
            Stat::make('Pending Bookings', $pendingBookings)
                ->description($pendingBookings > 0 ? 'Need attention' : 'All clear')
                ->descriptionIcon($pendingBookings > 0 ? 'heroicon-o-exclamation-triangle' : 'heroicon-o-check-circle')
                ->color($pendingBookings > 0 ? 'warning' : 'success'),
            Stat::make('Monthly Revenue', '₾' . number_format($monthlyRevenue, 2))
                ->description(now()->format('F Y'))
                ->descriptionIcon('heroicon-o-banknotes')
                ->color('success'),
            Stat::make('Equipment', "{$activeEquipment}/{$totalEquipment} available")
                ->description("{$totalEquipment} total items")
                ->descriptionIcon('heroicon-o-wrench-screwdriver')
                ->color('info'),
            Stat::make('Pending Photos', $pendingPhotos)
                ->description($pendingPhotos > 0 ? 'Awaiting review' : 'No pending')
                ->descriptionIcon('heroicon-o-photo')
                ->color($pendingPhotos > 0 ? 'warning' : 'gray'),
        ];
    }
}
