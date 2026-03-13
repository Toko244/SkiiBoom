<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            // Homepage testimonials
            ['name' => 'Sarah Johnson', 'country' => 'United Kingdom', 'rating' => 5, 'text' => 'The equipment quality was outstanding! The staff helped us find the perfect gear for our skill level. Will definitely return next season.', 'date' => '2026-01-15', 'page' => 'homepage', 'sort_order' => 0],
            ['name' => 'Marco Rossi', 'country' => 'Italy', 'rating' => 5, 'text' => 'Best ski rental experience in Gudauri! The prices are fair and the equipment is always well-maintained. Highly recommend their premium packages.', 'date' => '2025-12-20', 'page' => 'homepage', 'sort_order' => 1],
            ['name' => 'Elena Petrova', 'country' => 'Russia', 'rating' => 5, 'text' => 'Amazing service and great instructors. The multilingual support made everything so easy. The kids absolutely loved their lessons!', 'date' => '2026-01-10', 'page' => 'homepage', 'sort_order' => 2],
            ['name' => 'Thomas Weber', 'country' => 'Germany', 'rating' => 5, 'text' => 'Professional team with excellent knowledge of the mountain. Their advice on equipment and conditions made our trip unforgettable.', 'date' => '2026-02-05', 'page' => 'homepage', 'sort_order' => 3],

            // Lessons page testimonials
            ['name' => 'Sarah Mitchell', 'country' => 'United Kingdom', 'rating' => 5, 'text' => 'As a complete beginner, I was nervous about my first ski lesson. Natalia was incredibly patient and by the end of my weekend package, I was confidently skiing blue runs!', 'date' => '2026-01-20', 'lesson_type' => 'Beginner Package', 'page' => 'lessons', 'sort_order' => 0],
            ['name' => 'Marco Rossi', 'country' => 'Italy', 'rating' => 5, 'text' => 'Giorgi took my skiing to the next level. His off-piste expertise and knowledge of the Gudauri backcountry is unmatched. An incredible experience!', 'date' => '2026-01-15', 'lesson_type' => 'Advanced Off-Piste', 'page' => 'lessons', 'sort_order' => 1],
            ['name' => 'Anna Kowalski', 'country' => 'Poland', 'rating' => 5, 'text' => 'Elena was amazing with our children. Both kids (ages 6 and 9) went from scared beginners to excited little skiers in just 3 days. Worth every penny!', 'date' => '2025-12-28', 'lesson_type' => 'Kids Program', 'page' => 'lessons', 'sort_order' => 2],
            ['name' => 'James Chen', 'country' => 'Singapore', 'rating' => 5, 'text' => 'David\'s freestyle coaching was exactly what I needed. He broke down complex tricks into manageable steps. The terrain park sessions were the highlight of my trip.', 'date' => '2026-02-01', 'lesson_type' => 'Freestyle Specialist', 'page' => 'lessons', 'sort_order' => 3],

            // Gallery page testimonials
            ['name' => 'James Wilson', 'country' => 'United Kingdom', 'rating' => 5, 'text' => 'Incredible experience at SkiBoom Gudauri! The equipment was top-notch and the instructors were fantastic. Can\'t wait to come back next season.', 'date' => '2026-01-15', 'platform' => 'Google', 'page' => 'gallery', 'sort_order' => 0],
            ['name' => 'Maria Rodriguez', 'country' => 'Spain', 'rating' => 5, 'text' => 'Best ski school in Gudauri! Our whole family had an amazing time. The kids\' program was exceptional and the staff was incredibly friendly.', 'date' => '2026-01-08', 'platform' => 'Facebook', 'page' => 'gallery', 'sort_order' => 1],
            ['name' => 'Thomas Mueller', 'country' => 'Germany', 'rating' => 5, 'text' => 'Professional service from start to finish. The online booking was seamless and the equipment quality exceeded our expectations. Highly recommended!', 'date' => '2025-12-20', 'platform' => 'TripAdvisor', 'page' => 'gallery', 'sort_order' => 2],
            ['name' => 'Sophie Laurent', 'country' => 'France', 'rating' => 5, 'text' => 'Outstanding mountain experience! The terrain at Gudauri is beautiful and SkiBoom\'s team made everything perfect. Their local knowledge is invaluable.', 'date' => '2026-02-01', 'platform' => 'Google', 'page' => 'gallery', 'sort_order' => 3],

            // About page testimonials
            ['name' => 'Sarah Mitchell', 'country' => 'London, United Kingdom', 'rating' => 5, 'text' => 'SkiBoom Gudauri made our family vacation absolutely perfect. The team\'s attention to detail and genuine care for their guests is remarkable. From equipment fitting to lesson scheduling, everything was seamless.', 'date' => '2026-01-15', 'page' => 'about', 'sort_order' => 0],
            ['name' => 'Dmitry Volkov', 'country' => 'Moscow, Russia', 'rating' => 5, 'text' => 'As a frequent visitor to Gudauri, I\'ve tried many ski services, but SkiBoom stands out. Their equipment is always in excellent condition and the instructors truly know the mountain. A five-star experience every time.', 'date' => '2025-12-20', 'page' => 'about', 'sort_order' => 1],
            ['name' => 'Emma Dubois', 'country' => 'Paris, France', 'rating' => 5, 'text' => 'The multilingual support at SkiBoom is impressive. Being able to communicate in French with the team made our experience so much more comfortable. The quality of service matches any European resort.', 'date' => '2026-02-01', 'page' => 'about', 'sort_order' => 2],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create(array_merge($testimonial, ['active' => true]));
        }
    }
}
