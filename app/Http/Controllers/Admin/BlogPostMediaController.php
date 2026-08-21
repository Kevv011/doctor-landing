<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogPostMediaController extends Controller
{
    /**
     * Store an inline blog editor image in Media Library.
     */
    public function store(Request $request, BlogPost $blog): JsonResponse
    {
        abort_unless((bool) $request->user()?->is_admin, 403);

        $request->validate([
            'file' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
        ]);

        $media = $blog
            ->addMediaFromRequest('file')
            ->toMediaCollection(BlogPost::MEDIA_COLLECTION_CONTENT_IMAGES);

        return response()->json([
            'id' => $media->id,
            'uuid' => $media->uuid,
            'url' => $media->getUrl(),
            'name' => $media->file_name,
        ]);
    }
}
