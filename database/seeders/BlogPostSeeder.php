<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    /**
     * Seed short featured blog posts for landing presentation.
     */
    public function run(): void
    {
        $admin = User::query()
            ->where('is_admin', true)
            ->orderBy('id')
            ->first();

        $posts = [
            [
                'title' => 'El miedo no debe cuidar tu salud. Tú sí.',
                'slug' => 'el-miedo-no-debe-cuidar-tu-salud-tu-si',
                'excerpt' => 'La prevención ginecológica es una forma de amor propio y cuidado oportuno.',
                'body' => $this->body([
                    'Muchas mujeres posponen sus controles por miedo, dudas o falta de tiempo.',
                    'La evaluación ginecológica permite detectar cambios a tiempo y tomar decisiones con información clara.',
                    'Cuidarte también significa preguntar, revisar y atender tu bienestar antes de que exista una urgencia.',
                ]),
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'Tic, tac... tu bebé viene en camino.',
                'slug' => 'tik-tak-tu-bebe-viene-en-camino',
                'excerpt' => 'El acompañamiento prenatal ayuda a vivir el embarazo con más calma y confianza.',
                'body' => $this->body([
                    'Cada embarazo tiene su propio ritmo y merece seguimiento cercano.',
                    'Los controles prenatales permiten revisar el desarrollo del bebé y resolver dudas importantes en cada etapa.',
                    'Un acompañamiento humano hace que la experiencia sea más segura, informada y tranquila.',
                ]),
                'published_at' => now()->subDays(24),
            ],
            [
                'title' => 'Cada mujer es diferente...',
                'slug' => 'cada-mujer-es-diferente',
                'excerpt' => 'La salud femenina necesita atención personalizada según cada etapa de la vida.',
                'body' => $this->body([
                    'No todas las pacientes tienen las mismas necesidades, antecedentes o síntomas.',
                    'Por eso, la atención integral debe escuchar la historia de cada mujer y adaptar sus recomendaciones.',
                    'La medicina cercana y personalizada permite cuidar mejor la salud presente y futura.',
                ]),
                'published_at' => now()->subDays(46),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::updateOrCreate(
                ['slug' => $post['slug']],
                [
                    ...$post,
                    'user_id' => $admin?->id,
                    'status' => BlogPost::STATUS_PUBLISHED,
                    'is_featured' => true,
                    'seo_title' => $post['title'],
                    'seo_description' => $post['excerpt'],
                ],
            );
        }
    }

    /**
     * @param  list<string>  $paragraphs
     * @return list<array{type: string, content: string}>
     */
    private function body(array $paragraphs): array
    {
        return collect($paragraphs)
            ->map(fn (string $paragraph) => [
                'type' => 'paragraph',
                'content' => $paragraph,
            ])
            ->all();
    }
}
