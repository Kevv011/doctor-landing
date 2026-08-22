import { Head } from '@inertiajs/react';
import HomeAboutSection from '@/components/landing/home-about-section';
import HomeExperienceSection from '@/components/landing/home-experience-section';
import HomeFeaturedBlogsSection, {
    type FeaturedBlog,
} from '@/components/landing/home-featured-blogs-section';
import LandingFooter from '@/components/landing/landing-footer';
import HomeHeroSection from '@/components/landing/home-hero-section';
import HomeServicesSection from '@/components/landing/home-services-section';
import HomeSpecialistsSection from '@/components/landing/home-specialists-section';
import HomeTestimonialsSection, {
    type LandingTestimonial,
} from '@/components/landing/home-testimonials-section';

type Props = {
    featuredBlogs: FeaturedBlog[];
    testimonials: LandingTestimonial[];
};

export default function Home({ featuredBlogs, testimonials }: Props) {
    return (
        <>
            <Head title="Home" />
            <main className="min-h-screen bg-[#fff0f7]">
                <HomeHeroSection />
                <HomeAboutSection />
                <HomeExperienceSection />
                <HomeServicesSection />
                <HomeSpecialistsSection />
                <HomeTestimonialsSection testimonials={testimonials} />
                <HomeFeaturedBlogsSection blogs={featuredBlogs} />
                <LandingFooter />
            </main>
        </>
    );
}
