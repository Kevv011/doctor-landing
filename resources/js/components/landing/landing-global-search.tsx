import { Link } from '@inertiajs/react';
import {
    LoaderCircle,
    Newspaper,
    Quote,
    Search,
    Stethoscope,
    X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

type SearchType = 'services' | 'blogs' | 'testimonials';

type SearchResult = {
    id: number;
    title: string;
    description: string | null;
    image_url: string | null;
    meta?: string | null;
    rating?: number;
    url: string;
};

type SearchResults = Record<SearchType, SearchResult[]>;

type Props = {
    isSolid: boolean;
    mobile?: boolean;
    onNavigate?: () => void;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
};

const emptyResults = (): SearchResults => ({
    services: [],
    blogs: [],
    testimonials: [],
});

const searchGroups: Array<{
    key: SearchType;
    label: string;
    icon: LucideIcon;
}> = [
    { key: 'services', label: 'Servicios', icon: Stethoscope },
    { key: 'blogs', label: 'Blog', icon: Newspaper },
    { key: 'testimonials', label: 'Testimonios', icon: Quote },
];

export default function LandingGlobalSearch({
    isSolid,
    mobile = false,
    onNavigate,
    expanded,
    onExpandedChange,
}: Props) {
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();
    const resultsId = `${inputId}-results`;
    const [uncontrolledIsExpanded, setUncontrolledIsExpanded] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResults>(emptyResults);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const isExpanded = expanded ?? uncontrolledIsExpanded;
    const normalizedQuery = query.trim();
    const hasSearchTerm = normalizedQuery.length >= 2;
    const hasResults = searchGroups.some(
        (group) => results[group.key].length > 0,
    );

    const setExpanded = useCallback(
        (nextExpanded: boolean) => {
            if (expanded === undefined) {
                setUncontrolledIsExpanded(nextExpanded);
            }

            onExpandedChange?.(nextExpanded);
        },
        [expanded, onExpandedChange],
    );

    const closeSearch = useCallback(() => {
        setExpanded(false);
    }, [setExpanded]);

    const openSearch = (focusInput = false) => {
        setExpanded(true);

        if (focusInput) {
            window.requestAnimationFrame(() => inputRef.current?.focus());
        }
    };

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) {
                closeSearch();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeSearch();
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeSearch]);

    useEffect(() => {
        if (!hasSearchTerm) {
            return;
        }

        const controller = new AbortController();
        const timeoutId = window.setTimeout(async () => {
            setIsLoading(true);
            setHasError(false);

            try {
                const response = await fetch(
                    `/buscar?q=${encodeURIComponent(normalizedQuery)}`,
                    {
                        headers: { Accept: 'application/json' },
                        signal: controller.signal,
                    },
                );

                if (!response.ok) {
                    throw new Error('No fue posible realizar la búsqueda.');
                }

                const payload = (await response.json()) as {
                    results: SearchResults;
                };

                setResults(payload.results ?? emptyResults());
            } catch (error) {
                if ((error as DOMException).name !== 'AbortError') {
                    setResults(emptyResults());
                    setHasError(true);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }, 260);

        return () => {
            controller.abort();
            window.clearTimeout(timeoutId);
        };
    }, [hasSearchTerm, normalizedQuery]);

    const themeClasses = isExpanded
        ? mobile || isSolid
            ? 'border-[#e9648d]/30 bg-white text-[#09123f] shadow-[0_8px_24px_rgba(21,35,74,0.06)]'
            : 'border-white/45 bg-[#09123f]/25 text-white backdrop-blur-md'
        : isSolid
          ? 'text-[#09123f]'
          : 'text-white';
    const placeholderClasses =
        mobile || isSolid
            ? 'placeholder:text-[#7f839d]'
            : 'placeholder:text-white/70';

    return (
        <div
            ref={rootRef}
            className={`relative ${mobile ? 'w-11' : 'w-auto'}`}
            onMouseEnter={() => {
                if (!mobile) {
                    openSearch();
                }
            }}
            onMouseLeave={() => {
                if (
                    !mobile &&
                    !rootRef.current?.contains(document.activeElement)
                ) {
                    closeSearch();
                }
            }}
            onFocusCapture={() => openSearch()}
        >
            <div
                className={`flex h-11 items-center overflow-hidden border transition-[width,color,background-color,border-color,box-shadow] duration-300 ease-out ${themeClasses} ${
                    mobile
                        ? isExpanded
                            ? 'fixed inset-x-4 top-32 z-[60] w-auto animate-in rounded-full px-1 duration-300 fade-in-0 slide-in-from-top-2'
                            : 'w-11 rounded-full border-transparent bg-transparent shadow-none'
                        : isExpanded
                          ? 'w-[min(25rem,calc(100vw-3rem))] rounded-full'
                          : 'w-11 rounded-full border-transparent bg-transparent shadow-none'
                }`}
            >
                <button
                    type="button"
                    aria-label="Abrir buscador"
                    aria-expanded={isExpanded}
                    aria-controls={resultsId}
                    onClick={() => openSearch(true)}
                    className="grid size-11 shrink-0 place-items-center transition hover:text-[#e9648d] focus-visible:outline-none"
                >
                    <Search className="size-5" />
                </button>

                <label className="sr-only" htmlFor={inputId}>
                    Busca contenido para ti
                </label>
                <input
                    ref={inputRef}
                    id={inputId}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Busca contenido para ti..."
                    tabIndex={isExpanded ? 0 : -1}
                    className={`h-full min-w-0 flex-1 bg-transparent pr-2 text-sm outline-none ${placeholderClasses} ${
                        isExpanded
                            ? 'opacity-100'
                            : 'pointer-events-none w-0 opacity-0'
                    }`}
                />

                {isExpanded && query !== '' && (
                    <button
                        type="button"
                        aria-label="Limpiar búsqueda"
                        onClick={() => setQuery('')}
                        className="grid size-10 shrink-0 place-items-center text-current/70 transition hover:text-[#e9648d] focus-visible:outline-none"
                    >
                        <X className="size-4" />
                    </button>
                )}
            </div>

            {isExpanded && hasSearchTerm && (
                <div
                    id={resultsId}
                    className={`z-[60] overflow-hidden rounded-md border border-[#f0dbe3] bg-[#fffafb] text-[#09123f] shadow-[0_24px_60px_rgba(21,35,74,0.2)] ${
                        mobile
                            ? 'fixed inset-x-4 top-[11.5rem] animate-in duration-300 fade-in-0 slide-in-from-top-2'
                            : 'absolute top-full right-0 mt-3 w-[min(32rem,calc(100vw-2rem))]'
                    }`}
                >
                    <div className="max-h-[min(62vh,38rem)] overflow-y-auto p-3 sm:p-4">
                        {isLoading && (
                            <div className="flex items-center justify-center gap-3 px-4 py-10 text-sm text-[#756d78]">
                                <LoaderCircle className="size-5 animate-spin text-[#e9648d]" />
                                Buscando contenido...
                            </div>
                        )}

                        {!isLoading && hasError && (
                            <SearchHint message="No fue posible completar la búsqueda. Inténtalo de nuevo." />
                        )}

                        {!isLoading && !hasError && !hasResults && (
                            <SearchHint
                                message={`No encontramos resultados para “${normalizedQuery}”.`}
                            />
                        )}

                        {!isLoading && !hasError && hasResults && (
                            <div className="space-y-5">
                                {searchGroups.map((group) => {
                                    const groupResults = results[group.key];

                                    if (groupResults.length === 0) {
                                        return null;
                                    }

                                    return (
                                        <SearchGroup
                                            key={group.key}
                                            group={group}
                                            results={groupResults}
                                            onNavigate={() => {
                                                closeSearch();
                                                onNavigate?.();
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function SearchHint({ message }: { message: string }) {
    return (
        <p className="px-4 py-8 text-center text-sm leading-6 text-[#756d78]">
            {message}
        </p>
    );
}

function SearchGroup({
    group,
    results,
    onNavigate,
}: {
    group: (typeof searchGroups)[number];
    results: SearchResult[];
    onNavigate: () => void;
}) {
    const Icon = group.icon;

    return (
        <section aria-label={`Resultados de ${group.label.toLowerCase()}`}>
            <div className="mb-2 flex items-center gap-2 px-2 text-xs font-bold tracking-[0.12em] text-[#c9003c] uppercase">
                <Icon className="size-3.5" />
                {group.label}
            </div>
            <div className="space-y-2">
                {results.map((result) => (
                    <SearchResultRow
                        key={`${group.key}-${result.id}`}
                        result={result}
                        type={group.key}
                        onNavigate={onNavigate}
                    />
                ))}
            </div>
        </section>
    );
}

function SearchResultRow({
    result,
    type,
    onNavigate,
}: {
    result: SearchResult;
    type: SearchType;
    onNavigate: () => void;
}) {
    const isTestimonial = type === 'testimonials';
    const fallbackImage = isTestimonial
        ? '/images/user-vneck-hair-long.png'
        : type === 'blogs'
          ? '/images/blog-post-default.png'
          : '/images/Services/ServicesDefault.png';

    return (
        <Link
            href={result.url}
            onClick={onNavigate}
            className="group flex items-center gap-3 rounded-sm border border-transparent bg-white p-3 transition duration-200 hover:border-[#efb8c9] hover:bg-[#fff3f7] focus-visible:border-[#e9648d] focus-visible:ring-2 focus-visible:ring-[#e9648d]/20 focus-visible:outline-none"
        >
            <img
                src={result.image_url || fallbackImage}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                }}
                className={`shrink-0 object-cover ${
                    isTestimonial
                        ? 'size-12 rounded-full border border-[#f3dce5]'
                        : 'size-14 rounded-md bg-[#ffe4ed]'
                }`}
            />
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-sm leading-5 font-black text-[#09123f] group-hover:text-[#c9003c]">
                        {result.title}
                    </h3>
                    {isTestimonial && result.rating && (
                        <span className="shrink-0 text-[11px] tracking-tight text-[#ffae00]">
                            {'★'.repeat(result.rating)}
                        </span>
                    )}
                </div>
                {result.meta && (
                    <p className="mt-0.5 text-xs font-semibold text-[#e9648d]">
                        {result.meta}
                    </p>
                )}
                {result.description && (
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#756d78]">
                        {result.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
