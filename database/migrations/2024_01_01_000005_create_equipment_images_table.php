<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_id')->constrained('equipment')->cascadeOnDelete();
            $table->string('image_path');
            $table->string('alt_text_en')->nullable();
            $table->string('alt_text_ka')->nullable();
            $table->string('alt_text_ru')->nullable();
            $table->boolean('is_primary')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['equipment_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_images');
    }
};
