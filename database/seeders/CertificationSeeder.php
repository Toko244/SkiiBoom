<?php

namespace Database\Seeders;

use App\Models\Certification;
use Illuminate\Database\Seeder;

class CertificationSeeder extends Seeder
{
    public function run(): void
    {
        $certs = [
            ['name' => 'ISIA Certified', 'description' => 'All our instructors hold International Ski Instructors Association certifications, ensuring the highest teaching standards.', 'issuer' => 'International Ski Instructors Association', 'icon' => 'ShieldCheckIcon', 'sort_order' => 0],
            ['name' => 'Georgian Tourism License', 'description' => 'Fully licensed and regulated by the Georgian National Tourism Administration for ski rental and instruction services.', 'issuer' => 'Georgian National Tourism Administration', 'icon' => 'DocumentCheckIcon', 'sort_order' => 1],
            ['name' => 'Equipment Safety Certified', 'description' => 'All equipment undergoes rigorous safety inspections and maintenance following international safety standards.', 'issuer' => 'European Safety Standards Board', 'icon' => 'WrenchScrewdriverIcon', 'sort_order' => 2],
            ['name' => 'Insurance Protected', 'description' => 'Comprehensive insurance coverage for all rental equipment and lesson activities, providing peace of mind for our guests.', 'issuer' => 'TBC Insurance Georgia', 'icon' => 'ShieldExclamationIcon', 'sort_order' => 3],
        ];

        foreach ($certs as $cert) {
            Certification::create($cert);
        }
    }
}
