import type { BlogContentBlock } from '@/components/landing/blog-content-renderer';

export type LandingService = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body?: BlogContentBlock[];
    description: string | null;
    tags: string[];
    seo_title: string | null;
    seo_description: string | null;
    image_url: string;
    gallery_image_urls?: string[];
    url: string;
};
