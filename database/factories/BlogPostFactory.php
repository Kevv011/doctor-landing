<?php

namespace Database\Factories;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<BlogPost>
     */
    protected $model = BlogPost::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(5);

        return [
            'user_id' => User::factory()->admin(),
            'title' => $title,
            'slug' => Str::slug($title).'-'.Str::lower(Str::random(6)),
            'excerpt' => fake()->paragraph(),
            'body' => [],
            'status' => BlogPost::STATUS_DRAFT,
            'published_at' => null,
            'seo_title' => null,
            'seo_description' => null,
        ];
    }

    /**
     * Indicate that the blog post is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => BlogPost::STATUS_PUBLISHED,
            'published_at' => now(),
        ]);
    }
}
