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
                'name' => 'Mariana Lopez',
                'label' => 'Paciente',
                'quote' => 'Recibi una atencion muy humana y clara desde la primera consulta. Me senti acompanada durante todo mi proceso.',
                'rating' => 5,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Karla Hernandez',
                'label' => 'Paciente',
                'quote' => 'El equipo resolvio mis dudas con paciencia y profesionalismo. La experiencia fue muy tranquila y confiable.',
                'rating' => 5,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Andrea Ramirez',
                'label' => 'Paciente',
                'quote' => 'Me gusto la calidez del trato y la explicacion detallada de cada paso. Recomiendo mucho la clinica.',
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
