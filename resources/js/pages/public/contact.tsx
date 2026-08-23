import { Head } from '@inertiajs/react';
import ContactAppointmentSection from '@/components/landing/contact-appointment-section';
import ContactHeroSection from '@/components/landing/contact-hero-section';
import ContactInfoSection from '@/components/landing/contact-info-section';
import ContactMapSection from '@/components/landing/contact-map-section';
import LandingFooter from '@/components/landing/landing-footer';

export default function Contact() {
    return (
        <>
            <Head title="Contacto" />
            <main className="min-h-screen bg-[#fff0f7]">
                <ContactHeroSection />
                <ContactInfoSection />
                <ContactAppointmentSection />
                <ContactMapSection />
                <LandingFooter />
            </main>
        </>
    );
}
