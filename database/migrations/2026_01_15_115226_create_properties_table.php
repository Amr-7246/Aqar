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
          $table->id(); //! for fast indexing and infinity scrolling cursor_index  
          $table->uuid()->unique(); //! for public to prevent the others from knowing the prop numbers 
          //& the relations
          $table->foreignId('owner_id')->nullable()->constrained('users')->onDelete('cascade');
          $table->foreignUuid('broker_id')->nullable()->constrained('brokers', 'uuid')->onDelete('cascade');
          $table->foreignId('location_id')->constrained()->onDelete('cascade');
          $table->foreignId('property_category_id')->constrained()->onDelete('cascade');

          //& globals
          $table->mediumText('title')->nullable();
          $table->text('description');
          $table->integer('area_m2')->nullable();
          $table->decimal('price', 20, 2); 
          $table->boolean('is_flexable_price')->default(true); 
          
          //& enums columns
          $table->enum('purpose', ['rent', 'sale'])->default('sale');
          $table->enum('status', ['pending', 'approved', 'rejected', 'in_negotiation', 'sold', 'rented'])->default('pending');
          $table->enum('currency', ['EG', 'dolar'])->default('EG'); 

          $table->boolean('is_active')->default(true);
          
          $table->index(['purpose', 'status', 'location_id', 'property_category_id']); 

          $table->timestamp('approved_at')->nullable();
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
