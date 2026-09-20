<?php

namespace App\Http\Controllers;

use App\Support\SpecialistProfiles;
use Inertia\Inertia;
use Inertia\Response;

class SpecialistController extends Controller
{
    /**
     * Display a public specialist profile.
     */
    public function show(string $slug): Response
    {
        $specialist = SpecialistProfiles::find($slug);

        abort_if($specialist === null, 404);

        return Inertia::render('public/specialist-show', [
            'specialist' => $specialist,
        ]);
    }
}
