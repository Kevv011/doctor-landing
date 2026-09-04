import { Play } from 'lucide-react';
import { useState } from 'react';
import LandingContainer from '@/components/landing/landing-container';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const homeVideoUrl = '/videos/HomeVideo.mp4';

export default function HomeHeroSection() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section
            id="home-hero"
            data-navbar-hero
            className="relative isolate overflow-hidden bg-[#f26b96] text-white"
        >
            <img
                src="/images/Home/HomeHero.png"
                alt="Fondo del hero"
                className="absolute inset-0 -z-30 h-full w-full object-cover object-[52%_center]"
            />
            <img
                src="/images/Home/Doctors.png"
                alt="Doctores de Women's Health Clinic"
                className="pointer-events-none absolute bottom-0 left-1/2 -z-10 w-[210vw] max-w-none -translate-x-1/2 sm:w-[155vw] lg:w-[min(150vw,1520px)]"
            />

            <LandingContainer>
                <div className="grid min-h-[760px] items-center py-10 sm:py-14 lg:min-h-[820px] lg:grid-cols-[0.52fr_0.48fr] lg:py-0">
                    <div className="landing-hero-copy z-10 pt-28 pb-10 lg:pt-20">
                        <h1 className="max-w-lg text-4xl font-black leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                            Clinica medica para la mujer
                        </h1>
                        <p className="mt-5 max-w-md text-base leading-7 text-white/90 sm:text-lg">
                            Puedes realizar tu tratamiento ginecologico,
                            oncologico, estetico o tomar clases prenatales.
                        </p>

                        <Dialog
                            open={isVideoOpen}
                            onOpenChange={setIsVideoOpen}
                        >
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="landing-video-trigger mt-6 inline-flex min-w-52 items-center justify-center gap-3 rounded-xl bg-[#c9003c] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(122,0,38,0.25)] transition hover:scale-[1.02] hover:bg-[#ad0034]"
                                >
                                    <span>Ver video</span>
                                    <span className="grid size-7 place-items-center rounded-full border border-white">
                                        <Play className="ml-0.5 size-3.5 fill-white" />
                                    </span>
                                </button>
                            </DialogTrigger>
                            <DialogContent
                                overlayClassName="bg-[#09123f]/82 backdrop-blur-sm"
                                className="w-fit max-w-[calc(100vw-2rem)] gap-0 rounded-2xl border-[#f0d4df] bg-[#fff8fb] p-2 text-[#09123f] shadow-[0_28px_80px_rgba(9,18,63,0.32)] sm:p-3 [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:grid [&>[data-slot=dialog-close]]:size-9 [&>[data-slot=dialog-close]]:place-items-center [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:border [&>[data-slot=dialog-close]]:border-[#f0d4df] [&>[data-slot=dialog-close]]:bg-white [&>[data-slot=dialog-close]]:text-[#e9648d] [&>[data-slot=dialog-close]]:opacity-100 [&>[data-slot=dialog-close]]:shadow-[0_6px_16px_rgba(21,35,74,0.12)] [&>[data-slot=dialog-close]]:transition [&>[data-slot=dialog-close]]:hover:-translate-y-0.5 [&>[data-slot=dialog-close]]:hover:bg-[#fff0f7] [&>[data-slot=dialog-close]]:hover:text-[#c9003c]"
                            >
                                <div className="flex min-h-11 items-center px-3 pr-12">
                                    <DialogTitle className="text-sm font-black tracking-[-0.02em] text-[#09123f]">
                                        Conoce nuestra clínica
                                    </DialogTitle>
                                </div>
                                <DialogDescription className="sr-only">
                                    Video informativo de Women&apos;s Health Clinic.
                                </DialogDescription>
                                <div className="overflow-hidden rounded-xl border border-[#f0d4df] bg-[#09123f]">
                                    <video
                                        src={homeVideoUrl}
                                        className="block h-auto max-h-[76vh] w-auto max-w-full object-contain"
                                        controls
                                        autoPlay
                                        playsInline
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}
