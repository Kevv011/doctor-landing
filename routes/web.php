<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\BlogPostMediaController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    Route::redirect('admin', '/admin/dashboard')->name('admin');
    Route::inertia('admin/dashboard', 'dashboard')->name('dashboard');
    Route::resource('admin/users', UserController::class)
        ->except(['show'])
        ->names('admin.users');
    Route::resource('admin/blogs', BlogPostController::class)
        ->parameters(['blogs' => 'blog'])
        ->except(['show'])
        ->names('admin.blogs');
    Route::post('admin/blogs/{blog}/media', [BlogPostMediaController::class, 'store'])
        ->name('admin.blogs.media.store');
});

require __DIR__.'/settings.php';
