<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeContorller;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RedirectWhenAuthenticated;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

// Public Routes
Route::get('/', [HomeContorller::class, 'index'])->name('index');
Route::middleware(RedirectWhenAuthenticated::class)->group(function () {
    Route::get('/account', [AuthController::class, 'index'])->name('account');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
});




//require __DIR__.'/auth.php';
