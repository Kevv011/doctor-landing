import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            src="/images/filled-logo.png"
            alt="Women's Health Clinic"
            {...props}
        />
    );
}
