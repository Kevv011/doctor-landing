import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LandingScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateVisibility = () => setIsVisible(window.scrollY > 300);

        updateVisibility();
        window.addEventListener('scroll', updateVisibility, { passive: true });

        return () => window.removeEventListener('scroll', updateVisibility);
    }, []);

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    return (
        <button
            type="button"
            aria-label="Volver al inicio"
            onClick={scrollToTop}
            className={`landing-scroll-top-pulse fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-[#c9003c] text-white shadow-[0_10px_24px_rgba(201,0,60,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ad0034] focus-visible:ring-4 focus-visible:ring-[#c9003c]/30 focus-visible:outline-none sm:right-8 sm:bottom-8 sm:size-14 ${
                isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-4 opacity-0'
            }`}
        >
            <ArrowUp className="size-5 stroke-[3] sm:size-6" />
        </button>
    );
}
