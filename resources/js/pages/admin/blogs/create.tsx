import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import BlogFormFields, {
    type BlogStatusOption,
} from '@/pages/admin/blogs/components/blog-form-fields';

type Props = {
    statuses: BlogStatusOption[];
};

export default function BlogsCreate({ statuses }: Props) {
    return (
        <>
            <Head title="Nuevo blog" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Nuevo blog"
                    description="Crea un articulo para publicarlo en la landing."
                />

                <Form
                    action="/admin/blogs"
                    method="post"
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <BlogFormFields
                            statuses={statuses}
                            errors={errors}
                            processing={processing}
                            cancelHref="/admin/blogs"
                            submitLabel="Crear blog"
                        />
                    )}
                </Form>
            </div>
        </>
    );
}

BlogsCreate.layout = {
    breadcrumbs: [
        {
            title: 'Blogs',
            href: '/admin/blogs',
        },
        {
            title: 'Nuevo blog',
            href: '/admin/blogs/create',
        },
    ],
};
