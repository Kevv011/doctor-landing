import { Head } from '@inertiajs/react';
import BlogCard, {
    type LandingBlogCardPost,
} from '@/components/landing/blog-card';
import BlogHeroSection from '@/components/landing/blog-hero-section';
import BlogSidebar, {
    type BlogSidebarCategory,
} from '@/components/landing/blog-sidebar';
import LandingContainer from '@/components/landing/landing-container';
import LandingFooter from '@/components/landing/landing-footer';
import LandingPagination, {
    type LandingPaginationLink,
} from '@/components/landing/landing-pagination';

type BlogPost = LandingBlogCardPost & {
    category: string | null;
    tags: string[];
};

type PaginatedPosts = {
    data: BlogPost[];
    links: LandingPaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    posts: PaginatedPosts;
    categories: BlogSidebarCategory[];
    tags: string[];
    filters: {
        search: string;
        category: string;
        tag: string;
    };
};

export default function BlogIndex({
    posts,
    categories,
    tags,
    filters,
}: Props) {
    return (
        <>
            <Head title="Blog" />

            <main className="min-h-screen bg-[#fff0f7]">
                <BlogHeroSection />

                <section className="bg-[#fff0f7] py-16 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] text-[#09123f] sm:py-20 lg:py-24">
                    <LandingContainer>
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
                            <div>
                                <div className="text-center lg:text-left">
                                    <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                                        Blog
                                    </p>
                                    <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                                        Artículos destacados
                                    </h1>
                                </div>

                                {posts.data.length === 0 ? (
                                    <div className="mt-12 rounded-lg bg-white p-10 text-center text-[#6f7080] shadow-[0_12px_35px_rgba(21,35,74,0.04)]">
                                        No encontramos artículos publicados con
                                        estos filtros.
                                    </div>
                                ) : (
                                    <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
                                        {posts.data.map((post) => (
                                            <BlogCard
                                                key={post.id}
                                                blog={post}
                                            />
                                        ))}
                                    </div>
                                )}

                                <div className="mt-10 flex flex-col gap-3 text-sm text-[#6f7080] sm:flex-row sm:items-center sm:justify-between">
                                    <p>
                                        Mostrando {posts.from ?? 0} a{' '}
                                        {posts.to ?? 0} de {posts.total}{' '}
                                        artículos
                                    </p>

                                    <LandingPagination links={posts.links} />
                                </div>
                            </div>

                            <BlogSidebar
                                categories={categories}
                                tags={tags}
                                filters={filters}
                            />
                        </div>
                    </LandingContainer>
                </section>

                <LandingFooter />
            </main>
        </>
    );
}
