<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name_en');
            $table->string('name_ka')->nullable();
            $table->string('name_ru')->nullable();
            $table->string('role_en');
            $table->string('role_ka')->nullable();
            $table->string('role_ru')->nullable();
            $table->string('image_path')->nullable();
            $table->text('bio_en');
            $table->text('bio_ka')->nullable();
            $table->text('bio_ru')->nullable();
            $table->json('certifications')->nullable();
            $table->unsignedSmallInteger('experience_years')->nullable();
            $table->boolean('active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
