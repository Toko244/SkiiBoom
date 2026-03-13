<?php

namespace Database\Seeders;

use App\Models\TimelineEvent;
use Illuminate\Database\Seeder;

class TimelineEventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            ['year' => 2015, 'title' => 'The Beginning', 'description' => 'Founded with just 20 pairs of skis and a passion for mountain sports. Started as a small rental shop near the base of Gudauri.', 'icon' => 'SparklesIcon', 'sort_order' => 0],
            ['year' => 2017, 'title' => 'Expansion & Certification', 'description' => 'Grew to 200+ equipment sets and achieved ISIA certification for our instruction team. Introduced multilingual services.', 'icon' => 'ArrowTrendingUpIcon', 'sort_order' => 1],
            ['year' => 2019, 'title' => 'New Facility Opening', 'description' => 'Opened our state-of-the-art 300 sq meter facility with professional boot fitting, equipment maintenance workshop, and customer lounge.', 'icon' => 'BuildingOfficeIcon', 'sort_order' => 2],
            ['year' => 2021, 'title' => 'Digital Transformation', 'description' => 'Launched our online booking platform and introduced digital equipment management system for faster service.', 'icon' => 'ComputerDesktopIcon', 'sort_order' => 3],
            ['year' => 2023, 'title' => 'Partnership Excellence', 'description' => 'Became the official ski service partner of Gudauri Ski Resort. Established partnerships with leading equipment brands.', 'icon' => 'HandshakeIcon', 'sort_order' => 4],
            ['year' => 2026, 'title' => 'Industry Leadership', 'description' => 'Now serving 5,000+ guests annually with a team of 15+ certified instructors. Recognized as Gudauri\'s premier ski service provider.', 'icon' => 'TrophyIcon', 'sort_order' => 5],
        ];

        foreach ($events as $event) {
            TimelineEvent::create($event);
        }
    }
}
