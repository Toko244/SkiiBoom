<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('name_ka')->nullable();
            $table->string('name_ru')->nullable();
            $table->text('description_en');
            $table->text('description_ka')->nullable();
            $table->text('description_ru')->nullable();
            $table->string('issuer_en');
            $table->string('issuer_ka')->nullable();
            $table->string('issuer_ru')->nullable();
            $table->string('icon')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certifications');
    }
};
