<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SpaceController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
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

Route::middleware(['auth','select.topic', 'auth.redirect'])->group(function () {
    Route::post('/threads/create', [ThreadController::class, 'create'])->name('thread.create');
    Route::post('/threads/{id}/hide', [ThreadController::class, 'hideThread'])->name('thread.hide');
    Route::delete('/threads/{id}', [ThreadController::class, 'deleteThread'])->name('thread.delete');
    Route::post('/threads/{id}/save', [ThreadController::class, 'saveThread'])->name('thread.save');
    Route::get('/threads/saved', [SearchController::class, 'savedThreads'])->name('thread.savedThreads');
    Route::post('/threads/{id}/{share_type}', [ThreadController::class, 'shareThread'])->name('thread.share');
    Route::post('/space/create', [SpaceController::class, 'create'])->name('space.create');
    Route::post('/space/{id}/edit', [SpaceController::class, 'edit'])->name('space.edit');
    Route::post('/space/{id}/about', [SpaceController::class, 'about'])->name('space.about');
    Route::post('/vote', [ThreadController::class, 'vote'])->name('vote.add');
    Route::post('/vote-comment', [CommentController::class, 'vote'])->name('vote.comment');
    Route::post('/add-comment', [CommentController::class, 'addComment'])->name('comment.add');
    Route::delete('/delete-comment/{id}', [CommentController::class, 'deleteComment'])->name('comment.delete');
    Route::post('/follow-space/{id}', [SpaceController::class, 'followSpace'])->name('followSpace');
    Route::post('/unfollow-space/{id}', [SpaceController::class, 'unFollowSpace'])->name('unFollowSpace');
    Route::post('/users/follow/{type}/{id}', [UserController::class, 'follow'])->name('user.follow');
    Route::post('/users/block/{type}/{id}', [UserController::class, 'block'])->name('user.block');
    Route::post('/profile/edit', [UserController::class, 'edit'])->name('profile.edit');
    Route::get('/notifications', [NotificationController::class, 'getNotifications'])->name('notification.index');
    Route::get('/notifications/questions', [NotificationController::class, 'getNotificationsQuestions'])->name('notification.questions');
    Route::get('/notifications/posts', [NotificationController::class, 'getNotificationsPosts'])->name('notification.posts');
    Route::get('/notifications/reactions', [NotificationController::class, 'getNotificationsReactions'])->name('notification.reactions');
    Route::get('/notifications/comments', [NotificationController::class, 'getNotificationsComments'])->name('notification.comments');
    Route::post('/notifications/mark-as-read/{id}', [NotificationController::class, 'markAsRead'])->name('notification.mark');
    Route::post('/notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notification.markAll');
});


// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('index')->middleware('select.topic');
Route::get('/spaces', [SpaceController::class, 'index'])->name('spaces.index');
Route::get('/spaces/{slug}', [SpaceController::class, 'showSpace'])->name('space.show');
Route::get('/spaces/filter/{section}/{type}/{space_id}', [SpaceController::class, 'callFilterThreadsFn'])->name('space.thread.filter');
Route::get('/profile/{username}', [ProfileController::class, 'showUser'])->name('user.show');
Route::get('/quick-search', [SearchController::class, 'quickSearch'])->name('search.quickSearch');
Route::get('/search', [SearchController::class, 'search'])->name('search.index');
Route::get('/search/spaces/{keyword}', [SearchController::class, 'searchInSpaces'])->name('search.searchInSpaces');
Route::get('/users/{id}/{section}/{type}', [UserController::class, 'callFilterThreadsFn'])->name('profile.thread.filter');
Route::get('/profile/answers/{id}/{type}', [UserController::class, 'getAnswers'])->name('getAnswers');
Route::get('/get-comments', [CommentController::class, 'getComments'])->name('getComments');
Route::get('/threads/questions', [ThreadController::class, 'getQuestions'])->name('thread.questions');
Route::get('/threads/show/{slug}', [ThreadController::class, 'showThread'])->name('thread.show');

Route::middleware(RedirectWhenAuthenticated::class)->group(function () {
    Route::get('/account', [AuthController::class, 'index'])->name('account');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

//require __DIR__.'/auth.php';
