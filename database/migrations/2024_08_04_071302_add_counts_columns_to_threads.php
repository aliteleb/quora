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
        Schema::table('threads', function (Blueprint $table) {
            $table->unsignedBigInteger('all_vote_up_count')->default(0)->after('title');
            $table->unsignedBigInteger('all_vote_down_count')->default(0)->after('title');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('threads', function (Blueprint $table) {
            //
        });
    }
};
