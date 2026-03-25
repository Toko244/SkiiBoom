<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            EquipmentCategorySeeder::class,
            EquipmentSeeder::class,
            InstructorSeeder::class,
            SkillLevelSeeder::class,
            LessonSeeder::class,
            LessonPackageSeeder::class,
            TestimonialSeeder::class,
            GalleryPhotoSeeder::class,
            TeamMemberSeeder::class,
            TimelineEventSeeder::class,
            CertificationSeeder::class,
            PartnerSeeder::class,
            FacilitySeeder::class,
            FAQSeeder::class,
            SiteSettingSeeder::class,
        ]);
    }
}
