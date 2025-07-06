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
        // Schema::table('personal_trainers', function (Blueprint $table) {
        //     $table->string('membership_type')->nullable();
        // });

        Schema::table('personal_trainers', function (Blueprint $table) {
            $table->string('membership_type')->nullable()->after('specialty');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('personal_trainers', function (Blueprint $table) {
            $table->dropColumn('membership_type');
        });
        // Schema::table('personal_trainers', function (Blueprint $table) {
        //     //
        // });
        // Schema::table('personal_trainers', function (Blueprint $table) {
        //     $table->dropColumn('membership_type');
        // });
    }
};
