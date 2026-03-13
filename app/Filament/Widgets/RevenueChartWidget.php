<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\ChartWidget;

class RevenueChartWidget extends ChartWidget
{
    protected static ?string $heading = 'Monthly Revenue';
    protected static ?int $sort = 2;
    protected static ?string $pollingInterval = '60s';
    protected static ?string $maxHeight = '300px';
    protected int | string | array $columnSpan = 'full';

    public ?string $filter = 'this_year';

    protected function getFilters(): ?array
    {
        return [
            'this_year' => now()->year,
            'last_year' => now()->year - 1,
        ];
    }

    protected function getData(): array
    {
        $year = $this->filter === 'last_year' ? now()->year - 1 : now()->year;

        $revenue = collect(range(1, 12))->map(fn ($month) =>
            (float) Booking::whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->where('status', '!=', 'cancelled')
                ->sum('total_amount')
        );

        $bookingCounts = collect(range(1, 12))->map(fn ($month) =>
            Booking::whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->where('status', '!=', 'cancelled')
                ->count()
        );

        return [
            'datasets' => [
                [
                    'label' => 'Revenue (GEL)',
                    'data' => $revenue->toArray(),
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'fill' => true,
                    'tension' => 0.3,
                ],
                [
                    'label' => 'Bookings',
                    'data' => $bookingCounts->toArray(),
                    'borderColor' => '#10b981',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                    'fill' => true,
                    'tension' => 0.3,
                ],
            ],
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
