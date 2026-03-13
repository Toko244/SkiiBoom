<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_photos', function (Blueprint $table) {
            $table->id();
            $table->string('image_path');
            $table->string('title_en');
            $table->string('title_ka')->nullable();
            $table->string('title_ru')->nullable();
            $table->string('author_name');
            $table->string('author_avatar')->nullable();
            $table->date('date');
            $table->unsignedInteger('likes_count')->default(0);
            $table->enum('category', ['skiing', 'equipment', 'lessons', 'slopes']);
            $table->enum('season', ['winter', 'spring', 'summer', 'autumn'])->default('winter');
            $table->text('description_en')->nullable();
            $table->text('description_ka')->nullable();
            $table->text('description_ru')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index('category');
            $table->index('season');
            $table->index('status');
            $table->index('likes_count');
            $table->index('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_photos');
    }
};
