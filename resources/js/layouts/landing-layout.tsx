import type { PropsWithChildren } from 'react';
import LandingNavbar from '@/components/landing/landing-navbar';

export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <>
            <LandingNavbar />
            {children}
        </>
    );
}
