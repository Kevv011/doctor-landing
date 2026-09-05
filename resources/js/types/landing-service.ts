export type LandingService = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    description: string | null;
    tags: string[];
    seo_title: string | null;
    seo_description: string | null;
    image_url: string;
    url: string;
};
