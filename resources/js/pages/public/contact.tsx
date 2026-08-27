import ContactAppointmentSection from '@/components/landing/contact-appointment-section';
import ContactHeroSection from '@/components/landing/contact-hero-section';
import ContactInfoSection from '@/components/landing/contact-info-section';
import ContactMapSection from '@/components/landing/contact-map-section';
import LandingFooter from '@/components/landing/landing-footer';
import PublicSeo from '@/components/landing/public-seo';

export default function Contact() {
    return (
        <>
            <PublicSeo
                title="Contacto y citas | Women’s Health Clinic"
                description="Contáctanos para recibir orientación y programar una consulta de salud femenina en Women’s Health Clinic."
                canonicalPath="/contact"
            />
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
