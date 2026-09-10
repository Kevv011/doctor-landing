import { usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import LandingNavbar from '@/components/landing/landing-navbar';
import LandingScrollToTop from '@/components/landing/landing-scroll-to-top';

export default function LandingLayout({ children }: PropsWithChildren) {
    const { url } = usePage();

    useEffect(() => {
        const hash = window.location.hash.slice(1);
        const target = hash ? document.getElementById(hash) : null;
        const header = document.querySelector<HTMLElement>('header');

        if (target && header) {
            window.requestAnimationFrame(() => {
                window.scrollTo({
                    top:
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        header.getBoundingClientRect().height -
                        16,
                    behavior: 'smooth',
                });
            });
        }

        const revealElements = Array.from(
            document.querySelectorAll<HTMLElement>('[data-landing-reveal]'),
        );

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach((element) =>
                element.classList.add('is-visible'),
            );

            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
        );

        revealElements.forEach((element) => {
            const delay = Math.min(
                Number(element.dataset.landingRevealDelay ?? 0),
                420,
            );

            element.style.setProperty(
                '--landing-reveal-delay',
                `${Number.isFinite(delay) ? delay : 0}ms`,
            );
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, [url]);

    return (
        <>
            <LandingNavbar />
            <div key={url} className="landing-page-enter">
                {children}
            </div>
            <LandingScrollToTop />
        </>
    );
}
