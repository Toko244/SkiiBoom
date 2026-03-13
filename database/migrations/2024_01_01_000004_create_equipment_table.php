<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name_en');
            $table->string('name_ka')->nullable();
            $table->string('name_ru')->nullable();
            $table->text('description_en');
            $table->text('description_ka')->nullable();
            $table->text('description_ru')->nullable();
            $table->enum('category', ['skis', 'snowboards', 'boots', 'goggles', 'poles', 'helmets']);
            $table->decimal('price_per_day', 8, 2);
            $table->decimal('rating', 2, 1)->default(0);
            $table->unsignedInteger('reviews_count')->default(0);
            $table->boolean('available')->default(true);
            $table->json('sizes')->nullable();
            $table->json('features_en')->nullable();
            $table->json('features_ka')->nullable();
            $table->json('features_ru')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index('category');
            $table->index('available');
            $table->index('price_per_day');
            $table->index('rating');
            $table->index('is_featured');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
