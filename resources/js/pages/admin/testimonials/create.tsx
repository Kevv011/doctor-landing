import { Form, Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import TestimonialFormFields from '@/pages/admin/testimonials/components/testimonial-form-fields';

export default function TestimonialsCreate() {
    return (
        <>
            <Head title="Nuevo testimonio" />

            <div className="max-w-2xl space-y-6 p-4">
                <Heading
                    title="Nuevo testimonio"
                    description="Crea un comentario para presentarlo en la landing."
                />

                <Form
                    action="/admin/testimonials"
                    method="post"
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <TestimonialFormFields
                                errors={errors}
                                processing={processing}
                                submitLabel="Crear testimonio"
                            />

                            <Button variant="outline" asChild>
                                <Link href="/admin/testimonials">
                                    Cancelar
                                </Link>
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

TestimonialsCreate.layout = {
    breadcrumbs: [
        {
            title: 'Testimonios',
            href: '/admin/testimonials',
        },
        {
            title: 'Nuevo testimonio',
            href: '/admin/testimonials/create',
        },
    ],
};
