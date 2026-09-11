<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Seed short mock testimonials for landing presentation.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Mariana López',
                'label' => 'Paciente',
                'quote' => 'Recibí una atención muy humana y clara desde la primera consulta. Me sentí acompañada durante todo mi proceso.',
                'rating' => 5,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Karla Hernández',
                'label' => 'Paciente',
                'quote' => 'El equipo resolvió mis dudas con paciencia y profesionalismo. La experiencia fue muy tranquila y confiable.',
                'rating' => 5,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Andrea Ramírez',
                'label' => 'Paciente',
                'quote' => 'Me gustó la calidez del trato y la explicación detallada de cada paso. Recomiendo mucho la clínica.',
                'rating' => 5,
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::updateOrCreate(
                ['name' => $testimonial['name']],
                $testimonial,
            );
        }
    }
}
