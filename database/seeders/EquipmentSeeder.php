<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\EquipmentImage;
use App\Models\EquipmentSpecification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'Rossignol Experience 88 Ti Skis',
                'category' => 'skis',
                'price_per_day' => 45,
                'rating' => 4.8,
                'reviews_count' => 124,
                'available' => true,
                'is_featured' => true,
                'description' => 'High-performance all-mountain skis perfect for intermediate to advanced skiers. Features Titanium reinforcement for stability at speed.',
                'features' => ['Titanium Reinforcement', 'All-Mountain Design', 'Carbon Alloy Technology', 'Air Tip Technology'],
                'sizes' => ['160cm', '168cm', '176cm', '184cm'],
                'specifications' => [
                    ['label' => 'Type', 'value' => 'All-Mountain'],
                    ['label' => 'Skill Level', 'value' => 'Intermediate to Advanced'],
                    ['label' => 'Turn Radius', 'value' => '16m (176cm)'],
                    ['label' => 'Weight', 'value' => '3.8 kg per ski'],
                ],
            ],
            [
                'name' => 'Burton Custom Snowboard',
                'category' => 'snowboards',
                'price_per_day' => 50,
                'rating' => 4.9,
                'reviews_count' => 98,
                'available' => true,
                'is_featured' => true,
                'description' => 'The most popular board ever, the Burton Custom is a true all-mountain freestyle deck. Versatile flex and twin shape.',
                'features' => ['Twin Shape', 'Channel Mounting System', 'Super Fly II Core', 'Squeezebox Profiling'],
                'sizes' => ['150cm', '154cm', '158cm', '162cm'],
                'specifications' => [
                    ['label' => 'Type', 'value' => 'All-Mountain Freestyle'],
                    ['label' => 'Shape', 'value' => 'Twin'],
                    ['label' => 'Flex', 'value' => 'Medium (6/10)'],
                ],
            ],
            [
                'name' => 'Salomon Quest Access 80 Boots',
                'category' => 'boots',
                'price_per_day' => 35,
                'rating' => 4.6,
                'reviews_count' => 87,
                'available' => true,
                'is_featured' => false,
                'description' => 'Comfortable all-mountain boots with a wide last for easy entry and all-day comfort.',
                'features' => ['Wide 104mm Last', 'Custom Fit Liner', 'Heel Lock System', 'Progressive Flex'],
                'sizes' => ['24.5', '25.5', '26.5', '27.5', '28.5', '29.5'],
                'specifications' => [
                    ['label' => 'Flex', 'value' => '80'],
                    ['label' => 'Last Width', 'value' => '104mm'],
                ],
            ],
            [
                'name' => 'Smith I/O Mag XL Goggles',
                'category' => 'goggles',
                'price_per_day' => 25,
                'rating' => 4.7,
                'reviews_count' => 156,
                'available' => true,
                'is_featured' => true,
                'description' => 'Premium goggles with magnetic lens interchange system and ChromaPop technology for enhanced clarity.',
                'features' => ['ChromaPop Lens', 'Magnetic Lens Change', 'Anti-Fog Inner Lens', 'Ultra-Wide View'],
                'sizes' => ['One Size'],
                'specifications' => [
                    ['label' => 'Lens', 'value' => 'ChromaPop Sun Black'],
                    ['label' => 'Fit', 'value' => 'Large'],
                ],
            ],
            [
                'name' => 'Black Diamond Carbon Pro Poles',
                'category' => 'poles',
                'price_per_day' => 20,
                'rating' => 4.5,
                'reviews_count' => 67,
                'available' => true,
                'is_featured' => false,
                'description' => 'Lightweight carbon fiber poles with ergonomic grip for all-mountain skiing.',
                'features' => ['Carbon Fiber Construction', 'Ergonomic Grip', 'Powder Baskets', 'Adjustable Strap'],
                'sizes' => ['110cm', '115cm', '120cm', '125cm', '130cm'],
                'specifications' => [
                    ['label' => 'Material', 'value' => 'Carbon Fiber'],
                    ['label' => 'Weight', 'value' => '200g per pole'],
                ],
            ],
            [
                'name' => 'POC Obex BC SPIN Helmet',
                'category' => 'helmets',
                'price_per_day' => 30,
                'rating' => 4.8,
                'reviews_count' => 92,
                'available' => true,
                'is_featured' => true,
                'description' => 'Premium backcountry helmet with SPIN technology for rotational impact protection.',
                'features' => ['SPIN Technology', 'RECCO Reflector', 'Adjustable Ventilation', 'EPS Liner'],
                'sizes' => ['S', 'M', 'L', 'XL'],
                'specifications' => [
                    ['label' => 'Safety', 'value' => 'CE EN 1077'],
                    ['label' => 'Technology', 'value' => 'SPIN (Shearing Pad INside)'],
                ],
            ],
            [
                'name' => 'K2 Mindbender 99 Ti Skis',
                'category' => 'skis',
                'price_per_day' => 48,
                'rating' => 4.7,
                'reviews_count' => 73,
                'available' => true,
                'is_featured' => false,
                'description' => 'Versatile freeride skis with titanium reinforcement for stability in variable conditions.',
                'features' => ['Titanal Y-Beam', 'Dark Matter Damping', 'All-Terrain Rocker', 'Bio-Flex Core'],
                'sizes' => ['170cm', '177cm', '184cm', '191cm'],
                'specifications' => [
                    ['label' => 'Type', 'value' => 'Freeride'],
                    ['label' => 'Waist Width', 'value' => '99mm'],
                ],
            ],
            [
                'name' => 'Atomic Hawx Ultra 130 Boots',
                'category' => 'boots',
                'price_per_day' => 40,
                'rating' => 4.9,
                'reviews_count' => 54,
                'available' => false,
                'is_featured' => false,
                'description' => 'High-performance boots with Memory Fit technology for custom molding to your feet.',
                'features' => ['Memory Fit', '3D Gold Liner', 'Power Shift Buckle', 'Mimic Shell'],
                'sizes' => ['25.0', '26.0', '27.0', '28.0', '29.0'],
                'specifications' => [
                    ['label' => 'Flex', 'value' => '130'],
                    ['label' => 'Last Width', 'value' => '98mm'],
                ],
            ],
            [
                'name' => 'Oakley Flight Deck XM Goggles',
                'category' => 'goggles',
                'price_per_day' => 22,
                'rating' => 4.6,
                'reviews_count' => 134,
                'available' => true,
                'is_featured' => false,
                'description' => 'Rimless design goggles with Prizm lens technology for enhanced contrast and visibility.',
                'features' => ['Prizm Lens', 'Rimless Design', 'Triple-Layer Foam', 'F3 Anti-Fog'],
                'sizes' => ['One Size'],
                'specifications' => [
                    ['label' => 'Lens', 'value' => 'Prizm Snow Sapphire'],
                    ['label' => 'Fit', 'value' => 'Medium'],
                ],
            ],
            [
                'name' => 'Volkl Mantra M6 Skis',
                'category' => 'skis',
                'price_per_day' => 52,
                'rating' => 4.9,
                'reviews_count' => 89,
                'available' => true,
                'is_featured' => false,
                'description' => 'The legendary Mantra, now with 3D.Ridge construction for unmatched stability and edge grip.',
                'features' => ['3D.Ridge Construction', 'Titanal Frame', 'Multi-Layer Woodcore', 'Full Rocker'],
                'sizes' => ['170cm', '177cm', '184cm'],
                'specifications' => [
                    ['label' => 'Type', 'value' => 'All-Mountain'],
                    ['label' => 'Waist Width', 'value' => '96mm'],
                ],
            ],
            [
                'name' => 'Jones Flagship Snowboard',
                'category' => 'snowboards',
                'price_per_day' => 55,
                'rating' => 4.8,
                'reviews_count' => 76,
                'available' => true,
                'is_featured' => false,
                'description' => 'High-performance freeride board designed for big mountain lines and deep powder.',
                'features' => ['Directional Shape', 'Traction Tech 2.0', 'Ultra Core', 'Sintered Base'],
                'sizes' => ['158cm', '161cm', '164cm', '167cm'],
                'specifications' => [
                    ['label' => 'Type', 'value' => 'Freeride'],
                    ['label' => 'Shape', 'value' => 'Directional'],
                ],
            ],
            [
                'name' => 'Leki Carbon 14 3D Poles',
                'category' => 'poles',
                'price_per_day' => 28,
                'rating' => 4.4,
                'reviews_count' => 45,
                'available' => true,
                'is_featured' => false,
                'description' => 'Premium full-carbon race poles with Trigger S system for quick release.',
                'features' => ['Full Carbon Construction', 'Trigger S System', '3D Cork Grip', 'Racing Basket'],
                'sizes' => ['115cm', '120cm', '125cm', '130cm'],
                'specifications' => [
                    ['label' => 'Material', 'value' => 'Full Carbon'],
                    ['label' => 'Weight', 'value' => '175g per pole'],
                ],
            ],
        ];

        foreach ($items as $index => $item) {
            $specs = $item['specifications'] ?? [];
            unset($item['specifications']);

            $equipment = Equipment::create(array_merge($item, [
                'slug' => Str::slug($item['name']),
                'sort_order' => $index,
            ]));

            // Create a primary image placeholder
            EquipmentImage::create([
                'equipment_id' => $equipment->id,
                'image_path' => 'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600',
                'alt_text' => $item['name'],
                'is_primary' => true,
                'sort_order' => 0,
            ]);

            foreach ($specs as $specIndex => $spec) {
                EquipmentSpecification::create(array_merge($spec, [
                    'equipment_id' => $equipment->id,
                    'sort_order' => $specIndex,
                ]));
            }
        }
    }
}
