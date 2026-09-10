import { Link } from '@inertiajs/react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import LandingContainer from '@/components/landing/landing-container';
import type { LandingService } from '@/types/landing-service';

type Props = {
    services: LandingService[];
};

export default function HomeServicesSection({ services }: Props) {
    if (services.length === 0) {
        return null;
    }

    const featuredServices = services.slice(0, 5);

    return (
        <section
            id="servicios"
            className="scroll-mt-24 bg-[#fff0f7] py-16 text-[#09123f] sm:scroll-mt-28 sm:py-20 lg:py-24"
        >
            <LandingContainer>
                <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-4">
                    <div data-landing-reveal="up" className="lg:pt-1">
                        <p className="text-[11px] font-medium tracking-[0.2em] text-[#e9648d] uppercase">
                            Nuestros servicios
                        </p>
                        <h2 className="mt-3 max-w-52 text-3xl leading-[0.95] font-black tracking-[-0.04em] sm:text-4xl">
                            Atencion Medica Especializada
                        </h2>
                    </div>

                    {featuredServices.slice(0, 3).map((service, index) => (
                        <ServiceCard
                            key={service.slug}
                            service={service}
                            index={index}
                        />
                    ))}

                    {/* <div className="hidden lg:block" /> */}

                    {featuredServices.slice(3).map((service, index) => (
                        <ServiceCard
                            key={service.slug}
                            service={service}
                            index={index + 3}
                        />
                    ))}

                    <article
                        data-landing-reveal="up"
                        data-landing-reveal-delay="270"
                        className="group relative min-h-[220px] overflow-hidden rounded-lg bg-[#e9648d] p-8 text-white transition duration-400 ease-in-out hover:-translate-y-1 hover:bg-[#d94e7a] hover:shadow-[0_18px_40px_rgba(21,35,74,0.12)] sm:col-span-2"
                    >
                        <div className="relative z-10 max-w-44">
                            <h3 className="text-2xl leading-tight font-semibold">
                                Conozca todos nuestros servicios
                            </h3>
                            <p className="mt-4 text-sm font-medium text-white/90">
                                Catálogo especializado
                            </p>
                            <Link
                                href="/servicios"
                                className="mt-7 inline-flex items-center gap-3 text-sm font-bold transition-colors hover:text-white/85"
                            >
                                Ver servicios
                                <span className="grid size-7 place-items-center rounded-full bg-white/25 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-[#e9648d]">
                                    <ArrowUpRight className="size-4" />
                                </span>
                            </Link>
                        </div>

                        <div className="absolute right-[-18px] bottom-[-46px] size-64 overflow-hidden rounded-full bg-white/15 sm:right-[-10px] sm:bottom-[-22px] sm:size-72">
                            <img
                                src="/images/Home/HomeServices1.png"
                                alt="Doctores de la clinica"
                                loading="lazy"
                                decoding="async"
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
    service,
    index,
}: {
    service: LandingService;
    index: number;
}) {
    return (
        <article
            data-landing-reveal="up"
            data-landing-reveal-delay={90 + index * 70}
            className="group flex min-h-[220px] flex-col justify-between rounded-lg border border-transparent bg-white p-7 shadow-[0_10px_30px_rgba(21,35,74,0.04)] transition duration-400 ease-in-out hover:border-[#e9648d] hover:shadow-[0_18px_40px_rgba(21,35,74,0.13)]"
        >
            <div>
                <div className="mb-7 size-11 overflow-hidden rounded-full bg-[#e9648d] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <img
                        src={service.image_url}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                            event.currentTarget.style.display = 'none';
                        }}
                        className="h-full w-full object-cover opacity-85"
                    />
                </div>
                <h3 className="text-base leading-[0.95] font-black">
                    {service.title}
                </h3>
                <p className="mt-3 text-sm leading-5 text-[#6f7080]">
                    {service.excerpt ?? service.description}
                </p>
            </div>
            <div>
                <Link
                    href={service.url}
                    className="mt-5 inline-flex items-center gap-3 text-xs font-bold text-[#e9648d] transition hover:text-[#c9003c]"
                >
                    Leer mas
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </article>
    );
}
