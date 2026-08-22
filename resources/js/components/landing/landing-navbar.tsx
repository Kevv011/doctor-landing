import { Link } from '@inertiajs/react';
import { Headphones, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import LandingContainer from '@/components/landing/landing-container';

const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Contacto', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Testimoniales', href: '/#testimoniales' },
    { label: 'Agendar cita', href: '/contact#agendar-cita' },
];

type NavbarVariant = 'transparent' | 'blurred' | 'solid';

export default function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [variant, setVariant] = useState<NavbarVariant>('transparent');
    const isSolid = variant === 'solid';

    useEffect(() => {
        let frameId = 0;

        const updateNavbarState = () => {
            window.cancelAnimationFrame(frameId);

            frameId = window.requestAnimationFrame(() => {
                const hero = document.getElementById('home-hero');

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
        <header
            className={`fixed inset-x-0 top-0 z-50 py-5 transition-all duration-300 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] ${
                isSolid
                    ? 'bg-white text-[#09123f] shadow-[0_12px_35px_rgba(21,35,74,0.08)]'
                    : variant === 'blurred'
                      ? 'bg-white/10 text-white backdrop-blur-sm'
                      : 'bg-transparent text-white'
            }`}
        >
            <LandingContainer>
                <div className="flex items-center justify-between gap-6">
                    <Link
                        href="/"
                        className={`flex shrink-0 items-center justify-center rounded-sm text-center text-[11px] font-black leading-tight tracking-[0.08em] uppercase transition ${
                            isSolid ? 'hover:bg-[#e9648d]/10' : 'hover:bg-white/15'
                        }`}
                    >
                        <img
                            src={
                                isSolid
                                    ? '/images/unfilled-logo.png'
                                    : '/images/unfilled-logo.png'
                            }
                            alt="Logo marca"
                            className="h-full w-full object-contain"
                        />
                    </Link>

                    <nav className="hidden items-center gap-9 text-sm font-medium xl:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`transition ${
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
                        <button
                            type="button"
                            aria-label="Buscar"
                            className={`transition ${
                                isSolid
                                    ? 'text-[#09123f]/80 hover:text-[#e9648d]'
                                    : 'text-white/90 hover:text-white'
                            }`}
                        >
                            <Search className="size-5" />
                        </button>

                        <div
                            className={`h-9 w-px ${
                                isSolid ? 'bg-[#09123f]/15' : 'bg-white/30'
                            }`}
                        />

                        <a
                            href="tel:+50373451108"
                            className={`flex items-center gap-3 transition ${
                                isSolid
                                    ? 'text-[#e9648d] hover:text-[#d94e7a]'
                                    : 'text-white hover:text-white/90'
                            }`}
                        >
                            <Headphones className="size-8 stroke-[1.7]" />
                            <span className="grid leading-tight">
                                <span className="text-sm font-semibold">
                                    Haz tu cita
                                </span>
                                <span className="text-lg font-black">
                                    +503 7345 1108
                                </span>
                            </span>
                        </a>
                    </div>

                    <button
                        type="button"
                        aria-label="Abrir menu"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((value) => !value)}
                        className={`grid size-11 place-items-center rounded-sm border backdrop-blur-sm xl:hidden ${
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

                {isOpen && (
                    <div className="mt-5 rounded-md border border-white/25 bg-[#e9648d]/95 p-4 shadow-[0_18px_45px_rgba(21,35,74,0.18)] backdrop-blur-md xl:hidden">
                        <nav className="grid gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-sm px-3 py-3 text-sm font-semibold text-white/95 transition hover:bg-white/10 hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <a
                            href="tel:+50373451108"
                            className="mt-4 flex items-center gap-3 rounded-sm bg-white px-4 py-3 text-[#d94e7a]"
                        >
                            <Headphones className="size-6 stroke-[1.7]" />
                            <span className="grid leading-tight">
                                <span className="text-xs font-semibold">
                                    Haz tu cita
                                </span>
                                <span className="text-base font-black">
                                    +503 7345 1108
                                </span>
                            </span>
                        </a>
                    </div>
                )}
            </LandingContainer>
        </header>
    );
}
