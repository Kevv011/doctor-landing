import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import BlogCategoryFormFields from '@/pages/admin/blog-categories/components/blog-category-form-fields';

export default function BlogCategoriesCreate() {
    return (
        <>
            <Head title="Nueva categoría" />

            <div className="space-y-6 p-4">
                <Heading
                    title="Nueva categoría"
                    description="Crea una categoría para organizar los blogs."
                />

                <Form
                    action="/admin/blog-categories"
                    method="post"
                    options={{ preserveScroll: true }}
                >
                    {({ processing, errors }) => (
                        <BlogCategoryFormFields
                            errors={errors}
                            processing={processing}
                            submitLabel="Crear categoría"
                        />
                    )}
                </Form>
            </div>
        </>
    );
}

BlogCategoriesCreate.layout = {
    breadcrumbs: [
        {
            title: 'Categorías de blog',
            href: '/admin/blog-categories',
        },
        {
            title: 'Nueva categoría',
            href: '/admin/blog-categories/create',
        },
    ],
};
