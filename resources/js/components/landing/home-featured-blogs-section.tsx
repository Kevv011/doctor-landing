import useEmblaCarousel from 'embla-carousel-react';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
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

    if (blogs.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-12 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] text-[#09123f]">
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

                    <div className="mt-12 overflow-hidden" ref={emblaRef}>
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
                                className={`size-3 rounded-full transition ${
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

function BlogCard({ blog }: { blog: FeaturedBlog }) {
    return (
        <article className="relative pb-8">
            {blog.featured_image_url ? (
                <img
                    src={blog.featured_image_url}
                    alt={blog.title}
                    className="h-72 w-full rounded-lg object-cover"
                />
            ) : (
                <img
                    src="/images/blog-post-default.png"
                    alt="Imagen por defecto del blog"
                    className="h-72 w-full rounded-lg object-cover"
                />
            )}

            <div className="relative mx-7 -mt-20 rounded-lg border-b-2 border-[#e9648d] bg-white p-7 shadow-[0_18px_45px_rgba(21,35,74,0.06)]">
                {blog.published_at && (
                    <div className="flex items-center gap-2 text-xs font-medium text-[#e9648d]">
                        <CalendarDays className="size-3.5" />
                        {blog.published_at}
                    </div>
                )}

                <h3 className="mt-4 text-xl font-black leading-tight text-[#e9648d]">
                    {blog.title}
                </h3>
                {blog.excerpt && (
                    <p className="mt-4 text-sm leading-6 text-[#6f7080]">
                        {blog.excerpt}
                    </p>
                )}

                <a
                    href={`/blog/${blog.slug}`}
                    className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-[#e9648d]"
                >
                    Leer mas
                    <ChevronRight className="size-4" />
                </a>
            </div>
        </article>
    );
}
