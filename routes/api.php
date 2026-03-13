<?php

use App\Http\Controllers\Api\V1\AboutController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\ContentController;
use App\Http\Controllers\Api\V1\EquipmentController;
use App\Http\Controllers\Api\V1\FAQController;
use App\Http\Controllers\Api\V1\AdminGalleryController;
use App\Http\Controllers\Api\V1\GalleryController;
use App\Http\Controllers\Api\V1\InstructorController;
use App\Http\Controllers\Api\V1\LessonController;
use App\Http\Controllers\Api\V1\LessonPackageController;
use App\Http\Controllers\Api\V1\SkillLevelController;
use App\Http\Controllers\Api\V1\TestimonialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — SkiBoom Gudauri
|--------------------------------------------------------------------------
| All routes use /api/v1/ prefix with set-locale middleware.
*/

Route::prefix('v1')->middleware(['set-locale'])->group(function () {

    // ─── Public Content & Settings ───────────────────────────────────
    Route::get('content/{page}', [ContentController::class, 'page']);
    Route::get('content/{page}/{section}', [ContentController::class, 'section']);
    Route::get('settings/{group?}', [ContentController::class, 'settings']);

    // ─── Equipment ───────────────────────────────────────────────────
    Route::get('equipment', [EquipmentController::class, 'index']);
    Route::get('equipment/featured', [EquipmentController::class, 'featured']);
    Route::get('equipment/categories', [EquipmentController::class, 'categories']);
    Route::get('equipment/{slug}', [EquipmentController::class, 'show']);

    // ─── Instructors ─────────────────────────────────────────────────
    Route::get('instructors', [InstructorController::class, 'index']);
    Route::get('instructors/{slug}', [InstructorController::class, 'show']);

    // ─── Skill Levels ────────────────────────────────────────────────
    Route::get('skill-levels', [SkillLevelController::class, 'index']);

    // ─── Lessons ─────────────────────────────────────────────────────
    Route::get('lessons', [LessonController::class, 'index']);
    Route::get('lessons/{slug}', [LessonController::class, 'show']);

    // ─── Lesson Packages ─────────────────────────────────────────────
    Route::get('lesson-packages', [LessonPackageController::class, 'index']);
    Route::get('lesson-packages/available', [LessonPackageController::class, 'available']);
    Route::get('lesson-packages/{slug}', [LessonPackageController::class, 'show']);

    // ─── Bookings (Guest) ────────────────────────────────────────────
    Route::post('bookings', [BookingController::class, 'store'])
        ->middleware('throttle:booking');
    Route::get('bookings/{bookingRef}', [BookingController::class, 'show']);

    // ─── Gallery (Public) ────────────────────────────────────────────
    Route::get('gallery', [GalleryController::class, 'index']);
    Route::get('gallery/{photo}', [GalleryController::class, 'show']);
    Route::post('gallery', [GalleryController::class, 'store']);

    // ─── Testimonials ────────────────────────────────────────────────
    Route::get('testimonials', [TestimonialController::class, 'index']);

    // ─── FAQs ────────────────────────────────────────────────────────
    Route::get('faqs', [FAQController::class, 'index']);

    // ─── About Us ────────────────────────────────────────────────────
    Route::prefix('about')->group(function () {
        Route::get('team', [AboutController::class, 'team']);
        Route::get('certifications', [AboutController::class, 'certifications']);
        Route::get('partners', [AboutController::class, 'partners']);
        Route::get('facilities', [AboutController::class, 'facilities']);
        Route::get('timeline', [AboutController::class, 'timeline']);
    });

    // ─── Authentication ──────────────────────────────────────────────
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login'])
            ->middleware('throttle:auth');
        Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('reset-password', [AuthController::class, 'resetPassword']);

        // Authenticated routes
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('user', [AuthController::class, 'user']);
            Route::patch('user', [AuthController::class, 'updateProfile']);
        });
    });

    // ─── Authenticated Routes ────────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('bookings/my', [BookingController::class, 'myBookings']);
        Route::patch('bookings/{booking}/cancel', [BookingController::class, 'cancel']);

        Route::post('gallery/{photo}/like', [GalleryController::class, 'like']);
        Route::delete('gallery/{photo}/like', [GalleryController::class, 'unlike']);
    });

    // ─── Admin: Gallery Management ──────────────────────────────────
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        Route::get('gallery', [AdminGalleryController::class, 'index']);
        Route::get('gallery/{photo}', [AdminGalleryController::class, 'show']);
        Route::patch('gallery/{photo}', [AdminGalleryController::class, 'update']);
        Route::delete('gallery/{photo}', [AdminGalleryController::class, 'destroy']);
    });
});
