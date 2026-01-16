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
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid()->id();
            $table->forignId('users')->onDelete('cascade');
            $table->forignId('property_categories')->onDelete('cascade');
            $table->forignId('property_locations')->onDelete('cascade');
            $table->mediumText('title');
            $table->text('description');
            $table->integer('area_m2');
            $table->string('type'); // Is there is a manner to say the type must include ['rent' , 'sell]
            $table->dicemal('price', 100, 2); // What does 100, 2 represent
            $table->json('images');
            $table->json('videos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
