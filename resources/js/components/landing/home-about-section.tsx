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
        <section className="bg-[#fff0f7] py-16 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] text-[#20243a] sm:py-20 lg:py-24">
            <LandingContainer>
                <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
                    <div className="grid gap-4 sm:grid-cols-[0.9fr_1fr]">
                        <div className="grid gap-4">
                            <img
                                src="/images/Home/HomeAbout1.png"
                                alt="Foto doctor"
                                className="h-56 w-full rounded-lg object-cover sm:h-60"
                            />
                            <img
                                src="/images/Home/HomeAbout2.png"
                                alt="Foto doctor"
                                className="h-56 w-full rounded-lg object-cover sm:h-60"
                            />
                        </div>
                        <img
                            src="/images/Home/HomeAbout3.png"
                            alt="Foto doctor"
                            className="h-72 w-full rounded-lg object-cover sm:h-full"
                        />
                    </div>

                    <div className="max-w-[470px]">
                        <p className="text-[11px] font-bold tracking-[0.28em] text-[#e9648d] uppercase">
                            Quienes somos
                        </p>
                        <div className="mt-3 flex h-22 w-50 items-center justify-start rounded-lg text-center text-sm font-black tracking-[0.16em] uppercase">
                            <img
                                src="/images/filled-logo.png"
                                alt="Logo marca"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="mt-5 space-y-4 text-sm leading-6 text-[#6f7080]">
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
                            <div className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
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
