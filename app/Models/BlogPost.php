<?php

namespace App\Models;

use Database\Factories\BlogPostFactory;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property int $id
 * @property int|null $user_id
 * @property int|null $blog_category_id
 * @property string $title
 * @property string $slug
 * @property string|null $excerpt
 * @property array<int, array<string, mixed>>|null $body
 * @property array<int, string>|null $tags
 * @property string $status
 * @property bool $is_featured
 * @property Carbon|null $published_at
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class BlogPost extends Model implements HasMedia
{
    /** @use HasFactory<BlogPostFactory> */
    use HasFactory, InteractsWithMedia;

    public const STATUS_DRAFT = 'draft';

    public const STATUS_PUBLISHED = 'published';

    public const MEDIA_COLLECTION_FEATURED_IMAGE = 'featured_image';

    public const MEDIA_COLLECTION_CONTENT_IMAGES = 'content_images';

    /**
     * @var list<string>
     */
    public const CONTENT_MEDIA_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
        'audio/mpeg',
        'audio/mp4',
        'audio/ogg',
        'audio/wav',
        'audio/webm',
        'video/mp4',
        'video/ogg',
        'video/webm',
        'video/quicktime',
    ];

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'blog_category_id',
        'title',
        'slug',
        'excerpt',
        'body',
        'tags',
        'status',
        'is_featured',
        'published_at',
        'seo_title',
        'seo_description',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'body' => 'array',
            'tags' => 'array',
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    /**
     * Get the admin user that authored the post.
     *
     * @return BelongsTo<User, $this>
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the category assigned to the post.
     *
     * @return BelongsTo<BlogCategory, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection(self::MEDIA_COLLECTION_FEATURED_IMAGE)
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
            ->singleFile();

        $this
            ->addMediaCollection(self::MEDIA_COLLECTION_CONTENT_IMAGES)
            ->acceptsMimeTypes(self::CONTENT_MEDIA_MIME_TYPES);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        if ($media && ! str_starts_with((string) $media->mime_type, 'image/')) {
            return;
        }

        $this
            ->addMediaConversion('preview')
            ->width(640)
            ->height(420)
            ->nonQueued();
    }

    #[Scope]
    protected function published(Builder $query): void
    {
        $query
            ->where('status', self::STATUS_PUBLISHED)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    #[Scope]
    protected function featured(Builder $query): void
    {
        $query->where('is_featured', true);
    }
}
