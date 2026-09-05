import { Form, Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import ServiceFormFields from '@/pages/admin/services/components/service-form-fields';

export default function ServicesCreate() {
    return (
        <>
            <Head title="Nuevo servicio" />

            <div className="max-w-3xl space-y-6 p-4">
                <Heading
                    title="Nuevo servicio"
                    description="Crea un servicio para mostrarlo en el sitio"
                />

                <Form
                    action="/admin/services"
                    method="post"
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <ServiceFormFields
                                errors={errors}
                                processing={processing}
                                submitLabel="Crear servicio"
                            />

                            <Button variant="outline" asChild>
                                <Link href="/admin/services">Cancelar</Link>
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

ServicesCreate.layout = {
    breadcrumbs: [
        {
            title: 'Servicios',
            href: '/admin/services',
        },
        {
            title: 'Nuevo servicio',
            href: '/admin/services/create',
        },
    ],
};
