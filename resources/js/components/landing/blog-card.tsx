import { Link } from '@inertiajs/react';
import { CalendarDays, ChevronRight } from 'lucide-react';

export type LandingBlogCardPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    published_at: string | null;
    featured_image_url: string | null;
};

type Props = {
    blog: LandingBlogCardPost;
};

export default function BlogCard({ blog }: Props) {
    return (
        <article className="relative pb-8">
            <img
                src={blog.featured_image_url || '/images/blog-post-default.png'}
                alt={blog.title}
                className="h-72 w-full rounded-lg object-cover"
            />

            <div className="relative mx-4 -mt-20 rounded-lg border-b-2 border-[#e9648d] bg-white p-7 shadow-[0_18px_45px_rgba(21,35,74,0.06)] sm:mx-7">
                {blog.published_at && (
                    <div className="flex items-center gap-2 text-xs font-medium text-[#e9648d]">
                        <CalendarDays className="size-3.5" />
                        {blog.published_at}
                    </div>
                )}

                <h3 className="mt-4 text-xl font-black leading-tight text-[#e9648d]">
                    {blog.title}
                </h3>

                {blog.excerpt && (
                    <p className="mt-4 text-sm leading-6 text-[#6f7080]">
                        {blog.excerpt}
                    </p>
                )}

                <Link
                    href={`/blog/${blog.slug}`}
                    className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-[#e9648d]"
                >
                    Leer mas
                    <ChevronRight className="size-4" />
                </Link>
            </div>
        </article>
    );
}
