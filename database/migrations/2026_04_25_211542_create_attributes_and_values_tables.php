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
      Schema::create('attributes', function (Blueprint $table) {
          $table->id();
          $table->string('name');
          $table->string('type')->default('string');
          $table->timestamps();
      });

      // 2. The Pivot Table 
      Schema::create('attribute_property', function (Blueprint $table) {
          $table->id();
          $table->foreignId('property_id')->constrained()->onDelete('cascade');
          $table->foreignId('attribute_id')->constrained()->onDelete('cascade');
          
          $table->string('value'); 
          
          $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
