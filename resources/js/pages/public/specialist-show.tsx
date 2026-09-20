import { Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowUpRight,
    BadgeCheck,
    BookOpen,
    BriefcaseMedical,
    CheckCircle2,
    GraduationCap,
    ShieldCheck,
    Sparkles,
    Stethoscope,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import LandingContainer from '@/components/landing/landing-container';
import LandingFooter from '@/components/landing/landing-footer';
import PublicSeo from '@/components/landing/public-seo';

type TimelineItem = {
    title: string;
    place: string;
    period?: string;
    description?: string;
};

type DescribedItem = {
    title: string;
    description: string;
};

type Affiliation = {
    short: string;
    name: string;
};

type Fact = {
    label: string;
    value: string;
};

type Specialist = {
    slug: string;
    name: string;
    role: string;
    profile_label: string;
    experience_label: string;
    image_url: string;
    summary: string;
    areas: string[];
    facts: Fact[];
    experience: TimelineItem[];
    education: TimelineItem[];
    additional_training: DescribedItem[];
    affiliations: Affiliation[];
    publications: DescribedItem[];
};

type Props = {
    specialist: Specialist;
};

export default function SpecialistShow({ specialist }: Props) {
    return (
        <>
            <PublicSeo
                title={`${specialist.name} | Women’s Health Clinic`}
                description={specialist.summary}
                canonicalPath={`/especialistas/${specialist.slug}`}
                imagePath={specialist.image_url}
                schema={{
                    '@type': 'Physician',
                    name: specialist.name,
                    jobTitle: specialist.role,
                    image: specialist.image_url,
                    description: specialist.summary,
                }}
            />

            <main className="min-h-screen overflow-hidden bg-[#fff0f7] pt-36 text-[#09123f]">
                <LandingContainer>
                    <BackButton />

                    <ProfileHeader specialist={specialist} />

                    <div className="mt-8 space-y-8 pb-8 sm:mt-10 sm:space-y-10 lg:pb-16">
                        <ProfileSection
                            icon={BriefcaseMedical}
                            eyebrow="Trayectoria asistencial"
                            title="Experiencia profesional"
                            delay={60}
                        >
                            <div className="relative space-y-7 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-[#f0cbd8] sm:space-y-8">
                                {specialist.experience.map((item) => (
                                    <TimelineCard
                                        key={`${item.title}-${item.place}`}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </ProfileSection>

                        <ProfileSection
                            icon={GraduationCap}
                            eyebrow="Formación y rigor"
                            title="Preparación académica"
                            delay={110}
                        >
                            <div className="grid gap-4 md:grid-cols-2">
                                {specialist.education.map((item) => (
                                    <EducationCard
                                        key={`${item.title}-${item.place}`}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </ProfileSection>

                        <ProfileSection
                            icon={Sparkles}
                            eyebrow="Educación continua"
                            title="Formación complementaria"
                            delay={160}
                        >
                            <div className="grid gap-3">
                                {specialist.additional_training.map((item) => (
                                    <DescribedRow
                                        key={item.title}
                                        item={item}
                                    />
                                ))}
                            </div>
                        </ProfileSection>

                        <ProfileSection
                            icon={ShieldCheck}
                            eyebrow="Aval clínico"
                            title="Sociedades y acreditaciones"
                            delay={210}
                        >
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                                {specialist.affiliations.map((affiliation) => (
                                    <div
                                        key={affiliation.short}
                                        className="group flex min-h-36 flex-col items-center justify-center rounded-md border border-[#f1dfe6] bg-[#fffafb] p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-[#e9648d]/50 hover:bg-white hover:shadow-[0_14px_30px_rgba(21,35,74,0.07)]"
                                    >
                                        <BadgeCheck className="size-6 text-[#d90048]" />
                                        <h3 className="mt-3 text-sm font-black">
                                            {affiliation.short}
                                        </h3>
                                        <p className="mt-2 text-[11px] leading-4 text-[#77717b]">
                                            {affiliation.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </ProfileSection>

                        {specialist.publications.length > 0 && (
                            <ProfileSection
                                icon={BookOpen}
                                eyebrow="Evidencia médica"
                                title="Publicaciones científicas"
                                delay={260}
                            >
                                <div className="grid gap-4">
                                    {specialist.publications.map(
                                        (publication) => (
                                            <article
                                                key={publication.title}
                                                className="group rounded-md border border-[#f1dfe6] bg-[#fffafb] p-5 transition duration-300 hover:border-[#e9648d]/50 hover:bg-white sm:p-6"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-base leading-6 font-black sm:text-lg">
                                                            {publication.title}
                                                        </h3>
                                                        <p className="mt-3 text-sm leading-6 text-[#6f6872]">
                                                            {
                                                                publication.description
                                                            }
                                                        </p>
                                                    </div>
                                                    <ArrowUpRight className="mt-1 size-5 shrink-0 text-[#d90048] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                </div>
                                            </article>
                                        ),
                                    )}
                                </div>
                            </ProfileSection>
                        )}
                    </div>
                </LandingContainer>

                <LandingFooter />
            </main>
        </>
    );
}

function ProfileHeader({ specialist }: { specialist: Specialist }) {
    return (
        <section
            data-landing-reveal="up"
            className="mt-6 rounded-md border border-[#f0dfe6] bg-white p-4 shadow-[0_18px_50px_rgba(21,35,74,0.055)] sm:mt-8 sm:p-6 lg:p-8"
        >
            <div className="grid items-center gap-7 md:grid-cols-2 lg:gap-10">
                <div className="relative overflow-hidden rounded-md bg-[#f9e3eb]">
                    <img
                        src={specialist.image_url}
                        alt={specialist.name}
                        loading="eager"
                        decoding="async"
                        className="aspect-[4/3] h-full w-full object-cover object-center transition duration-500 hover:scale-[1.015] md:aspect-[5/4]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#09123f]/25 to-transparent" />
                </div>

                <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                        <ProfileBadge icon={BadgeCheck}>
                            {specialist.profile_label}
                        </ProfileBadge>
                        <ProfileBadge icon={Stethoscope} variant="navy">
                            {specialist.experience_label}
                        </ProfileBadge>
                    </div>

                    <h1 className="mt-5 text-3xl leading-[1.05] font-black tracking-[-0.045em] text-[#09123f] sm:text-4xl lg:text-5xl">
                        {specialist.name}
                    </h1>
                    <p className="mt-3 text-base font-semibold text-[#d90048] sm:text-lg">
                        {specialist.role}
                    </p>
                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[#655f69] sm:text-base sm:leading-8">
                        {specialist.summary}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {specialist.areas.map((area) => (
                            <span
                                key={area}
                                className="rounded-sm border border-[#f0dfe6] bg-[#fffafb] px-3 py-1.5 text-xs font-semibold text-[#433d46]"
                            >
                                {area}
                            </span>
                        ))}
                    </div>

                    <dl className="mt-6 grid gap-4 border-t border-[#f2e5ea] pt-5 sm:grid-cols-3">
                        {specialist.facts.map((fact) => (
                            <div key={fact.label}>
                                <dt className="text-xs text-[#8b818a]">
                                    {fact.label}
                                </dt>
                                <dd className="mt-1 text-sm font-bold text-[#09123f]">
                                    {fact.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}

function BackButton() {
    return (
        <Link
            href="/#especialistas"
            data-landing-reveal="up"
            className="landing-action group inline-flex min-h-11 items-center gap-2 rounded-md border border-[#f0dfe6] bg-white px-4 py-2.5 text-sm font-semibold text-[#09123f] shadow-[0_8px_24px_rgba(21,35,74,0.04)] hover:border-[#e9648d] hover:text-[#d90048]"
        >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Volver a especialistas
        </Link>
    );
}

function ProfileBadge({
    icon: Icon,
    variant = 'pink',
    children,
}: {
    icon: LucideIcon;
    variant?: 'pink' | 'navy';
    children: ReactNode;
}) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[10px] font-bold tracking-[0.05em] uppercase sm:text-[11px] ${
                variant === 'navy'
                    ? 'bg-[#eef0ff] text-[#27306b]'
                    : 'bg-[#ffe4ed] text-[#c9003c]'
            }`}
        >
            <Icon className="size-3.5" />
            {children}
        </span>
    );
}

function ProfileSection({
    icon: Icon,
    eyebrow,
    title,
    delay,
    children,
}: {
    icon: LucideIcon;
    eyebrow: string;
    title: string;
    delay: number;
    children: ReactNode;
}) {
    return (
        <section
            data-landing-reveal="up"
            data-landing-reveal-delay={delay}
            className="rounded-md border border-[#f0dfe6] bg-white p-5 shadow-[0_14px_40px_rgba(21,35,74,0.04)] sm:p-7 lg:p-8"
        >
            <div className="flex items-start gap-3 sm:gap-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-[#ffe4ed] text-[#d90048] sm:size-11">
                    <Icon className="size-5" />
                </div>
                <div>
                    <p className="text-[10px] font-bold tracking-[0.16em] text-[#c9003c] uppercase">
                        {eyebrow}
                    </p>
                    <h2 className="mt-1 text-xl leading-tight font-black sm:text-2xl">
                        {title}
                    </h2>
                </div>
            </div>
            <div className="mt-7">{children}</div>
        </section>
    );
}

function TimelineCard({ item }: { item: TimelineItem }) {
    return (
        <article className="relative pl-8 sm:pl-10">
            <span className="absolute top-1.5 left-0 z-10 grid size-[15px] place-items-center rounded-full border-2 border-[#e9648d] bg-white ring-4 ring-white">
                <span className="size-1.5 rounded-full bg-[#e9648d]" />
            </span>
            {item.period && (
                <span className="inline-flex rounded-sm bg-[#ffe4ed] px-3 py-1 text-[10px] font-bold tracking-wide text-[#c9003c] uppercase">
                    {item.period}
                </span>
            )}
            <h3
                className={`${item.period ? 'mt-2' : ''} text-base leading-6 font-black sm:text-lg`}
            >
                {item.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-[#d90048]">
                {item.place}
            </p>
            {item.description && (
                <p className="mt-2 max-w-4xl text-sm leading-6 text-[#6f6872]">
                    {item.description}
                </p>
            )}
        </article>
    );
}

function EducationCard({ item }: { item: TimelineItem }) {
    return (
        <article className="rounded-md border border-[#f1dfe6] bg-[#fffafb] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#e9648d]/50 hover:bg-white hover:shadow-[0_14px_30px_rgba(21,35,74,0.06)]">
            {item.period && (
                <span className="inline-flex rounded-sm bg-[#ffe4ed] px-2.5 py-1 text-[10px] font-bold text-[#c9003c]">
                    {item.period}
                </span>
            )}
            <h3
                className={`${item.period ? 'mt-3' : ''} text-base leading-6 font-black`}
            >
                {item.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-[#d90048]">
                {item.place}
            </p>
        </article>
    );
}

function DescribedRow({ item }: { item: DescribedItem }) {
    return (
        <article className="flex gap-3 rounded-md border border-[#f1e6ea] bg-[#fffafb] p-4 transition duration-300 hover:border-[#e9648d]/40 hover:bg-white sm:gap-4 sm:p-5">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#d90048]" />
            <div>
                <h3 className="text-sm font-black sm:text-base">
                    {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#6f6872]">
                    {item.description}
                </p>
            </div>
        </article>
    );
}
