import LandingContainer from '@/components/landing/landing-container';

const specialists = [
    {
        name: 'Dra. Priscila Elizabeth Coto de Arevalo',
        specialty: 'Ginecologa y Obstetra',
        image: '/images/Home/HomeSpecialist1.png',
        bio: 'Especialista en ginecologia, obstetricia, colposcopia y ultrasonografia, con mas de 11 años de experiencia en la atencion integral de la salud femenina. Brinda un acompanamiento cercano y humanizado en cada etapa de la vida de sus pacientes.',
    },
    {
        name: 'Dr. Danilo Alfonso Arevalo Sandoval',
        specialty: 'Ginecologo Obstetra | Ginecologo Oncologo',
        image: '/images/Home/HomeSpecialist2.png',
        bio: 'Especialista en ginecologia oncologica, cirugia ginecologica y laparoscopia avanzada, con mas de 15 años de experiencia. Cuenta con formacion internacional y una amplia trayectoria en el manejo integral del cancer ginecologico y la innovacion en salud.',
    },
];

export default function HomeSpecialistsSection() {
    return (
        <section className="bg-white py-12 text-[#09123f]">
            <LandingContainer>
                <div className="mx-auto max-w-5xl">
                    <div className="text-center">
                        <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                            Experiencia y compromiso
                        </p>
                        <h2 className="mx-auto mt-3 max-w-xl text-3xl leading-[0.95] font-black tracking-[-0.04em] sm:text-4xl">
                            Especialistas en el cuidado integral de la mujer
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        {specialists.map((specialist) => (
                            <article
                                key={specialist.name}
                                className="group rounded-lg border border-transparent bg-white px-8 py-10 shadow-[0_18px_45px_rgba(21,35,74,0.05)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#f0d4df] hover:bg-[#fff8fb] hover:shadow-[0_22px_48px_rgba(21,35,74,0.1)]"
                            >
                                <img
                                    src={specialist.image}
                                    alt={specialist.name}
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
