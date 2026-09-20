<?php

namespace App\Support;

class SpecialistProfiles
{
    /**
     * @return array<string, array<string, mixed>>
     */
    public static function all(): array
    {
        return [
            'dra-priscila-coto' => [
                'slug' => 'dra-priscila-coto',
                'name' => 'Dra. Priscila Elizabeth Coto de Arévalo',
                'role' => 'Ginecóloga y obstetra',
                'profile_label' => 'Perfil profesional y atención integral',
                'experience_label' => '11+ años de experiencia',
                'image_url' => '/images/Dr-Priscila-Coto.jpg',
                'summary' => 'Especialista en salud femenina con atención ética y humanizada en ginecología, obstetricia, colposcopia y ultrasonografía. Acompaña a cada paciente con criterio clínico, cercanía y una visión integral.',
                'areas' => [
                    'Ginecología y obstetricia',
                    'Colposcopia',
                    'Ultrasonografía',
                    'Educación prenatal',
                    'Asesoría de lactancia',
                ],
                'facts' => [
                    ['label' => 'Experiencia', 'value' => '11+ años'],
                    ['label' => 'Enfoque', 'value' => 'Integral y humanizado'],
                    ['label' => 'Acompañamiento', 'value' => 'Cada etapa de la mujer'],
                ],
                'experience' => [
                    [
                        'title' => 'Práctica clínica privada',
                        'place' => 'San Salvador',
                        'period' => '2015 - actualidad',
                        'description' => 'Consulta ginecológica, control prenatal, atención de partos, cirugía ginecológica y ultrasonografía.',
                    ],
                    [
                        'title' => 'Jefa de consulta externa',
                        'place' => 'Unidad Médica ISSS Ilopango',
                        'period' => 'Febrero 2024 - junio 2025',
                        'description' => 'Coordinación clínica y atención especializada en ginecología y obstetricia.',
                    ],
                    [
                        'title' => 'Médica de emergencia gineco-obstétrica',
                        'place' => 'Hospital Policlínico Zacamil, ISSS',
                        'period' => 'Julio 2015 - enero 2024',
                        'description' => 'Atención y resolución de emergencias ginecológicas y obstétricas.',
                    ],
                    [
                        'title' => 'Médica consultante de consulta externa',
                        'place' => 'Unidad Médica ISSS Aguilares',
                        'period' => 'Enero 2014 - junio 2015',
                        'description' => 'Consulta médica y atención ambulatoria para pacientes de la zona de Aguilares.',
                    ],
                    [
                        'title' => 'Educadora prenatal',
                        'place' => 'Práctica privada',
                        'period' => '2018 - actualidad',
                        'description' => 'Creó programas de preparación prenatal y para embarazos múltiples que han acompañado a más de 500 parejas.',
                    ],
                    [
                        'title' => 'Gestora del cambio de la Ley Nacer con Cariño',
                        'place' => 'Atención materno-infantil respetuosa',
                        'period' => '2022',
                        'description' => 'Participó en la promoción de un parto respetuoso y del cuidado cariñoso del recién nacido.',
                    ],
                    [
                        'title' => 'Asesora de lactancia materna',
                        'place' => 'Atención en línea, presencial y a domicilio',
                        'period' => '2020 - actualidad',
                        'description' => 'Acompañamiento especializado en lactancia materna, incluida la lactancia en embarazos múltiples.',
                    ],
                ],
                'education' => [
                    [
                        'title' => 'Especialización en Ginecología y Obstetricia',
                        'place' => 'Universidad de El Salvador',
                        'period' => '2014',
                    ],
                    [
                        'title' => 'Residencia en Ginecología y Obstetricia',
                        'place' => 'Hospital Materno Infantil Primero de Mayo',
                    ],
                    [
                        'title' => 'Doctorado en Medicina',
                        'place' => 'Universidad Evangélica de El Salvador',
                        'period' => '2011',
                    ],
                    [
                        'title' => 'Servicio social',
                        'place' => 'Unidad Comunitaria de Salud Familiar Tonacatepeque',
                        'period' => '2010',
                    ],
                    [
                        'title' => 'Internado rotatorio',
                        'place' => 'Hospital Nacional Zacamil',
                        'period' => '2009',
                    ],
                ],
                'additional_training' => [
                    [
                        'title' => 'Colposcopia y patología cervical',
                        'description' => 'Diplomado de actualización clínica, Universidad de El Salvador.',
                    ],
                    [
                        'title' => 'Ultrasonido mamario',
                        'description' => 'Formación diagnóstica especializada en evaluación mamaria.',
                    ],
                    [
                        'title' => 'Educación prenatal y lactancia',
                        'description' => 'Preparación prenatal, parto en agua y asesoría de lactancia, incluida lactancia en múltiples.',
                    ],
                ],
                'affiliations' => [
                    [
                        'short' => 'CGOES',
                        'name' => 'Colegio de Ginecología y Obstetricia de El Salvador',
                    ],
                    [
                        'short' => 'CONES',
                        'name' => 'Consejo Nacional de Especialidades Médicas',
                    ],
                ],
                'publications' => [],
            ],
            'dr-danilo-arevalo' => [
                'slug' => 'dr-danilo-arevalo',
                'name' => 'Dr. Danilo Alfonso Arévalo Sandoval',
                'role' => 'Ginecólogo obstetra y ginecólogo oncólogo',
                'profile_label' => 'Perfil profesional y dirección médica',
                'experience_label' => '15+ años de experiencia',
                'image_url' => '/images/Dr-Danilo-Arevalo.jpg',
                'summary' => 'Especialista en el abordaje integral del cáncer ginecológico, cirugía oncológica y procedimientos de mínima invasión. Combina experiencia clínica, liderazgo e innovación con una atención cercana y humanizada.',
                'areas' => [
                    'Ginecología oncológica',
                    'Cirugía oncológica',
                    'Laparoscopia avanzada',
                    'Ginecología y obstetricia',
                ],
                'facts' => [
                    ['label' => 'Experiencia', 'value' => '15+ años'],
                    ['label' => 'Enfoque', 'value' => 'Oncología ginecológica'],
                    ['label' => 'Cirugía', 'value' => 'Mínima invasión'],
                ],
                'experience' => [
                    [
                        'title' => 'Director médico',
                        'place' => "Women's Health Clinic by AR&CO",
                        'description' => 'Dirección clínica y atención especializada en salud femenina.',
                    ],
                    [
                        'title' => 'Ginecólogo oncólogo',
                        'place' => 'Instituto del Cáncer',
                        'description' => 'Manejo multidisciplinario y cirugía oncológica ginecológica.',
                    ],
                    [
                        'title' => 'Ginecólogo oncólogo',
                        'place' => 'Hospital Nacional de la Mujer',
                        'description' => 'Atención de alta complejidad, cirugía especializada y seguimiento integral del cáncer ginecológico.',
                    ],
                    [
                        'title' => 'Ginecólogo oncólogo',
                        'place' => 'Instituto Salvadoreño del Seguro Social',
                        'description' => 'Atención oncológica ginecológica y manejo quirúrgico especializado.',
                    ],
                ],
                'education' => [
                    [
                        'title' => 'Gerencia de Servicios de Salud',
                        'place' => 'INCAE Business School',
                        'period' => '2020',
                    ],
                    [
                        'title' => 'Liderazgo y Proyectos Innovadores en Salud',
                        'place' => 'INCAE Business School',
                        'period' => '2019',
                    ],
                    [
                        'title' => 'Observer en Ginecología Oncológica',
                        'place' => 'MD Anderson Cancer Center',
                        'period' => '2018',
                    ],
                    [
                        'title' => 'Subespecialidad en Ginecología Oncológica',
                        'place' => 'Instituto Salvadoreño del Seguro Social',
                        'period' => '2013 - 2015',
                    ],
                    [
                        'title' => 'Especialidad en Ginecología y Obstetricia',
                        'place' => 'Universidad de El Salvador',
                        'period' => '2010 - 2012',
                    ],
                    [
                        'title' => 'Doctorado en Medicina',
                        'place' => 'Universidad Evangélica de El Salvador',
                        'period' => '2001 - 2008',
                    ],
                ],
                'additional_training' => [
                    [
                        'title' => 'Cirugía de mínima invasión',
                        'description' => 'Entrenamiento internacional en técnicas laparoscópicas y cirugía ginecológica avanzada.',
                    ],
                    [
                        'title' => 'Investigación clínica e innovación',
                        'description' => 'Formación continua en investigación, liderazgo y mejora de servicios de salud.',
                    ],
                ],
                'affiliations' => [
                    ['short' => 'IGCS', 'name' => 'International Gynecologic Cancer Society'],
                    ['short' => 'ACOG', 'name' => 'American College of Obstetricians and Gynecologists'],
                    ['short' => 'ESGO', 'name' => 'European Society of Gynaecological Oncology'],
                    ['short' => 'ASONCO', 'name' => 'Asociación Salvadoreña de Oncología'],
                    ['short' => 'COLMED', 'name' => 'Colegio Médico de El Salvador'],
                ],
                'publications' => [
                    [
                        'title' => 'First Radical Trachelectomy with Pelvic Lymphadenectomy in El Salvador',
                        'description' => 'Reporte del primer procedimiento de preservación de fertilidad de este tipo realizado en el país.',
                    ],
                    [
                        'title' => 'Alternative Management for Gynecological Cancer Care During COVID-19 Pandemic',
                        'description' => 'Recomendaciones para la continuidad y priorización del cuidado oncológico durante la emergencia sanitaria.',
                    ],
                ],
            ],
        ];
    }

    /**
     * @return array<string, mixed>|null
     */
    public static function find(string $slug): ?array
    {
        return self::all()[$slug] ?? null;
    }
}
