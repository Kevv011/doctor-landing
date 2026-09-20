<?php

namespace App\Models;

use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Service extends Model implements HasMedia
{
    /** @use HasFactory<ServiceFactory> */
    use HasFactory, InteractsWithMedia;

    public const MEDIA_COLLECTION_IMAGE = 'image';

    public const MEDIA_COLLECTION_GALLERY_IMAGES = 'gallery_images';

    public const MAX_GALLERY_IMAGES_PER_UPLOAD = 10;

    public const MEDIA_COLLECTION_CONTENT_IMAGES = 'content_images';

    /**
     * @var list<string>
     */
    public const CONTENT_MEDIA_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
    ];

    public const FALLBACK_IMAGE = '/images/Services/ServicesDefault.png';

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'description',
        'tags',
        'is_active',
        'sort_order',
        'seo_title',
        'seo_description',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'body' => 'array',
            'tags' => 'array',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Service $service): void {
            if ($service->isDirty('title') || blank($service->slug)) {
                $service->slug = self::uniqueSlug($service->title, $service->id);
            }

            $service->seo_title = $service->title;
            $service->seo_description = Str::limit(
                trim(strip_tags((string) ($service->excerpt ?: $service->description ?: $service->title))),
                155,
                '',
            );
        });
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection(self::MEDIA_COLLECTION_IMAGE)
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
            ->singleFile();

        $this
            ->addMediaCollection(self::MEDIA_COLLECTION_GALLERY_IMAGES)
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

        $this
            ->addMediaCollection(self::MEDIA_COLLECTION_CONTENT_IMAGES)
            ->acceptsMimeTypes(self::CONTENT_MEDIA_MIME_TYPES);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this
            ->addMediaConversion('preview')
            ->width(640)
            ->height(420)
            ->nonQueued();
    }

    public function imageUrl(?string $conversion = 'preview'): string
    {
        $url = $conversion
            ? $this->getFirstMediaUrl(self::MEDIA_COLLECTION_IMAGE, $conversion)
            : $this->getFirstMediaUrl(self::MEDIA_COLLECTION_IMAGE);

        return $url ?: $this->getFirstMediaUrl(self::MEDIA_COLLECTION_IMAGE) ?: self::FALLBACK_IMAGE;
    }

    /**
     * @return list<string>
     */
    public function galleryImageUrls(?string $conversion = 'preview'): array
    {
        return $this
            ->getMedia(self::MEDIA_COLLECTION_GALLERY_IMAGES)
            ->map(fn (Media $media) => $conversion
                ? $media->getUrl($conversion)
                : $media->getUrl())
            ->filter()
            ->values()
            ->all();
    }

    #[Scope]
    protected function active(Builder $query): void
    {
        $query->where('is_active', true);
    }

    private static function uniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title) ?: 'servicio';
        $slug = $baseSlug;
        $counter = 2;

        while (
            self::query()
                ->where('slug', $slug)
                ->when($ignoreId, fn (Builder $query) => $query->whereKeyNot($ignoreId))
                ->exists()
        ) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
