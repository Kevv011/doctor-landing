<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceMediaController extends Controller
{
    /**
     * Store an image inserted from the service BlockNote editor.
     */
    public function store(Request $request, Service $service): JsonResponse
    {
        abort_unless((bool) $request->user()?->is_admin, 403);

        $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,webp,avif',
                'max:5120',
            ],
        ]);

        $media = $service
            ->addMediaFromRequest('file')
            ->toMediaCollection(Service::MEDIA_COLLECTION_CONTENT_IMAGES);

        return response()->json([
            'id' => $media->id,
            'uuid' => $media->uuid,
            'url' => $media->getUrl(),
            'name' => $media->file_name,
        ]);
    }
}
