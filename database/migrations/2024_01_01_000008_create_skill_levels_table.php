<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skill_levels', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name_en');
            $table->string('name_ka')->nullable();
            $table->string('name_ru')->nullable();
            $table->text('description_en');
            $table->text('description_ka')->nullable();
            $table->text('description_ru')->nullable();
            $table->string('icon')->nullable();
            $table->string('duration');
            $table->decimal('price', 8, 2);
            $table->json('features_en');
            $table->json('features_ka')->nullable();
            $table->json('features_ru')->nullable();
            $table->string('color')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('skill_levels');
    }
};
