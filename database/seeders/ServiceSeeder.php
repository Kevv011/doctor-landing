<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Seed base medical services for the public landing.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Consulta ginecológica y obstétrica',
                'excerpt' => 'La consulta ginecológica es el primer paso para cuidar tu salud en cada etapa de la vida.',
                'description' => implode("\n\n", [
                    'Brindamos una evaluación integral orientada a la prevención, el diagnóstico oportuno y el acompañamiento médico de la salud femenina. En consulta se revisan antecedentes, síntomas, controles previos y cualquier inquietud que la paciente desee resolver.',
                    'También ofrecemos seguimiento obstétrico para acompañar el embarazo con controles claros, humanos y basados en evidencia. Nuestro objetivo es que cada paciente se sienta escuchada, informada y segura durante todo su proceso.',
                ]),
                'tags' => ['Ginecología', 'Obstetricia', 'Prevención'],
            ],
            [
                'title' => 'Consulta Gineco-Oncológica y de Mama',
                'excerpt' => 'La prevención y el diagnóstico oportuno son fundamentales para lograr mejores resultados.',
                'description' => implode("\n\n", [
                    'Esta consulta está enfocada en la prevención, detección temprana, evaluación y seguimiento de condiciones gineco-oncológicas y de mama. Se orienta a pacientes con factores de riesgo, hallazgos en estudios previos, síntomas o necesidad de control especializado.',
                    'Durante la atención se explican los pasos diagnósticos de forma clara y se acompaña a la paciente con un enfoque cercano, respetuoso y responsable, priorizando decisiones oportunas y bien informadas.',
                ]),
                'tags' => ['Gineco-oncología', 'Mama', 'Diagnóstico'],
            ],
            [
                'title' => 'Ultrasonido Pélvico Transvaginal',
                'excerpt' => 'El ultrasonido transvaginal es una herramienta diagnóstica de alta precisión.',
                'description' => implode("\n\n", [
                    'El ultrasonido pélvico transvaginal permite valorar con mayor detalle el útero, ovarios y estructuras pélvicas. Es útil para estudiar dolor pélvico, sangrados anormales, quistes, miomas, endometrio y otros hallazgos ginecológicos.',
                    'Es un estudio seguro y de gran apoyo para complementar la consulta médica, orientar diagnósticos y definir el seguimiento adecuado según cada caso.',
                ]),
                'tags' => ['Ultrasonido', 'Diagnóstico', 'Ginecología'],
            ],
            [
                'title' => 'Curso de preparación para el parto',
                'excerpt' => 'Convertirse en madre y padre es una de las experiencias más importantes de la vida.',
                'description' => implode("\n\n", [
                    'Nuestro curso de preparación para el parto acompaña a la madre y su familia con información práctica, orientación emocional y herramientas para vivir el embarazo, el nacimiento y los primeros cuidados con mayor seguridad.',
                    'Se abordan temas como señales de alarma, etapas del trabajo de parto, respiración, lactancia, recuperación posparto y cuidados básicos del recién nacido.',
                ]),
                'tags' => ['Embarazo', 'Parto', 'Familia'],
            ],
            [
                'title' => 'Cirugía Ginecológica y Gineco-Oncológica',
                'excerpt' => 'Ofrecemos procedimientos quirúrgicos adaptados a cada diagnóstico y necesidad clínica.',
                'description' => implode("\n\n", [
                    'Realizamos orientación y manejo quirúrgico para condiciones ginecológicas y gineco-oncológicas que requieren un abordaje especializado. Cada caso se evalúa cuidadosamente para definir el procedimiento más adecuado.',
                    'La planificación quirúrgica se realiza con información clara, resolviendo dudas y priorizando la seguridad, recuperación y acompañamiento humano de cada paciente.',
                ]),
                'tags' => ['Cirugía', 'Ginecología', 'Tratamiento'],
            ],
            [
                'title' => 'Ultrasonido Pélvico Abdominal',
                'excerpt' => 'Este estudio permite valorar los órganos pélvicos mediante una revisión cómoda y segura.',
                'description' => implode("\n\n", [
                    'El ultrasonido pélvico abdominal es una evaluación no invasiva que permite observar estructuras pélvicas y complementar el diagnóstico clínico. Puede indicarse en controles preventivos, seguimiento de síntomas o como apoyo a otros estudios.',
                    'Es una alternativa cómoda para pacientes que requieren valoración ginecológica por imagen, siempre interpretada dentro del contexto de la historia clínica.',
                ]),
                'tags' => ['Ultrasonido', 'Evaluación', 'Salud femenina'],
            ],
            [
                'title' => 'Ultrasonido Obstétrico',
                'excerpt' => 'Cada embarazo merece un seguimiento cercano y confiable.',
                'description' => implode("\n\n", [
                    'El ultrasonido obstétrico permite evaluar el crecimiento, desarrollo y bienestar del bebé durante el embarazo. Ayuda a confirmar edad gestacional, revisar estructuras, placenta, líquido amniótico y otros aspectos importantes del control prenatal.',
                    'Este estudio brinda información valiosa para la madre y el equipo médico, favoreciendo un seguimiento oportuno y una experiencia prenatal más tranquila.',
                ]),
                'tags' => ['Embarazo', 'Ultrasonido', 'Control prenatal'],
            ],
            [
                'title' => 'Ultrasonido Obstétrico 3D y 4D',
                'excerpt' => 'Vive una experiencia única al conocer el rostro y los movimientos de tu bebé.',
                'description' => implode("\n\n", [
                    'El ultrasonido 3D y 4D permite observar imágenes con mayor detalle del rostro y movimientos del bebé, creando una experiencia memorable durante el embarazo.',
                    'Además de su valor emocional, puede complementar el seguimiento prenatal cuando el especialista lo considera adecuado, siempre priorizando la seguridad de mamá y bebé.',
                ]),
                'tags' => ['3D', '4D', 'Embarazo'],
            ],
            [
                'title' => 'Ultrasonido de Mama',
                'excerpt' => 'El ultrasonido mamario es un estudio seguro y de alta resolución que permite evaluar el tejido mamario.',
                'description' => implode("\n\n", [
                    'El ultrasonido de mama ayuda a estudiar dolor, nódulos, cambios palpables, hallazgos en mamografía o controles preventivos según indicación médica. Es una herramienta útil para diferenciar lesiones sólidas y quísticas, así como orientar seguimiento.',
                    'Su realización forma parte de una evaluación integral de la salud mamaria, especialmente cuando se busca detección oportuna y acompañamiento especializado.',
                ]),
                'tags' => ['Mama', 'Ultrasonido', 'Prevención'],
            ],
            [
                'title' => 'Colposcopía y Diagnóstico de Lesiones por VPH',
                'excerpt' => 'La colposcopía es un procedimiento especializado que permite examinar con detalle el cuello uterino.',
                'description' => implode("\n\n", [
                    'La colposcopía permite evaluar el cuello uterino, vagina y vulva con aumento e iluminación especial, especialmente cuando existen alteraciones en citología, pruebas de VPH o hallazgos clínicos que requieren revisión detallada.',
                    'Este estudio ayuda a identificar lesiones tempranas, orientar biopsias cuando son necesarias y definir un plan de seguimiento o tratamiento oportuno.',
                ]),
                'tags' => ['VPH', 'Colposcopía', 'Cuello uterino'],
            ],
            [
                'title' => 'Ginecología Funcional',
                'excerpt' => 'La salud íntima forma parte del bienestar integral de la mujer.',
                'description' => implode("\n\n", [
                    'La ginecología funcional se enfoca en mejorar síntomas y cambios que pueden afectar la calidad de vida, como resequedad, molestias íntimas, cambios hormonales, recuperación posparto o alteraciones asociadas a distintas etapas de la mujer.',
                    'El objetivo es ofrecer una atención personalizada, respetuosa y orientada al bienestar, integrando prevención, tratamiento y educación para cada paciente.',
                ]),
                'tags' => ['Bienestar íntimo', 'Salud femenina', 'Funcional'],
            ],
            [
                'title' => 'Aplicación de Ácido Hialurónico',
                'excerpt' => 'El ácido hialurónico contribuye a restaurar la hidratación y el confort íntimo.',
                'description' => implode("\n\n", [
                    'La aplicación de ácido hialurónico puede ayudar a mejorar hidratación, elasticidad y confort en zonas íntimas cuando existe resequedad, molestias o cambios asociados a etapas hormonales, posparto o menopausia.',
                    'Cada caso se evalúa de forma individual para definir si el procedimiento es adecuado, explicando beneficios, cuidados y expectativas con claridad.',
                ]),
                'tags' => ['Ácido hialurónico', 'Ginecología funcional', 'Confort íntimo'],
            ],
            [
                'title' => 'Plasma Rico en Plaquetas (PRP)',
                'excerpt' => 'El Plasma Rico en Plaquetas es una terapia regenerativa que utiliza componentes de la propia paciente.',
                'description' => implode("\n\n", [
                    'El PRP utiliza factores presentes en la sangre de la paciente para apoyar procesos de regeneración y recuperación de tejidos. En el área ginecológica puede formar parte de planes orientados al bienestar íntimo y funcional.',
                    'La indicación se realiza posterior a una evaluación médica, tomando en cuenta necesidades, antecedentes y objetivos terapéuticos de cada paciente.',
                ]),
                'tags' => ['PRP', 'Regenerativo', 'Bienestar íntimo'],
            ],
            [
                'title' => 'Ozonoterapia',
                'excerpt' => 'La ozonoterapia médica es un tratamiento complementario que favorece procesos de recuperación.',
                'description' => implode("\n\n", [
                    'La ozonoterapia es una alternativa complementaria que puede utilizarse dentro de planes médicos específicos para apoyar procesos de recuperación, bienestar y manejo de ciertas condiciones según evaluación profesional.',
                    'Su aplicación debe indicarse de forma personalizada, explicando objetivos, cuidados y expectativas reales para cada paciente.',
                ]),
                'tags' => ['Ozonoterapia', 'Complementario', 'Recuperación'],
            ],
            [
                'title' => 'HiFu Íntimo',
                'excerpt' => 'El ultrasonido focalizado de alta intensidad es una tecnología no invasiva para bienestar íntimo.',
                'description' => implode("\n\n", [
                    'El HiFu íntimo utiliza ultrasonido focalizado para apoyar la firmeza, tonicidad y bienestar de tejidos íntimos sin requerir cirugía. Puede ser considerado en pacientes que buscan mejorar confort y calidad de vida.',
                    'Antes de realizarlo se valora cada caso para determinar si es una opción adecuada, brindando orientación clara sobre el procedimiento y sus cuidados.',
                ]),
                'tags' => ['HiFu', 'Ginecología funcional', 'No invasivo'],
            ],
            [
                'title' => 'Biopsias Ginecológicas Ambulatorias',
                'excerpt' => 'Realizamos biopsias ginecológicas de forma ambulatoria, segura y con acompañamiento médico.',
                'description' => implode("\n\n", [
                    'Las biopsias ginecológicas ambulatorias permiten tomar pequeñas muestras de tejido para estudio diagnóstico cuando existen hallazgos que requieren confirmación. Pueden indicarse en cuello uterino, endometrio, vulva u otras áreas según evaluación.',
                    'El procedimiento se explica previamente, procurando que la paciente comprenda su finalidad, los cuidados posteriores y los siguientes pasos según el resultado.',
                ]),
                'tags' => ['Biopsia', 'Diagnóstico', 'Ambulatorio'],
            ],
        ];

        foreach ($services as $index => $service) {
            Service::updateOrCreate(
                ['slug' => Str::slug($service['title'])],
                [
                    ...$service,
                    'is_active' => true,
                    'sort_order' => $index + 1,
                ],
            );
        }
    }
}
