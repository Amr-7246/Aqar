<?php

use App\Http\Controllers\PropertyController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', [HomeController::class, 'show'])->name('home');
// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()), //!what is Featuer 
//     ]);
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

//~ Public routes
  //& Property routes
    Route::get('/', [PropertyController::class, 'index'])->name('home');
    Route::prefix('property')->name('property.')->group(function() {
      Route::get('filter-options', [PropertyController::class, 'filterOptions'])->name('filter.options');
    });

//~ Authenticated routes
  // Route::middleware(['auth'])->group(function (){
    //& Property routes
    Route::get('/my-properties', [PropertyController::class, 'myProperties'])->name('properties.my');
    Route::get('/properties/create', [PropertyController::class, 'create'])->name('properties.create');
    Route::get('/properties/{id}', [PropertyController::class, 'show'])->name('properties.show');
    Route::post('/properties', [PropertyController::class, 'store'])->name('properties.store');
    Route::get('/properties/{id}/edit', [PropertyController::class, 'edit'])->name('properties.edit');
    Route::put('/properties/{id}', [PropertyController::class, 'update'])->name('properties.update');
    Route::delete('/properties/{id}', [PropertyController::class, 'destroy'])->name('properties.destroy');
    //& comments & likes routes 
    Route::post('/properties/{propertyId}/comments', [\App\Http\Controllers\CommentController::class, 'store'])->name('comment.store');
    Route::post('/properties/{propertyId}/likes', [\App\Http\Controllers\CommentController::class, 'store'])->name('properties.like');
  // });

require __DIR__.'/settings.php';
