<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreServiceRequest;
use App\Http\Requests\Admin\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of services.
     */
    public function index(): Response
    {
        return Inertia::render('admin/services/index', [
            'services' => Service::query()
                ->orderBy('sort_order')
                ->orderBy('title')
                ->paginate(15)
                ->through(fn (Service $service) => [
                    'id' => $service->id,
                    'title' => $service->title,
                    'excerpt' => $service->excerpt,
                    'is_active' => $service->is_active,
                    'sort_order' => $service->sort_order,
                    'created_at' => $service->created_at?->format('d/m/Y'),
                    'image_url' => $service->imageUrl(),
                ]),
        ]);
    }

    /**
     * Show the form for creating a service.
     */
    public function create(): Response
    {
        return Inertia::render('admin/services/create');
    }

    /**
     * Store a newly created service.
     */
    public function store(StoreServiceRequest $request): RedirectResponse
    {
        $service = Service::create($this->payload($request->validated()));

        if ($request->hasFile('image')) {
            $service
                ->addMediaFromRequest('image')
                ->toMediaCollection(Service::MEDIA_COLLECTION_IMAGE);
        }

        $this->storeGalleryImages($request, $service);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Servicio creado.')]);

        return to_route('admin.services.index');
    }

    /**
     * Show the form for editing a service.
     */
    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/edit', [
            'service' => [
                'id' => $service->id,
                'title' => $service->title,
                'excerpt' => $service->excerpt,
                'body' => $service->body ?? $this->legacyBody($service->description),
                'tags' => implode(', ', $service->tags ?? []),
                'is_active' => $service->is_active,
                'sort_order' => $service->sort_order,
                'has_image' => $service->hasMedia(Service::MEDIA_COLLECTION_IMAGE),
                'image_url' => $service->imageUrl(),
                'gallery_images' => $this->galleryImages($service),
                'media_upload_url' => route('admin.services.media.store', $service),
            ],
        ]);
    }

    /**
     * Update the specified service.
     */
    public function update(UpdateServiceRequest $request, Service $service): RedirectResponse
    {
        $service->update($this->payload($request->validated()));

        if ($request->boolean('remove_image')) {
            $service->clearMediaCollection(Service::MEDIA_COLLECTION_IMAGE);
        }

        if ($request->hasFile('image')) {
            $service
                ->addMediaFromRequest('image')
                ->toMediaCollection(Service::MEDIA_COLLECTION_IMAGE);
        }

        $this->removeGalleryImages(
            $service,
            $request->input('remove_gallery_images', []),
        );
        $this->storeGalleryImages($request, $service);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Servicio actualizado.')]);

        return to_route('admin.services.index');
    }

    /**
     * Remove the specified service.
     */
    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Servicio eliminado.')]);

        return to_route('admin.services.index');
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function payload(array $validated): array
    {
        return [
            'title' => $validated['title'],
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $this->decodeBody($validated['body'] ?? null),
            'tags' => $this->tags($validated['tags'] ?? null),
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'sort_order' => $validated['sort_order'] ?? 0,
        ];
    }

    /**
     * @return array<int, string>
     */
    private function tags(?string $tags): array
    {
        if (blank($tags)) {
            return [];
        }

        return collect(explode(',', $tags))
            ->map(fn (string $tag) => trim($tag))
            ->filter()
            ->unique(fn (string $tag) => mb_strtolower($tag))
            ->take(12)
            ->values()
            ->all();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function decodeBody(?string $body): array
    {
        if (blank($body)) {
            return [];
        }

        $decoded = json_decode($body, true);

        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @return array<int, array{type: string, content: string}>
     */
    private function legacyBody(?string $description): array
    {
        if (blank($description)) {
            return [];
        }

        return collect(preg_split('/\\R{2,}/', trim($description)) ?: [])
            ->map(fn (string $paragraph) => trim($paragraph))
            ->filter()
            ->map(fn (string $paragraph) => [
                'type' => 'paragraph',
                'content' => $paragraph,
            ])
            ->values()
            ->all();
    }

    /**
     * @return list<array{id: int, url: string}>
     */
    private function galleryImages(Service $service): array
    {
        return $service
            ->getMedia(Service::MEDIA_COLLECTION_GALLERY_IMAGES)
            ->map(fn ($media) => [
                'id' => $media->id,
                'url' => $media->getUrl('preview') ?: $media->getUrl(),
            ])
            ->values()
            ->all();
    }

    /**
     * @param  array<int, mixed>  $mediaIds
     */
    private function removeGalleryImages(Service $service, array $mediaIds): void
    {
        if ($mediaIds === []) {
            return;
        }

        $service
            ->getMedia(Service::MEDIA_COLLECTION_GALLERY_IMAGES)
            ->whereIn('id', $mediaIds)
            ->each(fn ($media) => $media->delete());
    }

    private function storeGalleryImages(Request $request, Service $service): void
    {
        if (! $request->hasFile('gallery_images')) {
            return;
        }

        $service
            ->addMultipleMediaFromRequest(['gallery_images'])
            ->each(fn ($fileAdder) => $fileAdder->toMediaCollection(
                Service::MEDIA_COLLECTION_GALLERY_IMAGES,
            ));
    }
}
