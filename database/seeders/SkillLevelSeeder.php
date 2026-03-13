<?php

namespace Database\Seeders;

use App\Models\SkillLevel;
use Illuminate\Database\Seeder;

class SkillLevelSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            [
                'slug' => 'beginner',
                'name' => 'Beginner',
                'description' => 'Perfect for first-timers. Learn the basics of balance, stopping, and turning on gentle slopes.',
                'icon' => 'AcademicCapIcon',
                'duration' => '2 hours',
                'price' => 120,
                'features' => ['Basic stance & balance', 'Snowplow stop & turn', 'Chair lift technique', 'Safety fundamentals'],
                'color' => 'green',
                'sort_order' => 0,
            ],
            [
                'slug' => 'intermediate',
                'name' => 'Intermediate',
                'description' => 'Build on your skills. Advance from snowplow to parallel turns and explore blue runs.',
                'icon' => 'ChartBarIcon',
                'duration' => '2 hours',
                'price' => 150,
                'features' => ['Parallel turn technique', 'Speed control mastery', 'Blue run navigation', 'Terrain adaptation'],
                'color' => 'blue',
                'sort_order' => 1,
            ],
            [
                'slug' => 'advanced',
                'name' => 'Advanced',
                'description' => 'Master challenging terrain. Tackle moguls, steep runs, and off-piste conditions.',
                'icon' => 'BoltIcon',
                'duration' => '2 hours',
                'price' => 180,
                'features' => ['Mogul technique', 'Off-piste skiing', 'Carving mastery', 'Advanced terrain skills'],
                'color' => 'red',
                'sort_order' => 2,
            ],
            [
                'slug' => 'kids',
                'name' => 'Kids Program',
                'description' => 'Fun and safe learning for children ages 4-12. Games and activities make learning easy.',
                'icon' => 'SparklesIcon',
                'duration' => '1.5 hours',
                'price' => 100,
                'features' => ['Fun learning games', 'Safe kid-sized equipment', 'Small group sizes', 'Patient certified instructors'],
                'color' => 'purple',
                'sort_order' => 3,
            ],
        ];

        foreach ($levels as $level) {
            SkillLevel::create($level);
        }
    }
}
