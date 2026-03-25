<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index('sort_order');
        });

        Schema::table('equipment', function (Blueprint $table) {
            $table->foreignId('category_id')
                ->nullable()
                ->after('category')
                ->constrained('equipment_categories')
                ->nullOnDelete();
        });

        // Migrate existing data: create categories from distinct values and link them
        $categories = DB::table('equipment')->distinct()->pluck('category')->filter();
        foreach ($categories as $i => $slug) {
            DB::table('equipment_categories')->insert([
                'name' => ucfirst($slug),
                'slug' => $slug,
                'sort_order' => $i,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        DB::statement('
            UPDATE equipment
            SET category_id = (
                SELECT id FROM equipment_categories WHERE equipment_categories.slug = equipment.category
            )
        ');

        Schema::table('equipment', function (Blueprint $table) {
            $table->dropIndex(['category']);
            $table->dropColumn('category');
        });
    }

    public function down(): void
    {
        Schema::table('equipment', function (Blueprint $table) {
            $table->string('category')->nullable()->after('category_id');
        });

        DB::statement('
            UPDATE equipment
            SET category = (
                SELECT slug FROM equipment_categories WHERE equipment_categories.id = equipment.category_id
            )
        ');

        Schema::table('equipment', function (Blueprint $table) {
            $table->dropConstrainedForeignId('category_id');
            $table->index('category');
        });

        Schema::dropIfExists('equipment_categories');
    }
};
