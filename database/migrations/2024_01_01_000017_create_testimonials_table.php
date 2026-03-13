<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('country')->nullable();
            $table->string('image_path')->nullable();
            $table->decimal('rating', 2, 1);
            $table->text('text_en');
            $table->text('text_ka')->nullable();
            $table->text('text_ru')->nullable();
            $table->date('date');
            $table->string('lesson_type')->nullable();
            $table->string('platform')->nullable();
            $table->enum('page', ['homepage', 'lessons', 'gallery', 'about']);
            $table->boolean('active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['page', 'active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
