<?php

namespace App\Services;

use App\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;

class CurrencyService
{
    private array $defaultRates = [
        'GEL' => 1,
        'EUR' => 0.35,
        'USD' => 0.37,
    ];

    public function getRate(string $currency): float
    {
        $rates = Cache::remember('exchange_rates', 3600, function () {
            $setting = SiteSetting::where('key', 'exchange_rates')->first();
            return $setting?->value ?? $this->defaultRates;
        });

        return (float) ($rates[$currency] ?? 1);
    }

    public function convert(float $amountGel, string $targetCurrency): float
    {
        return round($amountGel * $this->getRate($targetCurrency), 2);
    }

    public function getRates(): array
    {
        return Cache::remember('exchange_rates', 3600, function () {
            $setting = SiteSetting::where('key', 'exchange_rates')->first();
            return $setting?->value ?? $this->defaultRates;
        });
    }
}
