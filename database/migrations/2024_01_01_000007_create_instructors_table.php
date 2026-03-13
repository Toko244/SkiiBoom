<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instructors', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name_en');
            $table->string('name_ka')->nullable();
            $table->string('name_ru')->nullable();
            $table->string('image_path')->nullable();
            $table->string('specialization_en');
            $table->string('specialization_ka')->nullable();
            $table->string('specialization_ru')->nullable();
            $table->unsignedSmallInteger('experience_years');
            $table->json('languages');
            $table->decimal('rating', 2, 1)->default(0);
            $table->unsignedInteger('total_lessons')->default(0);
            $table->json('certifications')->nullable();
            $table->text('bio_en')->nullable();
            $table->text('bio_ka')->nullable();
            $table->text('bio_ru')->nullable();
            $table->boolean('active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index('active');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instructors');
    }
};
