<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Http\Requests\Admin\UpdateTestimonialRequest;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials.
     */
    public function index(): Response
    {
        return Inertia::render('admin/testimonials/index', [
            'testimonials' => Testimonial::query()
                ->orderBy('sort_order')
                ->latest()
                ->paginate(15)
                ->through(fn (Testimonial $testimonial) => [
                    'id' => $testimonial->id,
                    'name' => $testimonial->name,
                    'label' => $testimonial->label,
                    'rating' => $testimonial->rating,
                    'is_active' => $testimonial->is_active,
                    'sort_order' => $testimonial->sort_order,
                    'created_at' => $testimonial->created_at?->format('d/m/Y'),
                    'avatar_url' => $testimonial->getFirstMediaUrl(
                        Testimonial::MEDIA_COLLECTION_AVATAR,
                        'preview',
                    ) ?: $testimonial->getFirstMediaUrl(Testimonial::MEDIA_COLLECTION_AVATAR),
                ]),
        ]);
    }

    /**
     * Show the form for creating a testimonial.
     */
    public function create(): Response
    {
        return Inertia::render('admin/testimonials/create');
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(StoreTestimonialRequest $request): RedirectResponse
    {
        $testimonial = Testimonial::create($this->payload($request->validated()));

        if ($request->hasFile('avatar')) {
            $testimonial
                ->addMediaFromRequest('avatar')
                ->toMediaCollection(Testimonial::MEDIA_COLLECTION_AVATAR);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Testimonio creado.')]);

        return to_route('admin.testimonials.index');
    }

    /**
     * Show the form for editing a testimonial.
     */
    public function edit(Testimonial $testimonial): Response
    {
        return Inertia::render('admin/testimonials/edit', [
            'testimonial' => [
                'id' => $testimonial->id,
                'name' => $testimonial->name,
                'label' => $testimonial->label,
                'quote' => $testimonial->quote,
                'rating' => $testimonial->rating,
                'is_active' => $testimonial->is_active,
                'sort_order' => $testimonial->sort_order,
                'avatar_url' => $testimonial->getFirstMediaUrl(
                    Testimonial::MEDIA_COLLECTION_AVATAR,
                    'preview',
                ) ?: $testimonial->getFirstMediaUrl(Testimonial::MEDIA_COLLECTION_AVATAR),
            ],
        ]);
    }

    /**
     * Update the specified testimonial.
     */
    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $testimonial->update($this->payload($request->validated()));

        if ($request->boolean('remove_avatar')) {
            $testimonial->clearMediaCollection(Testimonial::MEDIA_COLLECTION_AVATAR);
        }

        if ($request->hasFile('avatar')) {
            $testimonial
                ->addMediaFromRequest('avatar')
                ->toMediaCollection(Testimonial::MEDIA_COLLECTION_AVATAR);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Testimonio actualizado.')]);

        return to_route('admin.testimonials.index');
    }

    /**
     * Remove the specified testimonial.
     */
    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Testimonio eliminado.')]);

        return to_route('admin.testimonials.index');
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function payload(array $validated): array
    {
        return [
            'name' => $validated['name'],
            'label' => $validated['label'] ?: 'Paciente',
            'quote' => $validated['quote'],
            'rating' => $validated['rating'],
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'sort_order' => $validated['sort_order'] ?? 0,
        ];
    }
}
