import { Link } from '@inertiajs/react';
import {
    AtSign,
    CalendarDays,
    Facebook,
    Hash,
    Instagram,
    Linkedin,
    MessageCircle,
    Music2,
    Twitter,
    UserRound,
    Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import BlogContentRenderer from '@/components/landing/blog-content-renderer';
import type {BlogContentBlock} from '@/components/landing/blog-content-renderer';
import BlogSidebar from '@/components/landing/blog-sidebar';
import type {BlogSidebarCategory} from '@/components/landing/blog-sidebar';
import LandingContainer from '@/components/landing/landing-container';
import LandingFooter from '@/components/landing/landing-footer';
import PublicSeo from '@/components/landing/public-seo';
import { useBusiness } from '@/hooks/use-business';

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body: BlogContentBlock[];
    published_at: string | null;
    published_at_iso: string | null;
    updated_at_iso: string | null;
    author: string | null;
    category: string | null;
    tags: string[];
    seo_title: string | null;
    seo_description: string | null;
    featured_image_url: string | null;
};

type RelatedPost = {
    id: number;
    title: string;
    slug: string;
    featured_image_url: string | null;
};

type Props = {
    post: BlogPost;
    categories: BlogSidebarCategory[];
    tags: string[];
    relatedPosts: RelatedPost[];
    filters: {
        search: string;
        category: string;
        tag: string;
    };
};

const socialIcons: Record<string, LucideIcon> = {
    facebook: Facebook,
    instagram: Instagram,
    tiktok: Music2,
    whatsapp: MessageCircle,
    youtube: Youtube,
    linkedin: Linkedin,
    x: Twitter,
    threads: Hash,
};

