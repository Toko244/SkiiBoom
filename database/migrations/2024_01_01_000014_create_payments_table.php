<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->cascadeOnDelete();
            $table->string('stripe_payment_intent_id', 200)->nullable();
            $table->string('stripe_charge_id', 200)->nullable();
            $table->decimal('amount', 10, 2);
            $table->enum('currency', ['GEL', 'EUR', 'USD'])->default('GEL');
            $table->enum('method', ['card', 'cash', 'bank_transfer', 'on_arrival']);
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'refunded'])->default('pending');
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
