<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBlogPostRequest;
use App\Http\Requests\Admin\UpdateBlogPostRequest;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    /**
     * Display a listing of blog posts.
     */
    public function index(): Response
    {
        return Inertia::render('admin/blogs/index', [
            'posts' => BlogPost::query()
                ->with(['author:id,name', 'category:id,name'])
                ->latest()
                ->paginate(15)
                ->through(fn (BlogPost $post) => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'status' => $post->status,
                    'is_featured' => $post->is_featured,
                    'category' => $post->category?->name,
                    'author' => $post->author?->name,
                    'published_at' => $post->published_at?->format('d/m/Y H:i'),
                    'created_at' => $post->created_at?->format('d/m/Y'),
                    'featured_image_url' => $post->getFirstMediaUrl(
                        BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE,
                        'preview',
                    ) ?: $post->getFirstMediaUrl(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE),
                ]),
        ]);
    }

    /**
     * Show the form for creating a blog post.
     */
    public function create(): Response
    {
        return Inertia::render('admin/blogs/create', [
            'statuses' => $this->statuses(),
            'categories' => $this->categories(),
        ]);
    }

    /**
     * Store a newly created blog post.
     */
    public function store(StoreBlogPostRequest $request): RedirectResponse
    {
        $post = BlogPost::create([
            ...$this->payload($request->validated()),
            'user_id' => $request->user()?->id,
        ]);

        if ($request->hasFile('featured_image')) {
            $post
                ->addMediaFromRequest('featured_image')
                ->toMediaCollection(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Blog creado.')]);

        return to_route('admin.blogs.index');
    }

    /**
     * Show the form for editing a blog post.
     */
    public function edit(BlogPost $blog): Response
    {
        return Inertia::render('admin/blogs/edit', [
            'post' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'blog_category_id' => $blog->blog_category_id,
                'excerpt' => $blog->excerpt,
                'body' => $blog->body ?? [],
                'tags' => implode(', ', $blog->tags ?? []),
                'status' => $blog->status,
                'is_featured' => $blog->is_featured,
                'published_at' => $blog->published_at?->format('Y-m-d\TH:i'),
                'seo_title' => $blog->seo_title,
                'seo_description' => $blog->seo_description,
                'featured_image_url' => $blog->getFirstMediaUrl(
                    BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE,
                    'preview',
                ) ?: $blog->getFirstMediaUrl(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE),
                'media_upload_url' => route('admin.blogs.media.store', $blog),
            ],
            'statuses' => $this->statuses(),
            'categories' => $this->categories(),
        ]);
    }

    /**
     * Update the specified blog post.
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blog): RedirectResponse
    {
        $blog->update($this->payload($request->validated(), $blog));

        if ($request->boolean('remove_featured_image')) {
            $blog->clearMediaCollection(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE);
        }

        if ($request->hasFile('featured_image')) {
            $blog
                ->addMediaFromRequest('featured_image')
                ->toMediaCollection(BlogPost::MEDIA_COLLECTION_FEATURED_IMAGE);
        }

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Blog actualizado.')]);

        return to_route('admin.blogs.index');
    }

    /**
     * Remove the specified blog post.
     */
    public function destroy(BlogPost $blog): RedirectResponse
    {
        $blog->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Blog eliminado.')]);

        return to_route('admin.blogs.index');
    }

    /**
     * @return array<int, array{value: string, label: string}>
     */
    private function statuses(): array
    {
        return [
            ['value' => BlogPost::STATUS_DRAFT, 'label' => 'Borrador'],
            ['value' => BlogPost::STATUS_PUBLISHED, 'label' => 'Publicado'],
        ];
    }

    /**
     * @return array<int, array{value: int, label: string}>
     */
    private function categories(): array
    {
        return BlogCategory::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn (BlogCategory $category) => [
                'value' => $category->id,
                'label' => $category->name,
            ])
            ->all();
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function payload(array $validated, ?BlogPost $existingPost = null): array
    {
        $status = $validated['status'];
        $publishedAt = $validated['published_at'] ?? null;

        if ($status === BlogPost::STATUS_DRAFT) {
            $publishedAt = null;
        }

        if ($status === BlogPost::STATUS_PUBLISHED && blank($publishedAt)) {
            $publishedAt = now();
        }

        return [
            'blog_category_id' => $validated['blog_category_id'] ?? null,
            'title' => $validated['title'],
            'slug' => $validated['slug'] ?: $this->uniqueSlug($validated['title'], $existingPost),
            'excerpt' => $validated['excerpt'] ?? null,
            'body' => $this->decodeBody($validated['body'] ?? null),
            'tags' => $this->tags($validated['tags'] ?? null),
            'status' => $status,
            'is_featured' => (bool) ($validated['is_featured'] ?? false),
            'published_at' => $publishedAt,
            'seo_title' => $validated['seo_title'] ?? null,
            'seo_description' => $validated['seo_description'] ?? null,
        ];
    }

    private function uniqueSlug(string $title, ?BlogPost $existingPost = null): string
    {
        $baseSlug = Str::slug($title) ?: 'blog';
        $slug = $baseSlug;
        $counter = 2;

        while (
            BlogPost::where('slug', $slug)
                ->when($existingPost, fn ($query) => $query->whereKeyNot($existingPost->id))
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
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
}
