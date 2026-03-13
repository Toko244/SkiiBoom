<?php

namespace Database\Seeders;

use App\Models\Instructor;
use Illuminate\Database\Seeder;

class InstructorSeeder extends Seeder
{
    public function run(): void
    {
        $instructors = [
            [
                'slug' => 'giorgi-beridze',
                'name' => 'Giorgi Beridze',
                'specialization' => 'Advanced & Off-Piste',
                'experience_years' => 12,
                'languages' => ['Georgian', 'English', 'Russian'],
                'rating' => 4.9,
                'total_lessons' => 850,
                'certifications' => ['ISIA Level 3', 'Georgian Ski Federation', 'Avalanche Safety Certified'],
                'bio' => 'With over 12 years of experience in Gudauri, Giorgi is our most experienced instructor specializing in advanced techniques and off-piste adventures.',
                'image_path' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
                'active' => true,
                'sort_order' => 0,
            ],
            [
                'slug' => 'natalia-kovalenko',
                'name' => 'Natalia Kovalenko',
                'specialization' => 'Beginner & Intermediate',
                'experience_years' => 8,
                'languages' => ['Russian', 'English', 'Georgian'],
                'rating' => 5.0,
                'total_lessons' => 620,
                'certifications' => ['BASI Level 3', 'First Aid Certified', 'Children\'s Ski Instructor'],
                'bio' => 'Natalia is known for her patience and clear teaching style, making her the top choice for beginners and intermediate skiers.',
                'image_path' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
                'active' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'david-mchedlishvili',
                'name' => 'David Mchedlishvili',
                'specialization' => 'Freestyle & Terrain Park',
                'experience_years' => 6,
                'languages' => ['Georgian', 'English'],
                'rating' => 4.8,
                'total_lessons' => 450,
                'certifications' => ['Freestyle Coach Level 2', 'Park & Pipe Specialist'],
                'bio' => 'David brings energy and creativity to every lesson. A former competitive freestyle skier, he specializes in terrain park and trick skiing.',
                'image_path' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
                'active' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'elena-popescu',
                'name' => 'Elena Popescu',
                'specialization' => 'Kids & Family Programs',
                'experience_years' => 10,
                'languages' => ['English', 'Russian', 'Georgian'],
                'rating' => 5.0,
                'total_lessons' => 720,
                'certifications' => ['Children\'s Ski Instructor Level 3', 'BASI Level 2', 'Pediatric First Aid'],
                'bio' => 'Elena has a natural gift for teaching children and families. Her fun, engaging approach makes learning to ski an unforgettable experience.',
                'image_path' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
                'active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($instructors as $instructor) {
            Instructor::create($instructor);
        }
    }
}
