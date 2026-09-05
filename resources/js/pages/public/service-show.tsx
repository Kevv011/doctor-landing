import { Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    AtSign,
    CalendarCheck,
    ChevronRight,
    Facebook,
    Hash,
    Instagram,
    Linkedin,
    MessageCircle,
    Music2,
    Twitter,
    Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import LandingContainer from '@/components/landing/landing-container';
import LandingFooter from '@/components/landing/landing-footer';
import PublicSeo from '@/components/landing/public-seo';
import { useBusiness } from '@/hooks/use-business';
import type { LandingService } from '@/types/landing-service';

type Props = {
    service: LandingService;
    relatedServices: LandingService[];
};

const socialIcons: Record<string, LucideIcon> = {
    facebook: Facebook,
    instagram: Instagram,
    tiktok: Music2,
    whatsapp: MessageCircle,
    youtube: Youtube,
    linkedin: Linkedin,
    x: Twitter,
    threads: Hash,
};

export default function ServiceShow({ service, relatedServices }: Props) {
    const paragraphs = serviceDescriptionParagraphs(service);

    return (
        <>
            <PublicSeo
                title={`${service.seo_title ?? service.title} | Women’s Health Clinic`}
                description={
                    service.seo_description ??
                    service.excerpt ??
                    'Servicio especializado de Women’s Health Clinic.'
                }
                canonicalPath={service.url}
                imagePath={service.image_url}
                schema={{
                    '@type': 'MedicalWebPage',
                    name: service.title,
                    description: service.excerpt ?? service.description,
                    url: service.url,
                }}
            />

            <main className="min-h-screen bg-[#fff0f7] text-[#09123f]">
                <ServiceDetailHero title={service.title} />

                <section className="bg-[#fff0f7] py-16 sm:py-20 lg:py-24">
                    <LandingContainer>
                        <BackButton />

                        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
                            <article className="landing-reveal-down overflow-hidden rounded-lg bg-white p-3 shadow-[0_18px_45px_rgba(21,35,74,0.04)] sm:p-4 lg:p-5">
                                <div className="relative min-h-[260px] overflow-hidden rounded-md bg-[#f6dce8] sm:min-h-[380px] lg:min-h-[430px]">
                                    <img
                                        src={service.image_url}
                                        alt={service.title}
                                        onError={(event) => {
                                            event.currentTarget.src =
                                                '/images/Services/ServicesDefault.png';
                                        }}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="pointer-events-none absolute top-0 right-0 grid grid-cols-3 gap-1 p-5 opacity-80">
                                        {[0, 1, 2, 3, 4].map((square) => (
                                            <span
                                                key={square}
                                                className="size-3 bg-white sm:size-4"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="px-2 py-7 sm:px-3 lg:px-4">
                                    <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                                        Servicio especializado
                                    </p>
                                    <h1 className="mt-3 text-3xl leading-tight font-black tracking-[-0.04em] text-[#09123f] sm:text-4xl">
                                        {service.title}
                                    </h1>
                                    {service.excerpt && (
                                        <p className="mt-5 text-base leading-8 text-[#6f7080]">
                                            {service.excerpt}
                                        </p>
                                    )}

                                    {paragraphs.length > 0 && (
                                        <div className="mt-8 space-y-5 text-sm leading-8 text-[#6f7080] sm:text-base">
                                            {paragraphs.map((paragraph) => (
                                                <p key={paragraph}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    {service.tags.length > 0 && (
                                        <div className="mt-10">
                                            <h2 className="text-lg font-black">
                                                Temas relacionados
                                            </h2>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {service.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-md bg-[#e9648d] px-5 py-3 text-sm font-semibold text-white"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>

                            <ServiceDetailSidebar
                                relatedServices={relatedServices}
                            />
                        </div>
                    </LandingContainer>
                </section>

                <LandingFooter />
            </main>
        </>
    );
}

function ServiceDetailHero({ title }: { title: string }) {
    return (
        <section
            data-navbar-hero
            className="relative isolate overflow-hidden py-32 text-white sm:py-40 lg:py-44"
        >
            <img
                src="/images/Services/ServicesHeroDetail.png"
                alt=""
                onError={(event) => {
                    event.currentTarget.style.display = 'none';
                }}
                className="absolute inset-0 -z-20 h-full w-full object-cover opacity-75"
            />
            <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-[linear-gradient(180deg,rgba(9,18,63,0.2)_0%,rgba(9,18,63,0.1)_44%,rgba(9,18,63,0)_100%)] sm:h-56 lg:h-64" />

            <LandingContainer>
                <div className="mx-auto max-w-4xl pt-16 text-center">
                    <h1 className="landing-hero-copy text-4xl leading-[0.95] font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                        {title}
                    </h1>

                    <div className="landing-hero-copy mt-8 inline-flex items-center gap-3 rounded-sm bg-[#09123f]/65 px-6 py-3 text-sm font-semibold shadow-[0_16px_36px_rgba(21,35,74,0.18)] backdrop-blur-sm">
                        <Link
                            href="/"
                            className="transition hover:text-white/80"
                        >
                            Inicio
                        </Link>
                        <span className="text-white/50">-</span>
                        <Link
                            href="/servicios"
                            className="transition hover:text-white/80"
                        >
                            Servicios
                        </Link>
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}

function BackButton() {
    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            window.history.back();

            return;
        }

        router.visit('/servicios');
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-3 rounded-full border border-[#f0d4df] bg-white px-5 py-3 text-sm font-semibold text-[#e9648d] shadow-[0_12px_30px_rgba(21,35,74,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#e9648d] hover:text-[#c9003c] hover:shadow-[0_18px_40px_rgba(21,35,74,0.1)]"
        >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Volver
        </button>
    );
}

function ServiceDetailSidebar({
    relatedServices,
}: {
    relatedServices: LandingService[];
}) {
    const business = useBusiness();

    return (
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {relatedServices.length > 0 && (
                <SidebarCard title="Otros servicios">
                    <nav className="grid gap-3 text-sm font-semibold">
                        {relatedServices.map((service) => (
                            <Link
                                key={service.slug}
                                href={service.url}
                                className="group flex items-center gap-3 rounded-md px-3 py-2 text-[#09123f] transition hover:bg-[#fff0f7] hover:text-[#e9648d]"
                            >
                                <ChevronRight className="size-4 shrink-0 text-[#e9648d] transition-transform group-hover:translate-x-0.5" />
                                {service.title}
                            </Link>
                        ))}
                    </nav>
                </SidebarCard>
            )}

            <SidebarCard title="Agenda tu cita">
                <div className="text-center">
                    <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#e9648d] text-white">
                        <CalendarCheck className="size-7 stroke-[1.9]" />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#6f7080]">
                        Si este servicio se adapta a lo que necesitas, podemos
                        orientarte y ayudarte a programar tu consulta.
                    </p>
                    <Link
                        href="/contact#agendar-cita"
                        className="mt-5 inline-flex items-center gap-3 rounded-md bg-[#e9648d] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c9003c]"
                    >
                        Hacer cita
                        <ChevronRight className="size-4" />
                    </Link>
                </div>
            </SidebarCard>

            {business.social_links.length > 0 && (
                <SidebarCard title="Síguenos">
                    <div className="flex justify-center gap-3">
                        {business.social_links.map((socialLink) => {
                            const SocialIcon =
                                socialIcons[socialLink.platform] ?? AtSign;

                            return (
                                <a
                                    key={`${socialLink.platform}-${socialLink.url}`}
                                    href={socialLink.url}
                                    aria-label={
                                        socialLink.label ?? socialLink.platform
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="grid size-10 place-items-center rounded-full bg-[#e9648d] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#c9003c]"
                                >
                                    <SocialIcon className="size-5 stroke-[2.4]" />
                                </a>
                            );
                        })}
                    </div>
                </SidebarCard>
            )}
        </aside>
    );
}

function SidebarCard({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="landing-reveal-down rounded-lg bg-white px-7 py-8 text-[#09123f] shadow-[0_12px_35px_rgba(21,35,74,0.04)]">
            <h2 className="text-center text-base font-black">{title}</h2>
            <div className="mx-auto my-5 h-px w-48 max-w-full bg-[#e9648d]" />
            {children}
        </section>
    );
}

function serviceDescriptionParagraphs(service: LandingService): string[] {
    return (service.description ?? '')
        .split(/\n{2,}|\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}
