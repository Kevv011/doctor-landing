import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Props = {
    images: string[];
    alt: string;
    className?: string;
    imageClassName?: string;
    loading?: 'eager' | 'lazy';
};

const fallbackImage = '/images/blog-post-default.png';

export default function BlogImageCarousel({
    images,
    alt,
    className = '',
    imageClassName = '',
    loading = 'lazy',
}: Props) {
    const carouselImages = useMemo(
        () => [...new Set(images.filter(Boolean))],
        [images],
    );
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: carouselImages.length > 1,
    });

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi]);

    useEffect(() => {
        if (
            !emblaApi ||
            carouselImages.length < 2 ||
            isAutoplayPaused ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        const autoplayInterval = window.setInterval(() => {
            emblaApi.scrollNext();
        }, 7_000);

        return () => window.clearInterval(autoplayInterval);
    }, [carouselImages.length, emblaApi, isAutoplayPaused]);

    if (carouselImages.length === 0) {
        return null;
    }

    if (carouselImages.length === 1) {
        return (
            <img
                src={carouselImages[0]}
                alt={alt}
                loading={loading}
                decoding="async"
                onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                }}
                className={`h-full w-full object-cover ${className} ${imageClassName}`}
            />
        );
    }

    return (
        <section
            aria-roledescription="carrusel"
            aria-label={`Galería de ${alt}`}
            className={`group/carousel relative overflow-hidden ${className}`}
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => setIsAutoplayPaused(false)}
            onFocusCapture={() => setIsAutoplayPaused(true)}
            onBlurCapture={() => setIsAutoplayPaused(false)}
        >
            <div ref={emblaRef} className="h-full overflow-hidden">
                <div className="flex h-full touch-pan-y">
                    {carouselImages.map((image, index) => (
                        <div
                            key={image}
                            className="min-w-0 flex-[0_0_100%]"
                            aria-hidden={selectedIndex !== index}
                        >
                            <img
                                src={image}
                                alt={selectedIndex === index ? alt : ''}
                                loading={loading}
                                decoding="async"
                                onError={(event) => {
                                    event.currentTarget.src = fallbackImage;
                                }}
                                className={`h-full w-full object-cover ${imageClassName}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                aria-label="Imagen anterior"
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute top-1/2 left-3 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-[#09123f]/55 text-white opacity-0 transition group-hover/carousel:opacity-100 hover:bg-[#09123f]/80 focus-visible:opacity-100"
            >
                <ChevronLeft className="size-5" />
            </button>
            <button
                type="button"
                aria-label="Siguiente imagen"
                onClick={() => emblaApi?.scrollNext()}
                className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-[#09123f]/55 text-white opacity-0 transition group-hover/carousel:opacity-100 hover:bg-[#09123f]/80 focus-visible:opacity-100"
            >
                <ChevronRight className="size-5" />
            </button>

            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
                {carouselImages.map((image, index) => (
                    <button
                        key={`${image}-dot`}
                        type="button"
                        aria-label={`Ver imagen ${index + 1}`}
                        aria-current={
                            selectedIndex === index ? 'true' : undefined
                        }
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`h-1.5 rounded-full transition-all ${
                            selectedIndex === index
                                ? 'w-5 bg-white'
                                : 'w-1.5 bg-white/60 hover:bg-white'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