export default function BlogShow({
    post,
    categories,
    tags,
    relatedPosts,
    filters,
}: Props) {
    const business = useBusiness();
    const shareUrl =
        typeof window === 'undefined' ? `/blog/${post.slug}` : window.location.href;

    return (
        <>
            <PublicSeo
                title={
                    post.seo_title ||
                    `${post.title} | Women’s Health Clinic`
                }
                description={
                    post.seo_description ||
                    post.excerpt ||
                    'Información de salud femenina de Women’s Health Clinic.'
                }
                canonicalPath={`/blog/${post.slug}`}
                imagePath={
                    post.featured_image_url || '/images/filled-logo.png'
                }
                type="article"
                schema={{
                    '@type': 'BlogPosting',
                    '@id': `/blog/${post.slug}#article`,
                    headline: post.title,
                    description:
                        post.seo_description || post.excerpt || undefined,
                    image: post.featured_image_url || undefined,
                    datePublished: post.published_at_iso || undefined,
                    dateModified: post.updated_at_iso || undefined,
                    author: post.author
                        ? { '@type': 'Person', name: post.author }
                        : undefined,
                    publisher: {
                        '@type': 'Organization',
                        name: business.profile.name,
                    },
                    mainEntityOfPage: `/blog/${post.slug}`,
                }}
            />

            <main className="min-h-screen bg-[#fff0f7] pt-28 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] text-[#09123f]">
                <section className="py-12 sm:py-16 lg:py-20">
                    <LandingContainer>
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
                            <article className="rounded-lg bg-white p-3 shadow-[0_18px_45px_rgba(21,35,74,0.04)] sm:p-4 lg:p-5">
                                <img
                                    src={
                                        post.featured_image_url ||
                                        '/images/blog-post-default.png'
                                    }
                                    alt={post.title}
                                    className="h-[320px] w-full rounded-md object-cover sm:h-[420px]"
                                />

                                <div className="px-2 py-6 sm:px-4">
                                    <h1 className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#09123f] sm:text-4xl">
                                        {post.title}
                                    </h1>

                                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#e9648d]">
                                        {post.author && (
                                            <span className="inline-flex items-center gap-2">
                                                <UserRound className="size-4" />
                                                Por: {post.author}
                                            </span>
                                        )}
                                        {post.published_at && (
                                            <span className="inline-flex items-center gap-2">
                                                <CalendarDays className="size-4" />
                                                {post.published_at}
                                            </span>
                                        )}
                                        {post.category && (
                                            <span>{post.category}</span>
                                        )}
                                    </div>

                                    {post.excerpt && (
                                        <p className="mt-8 text-base leading-8 text-[#6f7080]">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <BlogContentRenderer body={post.body} />

                                    <div className="mt-10 grid gap-8 border-t border-[#e9648d]/40 pt-8 sm:grid-cols-2">
                                        <div>
                                            <h2 className="text-lg font-black">
                                                Temas relacionados
                                            </h2>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {post.tags.length > 0 ? (
                                                    post.tags.map((tag) => (
                                                        <Link
                                                            key={tag}
                                                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                                                            className="rounded-md bg-[#e9648d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d94e7a]"
                                                        >
                                                            {tag}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-[#6f7080]">
                                                        Sin etiquetas.
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:text-right">
                                            <h2 className="text-lg font-black">
                                                Compartir
                                            </h2>
                                            <div className="mt-4 flex gap-3 sm:justify-end">
                                                {business.social_links
                                                    .slice(0, 4)
                                                    .map((socialLink) => {
                                                        const SocialIcon =
                                                            socialIcons[
                                                                socialLink
                                                                    .platform
                                                            ] ?? AtSign;

                                                        return (
                                                            <a
                                                                key={`${socialLink.platform}-${socialLink.url}`}
                                                                href={`${socialLink.url}`}
                                                                aria-label={`Compartir en ${socialLink.label ?? socialLink.platform}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="grid size-9 place-items-center rounded-full bg-[#e9648d] text-white transition hover:bg-[#d94e7a]"
                                                            >
                                                                <SocialIcon className="size-5 stroke-[2.4]" />
                                                            </a>
                                                        );
                                                    })}
                                                <a
                                                    href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                                                    className="grid size-9 place-items-center rounded-full bg-[#e9648d] text-white transition hover:bg-[#d94e7a]"
                                                    aria-label="Compartir por correo"
                                                >
                                                    <AtSign className="size-5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <section className="mx-auto mt-12 max-w-2xl text-center">
                                        <div className="mx-auto grid size-24 place-items-center rounded-full bg-[#f4d7e8] text-[#e9648d]">
                                            <UserRound className="size-12" />
                                        </div>
                                        <h2 className="mt-5 text-xl font-black">
                                            {post.author ??
                                                business.profile.name}
                                        </h2>
                                        <p className="mt-1 text-sm font-semibold text-[#e9648d]">
                                            Equipo médico
                                        </p>
                                        <p className="mt-5 text-sm leading-7 text-[#6f7080]">
                                            Espacio reservado para presentar al
                                            autor o especialista relacionado con
                                            el artículo.
                                        </p>
                                    </section>
                                </div>
                            </article>

                            <aside className="space-y-8">
                                <BlogSidebar
                                    categories={categories}
                                    tags={tags}
                                    filters={filters}
                                />

                                {relatedPosts.length > 0 && (
                                    <section className="rounded-lg bg-white px-7 py-8 text-[#09123f] shadow-[0_12px_35px_rgba(21,35,74,0.04)]">
                                        <h2 className="text-center text-base font-black">
                                            Otros
                                        </h2>
                                        <div className="mx-auto my-5 h-px w-48 max-w-full bg-[#e9648d]" />
                                        <div className="space-y-5">
                                            {relatedPosts.map((relatedPost) => (
                                                <Link
                                                    key={relatedPost.id}
                                                    href={`/blog/${relatedPost.slug}`}
                                                    className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-b border-[#e9648d]/30 pb-5 last:border-b-0 last:pb-0"
                                                >
                                                    <img
                                                        src={
                                                            relatedPost.featured_image_url ||
                                                            '/images/blog-post-default.png'
                                                        }
                                                        alt=""
                                                        className="size-[72px] rounded-md object-cover"
                                                    />
                                                    <span className="text-sm font-semibold leading-5 text-[#e9648d]">
                                                        {relatedPost.title}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </aside>
                        </div>
                    </LandingContainer>
                </section>

                <LandingFooter />
            </main>
        </>
    );
}
