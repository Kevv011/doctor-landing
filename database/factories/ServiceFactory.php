<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Service>
     */
    protected $model = Service::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->sentence(16),
            'body' => [],
            'description' => fake()->paragraphs(2, true),
            'tags' => fake()->words(3),
            'is_active' => true,
            'sort_order' => 0,
            'seo_title' => $title,
            'seo_description' => fake()->sentence(18),
        ];
    }
}
