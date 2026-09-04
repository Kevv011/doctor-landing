import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';
import BlogCard from '@/components/landing/blog-card';
import LandingContainer from '@/components/landing/landing-container';

export type FeaturedBlog = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    published_at: string | null;
    featured_image_url: string;
};

type Props = {
    blogs: FeaturedBlog[];
};

export default function HomeFeaturedBlogsSection({ blogs }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        loop: false,
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

    if (blogs.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-12 text-[#09123f]">
            <LandingContainer>
                <div className="mx-auto max-w-5xl">
                    <div className="text-center">
                        <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                            Blog
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                            Articulos destacados
                        </h2>
                    </div>

                    <div
                        className="mt-12 overflow-hidden"
                        ref={emblaRef}
                        onMouseEnter={() => setIsAutoplayPaused(true)}
                        onMouseLeave={() => setIsAutoplayPaused(false)}
                        onFocusCapture={() => setIsAutoplayPaused(true)}
                        onBlurCapture={() => setIsAutoplayPaused(false)}
                    >
                        <div className="-ml-7 flex touch-pan-y">
                            {blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="min-w-0 flex-[0_0_100%] pl-7 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                                >
                                    <BlogCard blog={blog} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-2">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Ver grupo de articulos ${index + 1}`}
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
