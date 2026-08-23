import { Play } from 'lucide-react';
import LandingContainer from '@/components/landing/landing-container';

export default function HomeHeroSection() {
    return (
        <section
            id="home-hero"
            data-navbar-hero
            className="relative isolate overflow-hidden bg-[#f26b96] text-white [font-family:Poppins,ui-sans-serif,system-ui,sans-serif]"
        >
            <img
                src="/images/Home/HomeHero.png"
                alt="Fondo del hero"
                className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.0)_0%,rgba(0,0,0,0.0)_38%,rgba(0,0,0,0.0)_100%)]" />

            <LandingContainer>
                <div className="grid min-h-[760px] items-center py-10 sm:py-14 lg:min-h-[820px] lg:grid-cols-[0.52fr_0.48fr] lg:py-0">
                    <div className="z-10 pt-28 pb-10 lg:pt-20">
                        <button
                            type="button"
                            className="mb-5 inline-flex items-center gap-3 text-sm font-semibold text-white/90 transition hover:text-white"
                        >
                            <span>Ver video</span>
                            <span className="grid size-12 place-items-center rounded-full border-2 border-white">
                                <Play className="ml-0.5 size-5 fill-white" />
                            </span>
                        </button>

                        <h1 className="max-w-lg text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                            Clinica medica para la mujer
                        </h1>
                        <p className="mt-5 max-w-md text-base leading-7 text-white/90 sm:text-lg">
                            Puedes realizar tu tratamiento ginecologico,
                            oncologico, estetico o tomar clases prenatales.
                        </p>
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}
