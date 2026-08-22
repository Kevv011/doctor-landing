import { Form, Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import TestimonialFormFields, {
    type TestimonialFormRecord,
} from '@/pages/admin/testimonials/components/testimonial-form-fields';

type Props = {
    testimonial: TestimonialFormRecord & { id: number; name: string };
};

export default function TestimonialsEdit({ testimonial }: Props) {
    return (
        <>
            <Head title={`Editar ${testimonial.name}`} />

            <div className="max-w-2xl space-y-6 p-4">
                <Heading
                    title="Editar testimonio"
                    description="Actualiza el comentario, visibilidad y orden."
                />

                <Form
                    action={`/admin/testimonials/${testimonial.id}`}
                    method="post"
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="_method" value="PUT" />
                            <TestimonialFormFields
                                testimonial={testimonial}
                                errors={errors}
                                processing={processing}
                                submitLabel="Guardar cambios"
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

TestimonialsEdit.layout = {
    breadcrumbs: [
        {
            title: 'Testimonios',
            href: '/admin/testimonials',
        },
        {
            title: 'Editar testimonio',
            href: '#',
        },
    ],
};
