import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import BlogFormFields, {
    type BlogCategoryOption,
    type BlogFormPost,
    type BlogStatusOption,
} from '@/pages/admin/blogs/components/blog-form-fields';

type Props = {
    post: BlogFormPost & { id: number; title: string };
    statuses: BlogStatusOption[];
    categories: BlogCategoryOption[];
};

export default function BlogsEdit({ post, statuses, categories }: Props) {
    return (
        <>
            <Head title={`Editar ${post.title}`} />

            <div className="space-y-6 p-4">
                <Heading
                    title="Editar blog"
                    description="Actualiza contenido, estado e imagen destacada."
                />

                <Form
                    action={`/admin/blogs/${post.id}`}
                    method="post"
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="_method" value="PUT" />

                            <BlogFormFields
                                post={post}
                                statuses={statuses}
                                categories={categories}
                                errors={errors}
                                processing={processing}
                                cancelHref="/admin/blogs"
                                submitLabel="Guardar cambios"
                            />
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

BlogsEdit.layout = {
    breadcrumbs: [
        {
            title: 'Blogs',
            href: '/admin/blogs',
        },
        {
            title: 'Editar blog',
            href: '#',
        },
    ],
};
