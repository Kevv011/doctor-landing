<?php

use App\Http\Controllers\AppointmentSubmissionController;
use App\Http\Controllers\Admin\AppointmentSubmissionController as AdminAppointmentSubmissionController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\BlogPostMediaController;
use App\Http\Controllers\Admin\BusinessSettingsController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Models\BlogPost;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('public/home', [
    'featuredBlogs' => BlogPost::query()
        ->published()
        ->featured()
        ->latest('published_at')
        ->limit(9)
        ->get()
        ->map(fn (BlogPost $post) => [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'published_at' => $post->published_at?->translatedFormat('j F Y'),
            'featured_image_url' => $post->getFirstMediaUrl(
                BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE,
                'preview',
            ) ?: $post->getFirstMediaUrl(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE),
        ])
        ->values(),
    'testimonials' => Testimonial::query()
        ->active()
        ->orderBy('sort_order')
        ->latest()
        ->limit(9)
        ->get()
        ->map(fn (Testimonial $testimonial) => [
            'id' => $testimonial->id,
            'name' => $testimonial->name,
            'label' => $testimonial->label,
            'quote' => $testimonial->quote,
            'rating' => min(5, max(1, $testimonial->rating)),
            'avatar_url' => $testimonial->getFirstMediaUrl(
                Testimonial::MEDIA_COLLECTION_AVATAR,
                'preview',
            ) ?: $testimonial->getFirstMediaUrl(Testimonial::MEDIA_COLLECTION_AVATAR),
        ])
        ->values(),
]))->name('home');

Route::inertia('contact', 'public/contact')->name('contact');
Route::post('appointments', [AppointmentSubmissionController::class, 'store'])
    ->name('appointments.store');

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
    Route::resource('admin/testimonials', TestimonialController::class)
        ->except(['show'])
        ->names('admin.testimonials');
    Route::get('admin/business-settings', [BusinessSettingsController::class, 'edit'])
        ->name('admin.business-settings.edit');
    Route::put('admin/business-settings', [BusinessSettingsController::class, 'update'])
        ->name('admin.business-settings.update');
    Route::get('admin/appointments', [AdminAppointmentSubmissionController::class, 'index'])
        ->name('admin.appointments.index');
    Route::patch('admin/appointments/{appointment}/review', [AdminAppointmentSubmissionController::class, 'toggleReview'])
        ->name('admin.appointments.toggle-review');
});

require __DIR__.'/settings.php';
