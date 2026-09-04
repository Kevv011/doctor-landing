import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    AtSign,
    CalendarClock,
    CircleChevronRight,
    Facebook,
    Hash,
    Instagram,
    Linkedin,
    MapPinned,
    MessageCircle,
    Music2,
    PhoneCall,
    Twitter,
    Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import LandingContainer from '@/components/landing/landing-container';
import {
    businessHourText,
    businessPhoneHref,
    useBusiness,
} from '@/hooks/use-business';

const footerLinks = [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Testimoniales', href: '/#testimoniales' },
    { label: 'Agendar cita', href: '/contact#agendar-cita' },
];

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

type LandingFooterProps = {
    overlapPrevious?: boolean;
};

export default function LandingFooter({
    overlapPrevious = false,
}: LandingFooterProps) {
    const business = useBusiness();
    const appointmentPhone =
        business.profile.appointment_phone || business.profile.phone;
    const spacingClass = overlapPrevious ? '' : 'mt-28 sm:mt-32 lg:mt-40';

    return (
        <footer
            className={`relative isolate bg-[#e06488] text-white ${spacingClass}`}
        >
            <div className="relative z-10">
                <LandingContainer>
                    <div className="relative">
                        <section className="absolute inset-x-0 top-0 z-20 -translate-y-1/2 overflow-hidden rounded-lg bg-[#ff91ad] px-7 py-11 shadow-[0_24px_56px_rgba(21,35,74,0.18)] sm:px-12 sm:py-14 md:min-h-[250px] md:px-14 lg:min-h-[260px] lg:px-16 lg:py-12">
                            <img
                                src="/images/Home/Doctors.png"
                                alt="Especialistas de Women's Health Clinic"
                                className="pointer-events-none absolute bottom-0 left-[-4.5rem] hidden w-[410px] max-w-none md:block lg:left-[-7.5rem] lg:w-[560px] xl:left-[-6rem] xl:w-[590px]"
                            />
                            <div className="relative z-10 mx-auto max-w-xl text-center md:ml-[39%] md:max-w-[420px] md:text-left lg:ml-[42%] lg:max-w-[520px] xl:ml-[40%]">
                                <p className="text-[11px] tracking-normal text-white/85 uppercase">
                                    Agenda tu cita
                                </p>
                                <h2 className="mt-3 text-3xl leading-[1.04] font-medium tracking-normal sm:text-4xl md:text-3xl lg:text-4xl">
                                    Atención médica cercana para ti
                                </h2>
                                <Link
                                    href="/contact#agendar-cita"
                                    className="group mt-7 inline-flex items-center gap-4 text-sm font-medium transition hover:text-white/85"
                                >
                                    Reservar una consulta
                                    <span className="grid size-11 place-items-center rounded-full border border-white transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-[#e9648d]">
                                        <ArrowUpRight className="size-5" />
                                    </span>
                                </Link>
                            </div>
                            <div className="pointer-events-none absolute right-6 bottom-5 grid grid-cols-3 gap-1 opacity-70 sm:right-10 sm:bottom-8">
                                {[0, 1, 2, 3, 4].map((square) => (
                                    <span
                                        key={square}
                                        className="size-3 bg-white sm:size-4"
                                    />
                                ))}
                            </div>
                        </section>

                        <div className="grid justify-items-center gap-x-12 gap-y-11 pt-[10rem] pb-14 text-center md:grid-cols-2 md:pt-[11rem] lg:grid-cols-[1.25fr_0.75fr_1.05fr_1fr] lg:justify-items-start lg:gap-16 lg:pt-[11rem] lg:pb-16 lg:text-left">
                            <div className="flex flex-col items-center lg:items-start">
                                <Link
                                    href="/"
                                    className="inline-flex max-w-64 rounded-sm transition hover:opacity-85"
                                >
                                    <img
                                        src="/images/filled-logo-2.png"
                                        alt="Women's Health Clinic"
                                        className="h-auto w-full object-contain"
                                    />
                                </Link>

                                <a
                                    href={businessPhoneHref(appointmentPhone)}
                                    className="group mt-7 inline-flex flex-col items-center gap-3 text-center text-white transition hover:text-white/85 sm:flex-row sm:gap-4 sm:text-left"
                                >
                                    <PhoneCall className="size-8 shrink-0 stroke-[2.1] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]" />
                                    <span className="grid leading-tight">
                                        <span className="text-sm font-medium">
                                            Haz tu cita
                                        </span>
                                        <span className="text-xl font-medium">
                                            {appointmentPhone}
                                        </span>
                                    </span>
                                </a>
                            </div>

                            <div>
                                <h2 className="text-xl font-medium">
                                    Servicios
                                </h2>
                                <nav className="mt-5 grid justify-center gap-3">
                                    {footerLinks.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="group inline-flex items-center gap-3 text-sm font-normal text-white/95 transition hover:text-white"
                                        >
                                            <CircleChevronRight className="size-4 stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div>
                                <h2 className="text-xl font-medium">
                                    Dirección
                                </h2>
                                <div className="mx-auto mt-5 flex max-w-sm flex-col items-center gap-3 text-center text-sm leading-5 font-normal text-white/95 sm:max-w-md lg:mx-0 lg:flex-row lg:items-start lg:text-left">
                                    <MapPinned className="mt-0.5 size-6 shrink-0 stroke-[2.1]" />
                                    <p className="uppercase">
                                        {business.profile.address}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-medium">
                                    Horarios
                                </h2>
                                <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center text-sm leading-5 font-normal text-white/95 lg:flex-row lg:items-start lg:text-left">
                                    <CalendarClock className="mt-0.5 size-6 shrink-0 stroke-[2.1]" />
                                    <p className="uppercase">
                                        {business.hours.map((hour) => (
                                            <span
                                                key={`${hour.label}-${hour.sort_order}`}
                                                className="block"
                                            >
                                                {hour.label}
                                                {businessHourText(
                                                    hour.opens_at,
                                                    hour.closes_at,
                                                ) && (
                                                    <>
                                                        :{' '}
                                                        {businessHourText(
                                                            hour.opens_at,
                                                            hour.closes_at,
                                                        )}
                                                    </>
                                                )}
                                                {hour.special_text && (
                                                    <> · {hour.special_text}</>
                                                )}
                                            </span>
                                        ))}
                                    </p>
                                </div>

                                {business.social_links.length > 0 && (
                                    <div className="mt-7 flex justify-center gap-3 lg:justify-start">
                                        {business.social_links.map(
                                            (socialLink) => {
                                                const SocialIcon =
                                                    socialIcons[
                                                        socialLink.platform
                                                    ] ?? AtSign;

                                                return (
                                                    <a
                                                        key={`${socialLink.platform}-${socialLink.url}`}
                                                        href={socialLink.url}
                                                        aria-label={
                                                            socialLink.label ??
                                                            socialLink.platform
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="grid size-10 place-items-center rounded-full bg-white text-[#e06488] transition duration-300 hover:-translate-y-1 hover:bg-[#fff0f7] hover:text-[#c9003c]"
                                                    >
                                                        <SocialIcon className="size-5 stroke-[2.4]" />
                                                    </a>
                                                );
                                            },
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </LandingContainer>
            </div>

            <div className="relative bg-[#c9003c] py-5 text-center text-xs font-medium text-white/90">
                Copyright © 2026 {business.profile.name}
            </div>
        </footer>
    );
}
