<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_versions', function (Blueprint $table) {
            $table->id();
            $table->string('versionable_type');
            $table->unsignedBigInteger('versionable_id');
            $table->json('data');
            $table->string('reason')->nullable();
            $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['versionable_type', 'versionable_id', 'created_at'], 'content_versions_versionable_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_versions');
    }
};
