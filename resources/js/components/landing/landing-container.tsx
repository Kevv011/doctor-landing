import type { PropsWithChildren } from 'react';

export default function LandingContainer({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto w-[min(1180px,calc(100%_-_2rem))] sm:w-[min(1180px,calc(100%_-_3rem))]">
            {children}
        </div>
    );
}
