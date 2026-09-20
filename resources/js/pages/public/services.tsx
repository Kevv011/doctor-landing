import { Link } from '@inertiajs/react';
import { ChevronRight, Search, X } from 'lucide-react';
import BlogImageCarousel from '@/components/landing/blog-image-carousel';
import LandingContainer from '@/components/landing/landing-container';
import LandingFooter from '@/components/landing/landing-footer';
import LandingHeroImage from '@/components/landing/landing-hero-image';
import LandingPagination from '@/components/landing/landing-pagination';
import type { LandingPaginationLink } from '@/components/landing/landing-pagination';
import PublicSeo from '@/components/landing/public-seo';
import type { LandingService } from '@/types/landing-service';

type PaginatedServices = {
    data: LandingService[];
    links: LandingPaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    services: PaginatedServices;
    filters: {
        search: string;
    };
};

export default function Services({ services, filters }: Props) {
    return (
        <>
            <PublicSeo
                title="Servicios médicos especializados | Women’s Health Clinic"
                description="Conoce nuestros servicios de ginecología, obstetricia, gineco-oncología, ultrasonidos y acompañamiento prenatal."
                canonicalPath="/servicios"
                schema={{
                    '@type': 'MedicalWebPage',
                    name: 'Servicios médicos especializados',
                    url: '/servicios',
                }}
            />

            <main className="min-h-screen bg-[#fff0f7] text-[#09123f]">
                <ServicesHeroSection />
                <ServicesCatalogSection services={services} filters={filters} />
                <LandingFooter />
            </main>
        </>
    );
}

