<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // ─── Equipment ───────────────────────────────────────────────
        Schema::table('equipment', function (Blueprint $table) {
            $table->renameColumn('name_en', 'name');
            $table->renameColumn('description_en', 'description');
            $table->renameColumn('features_en', 'features');
        });
        Schema::table('equipment', function (Blueprint $table) {
            $table->dropColumn(['name_ka', 'name_ru', 'description_ka', 'description_ru', 'features_ka', 'features_ru']);
        });

        // ─── Equipment Images ────────────────────────────────────────
        Schema::table('equipment_images', function (Blueprint $table) {
            $table->renameColumn('alt_text_en', 'alt_text');
        });
        Schema::table('equipment_images', function (Blueprint $table) {
            $table->dropColumn(['alt_text_ka', 'alt_text_ru']);
        });

        // ─── Equipment Specifications ────────────────────────────────
        Schema::table('equipment_specifications', function (Blueprint $table) {
            $table->renameColumn('label_en', 'label');
            $table->renameColumn('value_en', 'value');
        });
        Schema::table('equipment_specifications', function (Blueprint $table) {
            $table->dropColumn(['label_ka', 'label_ru', 'value_ka', 'value_ru']);
        });

        // ─── Instructors ─────────────────────────────────────────────
        Schema::table('instructors', function (Blueprint $table) {
            $table->renameColumn('name_en', 'name');
            $table->renameColumn('specialization_en', 'specialization');
            $table->renameColumn('bio_en', 'bio');
        });
        Schema::table('instructors', function (Blueprint $table) {
            $table->dropColumn(['name_ka', 'name_ru', 'specialization_ka', 'specialization_ru', 'bio_ka', 'bio_ru']);
        });

        // ─── Skill Levels ────────────────────────────────────────────
        Schema::table('skill_levels', function (Blueprint $table) {
            $table->renameColumn('name_en', 'name');
            $table->renameColumn('description_en', 'description');
            $table->renameColumn('features_en', 'features');
        });
        Schema::table('skill_levels', function (Blueprint $table) {
            $table->dropColumn(['name_ka', 'name_ru', 'description_ka', 'description_ru', 'features_ka', 'features_ru']);
        });

        // ─── Lessons ─────────────────────────────────────────────────
        Schema::table('lessons', function (Blueprint $table) {
            $table->renameColumn('title_en', 'title');
            $table->renameColumn('description_en', 'description');
        });
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn(['title_ka', 'title_ru', 'description_ka', 'description_ru']);
        });

        // ─── Lesson Packages ─────────────────────────────────────────
        Schema::table('lesson_packages', function (Blueprint $table) {
            $table->renameColumn('name_en', 'name');
            $table->renameColumn('description_en', 'description');
            $table->renameColumn('features_en', 'features');
        });
        Schema::table('lesson_packages', function (Blueprint $table) {
            $table->dropColumn(['name_ka', 'name_ru', 'description_ka', 'description_ru', 'features_ka', 'features_ru']);
        });

        // ─── Gallery Photos ─────────────────────────────────────────
        Schema::table('gallery_photos', function (Blueprint $table) {
            $table->renameColumn('title_en', 'title');
            $table->renameColumn('description_en', 'description');
        });
        Schema::table('gallery_photos', function (Blueprint $table) {
            $table->dropColumn(['title_ka', 'title_ru', 'description_ka', 'description_ru']);
        });

        // ─── Testimonials ────────────────────────────────────────────
        Schema::table('testimonials', function (Blueprint $table) {
            $table->renameColumn('text_en', 'text');
        });
        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn(['text_ka', 'text_ru']);
        });

        // ─── Team Members ────────────────────────────────────────────
        Schema::table('team_members', function (Blueprint $table) {
            $table->renameColumn('name_en', 'name');
            $table->renameColumn('role_en', 'role');
            $table->renameColumn('bio_en', 'bio');
        });
        Schema::table('team_members', function (Blueprint $table) {
            $table->dropColumn(['name_ka', 'name_ru', 'role_ka', 'role_ru', 'bio_ka', 'bio_ru']);
        });

        // ─── Timeline Events ─────────────────────────────────────────
        Schema::table('timeline_events', function (Blueprint $table) {
            $table->renameColumn('title_en', 'title');
            $table->renameColumn('description_en', 'description');
        });
        Schema::table('timeline_events', function (Blueprint $table) {
            $table->dropColumn(['title_ka', 'title_ru', 'description_ka', 'description_ru']);
        });

        // ─── Certifications ─────────────────────────────────────────
        Schema::table('certifications', function (Blueprint $table) {
            $table->renameColumn('name_en', 'name');
            $table->renameColumn('description_en', 'description');
            $table->renameColumn('issuer_en', 'issuer');
        });
        Schema::table('certifications', function (Blueprint $table) {
            $table->dropColumn(['name_ka', 'name_ru', 'description_ka', 'description_ru', 'issuer_ka', 'issuer_ru']);
        });

        // ─── Facilities ─────────────────────────────────────────────
        Schema::table('facilities', function (Blueprint $table) {
            $table->renameColumn('name_en', 'name');
            $table->renameColumn('description_en', 'description');
        });
        Schema::table('facilities', function (Blueprint $table) {
            $table->dropColumn(['name_ka', 'name_ru', 'description_ka', 'description_ru']);
        });

        // ─── Facility Images ─────────────────────────────────────────
        Schema::table('facility_images', function (Blueprint $table) {
            $table->renameColumn('alt_text_en', 'alt_text');
        });
        Schema::table('facility_images', function (Blueprint $table) {
            $table->dropColumn(['alt_text_ka', 'alt_text_ru']);
        });

        // ─── FAQs ────────────────────────────────────────────────────
        Schema::table('faqs', function (Blueprint $table) {
            $table->renameColumn('question_en', 'question');
            $table->renameColumn('answer_en', 'answer');
        });
        Schema::table('faqs', function (Blueprint $table) {
            $table->dropColumn(['question_ka', 'question_ru', 'answer_ka', 'answer_ru']);
        });
    }

    public function down(): void
    {
        // Not reversible — data in _ka/_ru columns is lost
    }
};
