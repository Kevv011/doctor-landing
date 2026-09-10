import { useEffect, useRef, useState } from 'react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type Props = Omit<ComponentProps<'img'>, 'src'> & {
    src: string;
    webpSrc: string;
    loadedClassName?: string;
};

export default function LandingHeroImage({
    src,
    webpSrc,
    alt,
    className,
    loadedClassName = 'opacity-100',
    ...props
}: Props) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSrc, setActiveSrc] = useState(webpSrc);

    useEffect(() => {
        if (imageRef.current?.complete) {
            setIsLoaded(true);
        }
    }, []);

    return (
        <img
            ref={imageRef}
            src={activeSrc}
            alt={alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
                if (activeSrc !== src) {
                    setIsLoaded(false);
                    setActiveSrc(src);
                }
            }}
            className={cn(
                'opacity-0 transition-opacity duration-500 ease-out',
                className,
                isLoaded && loadedClassName,
            )}
            {...props}
        />
    );
}
