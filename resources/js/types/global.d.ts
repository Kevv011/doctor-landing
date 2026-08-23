import type { Auth } from '@/types/auth';
import type { LandingBusiness } from '@/types/business';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            business: LandingBusiness;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
