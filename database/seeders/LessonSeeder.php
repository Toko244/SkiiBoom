<?php

namespace Database\Seeders;

use App\Models\Instructor;
use App\Models\Lesson;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        $giorgi = Instructor::where('slug', 'giorgi-beridze')->first();
        $natalia = Instructor::where('slug', 'natalia-kovalenko')->first();
        $david = Instructor::where('slug', 'david-mchedlishvili')->first();
        $elena = Instructor::where('slug', 'elena-popescu')->first();

        $lessons = [
            [
                'slug' => 'beginner-group-lesson',
                'title' => 'Beginner Group Lesson',
                'description' => 'Perfect introduction to skiing for first-timers. Learn basics in a small group setting.',
                'instructor_id' => $giorgi?->id,
                'skill_level' => 'beginner',
                'duration' => '2 hours',
                'max_participants' => 8,
                'price' => 60,
                'available' => true,
                'sort_order' => 0,
            ],
            [
                'slug' => 'private-advanced-lesson',
                'title' => 'Private Advanced Lesson',
                'description' => 'One-on-one advanced instruction for experienced skiers looking to push their limits.',
                'instructor_id' => $natalia?->id,
                'skill_level' => 'advanced',
                'duration' => '1.5 hours',
                'max_participants' => 1,
                'price' => 120,
                'available' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'kids-ski-school',
                'title' => 'Kids Ski School',
                'description' => 'Fun and engaging ski program designed specifically for children ages 4-12.',
                'instructor_id' => $david?->id,
                'skill_level' => 'beginner',
                'duration' => '3 hours',
                'max_participants' => 6,
                'price' => 80,
                'available' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'intermediate-group-lesson',
                'title' => 'Intermediate Group Lesson',
                'description' => 'Build on your existing skills with advanced techniques in a supportive group environment.',
                'instructor_id' => $elena?->id,
                'skill_level' => 'intermediate',
                'duration' => '2 hours',
                'max_participants' => 6,
                'price' => 75,
                'available' => false,
                'sort_order' => 3,
            ],
        ];

        foreach ($lessons as $lesson) {
            Lesson::create($lesson);
        }
    }
}
