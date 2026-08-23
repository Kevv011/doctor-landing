<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogPostMediaController extends Controller
{
    /**
     * Store inline blog editor media in Media Library.
     */
    public function store(Request $request, BlogPost $blog): JsonResponse
    {
        abort_unless((bool) $request->user()?->is_admin, 403);

        $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,webp,avif,mp3,m4a,ogg,wav,weba,mp4,webm,mov',
                'max:51200',
            ],
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
