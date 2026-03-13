<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    public function run(): void
    {
        $partners = [
            ['name' => 'Gudauri Ski Resort', 'sort_order' => 0],
            ['name' => 'Georgian Tourism Board', 'sort_order' => 1],
            ['name' => 'Mountain Hotels Group', 'sort_order' => 2],
            ['name' => 'Alpine Safety Institute', 'sort_order' => 3],
            ['name' => 'Caucasus Adventure Tours', 'sort_order' => 4],
            ['name' => 'International Ski Federation', 'sort_order' => 5],
        ];

        foreach ($partners as $partner) {
            Partner::create(array_merge($partner, ['active' => true]));
        }
    }
}
