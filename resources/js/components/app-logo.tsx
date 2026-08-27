import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <div className="flex min-w-0 flex-1 items-center text-left">
            <img
                src="/images/filled-logo.png"
                alt={name}
                className="h-9 w-full max-w-[168px] object-contain object-left transition-transform duration-200 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:max-w-8"
            />
        </div>
    );
}
