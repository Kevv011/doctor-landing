import useEmblaCarousel from 'embla-carousel-react';
import { Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import LandingContainer from '@/components/landing/landing-container';

export type LandingTestimonial = {
    id: number;
    name: string;
    label: string;
    quote: string;
    rating: number;
    avatar_url?: string | null;
};

const defaultTestimonials: LandingTestimonial[] = [
    {
        id: 1,
        name: 'Nombre Apellido',
        label: 'Paciente',
        quote: 'Quisquam est rui dolorem ipsum rui dolor sit amet, consectetur, adipise velit sed quia non numquam eiusm tempora incidunt ut labore',
        rating: 5,
    },
    {
        id: 2,
        name: 'Nombre Apellido',
        label: 'Paciente',
        quote: 'Quisquam est rui dolorem ipsum rui dolor sit amet, consectetur, adipise velit sed quia non numquam eiusm tempora incidunt ut labore',
        rating: 5,
    },
    {
        id: 3,
        name: 'Nombre Apellido',
        label: 'Paciente',
        quote: 'Quisquam est rui dolorem ipsum rui dolor sit amet, consectetur, adipise velit sed quia non numquam eiusm tempora incidunt ut labore',
        rating: 5,
    },
    {
        id: 4,
        name: 'Nombre Apellido',
        label: 'Paciente',
        quote: 'Quisquam est rui dolorem ipsum rui dolor sit amet, consectetur, adipise velit sed quia non numquam eiusm tempora incidunt ut labore',
        rating: 5,
    },
];

type Props = {
    testimonials?: LandingTestimonial[];
};

export default function HomeTestimonialsSection({
    testimonials = defaultTestimonials,
}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        loop: true,
        slidesToScroll: 'auto',
    });
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        const updateCarouselState = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
            setScrollSnaps(emblaApi.scrollSnapList());
        };

        updateCarouselState();
        emblaApi.on('select', updateCarouselState);
        emblaApi.on('reInit', updateCarouselState);

        return () => {
            emblaApi.off('select', updateCarouselState);
            emblaApi.off('reInit', updateCarouselState);
        };
    }, [emblaApi]);

    useEffect(() => {
        if (
            !emblaApi ||
            isAutoplayPaused ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        const autoplayInterval = window.setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, 10_000);

        return () => window.clearInterval(autoplayInterval);
    }, [emblaApi, isAutoplayPaused]);

    return (
        <section
            id="testimoniales"
            className="relative scroll-mt-24 overflow-hidden bg-white py-12 text-[#09123f] sm:scroll-mt-28"
        >
            <div className="pointer-events-none absolute right-[8%] top-12 hidden text-[#f7ddea] lg:block">
                <svg
                    width="120"
                    height="170"
                    viewBox="0 0 120 170"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M91 67C91 35 76 16 58 16C40 16 26 35 26 67"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                    />
                    <path
                        d="M22 138C24 101 42 86 59 111C75 86 94 101 98 138"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <LandingContainer>
                <div className="mx-auto max-w-5xl">
                    <div className="text-center">
                        <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                            Testimonios
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                            La voz de nuestras pacientes
                        </h2>
                    </div>

                    <div
                        className="-mx-4 mt-12 overflow-hidden px-8 py-12 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
                        ref={emblaRef}
                        onMouseEnter={() => setIsAutoplayPaused(true)}
                        onMouseLeave={() => setIsAutoplayPaused(false)}
                        onFocusCapture={() => setIsAutoplayPaused(true)}
                        onBlurCapture={() => setIsAutoplayPaused(false)}
                    >
                        <div className="-ml-6 flex touch-pan-y">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-2">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Ver grupo de testimonios ${index + 1}`}
                                onClick={() => emblaApi?.scrollTo(index)}
                                className={`size-3 rounded-full transition-all duration-300 hover:scale-110 ${
                                    selectedIndex === index
                                        ? 'bg-[#e9648d]'
                                        : 'bg-[#cfd4df]'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </LandingContainer>
        </section>
    );
}

function TestimonialCard({
    testimonial,
}: {
    testimonial: LandingTestimonial;
}) {
    return (
        <article className="group min-h-[294px] rounded-lg bg-white p-8 shadow-[0_16px_45px_rgba(21,35,74,0.045)] transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(21,35,74,0.09)]">
            <div className="grid size-9 place-items-center rounded-full border border-[#e9648d] text-[#e9648d] transition duration-300 group-hover:bg-[#fff0f7]">
                <Quote className="size-4" />
            </div>

            <p className="mt-5 text-sm leading-6 text-[#6f7080]">
                {testimonial.quote}
            </p>

            <div className="mt-6 flex items-center gap-4">
                {testimonial.avatar_url ? (
                    <img
                        src={testimonial.avatar_url}
                        alt={testimonial.name}
                        className="size-10 rounded-full object-cover"
                    />
                ) : (
                    <img
                        src="/images/user-vneck-hair-long.png"
                        alt="Avatar por defecto"
                        className="size-10 rounded-full object-cover"
                    />
                )}

                <div>
                    <div
                        className="text-xs leading-none text-[#ffbf1f]"
                        aria-label={`${testimonial.rating} de 5 estrellas`}
                    >
                        {'★'.repeat(testimonial.rating)}
                    </div>
                    <p className="mt-1 text-sm font-bold text-[#e9648d]">
                        {testimonial.name}
                    </p>
                    <p className="text-xs text-[#6f7080]">
                        {testimonial.label}
                    </p>
                </div>
            </div>
        </article>
    );
}
