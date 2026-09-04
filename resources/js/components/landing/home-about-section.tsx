import { CheckCircle2 } from 'lucide-react';
import LandingContainer from '@/components/landing/landing-container';

const values = [
    'Etica profesional',
    'Calidad medica',
    'Enfoque humano',
    'Responsabilidad social',
    'Integridad',
];

export default function HomeAboutSection() {
    return (
        <section className="bg-[#fff0f7] py-16 text-[#20243a] sm:py-20 lg:py-24">
            <LandingContainer>
                <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
                    <div className="mx-auto grid max-w-3xl grid-cols-[0.9fr_1fr] items-start gap-3 sm:gap-5 lg:mx-0 lg:max-w-none">
                        <div className="grid gap-3 sm:gap-5">
                            <img
                                src="/images/Home/HomeAbout1.png"
                                alt="Especialista de Women's Health Clinic"
                                className="aspect-[1.16/1] w-full rounded-lg object-cover object-[center_18%]"
                            />
                            <img
                                src="/images/Home/HomeAbout2.png"
                                alt="Especialista de Women's Health Clinic"
                                className="aspect-[1.16/1] w-full rounded-lg object-cover object-[center_16%]"
                            />
                        </div>
                        <img
                            src="/images/Home/HomeAbout3.png"
                            alt="Ultrasonido realizado en la clínica"
                            className="aspect-[0.65/1] w-full rounded-lg object-cover object-[center_28%]"
                        />
                    </div>

                    <div className="mx-auto mt-12 max-w-3xl text-center sm:mt-16 lg:mx-0 lg:mt-0 lg:max-w-[470px] lg:text-left">
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

                        <div className="mt-6">
                            <p className="text-sm font-bold text-[#e9648d]">
                                Valores institucionales:
                            </p>
                            <div className="mx-auto mt-4 grid max-w-lg gap-x-10 gap-y-3 text-left sm:grid-cols-2 lg:mx-0">
                                {values.map((value) => (
                                    <div
                                        key={value}
                                        className="flex items-center gap-2 text-[13px] font-semibold text-[#15234a]"
                                    >
                                        <CheckCircle2 className="size-3.5 shrink-0 fill-[#e9648d] text-white" />
                                        {value}
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
