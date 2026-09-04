import { ArrowUpRight, ChevronRight } from 'lucide-react';
import LandingContainer from '@/components/landing/landing-container';

const services = [
    {
        title: 'Consulta Ginecologica',
        description:
            'La consulta ginecologica es el primer paso para cuidar tu salud...',
        tone: 'bg-[#e9648d]',
    },
    {
        title: 'Consulta Gineco-Oncologica y de Mama',
        description:
            'La prevencion y el diagnostico oportuno son fundamentales...',
        tone: 'bg-[#e99bd5]',
    },
    {
        title: 'Ultrasonido Pelvico Transvaginal',
        description: 'El ultrasonido transvaginal es una herramienta...',
        tone: 'bg-[#df4daf]',
    },
    {
        title: 'Ultrasonido Pelvico Abdominal',
        description:
            'Este estudio permite valorar los organos pelvicos mediante...',
        tone: 'bg-[#7da2ff]',
    },
    {
        title: 'Ultrasonido Obstetrico',
        description:
            'Cada embarazo merece un seguimiento cercano y confiable...',
        tone: 'bg-[#a79bff]',
    },
];

export default function HomeServicesSection() {
    return (
        <section
            id="servicios"
            className="scroll-mt-24 bg-[#fff0f7] py-16 text-[#09123f] sm:scroll-mt-28 sm:py-20 lg:py-24"
        >
            <LandingContainer>
                <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-4">
                    <div className="lg:pt-1">
                        <p className="text-[11px] font-medium tracking-[0.2em] text-[#e9648d] uppercase">
                            Nuestros servicios
                        </p>
                        <h2 className="mt-3 max-w-52 text-3xl leading-[0.95] font-black tracking-[-0.04em] sm:text-4xl">
                            Atencion Medica Especializada
                        </h2>
                    </div>

                    {services.slice(0, 3).map((service) => (
                        <ServiceCard key={service.title} {...service} />
                    ))}

                    {/* <div className="hidden lg:block" /> */}

                    {services.slice(3).map((service) => (
                        <ServiceCard key={service.title} {...service} />
                    ))}

                    <article className="group relative min-h-[220px] overflow-hidden rounded-lg bg-[#e9648d] p-8 text-white transition duration-300 ease-out hover:-translate-y-1 hover:bg-[#d94e7a] hover:shadow-[0_18px_40px_rgba(21,35,74,0.12)] sm:col-span-2">
                        <div className="relative z-10 max-w-44">
                            <h3 className="text-2xl leading-tight font-semibold">
                                Conozca todos nuestros servicios
                            </h3>
                            <p className="mt-4 text-sm font-medium text-white/90">
                                +15 servicios especializados
                            </p>
                            <a
                                href="#servicios"
                                className="mt-7 inline-flex items-center gap-3 text-sm font-bold transition-colors hover:text-white/85"
                            >
                                Ver servicios
                                <span className="grid size-7 place-items-center rounded-full bg-white/25 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-[#e9648d]">
                                    <ArrowUpRight className="size-4" />
                                </span>
                            </a>
                        </div>

                        <div className="absolute right-[-18px] bottom-[-46px] size-64 overflow-hidden rounded-full bg-white/15 sm:right-[-10px] sm:bottom-[-22px] sm:size-72">
                            <img
                                src="/images/Home/HomeServices1.png"
                                alt="Doctores de la clinica"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </article>
                </div>
            </LandingContainer>
        </section>
    );
}

function ServiceCard({
    title,
    description,
    tone,
}: {
    title: string;
    description: string;
    tone: string;
}) {
    return (
        <article className="group flex min-h-[220px] flex-col justify-between rounded-lg border border-transparent bg-white p-7 shadow-[0_10px_30px_rgba(21,35,74,0.04)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#f0d4df] hover:shadow-[0_18px_40px_rgba(21,35,74,0.1)]">
            <div>
                <div
                    className={`mb-7 size-11 rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 ${tone}`}
                />
                <h3 className="text-base leading-[0.95] font-black">{title}</h3>
                <p className="mt-3 text-sm leading-5 text-[#6f7080]">
                    {description}
                </p>
            </div>
            <div>
                <a
                    href="#servicios"
                    className="mt-5 inline-flex items-center gap-3 text-xs font-bold text-[#e9648d] transition hover:text-[#c9003c]"
                >
                    Leer mas
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
            </div>
        </article>
    );
}
