<?php

namespace Database\Seeders;

use App\Models\GalleryPhoto;
use Illuminate\Database\Seeder;

class GalleryPhotoSeeder extends Seeder
{
    public function run(): void
    {
        $photos = [
            ['title' => 'Perfect Powder Day', 'author_name' => 'Sarah Johnson', 'category' => 'skiing', 'season' => 'winter', 'likes_count' => 342, 'description' => 'Fresh powder morning on the main slopes of Gudauri', 'image_path' => 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
            ['title' => 'Premium Equipment', 'author_name' => 'Michael Chen', 'category' => 'equipment', 'season' => 'winter', 'likes_count' => 289, 'description' => 'Our latest collection of premium ski equipment ready for the season', 'image_path' => 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=800'],
            ['title' => 'First Lesson Success', 'author_name' => 'Emma Williams', 'category' => 'lessons', 'season' => 'winter', 'likes_count' => 421, 'description' => 'A beginner\'s first successful run down the slope', 'image_path' => 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800'],
            ['title' => 'Gudauri Sunset', 'author_name' => 'David Martinez', 'category' => 'slopes', 'season' => 'winter', 'likes_count' => 567, 'description' => 'Breathtaking sunset views from the top of Gudauri mountain', 'image_path' => 'https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=800'],
            ['title' => 'Terrain Park Action', 'author_name' => 'Alex Thompson', 'category' => 'skiing', 'season' => 'winter', 'likes_count' => 398, 'description' => 'Freestyle action in the Gudauri terrain park', 'image_path' => 'https://images.unsplash.com/photo-1486218119243-13883505764c?w=800'],
            ['title' => 'Mountain Views', 'author_name' => 'Lisa Anderson', 'category' => 'slopes', 'season' => 'winter', 'likes_count' => 312, 'description' => 'Panoramic views of the Greater Caucasus mountain range', 'image_path' => 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800'],
            ['title' => 'Family Adventure', 'author_name' => 'Robert Kim', 'category' => 'lessons', 'season' => 'winter', 'likes_count' => 445, 'description' => 'A family enjoying their group lesson together on the slopes', 'image_path' => 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800'],
            ['title' => 'Ready to Ride', 'author_name' => 'Nina Patel', 'category' => 'equipment', 'season' => 'winter', 'likes_count' => 276, 'description' => 'Fresh wax and sharp edges - equipment ready for the perfect day', 'image_path' => 'https://images.unsplash.com/photo-1522056615691-da7b8106c665?w=800'],
        ];

        foreach ($photos as $index => $photo) {
            GalleryPhoto::create(array_merge($photo, [
                'date' => now()->subDays(rand(1, 60)),
                'status' => 'approved',
                'sort_order' => $index,
                'author_avatar' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
            ]));
        }
    }
}
