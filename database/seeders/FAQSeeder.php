<?php

namespace Database\Seeders;

use App\Models\FAQ;
use Illuminate\Database\Seeder;

class FAQSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            ['question' => 'What should I bring to my first lesson?', 'answer' => 'We provide all the necessary equipment. Just bring warm, waterproof clothing, sunscreen, and a positive attitude! We recommend layered clothing for comfort.', 'page' => 'lessons', 'sort_order' => 0],
            ['question' => 'How do I choose the right lesson level?', 'answer' => 'Our instructors will assess your ability at the start of each lesson and adjust accordingly. If you\'re unsure, start with beginner - it\'s better to be placed up than struggle.', 'page' => 'lessons', 'sort_order' => 1],
            ['question' => 'Can I book private lessons for my family?', 'answer' => 'Absolutely! We offer private family lessons that can be customized to accommodate different skill levels within the same group. Contact us for special family pricing.', 'page' => 'lessons', 'sort_order' => 2],
            ['question' => 'What is your cancellation policy?', 'answer' => 'Free cancellation up to 24 hours before your lesson. Cancellations within 24 hours incur a 50% charge. No-shows are charged in full. Weather-related cancellations are fully refunded.', 'page' => 'lessons', 'sort_order' => 3],
            ['question' => 'Do you offer lessons in multiple languages?', 'answer' => 'Yes! Our instructors speak Georgian, English, and Russian. Some instructors also speak additional languages. Please specify your language preference when booking.', 'page' => 'lessons', 'sort_order' => 4],
            ['question' => 'What age groups do you teach?', 'answer' => 'We teach skiers from age 4 and up. Our kids\' program is specially designed for children aged 4-12, with age-appropriate teaching methods and safety equipment.', 'page' => 'lessons', 'sort_order' => 5],
        ];

        foreach ($faqs as $faq) {
            FAQ::create(array_merge($faq, ['active' => true]));
        }
    }
}
