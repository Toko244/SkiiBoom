<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title_en');
            $table->string('title_ka')->nullable();
            $table->string('title_ru')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_ka')->nullable();
            $table->text('description_ru')->nullable();
            $table->foreignId('instructor_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('skill_level', ['beginner', 'intermediate', 'advanced', 'expert']);
            $table->string('duration');
            $table->unsignedInteger('max_participants')->default(1);
            $table->decimal('price', 8, 2);
            $table->string('image_path')->nullable();
            $table->boolean('available')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index('skill_level');
            $table->index('instructor_id');
            $table->index('available');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
