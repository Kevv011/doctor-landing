<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppointmentSubmission;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentSubmissionController extends Controller
{
    /**
     * Display appointment submissions.
     */
    public function index(): Response
    {
        return Inertia::render('admin/appointment-submissions/index', [
            'submissions' => AppointmentSubmission::query()
                ->latest()
                ->paginate(15)
                ->through(fn (AppointmentSubmission $submission) => [
                    'id' => $submission->id,
                    'name' => $submission->name,
                    'phone' => $submission->phone,
                    'email' => $submission->email,
                    'appointment_date' => $submission->appointment_date?->format('d/m/Y'),
                    'message' => $submission->message,
                    'was_reviewed' => $submission->was_reviewed,
                    'reviewed_at' => $submission->reviewed_at?->format('d/m/Y H:i'),
                    'created_at' => $submission->created_at?->format('d/m/Y H:i'),
                ]),
        ]);
    }

    /**
     * Toggle whether the appointment submission was reviewed.
     */
    public function toggleReview(AppointmentSubmission $appointment): RedirectResponse
    {
        $appointment->update([
            'was_reviewed' => ! $appointment->was_reviewed,
            'reviewed_at' => $appointment->was_reviewed ? null : now(),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Solicitud actualizada.')]);

        return back();
    }
}
