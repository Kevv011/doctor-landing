import { Head, usePage } from '@inertiajs/react';
import { useBusiness } from '@/hooks/use-business';

type PublicSeoProps = {
    title: string;
    description: string;
    canonicalPath: string;
    imagePath?: string;
    type?: 'website' | 'article';
    schema?: Record<string, unknown>;
};

export default function PublicSeo({
    title,
    description,
    canonicalPath,
    imagePath = '/images/filled-logo.png',
    type = 'website',
    schema,
}: PublicSeoProps) {
    const { site_url: configuredSiteUrl } = usePage().props;
    const business = useBusiness();
    const origin = (
        configuredSiteUrl ||
        (typeof window === 'undefined' ? 'http://localhost' : window.location.origin)
    ).replace(/\/$/, '');
    const canonicalUrl = `${origin}${canonicalPath}`;
    const imageUrl = `${origin}${imagePath}`;
    const profile = business.profile;

    const clinicSchema: Record<string, unknown> = {
        '@type': 'MedicalClinic',
        '@id': `${origin}/#clinic`,
        name: profile.name,
        url: origin || undefined,
        logo: imageUrl,
        image: imageUrl,
        telephone: profile.phone || undefined,
        email: profile.email || undefined,
        address: profile.address || undefined,
        sameAs: business.social_links.map((socialLink) => socialLink.url),
    };

    if (profile.latitude && profile.longitude) {
        clinicSchema.geo = {
            '@type': 'GeoCoordinates',
            latitude: profile.latitude,
            longitude: profile.longitude,
        };
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [clinicSchema, ...(schema ? [schema] : [])],
    };

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="es_SV" />
            <meta property="og:site_name" content={profile.name} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Head>
    );
}
