<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender_id');
            $table->unsignedBigInteger('receiver_id');
            $table->text('message');
            $table->timestamp('time')->default(now());
            $table->boolean('is_read')->default(false);

            $table->timestamps();

            // Optional: set foreign key kalau mau lebih aman
            $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    // public function up(): void
    // {
    //     Schema::create('notifications', function (Blueprint $table) {
    //         $table->id();
    //         $table->timestamps();
    //     });
    // }

    /**
     * Reverse the migrations.
     */

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
    // public function down(): void
    // {
    //     Schema::dropIfExists('notifications');
    // }
};
