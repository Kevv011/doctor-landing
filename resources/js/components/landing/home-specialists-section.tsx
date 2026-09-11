import LandingContainer from '@/components/landing/landing-container';

const specialists = [
    {
        name: 'Dra. Priscila Elizabeth Coto de Arévalo',
        specialty: 'Ginecóloga y obstetra',
        image: '/images/Home/HomeSpecialist1.png',
        bio: 'Especialista en ginecología, obstetricia, colposcopia y ultrasonografía, con más de 11 años de experiencia en la atención integral de la salud femenina. Brinda un acompañamiento cercano y humanizado en cada etapa de la vida de sus pacientes.',
    },
    {
        name: 'Dr. Danilo Alfonso Arévalo Sandoval',
        specialty: 'Ginecólogo obstetra | ginecólogo oncólogo',
        image: '/images/Home/HomeSpecialist2.png',
        bio: 'Especialista en ginecología oncológica, cirugía ginecológica y laparoscopia avanzada, con más de 15 años de experiencia. Cuenta con formación internacional y una amplia trayectoria en el manejo integral del cáncer ginecológico y la innovación en salud.',
    },
];

export default function HomeSpecialistsSection() {
    return (
        <section className="bg-white py-12 text-[#09123f]">
            <LandingContainer>
                <div className="mx-auto max-w-5xl">
                    <div data-landing-reveal="up" className="text-center">
                        <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                            Experiencia y compromiso
                        </p>
                        <h2 className="mx-auto mt-3 max-w-xl text-3xl leading-[0.95] font-black tracking-[-0.04em] sm:text-4xl">
                            Especialistas en el cuidado integral de la mujer
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        {specialists.map((specialist, index) => (
                            <article
                                key={specialist.name}
                                data-landing-reveal="up"
                                data-landing-reveal-delay={90 + index * 100}
                                className="group rounded-lg border border-transparent bg-white px-8 py-10 shadow-[0_18px_45px_rgba(21,35,74,0.05)] transition duration-400 ease-in-out hover:-translate-y-1 hover:border-[#f0d4df] hover:bg-[#fff8fb] hover:shadow-[0_22px_48px_rgba(21,35,74,0.1)]"
                            >
                                <img
                                    src={specialist.image}
                                    alt={specialist.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="mx-auto size-36 rounded-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />

                                <div className="mt-8">
                                    <h3 className="text-lg leading-tight font-black">
                                        {specialist.name}
                                    </h3>
                                    <p className="mt-1 text-sm font-semibold text-[#e9648d]">
                                        {specialist.specialty}
                                    </p>
                                    <p className="mt-6 text-sm leading-6 text-[#6f7080]">
                                        {specialist.bio}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}
