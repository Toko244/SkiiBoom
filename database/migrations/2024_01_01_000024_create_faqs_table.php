<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->text('question_en');
            $table->text('question_ka')->nullable();
            $table->text('question_ru')->nullable();
            $table->text('answer_en');
            $table->text('answer_ka')->nullable();
            $table->text('answer_ru')->nullable();
            $table->string('page')->default('lessons');
            $table->boolean('active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['page', 'active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};