function ServicesHeroSection() {
    return (
        <section
            data-navbar-hero
            className="relative isolate overflow-hidden py-32 text-white sm:py-40 lg:py-44"
        >
            <LandingHeroImage
                src="/images/Services/ServicesHero.png"
                webpSrc="/images/Services/ServicesHero.webp"
                alt="Servicios de Women's Health Clinic"
                className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-[#09123f]/10" />

            <LandingContainer>
                <div className="mx-auto max-w-3xl pt-16 text-center">
                    <h1
                        data-landing-reveal="up"
                        className="text-5xl font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl"
                    >
                        Servicios
                    </h1>
                    <p
                        data-landing-reveal="up"
                        data-landing-reveal-delay="90"
                        className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/90 sm:text-base"
                    >
                        Atención médica especializada, humana y cercana para
                        cuidar tu salud en cada etapa.
                    </p>

                    <div
                        data-landing-reveal="up"
                        data-landing-reveal-delay="180"
                        className="mt-8 inline-flex items-center gap-3 rounded-sm bg-[#09123f]/65 px-6 py-3 text-sm font-semibold shadow-[0_16px_36px_rgba(21,35,74,0.18)] backdrop-blur-sm"
                    >
                        <Link
                            href="/"
                            className="transition hover:text-white/80"
                        >
                            Inicio
                        </Link>
                        <span className="text-white/50">-</span>
                        <span>Servicios</span>
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}

function ServicesCatalogSection({
    services,
    filters,
}: {
    services: PaginatedServices;
    filters: Props['filters'];
}) {
    return (
        <section
            id="servicios"
            className="scroll-mt-24 bg-[#fff0f7] py-16 text-[#09123f] sm:scroll-mt-28 sm:py-20 lg:py-24"
        >
            <LandingContainer>
                <div
                    data-landing-reveal="up"
                    className="mx-auto max-w-3xl text-center"
                >
                    <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                        Nuestros servicios
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                        Atención médica especializada
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6f7080] sm:text-base">
                        Unimos experiencia médica, prevención y trato humano
                        para acompañarte con claridad desde la primera consulta.
                    </p>
                </div>

                <SearchCard search={filters.search} />

                {services.data.length === 0 ? (
                    <div
                        data-landing-reveal="up"
                        className="mt-10 rounded-lg bg-white p-10 text-center text-[#6f7080] shadow-[0_12px_35px_rgba(21,35,74,0.04)]"
                    >
                        {filters.search
                            ? 'No encontramos servicios con ese título.'
                            : 'No hay servicios publicados por el momento.'}
                    </div>
                ) : (
                    <>
                        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
                            {services.data.map((service, index) => (
                                <ServiceCard
                                    key={service.slug}
                                    service={service}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div
                            data-landing-reveal="up"
                            className="mt-10 flex flex-col gap-3 text-sm text-[#6f7080] sm:flex-row sm:items-center sm:justify-between"
                        >
                            <p>
                                Mostrando {services.from ?? 0} a{' '}
                                {services.to ?? 0} de {services.total} servicios
                            </p>

                            <LandingPagination links={services.links} />
                        </div>
                    </>
                )}
            </LandingContainer>
        </section>
    );
}

function SearchCard({ search }: { search: string }) {
    return (
        <div
            data-landing-reveal="up"
            data-landing-reveal-delay="100"
            className="mx-auto mt-10 max-w-2xl rounded-lg bg-white p-5 shadow-[0_12px_35px_rgba(21,35,74,0.04)] sm:p-7"
        >
            <form action="/servicios" method="get" className="flex gap-3">
                <label htmlFor="services-search" className="sr-only">
                    Buscar servicio por título
                </label>
                <input
                    id="services-search"
                    name="search"
                    type="search"
                    defaultValue={search}
                    placeholder="Buscar servicio por título..."
                    className="min-h-12 flex-1 rounded-md border border-[#f0a8bf] bg-white px-4 text-sm text-[#09123f] transition outline-none focus:border-[#e9648d] focus:ring-4 focus:ring-[#e9648d]/15"
                />
                <button
                    type="submit"
                    className="landing-action grid min-h-12 min-w-12 place-items-center rounded-md bg-[#e9648d] text-white hover:bg-[#c9003c]"
                    aria-label="Buscar"
                >
                    <Search className="size-5" />
                </button>

                {search && (
                    <Link
                        href="/servicios"
                        className="grid min-h-12 min-w-12 place-items-center rounded-md border border-[#f0a8bf] bg-white text-[#e9648d] transition duration-300 hover:-translate-y-0.5 hover:border-[#e9648d] hover:bg-[#fff0f7]"
                        aria-label="Limpiar búsqueda"
                    >
                        <X className="size-5" />
                    </Link>
                )}
            </form>
            <p className="mt-3 text-center text-xs text-[#6f7080] sm:text-left">
                Busca rápidamente por nombre del servicio.
            </p>
        </div>
    );
}

function ServiceCard({
    service,
    index,
}: {
    service: LandingService;
    index: number;
}) {
    const galleryImages = service.gallery_image_urls ?? [];
    const images =
        galleryImages.length > 0 ? galleryImages : [service.image_url];

    return (
        <article
            data-landing-reveal="up"
            data-landing-reveal-delay={Math.min(index * 70, 420)}
            className="group overflow-hidden rounded-lg bg-white shadow-[0_12px_35px_rgba(21,35,74,0.04)] transition duration-400 ease-in-out hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(21,35,74,0.1)]"
        >
            <div className="relative h-40 overflow-hidden bg-[#d9d9d9] sm:h-44">
                <BlogImageCarousel
                    images={images}
                    alt={service.title}
                    className="h-full w-full transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#e9648d]/0 transition duration-300 group-hover:bg-[#e9648d]/25" />
                <div className="pointer-events-none absolute top-0 right-0 grid grid-cols-3 gap-1 p-4 opacity-80">
                    {[0, 1, 2, 3, 4].map((square) => (
                        <span key={square} className="size-3 bg-white" />
                    ))}
                </div>
            </div>

            <div className="flex min-h-[190px] flex-col justify-between p-7">
                <div>
                    <h3 className="text-base leading-[0.98] font-black">
                        {service.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-5 text-[#6f7080]">
                        {service.excerpt ?? service.description}
                    </p>
                </div>

                <Link
                    href={service.url}
                    className="mt-6 inline-flex items-center gap-3 text-xs font-bold text-[#e9648d] transition hover:text-[#c9003c]"
                >
                    Leer más
                    <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </article>
    );
}
