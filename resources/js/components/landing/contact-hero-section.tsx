import { Link } from '@inertiajs/react';
import LandingContainer from '@/components/landing/landing-container';

export default function ContactHeroSection() {
    return (
        <section
            data-navbar-hero
            className="relative isolate overflow-hidden bg-[#f26b96] py-32 text-white sm:py-40 lg:py-44"
        >
            <img
                src="/images/Contact/ContactHero1.png"
                alt="Fondo de contacto"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />

            <LandingContainer>
                <div className="mx-auto max-w-3xl pt-16 text-center">
                    <h1 className="text-5xl font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                        Contáctanos
                    </h1>
                    <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
                        Nuestro equipo está listo para orientarte y ayudarte a
                        programar tu próxima consulta.
                    </p>

                    <div className="mt-8 inline-flex items-center gap-3 rounded-sm bg-[#09123f]/65 px-6 py-3 text-sm font-semibold shadow-[0_16px_36px_rgba(21,35,74,0.18)] backdrop-blur-sm">
                        <Link href="/" className="transition hover:text-white/80">
                            Inicio
                        </Link>
                        <span className="text-white/50">-</span>
                        <span>Contacto</span>
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}
