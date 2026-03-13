<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_ref')->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->date('arrival_date');
            $table->unsignedSmallInteger('number_of_days');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('tax_amount', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->enum('currency', ['GEL', 'EUR', 'USD'])->default('GEL');
            $table->decimal('exchange_rate', 8, 4)->default(1.0000);
            $table->enum('status', ['pending', 'confirmed', 'paid', 'in_progress', 'completed', 'cancelled', 'refunded'])->default('pending');
            $table->enum('payment_method', ['card', 'paypal', 'bank_transfer', 'on_arrival'])->nullable();
            $table->text('customer_message')->nullable();
            $table->text('admin_notes')->nullable();
            $table->string('language', 5)->default('en');
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('booking_ref');
            $table->index('status');
            $table->index('start_date');
            $table->index('email');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
