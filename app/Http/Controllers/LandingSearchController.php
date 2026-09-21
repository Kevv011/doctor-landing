<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LandingSearchController extends Controller
{
    private const RESULTS_PER_TYPE = 3;

    /**
     * Search public services, blog posts, and testimonials for the landing navigation.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $query = $request->string('q')->trim()->toString();

        if (mb_strlen($query) < 2) {
            return response()->json([
                'query' => $query,
                'results' => $this->emptyResults(),
            ]);
        }

        $like = '%'.addcslashes($query, '\\%_').'%';

        return response()->json([
            'query' => $query,
            'results' => [
                'services' => Service::query()
                    ->active()
                    ->where('title', 'like', $like)
                    ->orderBy('sort_order')
                    ->orderBy('title')
                    ->limit(self::RESULTS_PER_TYPE)
                    ->get()
                    ->map(fn (Service $service) => [
                        'id' => $service->id,
                        'title' => $service->title,
                        'description' => $service->excerpt ?: $service->description,
                        'image_url' => $service->imageUrl(),
                        'url' => route('services.show', $service->slug, false),
                    ])
                    ->values(),
                'blogs' => BlogPost::query()
                    ->published()
                    ->where('title', 'like', $like)
                    ->latest('published_at')
                    ->limit(self::RESULTS_PER_TYPE)
                    ->get()
                    ->map(fn (BlogPost $post) => [
                        'id' => $post->id,
                        'title' => $post->title,
                        'description' => $post->excerpt,
                        'image_url' => $post->getFirstMediaUrl(
                            BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE,
                            'preview',
                        ) ?: $post->getFirstMediaUrl(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE),
                        'meta' => $post->published_at?->translatedFormat('j F Y'),
                        'url' => route('blog.show', $post->slug, false),
                    ])
                    ->values(),
                'testimonials' => Testimonial::query()
                    ->active()
                    ->where(function ($testimonialQuery) use ($like): void {
                        $testimonialQuery
                            ->where('name', 'like', $like)
                            ->orWhere('label', 'like', $like);
                    })
                    ->orderBy('sort_order')
                    ->latest()
                    ->limit(self::RESULTS_PER_TYPE)
                    ->get()
                    ->map(fn (Testimonial $testimonial) => [
                        'id' => $testimonial->id,
                        'title' => $testimonial->name,
                        'description' => Str::limit($testimonial->quote, 135),
                        'image_url' => $testimonial->getFirstMediaUrl(
                            Testimonial::MEDIA_COLLECTION_AVATAR,
                            'preview',
                        ) ?: $testimonial->getFirstMediaUrl(Testimonial::MEDIA_COLLECTION_AVATAR),
                        'meta' => $testimonial->label,
                        'rating' => min(5, max(1, $testimonial->rating)),
                        'url' => '/#testimoniales',
                    ])
                    ->values(),
            ],
        ]);
    }

    /**
     * @return array{services: array<int, mixed>, blogs: array<int, mixed>, testimonials: array<int, mixed>}
     */
    private function emptyResults(): array
    {
        return [
            'services' => [],
            'blogs' => [],
            'testimonials' => [],
        ];
    }
}
