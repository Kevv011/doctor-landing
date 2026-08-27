import { CirclePlus, Stethoscope, UserRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import LandingContainer from '@/components/landing/landing-container';

const experienceItems = [
    {
        icon: CirclePlus,
        tone: 'bg-[#e9648d]',
        title: '+10 años de experiencia y formacion en 5 paises.',
    },
    {
        icon: Stethoscope,
        tone: 'bg-[#df4daf]',
        title: 'Premios internacionales IOCIM',
        description: 'Achievement for a Better Life (2018) y Medical Success (2023)',
    },
    {
        icon: UserRound,
        tone: 'bg-[#eca2d8]',
        title: '+3,200 pacientes atendidos',
    },
];

export default function HomeExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section || !('IntersectionObserver' in window)) {
            setHasEnteredViewport(true);

            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setHasEnteredViewport(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35 },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white py-16 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] text-[#09123f] sm:py-20"
        >
            <LandingContainer>
                <div className="mx-auto max-w-4xl text-center">
                    <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                        Comprometidos con tu bienestar
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                        La experiencia que nos respalda
                    </h2>

                    <div className="mt-12 grid gap-10 sm:grid-cols-3">
                        {experienceItems.map((item, index) => (
                            <article
                                key={item.title}
                                className="mx-auto grid max-w-48 justify-items-center text-center"
                            >
                                <div
                                    className={`grid size-32 place-items-center rounded-full ${item.tone}`}
                                >
                                    <item.icon className="size-14 stroke-[#c9003c] stroke-[1.8]" />
                                </div>
                                <h3 className="mt-5 text-base font-black leading-[0.95]">
                                    {index === 0 ? (
                                        <>
                                            +
                                            <CountUp
                                                end={10}
                                                start={hasEnteredViewport}
                                            />{' '}
                                            años de experiencia y formacion en{' '}
                                            <CountUp
                                                end={5}
                                                start={hasEnteredViewport}
                                            />{' '}
                                            paises.
                                        </>
                                    ) : index === 2 ? (
                                        <>
                                            +
                                            <CountUp
                                                end={3200}
                                                start={hasEnteredViewport}
                                            />{' '}
                                            pacientes atendidos
                                        </>
                                    ) : (
                                        item.title
                                    )}
                                </h3>
                                {item.description && (
                                    <p className="mt-3 text-[11px] leading-tight text-[#6f7080]">
                                        {item.description}
                                    </p>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}

function CountUp({ end, start }: { end: number; start: boolean }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) {
            return;
        }

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (reduceMotion) {
            const frameId = window.requestAnimationFrame(() =>
                setValue(end),
            );

            return () => window.cancelAnimationFrame(frameId);
        }

        const duration = 1500;
        const startedAt = performance.now();
        let frameId = 0;

        const animate = (timestamp: number) => {
            const progress = Math.min((timestamp - startedAt) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setValue(Math.round(easedProgress * end));

            if (progress < 1) {
                frameId = window.requestAnimationFrame(animate);
            }
        };

        frameId = window.requestAnimationFrame(animate);

        return () => window.cancelAnimationFrame(frameId);
    }, [end, start]);

    return <span>{value.toLocaleString('en-US')}</span>;
}
