import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Home" />
            {/* Login/Register links intentionally hidden for the public landing.
                Admin users access the panel only through the private admin URL. */}
            <main className="min-h-screen bg-[#fff0f7]" />
        </>
    );
}
