<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_specifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_id')->constrained('equipment')->cascadeOnDelete();
            $table->string('label_en');
            $table->string('label_ka')->nullable();
            $table->string('label_ru')->nullable();
            $table->string('value_en');
            $table->string('value_ka')->nullable();
            $table->string('value_ru')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['equipment_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_specifications');
    }
};
