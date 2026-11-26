<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('type', 20);
            $table->string('genre');
            $table->decimal('rating', 3, 1)->default(0.0);
            $table->unsignedSmallInteger('release_year');
            $table->string('creator');
            $table->unsignedInteger('total_units')->default(1);
            $table->string('status', 30)->default('Ongoing');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
