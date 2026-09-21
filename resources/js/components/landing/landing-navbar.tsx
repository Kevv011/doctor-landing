import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import LandingContainer from '@/components/landing/landing-container';
import LandingGlobalSearch from '@/components/landing/landing-global-search';
import { useCurrentUrl } from '@/hooks/use-current-url';

const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Blog', href: '/blog' },
    { label: 'Testimoniales', href: '/#testimoniales' },
    { label: 'Contacto', href: '/contact' },
];

type NavbarVariant = 'transparent' | 'blurred' | 'solid';

export default function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [variant, setVariant] = useState<NavbarVariant>('transparent');
    const { currentUrl } = useCurrentUrl();
    const isSolid = variant === 'solid';
    const currentHash =
        typeof window !== 'undefined' ? window.location.hash : '';

    const isActive = (href: string) => {
        const [path, hash] = href.split('#');
        const isCurrentPath = path === currentUrl;

        if (hash) {
            return isCurrentPath && currentHash === `#${hash}`;
        }

        if (path !== '/' && currentUrl.startsWith(`${path}/`)) {
            return true;
        }

        return isCurrentPath && !currentHash;
    };

    const handleAnchorNavigation = (
        event: MouseEvent<Element>,
        href: string,
    ) => {
        const [path, hash] = href.split('#');

        if (!hash || path !== window.location.pathname) {
            return;
        }

        const target = document.getElementById(hash);
        const header = event.currentTarget.closest('header');

        if (!target || !header) {
            return;
        }

        event.preventDefault();
        window.history.pushState({}, '', href);
        window.scrollTo({
            top:
                target.getBoundingClientRect().top +
                window.scrollY -
                header.getBoundingClientRect().height -
                16,
            behavior: 'smooth',
        });
    };

    const handleLogoNavigation = (event: MouseEvent<Element>) => {
        if (currentUrl !== '/') {
            return;
        }

        event.preventDefault();
        setIsOpen(false);
        window.history.replaceState({}, '', '/');

        window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches
                ? 'auto'
                : 'smooth',
        });
    };

    useEffect(() => {
        let frameId = 0;

        const updateNavbarState = () => {
            window.cancelAnimationFrame(frameId);

            frameId = window.requestAnimationFrame(() => {
                const hero =
                    document.querySelector<HTMLElement>('[data-navbar-hero]') ??
                    document.getElementById('home-hero');

                if (!hero) {
                    setVariant('solid');

                    return;
                }

                const heroRect = hero.getBoundingClientRect();
                const heroMiddle = heroRect.top + heroRect.height / 2;

                if (heroRect.bottom <= 96) {
                    setVariant('solid');

                    return;
                }

                setVariant(heroMiddle <= 96 ? 'blurred' : 'transparent');
            });
        };

        updateNavbarState();
        window.addEventListener('scroll', updateNavbarState, { passive: true });
        window.addEventListener('resize', updateNavbarState);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', updateNavbarState);
            window.removeEventListener('resize', updateNavbarState);
        };
    }, []);

    return (
        <>
            <button
                type="button"
                aria-label="Cerrar búsqueda"
                aria-hidden={!isMobileSearchOpen}
                tabIndex={isMobileSearchOpen ? 0 : -1}
                onClick={() => setIsMobileSearchOpen(false)}
                className={`fixed inset-0 z-40 cursor-default bg-[#09123f]/55 backdrop-blur-[2px] transition-opacity duration-300 ease-out xl:hidden ${
                    isMobileSearchOpen
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                }`}
            />

            <header
                className={`fixed inset-x-0 top-0 z-50 py-5 transition-all duration-300 ${
                    isMobileSearchOpen
                        ? 'bg-[#09123f]/0 text-white backdrop-blur-md'
                        : isSolid
                          ? 'bg-white shadow-[0_12px_35px_rgba(21,35,74,0.08)]'
                          : variant === 'blurred'
                            ? 'bg-white/10 text-white backdrop-blur-sm'
                            : 'bg-transparent text-white'
                }`}
            >
                <LandingContainer>
                    <div className="flex items-center justify-between gap-6">
                        <Link
                            href="/"
                            onClick={handleLogoNavigation}
                            className={`flex shrink-0 items-center justify-center rounded-sm text-center text-[11px] leading-tight font-black tracking-[0.08em] uppercase transition ${
                                isSolid
                                    ? 'hover:bg-[#e9648d]/10'
                                    : 'hover:bg-white/15'
                            }`}
                        >
                            <img
                                src={
                                    isSolid
                                        ? '/images/filled-logo.png'
                                        : '/images/filled-logo.png'
                                }
                                alt="Logo marca"
                                className="h-20 w-auto object-contain"
                            />
                        </Link>

                        <nav className="hidden items-center gap-9 text-sm font-medium xl:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={(event) =>
                                        handleAnchorNavigation(event, item.href)
                                    }
                                    aria-current={
                                        isActive(item.href) ? 'page' : undefined
                                    }
                                    className={`relative py-2 font-semibold transition after:absolute after:right-0 after:bottom-0 after:left-0 after:h-1 after:origin-left after:rounded-full after:bg-[#e9648d] after:transition-transform after:duration-400 ${
                                        isActive(item.href)
                                            ? 'font-black after:scale-x-100'
                                            : 'after:scale-x-0 hover:after:scale-x-100'
                                    } ${
                                        isSolid
                                            ? 'text-[#09123f]/85 hover:text-[#e9648d]'
                                            : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="hidden items-center gap-7 xl:flex">
                            <LandingGlobalSearch isSolid={isSolid} />
                        </div>

                        <div className="flex items-center gap-2 xl:hidden">
                            <LandingGlobalSearch
                                isSolid={isSolid}
                                mobile
                                expanded={isMobileSearchOpen}
                                onExpandedChange={(expanded) => {
                                    setIsMobileSearchOpen(expanded);

                                    if (expanded) {
                                        setIsOpen(false);
                                    }
                                }}
                            />
                            <button
                                type="button"
                                aria-label="Abrir menú"
                                aria-expanded={isOpen}
                                onClick={() => {
                                    setIsMobileSearchOpen(false);
                                    setIsOpen((value) => !value);
                                }}
                                className={`grid size-11 place-items-center rounded-sm border backdrop-blur-sm ${
                                    isSolid
                                        ? 'border-[#e9648d]/25 bg-[#e9648d]/10 text-[#e9648d]'
                                        : 'border-white/45 bg-white/10 text-white'
                                }`}
                            >
                                {isOpen ? (
                                    <X className="size-5" />
                                ) : (
                                    <Menu className="size-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div
                        aria-hidden={!isOpen}
                        className={`grid overflow-hidden transition-all duration-300 ease-out xl:hidden ${
                            isOpen
                                ? 'mt-5 grid-rows-[1fr] opacity-100'
                                : 'mt-0 grid-rows-[0fr] opacity-0'
                        }`}
                    >
                        <div className="min-h-0 overflow-hidden">
                            <div
                                className={`rounded-md border border-white/25 bg-[#e9648d]/95 p-4 shadow-[0_18px_45px_rgba(21,35,74,0.18)] backdrop-blur-md transition-all duration-300 ease-out ${
                                    isOpen
                                        ? 'translate-y-0 scale-100'
                                        : 'pointer-events-none -translate-y-3 scale-[0.98]'
                                }`}
                            >
                                <nav className="grid gap-1">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            onClickCapture={(event) =>
                                                handleAnchorNavigation(
                                                    event,
                                                    item.href,
                                                )
                                            }
                                            aria-current={
                                                isActive(item.href)
                                                    ? 'page'
                                                    : undefined
                                            }
                                            tabIndex={isOpen ? 0 : -1}
                                            className={`relative rounded-sm px-3 py-3 text-sm text-white/95 transition before:absolute before:top-2 before:bottom-2 before:left-0 before:w-1 before:rounded-full before:bg-white ${
                                                isActive(item.href)
                                                    ? 'bg-white/12 font-black'
                                                    : 'font-semibold before:scale-y-0 before:transition-transform before:duration-200 hover:bg-white/10 hover:text-white hover:before:scale-y-100'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </LandingContainer>
            </header>
        </>
    );
}
