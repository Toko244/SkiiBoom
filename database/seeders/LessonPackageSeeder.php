<?php

namespace Database\Seeders;

use App\Models\LessonPackage;
use Illuminate\Database\Seeder;

class LessonPackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'slug' => 'single-lesson',
                'name' => 'Single Lesson',
                'description' => 'One comprehensive lesson with a professional instructor.',
                'sessions' => 1,
                'total_hours' => '2 hours',
                'price' => 150,
                'savings' => null,
                'features' => ['2-hour session', 'Professional instructor', 'Equipment tips', 'Personalized feedback'],
                'is_popular' => false,
                'available' => true,
                'sort_order' => 0,
            ],
            [
                'slug' => 'weekend-package',
                'name' => 'Weekend Package',
                'description' => 'Three lessons spread across the weekend for rapid improvement.',
                'sessions' => 3,
                'total_hours' => '6 hours total',
                'price' => 400,
                'savings' => 50,
                'features' => ['3 x 2-hour sessions', 'Progress tracking', 'Video analysis', 'Priority booking'],
                'is_popular' => true,
                'available' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'week-intensive',
                'name' => 'Week Intensive',
                'description' => 'Five intensive lessons over the course of a week for maximum skill development.',
                'sessions' => 5,
                'total_hours' => '10 hours total',
                'price' => 650,
                'savings' => 100,
                'features' => ['5 x 2-hour sessions', 'Dedicated instructor', 'Skill assessment', 'Certificate of completion'],
                'is_popular' => false,
                'available' => true,
                'sort_order' => 2,
            ],
        ];

        foreach ($packages as $package) {
            LessonPackage::create($package);
        }
    }
}
