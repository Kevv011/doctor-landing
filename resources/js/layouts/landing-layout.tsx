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

        const sections = Array.from(
            document.querySelectorAll<HTMLElement>('main > section'),
        );

        if (!('IntersectionObserver' in window)) {
            sections.forEach((section) => section.classList.add('is-visible'));

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
            { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
        );

        sections.forEach((section, index) => {
            section.classList.add('landing-reveal');
            section.style.setProperty(
                '--landing-reveal-delay',
                `${Math.min(index * 65, 320)}ms`,
            );
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, [url]);

    return (
        <>
            <LandingNavbar />
            {children}
            <LandingScrollToTop />
        </>
    );
}
