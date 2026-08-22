import { Link } from '@inertiajs/react';
import {
    CalendarDays,
    ChevronRight,
    Facebook,
    Headphones,
    Instagram,
    MapPin,
} from 'lucide-react';
import LandingContainer from '@/components/landing/landing-container';

const footerLinks = [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Testimoniales', href: '/#testimoniales' },
    { label: 'Agendar cita', href: '/contact#agendar-cita' },
];

export default function LandingFooter() {
    return (
        <footer className="[font-family:Poppins,ui-sans-serif,system-ui,sans-serif] text-white">
            <div className="bg-[#e06488] py-14 sm:py-16">
                <LandingContainer>
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.75fr_1.1fr_1fr] lg:gap-14">
                        <div>
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
                                href="tel:+50373451108"
                                className="mt-7 flex items-center gap-4 text-white transition hover:text-white/85"
                            >
                                <Headphones className="size-8 shrink-0 stroke-[1.8]" />
                                <span className="grid leading-tight">
                                    <span className="text-sm font-medium">
                                        Haz tu cita
                                    </span>
                                    <span className="text-xl font-black">
                                        +503 7345 1108
                                    </span>
                                </span>
                            </a>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Servicios</h2>
                            <nav className="mt-5 grid gap-3">
                                {footerLinks.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="inline-flex items-center gap-3 text-sm font-medium text-white/95 transition hover:text-white"
                                    >
                                        <ChevronRight className="size-4 stroke-[3]" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Dirección</h2>
                            <div className="mt-5 flex gap-4 text-sm font-medium leading-5 text-white/95">
                                <MapPin className="mt-1 size-5 shrink-0 fill-white stroke-white" />
                                <p className="uppercase">
                                    Hospital Avante Especializado, Paseo General
                                    Escalón #4920, primer nivel, clínica 5
                                    (contiguo a Hospital de Diagnóstico Escalón)
                                    San Salvador.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold">Horarios</h2>
                            <div className="mt-5 flex gap-4 text-sm font-medium leading-5 text-white/95">
                                <CalendarDays className="mt-0.5 size-5 shrink-0 fill-white stroke-white" />
                                <p className="uppercase">
                                    Martes a viernes: 10:30am a 6:00pm
                                    <br />
                                    Sábados: 10:00am a 2:00pm
                                </p>
                            </div>

                            <div className="mt-7 flex gap-3">
                                <a
                                    href="#"
                                    aria-label="Facebook"
                                    className="grid size-9 place-items-center rounded-full bg-white text-[#e06488] transition hover:bg-white/90"
                                >
                                    <Facebook className="size-5 fill-current stroke-0" />
                                </a>
                                <a
                                    href="#"
                                    aria-label="Instagram"
                                    className="grid size-9 place-items-center rounded-full bg-white text-[#e06488] transition hover:bg-white/90"
                                >
                                    <Instagram className="size-5 stroke-[2.4]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </LandingContainer>
            </div>

            <div className="bg-[#c00036] py-5 text-center text-xs font-medium">
                Copyright © 2026 Women's Health Clinic
            </div>
        </footer>
    );
}
