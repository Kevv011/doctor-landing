<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreBlogCategoryRequest;
use App\Http\Requests\Admin\UpdateBlogCategoryRequest;
use App\Models\BlogCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogCategoryController extends Controller
{
    /**
     * Display blog categories.
     */
    public function index(): Response
    {
        return Inertia::render('admin/blog-categories/index', [
            'categories' => BlogCategory::query()
                ->withCount('posts')
                ->orderBy('sort_order')
                ->orderBy('name')
                ->paginate(15)
                ->through(fn (BlogCategory $category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'is_active' => $category->is_active,
                    'sort_order' => $category->sort_order,
                    'posts_count' => $category->posts_count,
                ]),
        ]);
    }

    /**
     * Show the form for creating a blog category.
     */
    public function create(): Response
    {
        return Inertia::render('admin/blog-categories/create');
    }

    /**
     * Store a newly created blog category.
     */
    public function store(StoreBlogCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        BlogCategory::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?: $this->uniqueSlug($validated['name']),
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Categoría creada.')]);

        return to_route('admin.blog-categories.index');
    }

    /**
     * Show the form for editing a blog category.
     */
    public function edit(BlogCategory $blogCategory): Response
    {
        return Inertia::render('admin/blog-categories/edit', [
            'category' => [
                'id' => $blogCategory->id,
                'name' => $blogCategory->name,
                'slug' => $blogCategory->slug,
                'is_active' => $blogCategory->is_active,
                'sort_order' => $blogCategory->sort_order,
            ],
        ]);
    }

    /**
     * Update the specified blog category.
     */
    public function update(UpdateBlogCategoryRequest $request, BlogCategory $blogCategory): RedirectResponse
    {
        $validated = $request->validated();

        $blogCategory->update([
            'name' => $validated['name'],
            'slug' => $validated['slug'] ?: $this->uniqueSlug($validated['name'], $blogCategory),
            'is_active' => (bool) ($validated['is_active'] ?? false),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Categoría actualizada.')]);

        return to_route('admin.blog-categories.index');
    }

    /**
     * Remove the specified blog category.
     */
    public function destroy(BlogCategory $blogCategory): RedirectResponse
    {
        if ($blogCategory->posts()->exists()) {
            return back()->withErrors([
                'category' => __('No puedes eliminar una categoría con blogs asociados.'),
            ]);
        }

        $blogCategory->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Categoría eliminada.')]);

        return to_route('admin.blog-categories.index');
    }

    private function uniqueSlug(string $name, ?BlogCategory $existingCategory = null): string
    {
        $baseSlug = Str::slug($name) ?: 'categoria';
        $slug = $baseSlug;
        $counter = 2;

        while (
            BlogCategory::where('slug', $slug)
                ->when($existingCategory, fn ($query) => $query->whereKeyNot($existingCategory->id))
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
