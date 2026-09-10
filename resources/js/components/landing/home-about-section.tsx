import {
    HeartHandshake,
    Scale,
    ShieldCheck,
    Stethoscope,
    UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import LandingContainer from '@/components/landing/landing-container';

const values: { label: string; icon: LucideIcon }[] = [
    { label: 'Ética profesional', icon: ShieldCheck },
    { label: 'Calidad médica', icon: Stethoscope },
    { label: 'Enfoque humano', icon: HeartHandshake },
    { label: 'Responsabilidad social', icon: UsersRound },
    { label: 'Integridad', icon: Scale },
];

export default function HomeAboutSection() {
    return (
        <section className="bg-[#fff0f7] py-16 text-[#20243a] sm:py-20 lg:py-24">
            <LandingContainer>
                <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
                    <div
                        data-landing-reveal="up"
                        className="mx-auto grid max-w-3xl grid-cols-[0.9fr_1fr] items-start gap-3 sm:gap-5 lg:mx-0 lg:max-w-none"
                    >
                        <div className="grid gap-3 sm:gap-5">
                            <img
                                src="/images/Home/HomeAbout1.png"
                                alt="Especialista de Women's Health Clinic"
                                loading="lazy"
                                decoding="async"
                                className="aspect-[1.16/1] w-full rounded-lg object-cover object-[center_18%]"
                            />
                            <img
                                src="/images/Home/HomeAbout2.png"
                                alt="Especialista de Women's Health Clinic"
                                loading="lazy"
                                decoding="async"
                                className="aspect-[1.16/1] w-full rounded-lg object-cover object-[center_16%]"
                            />
                        </div>
                        <img
                            src="/images/Home/HomeAbout3.png"
                            alt="Ultrasonido realizado en la clínica"
                            loading="lazy"
                            decoding="async"
                            className="aspect-[0.65/1] w-full rounded-lg object-cover object-[center_28%]"
                        />
                    </div>

                    <div
                        data-landing-reveal="up"
                        data-landing-reveal-delay="100"
                        className="mx-auto mt-12 max-w-3xl text-center sm:mt-16 lg:mx-0 lg:mt-0 lg:max-w-[470px] lg:text-left"
                    >
                        <p className="text-[11px] font-bold tracking-[0.28em] text-[#e9648d] uppercase">
                            Quienes somos
                        </p>
                        <h2 className="mx-auto mt-3 max-w-xl text-3xl leading-[0.98] font-black tracking-[-0.04em] text-[#09123f] sm:text-4xl lg:mx-0">
                            Cuidamos tu salud en cada etapa de tu vida
                        </h2>
                        <div className="mx-auto mt-5 flex h-22 w-50 items-center justify-center rounded-lg text-center text-sm font-black tracking-[0.16em] uppercase lg:mx-0 lg:justify-start">
                            <img
                                src="/images/filled-logo.png"
                                alt="Women's Health Clinic AR&CO"
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="mt-6 space-y-4 text-sm leading-6 text-[#6f7080] sm:text-base sm:leading-7">
                            <p>
                                <strong className="font-bold text-[#e9648d]">
                                    Mision:
                                </strong>{' '}
                                Brindar atencion ginecologica integral, etica y
                                humana basada en evidencia, enfocandonos en la
                                prevencion, el diagnostico oportuno y la salud
                                integral de la mujer en cada etapa de su vida.
                            </p>
                            <p>
                                <strong className="font-bold text-[#e9648d]">
                                    Vision:
                                </strong>{' '}
                                Ser la clinica de referencia en salud femenina,
                                reconocida por la excelencia medica, la
                                innovacion y el acompanamiento humano y digno a
                                nuestra comunidad.
                            </p>
                        </div>

                        <div className="mt-8">
                            <p className="text-[11px] font-medium tracking-[0.2em] text-[#e9648d] uppercase">
                                Valores institucionales
                            </p>
                            <h3 className="mt-2 text-lg font-semibold text-[#09123f]">
                                Principios que guían nuestra atención
                            </h3>
                            <div className="mx-auto mt-5 flex max-w-lg flex-wrap justify-center gap-3 lg:mx-0 lg:justify-start">
                                {values.map(({ label, icon: ValueIcon }) => (
                                    <div
                                        key={label}
                                        className="group flex min-h-24 w-[calc(50%_-_0.375rem)] flex-col items-center justify-center gap-2 rounded-xl border border-[#f2c5d6] bg-white/70 px-3 py-4 text-center shadow-[0_10px_26px_rgba(92,30,61,0.045)] transition duration-400 hover:-translate-y-1 hover:border-[#e9648d] hover:bg-white hover:shadow-[0_16px_32px_rgba(92,30,61,0.1)] sm:w-[calc(33.333%_-_0.5rem)] lg:w-[calc(50%_-_0.375rem)] lg:flex-row lg:justify-start lg:text-left"
                                    >
                                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#fde1ec] text-[#e45d86] transition duration-400 group-hover:bg-[#e9648d] group-hover:text-white">
                                            <ValueIcon className="size-4.5 stroke-[1.9]" />
                                        </span>
                                        <span className="text-xs leading-4.5 font-medium text-[#15234a]">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}
