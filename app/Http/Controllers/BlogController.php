<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * Display published blog posts.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $category = $request->string('category')->trim()->toString();
        $tag = $request->string('tag')->trim()->toString();

        $posts = BlogPost::query()
            ->with('category:id,name,slug')
            ->published()
            ->when($search !== '', fn($query) => $query->where(function ($query) use ($search) {
                $query
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            }))
            ->when($category !== '', fn($query) => $query->whereHas(
                'category',
                fn($query) => $query->where('slug', $category)->active(),
            ))
            ->when($tag !== '', fn($query) => $query->whereJsonContains('tags', $tag))
            ->latest('published_at')
            ->paginate(6)
            ->withQueryString()
            ->through(fn(BlogPost $post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'published_at' => $post->published_at?->translatedFormat('j F Y'),
                'category' => $post->category?->name,
                'tags' => $post->tags ?? [],
                'featured_image_url' => $post->getFirstMediaUrl(
                    BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE,
                    'preview',
                ) ?: $post->getFirstMediaUrl(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE),
            ]);

        return Inertia::render('public/blog/index', [
            'posts' => $posts,
            'categories' => $this->categories(),
            'tags' => $this->tags(),
            'filters' => [
                'search' => $search,
                'category' => $category,
                'tag' => $tag,
            ],
        ]);
    }

    /**
     * Display a published blog post.
     */
    public function show(string $slug): Response
    {
        $post = BlogPost::query()
            ->with(['author:id,name', 'category:id,name,slug'])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('public/blog/show', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'body' => $post->body ?? [],
                'published_at' => $post->published_at?->translatedFormat('j F Y'),
                'author' => $post->author?->name,
                'category' => $post->category?->name,
                'tags' => $post->tags ?? [],
                'featured_image_url' => $post->getFirstMediaUrl(
                    BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE,
                    'preview',
                ) ?: $post->getFirstMediaUrl(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE),
            ],
            'categories' => $this->categories(),
            'tags' => $this->tags(),
            'relatedPosts' => BlogPost::query()
                ->published()
                ->whereKeyNot($post->id)
                ->latest('published_at')
                ->limit(4)
                ->get()
                ->map(fn(BlogPost $relatedPost) => [
                    'id' => $relatedPost->id,
                    'title' => $relatedPost->title,
                    'slug' => $relatedPost->slug,
                    'featured_image_url' => $relatedPost->getFirstMediaUrl(
                        BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE,
                        'preview',
                    ) ?: $relatedPost->getFirstMediaUrl(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE),
                ]),
            'filters' => [
                'search' => '',
                'category' => '',
                'tag' => '',
            ],
        ]);
    }

    private function categories()
    {
        return BlogCategory::query()
            ->active()
            ->withCount(['posts as published_posts_count' => fn($query) => $query->published()])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn(BlogCategory $category) => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'posts_count' => $category->published_posts_count,
            ]);
    }

    private function tags()
    {
        return BlogPost::query()
            ->published()
            ->get(['tags'])
            ->flatMap(fn(BlogPost $post) => $post->tags ?? [])
            ->filter()
            ->countBy()
            ->sortDesc()
            ->keys()
            ->take(12)
            ->values();
    }
}
