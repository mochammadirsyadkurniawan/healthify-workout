<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('personal_trainers', function (Blueprint $table) {
            $table->unsignedInteger('max_clients')->default(10); // Default kuota 10
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('personal_trainers', function (Blueprint $table) {
            $table->dropColumn('max_clients');
        });
    }
};


 // public function up(): void
    // {
    //     Schema::table('personal_trainers', function (Blueprint $table) {
    //         //
    //     });
    // }


        // public function down(): void
    // {
    //     Schema::table('personal_trainers', function (Blueprint $table) {
    //         //
    //     });
    // }
