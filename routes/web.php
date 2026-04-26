<?php

use App\Http\Controllers\PropertyController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [HomeController::class, 'show'])->name('home');
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

//& Property routes
  Route::prefix('property')->name('property.')->group(function() {
    Route::get('details/{propertyId}', [PropertyController::class, 'showPropertyDetails'])->name('details');
    Route::get('show', [PropertyController::class, 'show'])->name('show');
  });

require __DIR__.'/settings.php';
