<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::table('apply_memberships', function (Blueprint $table) {
    //         //
    //     });
    // }

    // public function up()
    // {
    //     Schema::table('apply_memberships', function (Blueprint $table) {
    //         $table->unsignedBigInteger('personal_trainer_id')->nullable()->after('membership');
    //         $table->foreign('personal_trainer_id')->references('id')->on('personal_trainers')->onDelete('set null');
    //     });
    // }

    // /**
    //  * Reverse the migrations.
    //  */
    // public function down(): void
    // {
    //     Schema::table('apply_memberships', function (Blueprint $table) {
    //         //
    //     });
    // }



    public function up()
    {
        Schema::table('apply_memberships', function (Blueprint $table) {
            $table->foreignId('personal_trainer_id')
                ->nullable()
                ->after('membership')
                ->constrained('personal_trainers')
                ->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('apply_memberships', function (Blueprint $table) {
            $table->dropForeign(['personal_trainer_id']);
            $table->dropColumn('personal_trainer_id');
        });
    }
};
