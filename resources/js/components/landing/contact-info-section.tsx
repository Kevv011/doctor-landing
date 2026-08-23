import { ArrowUpRight, Mail, MapPin, Smartphone } from 'lucide-react';
import LandingContainer from '@/components/landing/landing-container';
import {
    businessMailHref,
    businessPhoneHref,
    useBusiness,
} from '@/hooks/use-business';

export default function ContactInfoSection() {
    const business = useBusiness();
    const contactPhone =
        business.profile.appointment_phone || business.profile.phone;
    const contactCards = [
        {
            title: 'Ubicación',
            description: business.profile.address,
            action: 'Ver ubicación',
            href: business.profile.google_maps_url || '#',
            icon: MapPin,
        },
        {
            title: 'Escríbenos',
            description: business.profile.email,
            action: 'Enviar correo',
            href: businessMailHref(business.profile.email),
            icon: Mail,
        },
        {
            title: 'Teléfono',
            description: contactPhone,
            action: 'Llámenos',
            href: businessPhoneHref(contactPhone),
            icon: Smartphone,
        },
    ];

    return (
        <section className="bg-[#fff0f7] py-16 [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] text-[#09123f] sm:py-20 lg:py-24">
            <LandingContainer>
                <div className="text-center">
                    <p className="text-[11px] font-medium tracking-[0.22em] text-[#e9648d] uppercase">
                        Contáctanos
                    </p>
                    <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                        Tu bienestar es nuestra prioridad
                    </h2>
                </div>

                <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
                    {contactCards.map((card) => (
                        <a
                            key={card.title}
                            href={card.href}
                            target={
                                card.href.startsWith('http')
                                    ? '_blank'
                                    : undefined
                            }
                            rel={
                                card.href.startsWith('http')
                                    ? 'noreferrer'
                                    : undefined
                            }
                            className="group flex min-h-40 gap-5 rounded-lg bg-white p-7 shadow-[0_12px_35px_rgba(21,35,74,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(21,35,74,0.08)]"
                        >
                            <span className="grid size-14 shrink-0 place-items-center rounded-lg border border-[#e9648d] text-[#e9648d]">
                                <card.icon className="size-6 stroke-[1.5]" />
                            </span>

                            <span className="block">
                                <span className="block text-sm font-black">
                                    {card.title}
                                </span>
                                <span className="mt-2 block text-xs leading-5 text-[#6f7080] uppercase">
                                    {card.description}
                                </span>
                                <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#e9648d]">
                                    {card.action}
                                    <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </span>
                        </a>
                    ))}
                </div>
            </LandingContainer>
        </section>
    );
}
