<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    public function run(): void
    {
        $facilities = [
            ['name' => 'Main Equipment Showroom', 'description' => 'Our spacious showroom features the latest ski and snowboard equipment from top brands, with expert staff to help you find the perfect gear.', 'area_size' => '300 sq meters', 'sort_order' => 0],
            ['name' => 'Professional Boot Fitting Station', 'description' => 'State-of-the-art boot fitting area with heat-moldable technology and pressure mapping for the perfect fit.', 'area_size' => null, 'sort_order' => 1],
            ['name' => 'Equipment Maintenance Workshop', 'description' => 'Full-service workshop for ski tuning, waxing, edge sharpening, and equipment repairs by certified technicians.', 'area_size' => null, 'sort_order' => 2],
            ['name' => 'Climate-Controlled Storage', 'description' => 'Secure, climate-controlled storage facility for equipment, ensuring optimal condition throughout the season.', 'area_size' => null, 'sort_order' => 3],
            ['name' => 'Customer Service Center', 'description' => 'Comfortable waiting area with booking assistance, trail maps, weather updates, and complimentary hot beverages.', 'area_size' => null, 'sort_order' => 4],
        ];

        foreach ($facilities as $facility) {
            Facility::create($facility);
        }
    }
}
