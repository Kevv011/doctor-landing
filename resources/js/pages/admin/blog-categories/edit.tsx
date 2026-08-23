import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import BlogCategoryFormFields, {
    type BlogCategoryFormRecord,
} from '@/pages/admin/blog-categories/components/blog-category-form-fields';

type Props = {
    category: BlogCategoryFormRecord & { id: number; name: string };
};

export default function BlogCategoriesEdit({ category }: Props) {
    return (
        <>
            <Head title={`Editar ${category.name}`} />

            <div className="space-y-6 p-4">
                <Heading
                    title="Editar categoría"
                    description="Actualiza los datos de la categoría."
                />

                <Form
                    action={`/admin/blog-categories/${category.id}`}
                    method="post"
                    options={{ preserveScroll: true }}
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="_method" value="PUT" />

                            <BlogCategoryFormFields
                                category={category}
                                errors={errors}
                                processing={processing}
                                submitLabel="Guardar cambios"
                            />
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

BlogCategoriesEdit.layout = {
    breadcrumbs: [
        {
            title: 'Categorías de blog',
            href: '/admin/blog-categories',
        },
        {
            title: 'Editar categoría',
            href: '#',
        },
    ],
};
