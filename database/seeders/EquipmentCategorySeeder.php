<?php

namespace Database\Seeders;

use App\Models\EquipmentCategory;
use Illuminate\Database\Seeder;

class EquipmentCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Skis', 'slug' => 'skis'],
            ['name' => 'Snowboards', 'slug' => 'snowboards'],
            ['name' => 'Boots', 'slug' => 'boots'],
            ['name' => 'Goggles', 'slug' => 'goggles'],
            ['name' => 'Poles', 'slug' => 'poles'],
            ['name' => 'Helmets', 'slug' => 'helmets'],
        ];

        foreach ($categories as $i => $category) {
            EquipmentCategory::updateOrCreate(
                ['slug' => $category['slug']],
                array_merge($category, ['sort_order' => $i]),
            );
        }
    }
}
