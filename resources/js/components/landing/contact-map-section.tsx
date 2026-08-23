import { useBusiness } from '@/hooks/use-business';

export default function ContactMapSection() {
    const business = useBusiness();
    const { latitude, longitude } = business.profile;

    if (!latitude || !longitude) {
        return null;
    }

    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

    return (
        <section className="bg-[#fff0f7] [font-family:Poppins,ui-sans-serif,system-ui,sans-serif]">
            <iframe
                src={mapUrl}
                title={`Mapa de ubicación de ${business.profile.name}`}
                className="h-[360px] w-full border-0 sm:h-[440px] lg:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </section>
    );
}
