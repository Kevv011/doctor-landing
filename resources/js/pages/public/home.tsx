import HomeAboutSection from '@/components/landing/home-about-section';
import HomeExperienceSection from '@/components/landing/home-experience-section';
import HomeFeaturedBlogsSection from '@/components/landing/home-featured-blogs-section';
import type {FeaturedBlog} from '@/components/landing/home-featured-blogs-section';
import HomeHeroSection from '@/components/landing/home-hero-section';
import HomeServicesSection from '@/components/landing/home-services-section';
import HomeSpecialistsSection from '@/components/landing/home-specialists-section';
import HomeTestimonialsSection from '@/components/landing/home-testimonials-section';
import type {LandingTestimonial} from '@/components/landing/home-testimonials-section';
import LandingFooter from '@/components/landing/landing-footer';
import PublicSeo from '@/components/landing/public-seo';

type Props = {
    featuredBlogs: FeaturedBlog[];
    testimonials: LandingTestimonial[];
};

export default function Home({ featuredBlogs, testimonials }: Props) {
    return (
        <>
            <PublicSeo
                title="Clínica ginecológica para la mujer | Women’s Health Clinic"
                description="Atención ginecológica integral, gineco-oncología, ultrasonidos, estética y clases prenatales para cuidar la salud de la mujer."
                canonicalPath="/"
            />
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
