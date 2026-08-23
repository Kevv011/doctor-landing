<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentSubmissionRequest;
use App\Models\AppointmentSubmission;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class AppointmentSubmissionController extends Controller
{
    /**
     * Store a public appointment submission.
     */
    public function store(StoreAppointmentSubmissionRequest $request): RedirectResponse
    {
        AppointmentSubmission::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Solicitud de cita enviada.')]);

        return back();
    }
}
