<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppointmentSubmission;
use App\Models\BlogPost;
use App\Models\BusinessProfile;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display a concise admin overview.
     */
    public function __invoke(): Response
    {
        $businessProfile = BusinessProfile::query()->first();

        return Inertia::render('dashboard', [
            'business' => $businessProfile ? [
                'name' => $businessProfile->name,
                'email' => $businessProfile->email,
                'phone' => $businessProfile->phone,
                'appointment_phone' => $businessProfile->appointment_phone,
                'address' => $businessProfile->address,
                'latitude' => $businessProfile->latitude,
                'longitude' => $businessProfile->longitude,
            ] : null,
            'stats' => [
                'published_blogs' => BlogPost::query()->published()->count(),
                'draft_blogs' => BlogPost::query()
                    ->where('status', BlogPost::STATUS_DRAFT)
                    ->count(),
                'pending_appointments' => AppointmentSubmission::query()
                    ->where('was_reviewed', false)
                    ->count(),
                'active_testimonials' => Testimonial::query()->active()->count(),
            ],
            'latestBlogs' => BlogPost::query()
                ->with('category:id,name')
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (BlogPost $post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'status' => $post->status,
                    'is_featured' => $post->is_featured,
                    'category' => $post->category?->name,
                    'published_at' => $post->published_at?->translatedFormat('j F Y'),
                    'created_at' => $post->created_at?->translatedFormat('j F Y'),
                ]),
            'latestAppointments' => AppointmentSubmission::query()
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (AppointmentSubmission $appointment) => [
                    'id' => $appointment->id,
                    'name' => $appointment->name,
                    'phone' => $appointment->phone,
                    'email' => $appointment->email,
                    'appointment_date' => $appointment->appointment_date?->translatedFormat('j F Y'),
                    'message' => $appointment->message,
                    'was_reviewed' => $appointment->was_reviewed,
                    'created_at' => $appointment->created_at?->translatedFormat('j F Y, g:i a'),
                ]),
        ]);
    }
}
