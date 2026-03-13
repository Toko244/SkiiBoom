<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_packages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name_en');
            $table->string('name_ka')->nullable();
            $table->string('name_ru')->nullable();
            $table->text('description_en');
            $table->text('description_ka')->nullable();
            $table->text('description_ru')->nullable();
            $table->foreignId('instructor_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('skill_level_id')->nullable()->constrained()->nullOnDelete();
            $table->unsignedSmallInteger('sessions');
            $table->string('total_hours');
            $table->decimal('price', 8, 2);
            $table->decimal('savings', 8, 2)->nullable();
            $table->json('features_en')->nullable();
            $table->json('features_ka')->nullable();
            $table->json('features_ru')->nullable();
            $table->boolean('is_popular')->default(false);
            $table->boolean('available')->default(true);
            $table->string('image_path')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index('available');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_packages');
    }
};
