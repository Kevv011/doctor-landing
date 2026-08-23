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
    Twitter,
    Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useBusiness } from '@/hooks/use-business';

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

    return (
        <aside className="space-y-8 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif]">
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

            {business.social_links.length > 0 && (
                <SidebarCard title="Síguenos">
                    <div className="flex justify-center gap-3">
                        {business.social_links.map((socialLink) => {
                            const SocialIcon =
                                socialIcons[socialLink.platform] ?? AtSign;

                            return (
                                <a
                                    key={`${socialLink.platform}-${socialLink.url}`}
                                    href={socialLink.url}
                                    aria-label={
                                        socialLink.label ?? socialLink.platform
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="grid size-10 place-items-center rounded-full bg-[#e9648d] text-white transition hover:bg-[#d94e7a]"
                                >
                                    <SocialIcon className="size-5 stroke-[2.4]" />
                                </a>
                            );
                        })}
                    </div>
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
        </aside>
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
