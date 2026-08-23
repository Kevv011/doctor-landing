import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

export type LandingPaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Props = {
    links: LandingPaginationLink[];
};

type PaginationItem =
    | { type: 'page'; page: number; url: string | null; active: boolean }
    | { type: 'ellipsis'; key: string };

export default function LandingPagination({ links }: Props) {
    const previousLink = links[0];
    const nextLink = links[links.length - 1];
    const pages = links
        .slice(1, -1)
        .map((link) => ({
            page: Number(stripHtml(link.label)),
            url: link.url,
            active: link.active,
        }))
        .filter((link) => Number.isFinite(link.page));

    if (pages.length <= 1) {
        return null;
    }

    return (
        <nav
            className="flex flex-wrap items-center justify-center gap-2"
            aria-label="Paginación"
        >
            <PaginationControl
                href={previousLink?.url}
                label="Página anterior"
                disabled={!previousLink?.url}
            >
                <ChevronLeft className="size-4" />
            </PaginationControl>

            {visiblePages(pages).map((item) =>
                item.type === 'ellipsis' ? (
                    <span
                        key={item.key}
                        className="grid size-11 place-items-center rounded-md border-2 border-[#2f3033] bg-white text-lg font-black text-[#2f3033] shadow-[0_8px_0_rgba(21,35,74,0.12)]"
                    >
                        ...
                    </span>
                ) : (
                    <PageLink
                        key={item.page}
                        href={item.url}
                        active={item.active}
                    >
                        {item.page}
                    </PageLink>
                ),
            )}

            <PaginationControl
                href={nextLink?.url}
                label="Página siguiente"
                disabled={!nextLink?.url}
            >
                <ChevronRight className="size-4" />
            </PaginationControl>
        </nav>
    );
}

function PageLink({
    href,
    active,
    children,
}: {
    href: string | null;
    active: boolean;
    children: ReactNode;
}) {
    const className = `grid size-11 place-items-center rounded-md border-2 text-lg font-black transition shadow-[0_8px_0_rgba(21,35,74,0.12)] ${
        active
            ? 'border-[#2f3033] bg-[#2f3033] text-white'
            : 'border-[#2f3033] bg-white text-[#2f3033] hover:-translate-y-0.5 hover:bg-[#fff0f7]'
    }`;

    if (!href) {
        return <span className={className}>{children}</span>;
    }

    return (
        <Link href={href} preserveScroll className={className}>
            {children}
        </Link>
    );
}

function PaginationControl({
    href,
    label,
    disabled,
    children,
}: {
    href?: string | null;
    label: string;
    disabled: boolean;
    children: ReactNode;
}) {
    const className = `grid size-11 place-items-center rounded-md border-2 border-[#2f3033] shadow-[0_8px_0_rgba(21,35,74,0.12)] transition ${
        disabled
            ? 'cursor-not-allowed bg-[#8f888d] text-white/70 opacity-70'
            : 'bg-white text-[#2f3033] hover:-translate-y-0.5 hover:bg-[#fff0f7]'
    }`;

    if (disabled || !href) {
        return (
            <span aria-label={label} aria-disabled="true" className={className}>
                {children}
            </span>
        );
    }

    return (
        <Link href={href} preserveScroll aria-label={label} className={className}>
            {children}
        </Link>
    );
}

function visiblePages(
    pages: Array<{ page: number; url: string | null; active: boolean }>,
): PaginationItem[] {
    if (pages.length <= 5) {
        return pages.map((page) => ({ type: 'page', ...page }));
    }

    const current = pages.find((page) => page.active)?.page ?? 1;
    const pageNumbers = new Set([
        1,
        pages.length,
        current - 1,
        current,
        current + 1,
    ]);
    const items: PaginationItem[] = [];
    let previousPage = 0;

    pages.forEach((page) => {
        if (!pageNumbers.has(page.page)) {
            return;
        }

        if (previousPage > 0 && page.page - previousPage > 1) {
            items.push({
                type: 'ellipsis',
                key: `ellipsis-${previousPage}-${page.page}`,
            });
        }

        items.push({ type: 'page', ...page });
        previousPage = page.page;
    });

    return items;
}

function stripHtml(value: string): string {
    return value.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '').trim();
}
