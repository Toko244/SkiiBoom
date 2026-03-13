<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'SkiBoom Gudauri', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'Premium Ski Equipment Rental & Professional Lessons in Gudauri, Georgia', 'group' => 'general'],
            ['key' => 'exchange_rates', 'value' => ['GEL' => 1, 'EUR' => 0.35, 'USD' => 0.37], 'group' => 'booking'],
            ['key' => 'tax_rate', 'value' => 0.18, 'group' => 'booking'],
            ['key' => 'contact_email', 'value' => 'info@skiboom.ge', 'group' => 'contact'],
            ['key' => 'contact_phone', 'value' => '+995 555 123 456', 'group' => 'contact'],
            ['key' => 'address', 'value' => 'Gudauri Ski Resort, Kazbegi Municipality, Georgia', 'group' => 'contact'],
            ['key' => 'facebook_url', 'value' => 'https://facebook.com/skiboomgudauri', 'group' => 'social'],
            ['key' => 'instagram_url', 'value' => 'https://instagram.com/skiboomgudauri', 'group' => 'social'],
            ['key' => 'google_review_count', 'value' => '1,234 reviews', 'group' => 'general'],
            ['key' => 'google_rating', 'value' => '4.9', 'group' => 'general'],
            ['key' => 'facebook_review_count', 'value' => '892 reviews', 'group' => 'general'],
            ['key' => 'facebook_rating', 'value' => '4.8', 'group' => 'general'],
            ['key' => 'tripadvisor_review_count', 'value' => '567 reviews', 'group' => 'general'],
            ['key' => 'tripadvisor_rating', 'value' => '5.0', 'group' => 'general'],
        ];

        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }
    }
}
