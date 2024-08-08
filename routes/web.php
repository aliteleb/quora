<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureUserSelectTopic;
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
    Route::get('/select-topics', [TopicController::class, 'index'])->name('select_topics');
    Route::post('/select-topics', [TopicController::class, 'select_topics'])->name('update_topics');
    Route::get('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});

Route::middleware(['auth', EnsureUserSelectTopic::class])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/thread/create', [ThreadController::class, 'create'])->name('thread.create');
    Route::post('/space/create', [SpaceController::class, 'create'])->name('space.create');
    Route::post('/vote', [ThreadController::class, 'vote'])->name('vote');
    Route::post('/vote-comment', [CommentController::class, 'vote'])->name('vote');
    Route::post('/add-comment', [CommentController::class, 'addComment'])->name('addComment');
    Route::get('/get-comments', [CommentController::class, 'getComments'])->name('getComments');
    Route::delete('/delete-comment/{id}', [CommentController::class, 'deleteComment'])->name('deleteComment');
    Route::post('/follow-space/{id}', [SpaceController::class, 'followSpace'])->name('followSpace');
    Route::post('/unfollow-space/{id}', [SpaceController::class, 'unFollowSpace'])->name('unFollowSpace');
    Route::delete('/posts/{id}', [ThreadController::class, 'deletePost'])->name('deletePost');
    Route::post('/users/follow/{id}', [UserController::class, 'follow'])->name('user.follow');
});

// Public Routes
Route::middleware(RedirectWhenAuthenticated::class)->group(function () {
    Route::get('/account', [AuthController::class, 'index'])->name('account');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});
Route::middleware(EnsureUserSelectTopic::class)->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('index');
    Route::get('/spaces', [SpaceController::class, 'index'])->name('spaces.index');
    Route::get('/spaces/{slug}', [SpaceController::class, 'showSpace'])->name('showSpace');
    Route::get('/spaces/filter/{section}/{type}/{space_id}', [SpaceController::class, 'callFilterThreadsFn'])->name('callFilterThreadsFn');
    Route::get('/profile/{username}', [ProfileController::class, 'showUser'])->name('showUser');
});



//require __DIR__.'/auth.php';
