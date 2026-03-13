<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name' => 'Giorgi Beridze',
                'role' => 'Founder & Head Instructor',
                'bio' => 'With over 15 years of experience in the ski industry, Giorgi founded SkiBoom Gudauri with a vision to provide world-class ski services in the heart of the Caucasus.',
                'certifications' => ['ISIA Certified', 'Avalanche Safety Expert', 'Mountain Rescue Trained'],
                'experience_years' => 15,
                'image_path' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                'sort_order' => 0,
            ],
            [
                'name' => 'Anna Nikoladze',
                'role' => 'Equipment Manager',
                'bio' => 'Anna ensures every piece of equipment meets the highest standards. Her attention to detail and knowledge of ski technology keeps our inventory in perfect condition.',
                'certifications' => ['Equipment Technician Certified', 'Brand Specialist - Rossignol, Burton, Salomon'],
                'experience_years' => 10,
                'image_path' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                'sort_order' => 1,
            ],
            [
                'name' => 'David Kvaratskhelia',
                'role' => 'Senior Ski Instructor',
                'bio' => 'David is one of the most sought-after instructors in Gudauri. His patient teaching style and deep understanding of ski technique make him a favorite among all skill levels.',
                'certifications' => ['BASI Level 3', 'Freestyle Specialist', 'Children\'s Instructor'],
                'experience_years' => 12,
                'image_path' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                'sort_order' => 2,
            ],
            [
                'name' => 'Mariam Tsereteli',
                'role' => 'Customer Experience Lead',
                'bio' => 'Mariam is the friendly face that greets every guest. She manages bookings, coordinates lessons, and ensures every visitor has an exceptional experience.',
                'certifications' => ['Tourism Management Certified', 'Multilingual Service Expert'],
                'experience_years' => 8,
                'image_path' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
                'sort_order' => 3,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::create(array_merge($member, ['active' => true]));
        }
    }
}
