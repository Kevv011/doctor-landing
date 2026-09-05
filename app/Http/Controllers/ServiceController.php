<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display public services.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        return Inertia::render('public/services', [
            'services' => Service::query()
                ->active()
                ->when($search !== '', fn ($query) => $query->where('title', 'like', "%{$search}%"))
                ->orderBy('sort_order')
                ->orderBy('title')
                ->paginate(12)
                ->withQueryString()
                ->through(fn (Service $service) => $this->publicService($service)),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    /**
     * Display a public service detail.
     */
    public function show(string $slug): Response
    {
        $service = Service::query()
            ->active()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('public/service-show', [
            'service' => $this->publicService($service),
            'relatedServices' => Service::query()
                ->active()
                ->whereKeyNot($service->id)
                ->orderBy('sort_order')
                ->orderBy('title')
                ->limit(5)
                ->get()
                ->map(fn (Service $relatedService) => $this->publicService($relatedService))
                ->values(),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function publicService(Service $service): array
    {
        return [
            'id' => $service->id,
            'title' => $service->title,
            'slug' => $service->slug,
            'excerpt' => $service->excerpt,
            'description' => $service->description,
            'tags' => $service->tags ?? [],
            'seo_title' => $service->seo_title,
            'seo_description' => $service->seo_description,
            'image_url' => $service->imageUrl(),
            'url' => route('services.show', $service->slug, false),
        ];
    }
}
