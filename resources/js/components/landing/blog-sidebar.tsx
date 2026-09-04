import { Link } from '@inertiajs/react';
import {
    AtSign,
    Facebook,
    Hash,
    Instagram,
    Linkedin,
    MessageCircle,
    Music2,
    Search,
    SlidersHorizontal,
    Twitter,
    Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useBusiness } from '@/hooks/use-business';
import type { LandingBusinessSocialLink } from '@/types';

export type BlogSidebarCategory = {
    id: number;
    name: string;
    slug: string;
    posts_count: number;
};

type Props = {
    categories: BlogSidebarCategory[];
    tags: string[];
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

export default function BlogSidebar({ categories, tags, filters }: Props) {
    const business = useBusiness();
    const hasFilters = categories.length > 0 || tags.length > 0;

    return (
        <aside className="space-y-5 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] lg:space-y-8">
            <SidebarCard title="Búsqueda">
                <form action="/blog" method="get" className="flex">
                    {filters.category && (
                        <input
                            type="hidden"
                            name="category"
                            value={filters.category}
                        />
                    )}
                    {filters.tag && (
                        <input type="hidden" name="tag" value={filters.tag} />
                    )}
                    <input
                        type="search"
                        name="search"
                        defaultValue={filters.search}
                        placeholder="Buscar..."
                        className="min-w-0 flex-1 rounded-l-md border border-[#e9648d] bg-white px-4 py-3 text-sm text-[#09123f] outline-none placeholder:text-[#6f7080]"
                    />
                    <button
                        type="submit"
                        aria-label="Buscar"
                        className="grid w-14 place-items-center rounded-r-md bg-[#e9648d] text-white transition hover:bg-[#d94e7a]"
                    >
                        <Search className="size-5" />
                    </button>
                </form>
            </SidebarCard>

            {hasFilters && (
                <div className="lg:hidden">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#e9648d] px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(122,0,38,0.12)] transition hover:-translate-y-0.5 hover:bg-[#d94e7a] hover:shadow-[0_18px_34px_rgba(122,0,38,0.16)] focus-visible:ring-4 focus-visible:ring-[#e9648d]/25 focus-visible:outline-none"
                            >
                                <SlidersHorizontal className="size-5" />
                                Filtros
                            </button>
                        </DialogTrigger>

                        <DialogContent
                            overlayClassName="bg-[#09123f]/50 backdrop-blur-sm"
                            className="max-h-[min(82vh,720px)] overflow-y-auto rounded-2xl border-[#ffd1df] bg-[#fff8fb] p-6 text-[#09123f] shadow-[0_28px_80px_rgba(9,18,63,0.24)] sm:max-w-lg [&>[data-slot=dialog-close]]:top-4 [&>[data-slot=dialog-close]]:right-4 [&>[data-slot=dialog-close]]:grid [&>[data-slot=dialog-close]]:size-9 [&>[data-slot=dialog-close]]:place-items-center [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:border [&>[data-slot=dialog-close]]:border-[#f0d4df] [&>[data-slot=dialog-close]]:bg-white [&>[data-slot=dialog-close]]:text-[#e9648d] [&>[data-slot=dialog-close]]:opacity-100 [&>[data-slot=dialog-close]]:shadow-[0_6px_16px_rgba(21,35,74,0.12)] [&>[data-slot=dialog-close]]:transition [&>[data-slot=dialog-close]]:hover:-translate-y-0.5 [&>[data-slot=dialog-close]]:hover:bg-[#fff0f7] [&>[data-slot=dialog-close]]:hover:text-[#c9003c]"
                        >
                            <div className="pr-8">
                                <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                                    Blog
                                </p>
                                <DialogTitle className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#09123f]">
                                    Filtros
                                </DialogTitle>
                                <DialogDescription className="mt-2 text-sm leading-6 text-[#6f7080]">
                                    Explora artículos por categoría o etiqueta.
                                </DialogDescription>
                            </div>

                            <div className="mt-3 space-y-5">
                                <BlogFilterOptions
                                    categories={categories}
                                    tags={tags}
                                    filters={filters}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )}

            <div className="lg:hidden">
                <SocialLinksCard socialLinks={business.social_links} />
            </div>

            <div className="hidden space-y-8 lg:block">
                <BlogFilters
                    categories={categories}
                    tags={tags}
                    filters={filters}
                    socialLinks={business.social_links}
                />
            </div>
        </aside>
    );
}

function BlogFilters({
    categories,
    tags,
    filters,
    socialLinks,
}: Props & { socialLinks: LandingBusinessSocialLink[] }) {
    return (
        <>
            <BlogFilterOptions
                categories={categories}
                tags={tags}
                filters={filters}
            />

            <SocialLinksCard socialLinks={socialLinks} />
        </>
    );
}

function BlogFilterOptions({ categories, tags, filters }: Props) {
    return (
        <>
            {categories.length > 0 && (
                <SidebarCard title="Categorías populares">
                    <nav className="grid gap-4 text-center text-sm font-semibold text-[#09123f]">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/blog?category=${category.slug}`}
                                className={`transition hover:text-[#e9648d] ${
                                    filters.category === category.slug
                                        ? 'text-[#e9648d]'
                                        : ''
                                }`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                </SidebarCard>
            )}

            {tags.length > 0 && (
                <SidebarCard title="Etiquetas">
                    <div className="flex flex-wrap justify-center gap-2">
                        {tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                className={`rounded-md px-5 py-3 text-sm font-semibold text-white transition ${
                                    filters.tag === tag
                                        ? 'bg-[#d94e7a]'
                                        : 'bg-[#e9648d] hover:bg-[#d94e7a]'
                                }`}
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </SidebarCard>
            )}
        </>
    );
}

function SocialLinksCard({
    socialLinks,
}: {
    socialLinks: LandingBusinessSocialLink[];
}) {
    if (socialLinks.length === 0) {
        return null;
    }

    return (
        <SidebarCard title="Síguenos">
            <div className="flex justify-center gap-3">
                {socialLinks.map((socialLink) => {
                    const SocialIcon =
                        socialIcons[socialLink.platform] ?? AtSign;

                    return (
                        <a
                            key={`${socialLink.platform}-${socialLink.url}`}
                            href={socialLink.url}
                            aria-label={socialLink.label ?? socialLink.platform}
                            target="_blank"
                            rel="noreferrer"
                            className="grid size-10 place-items-center rounded-full bg-[#e9648d] text-white transition hover:-translate-y-0.5 hover:bg-[#d94e7a]"
                        >
                            <SocialIcon className="size-5 stroke-[2.4]" />
                        </a>
                    );
                })}
            </div>
        </SidebarCard>
    );
}

function SidebarCard({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-lg bg-white px-7 py-8 text-[#09123f] shadow-[0_12px_35px_rgba(21,35,74,0.04)]">
            <h2 className="text-center text-base font-black">{title}</h2>
            <div className="mx-auto my-5 h-px w-48 max-w-full bg-[#e9648d]" />
            {children}
        </section>
    );
}
