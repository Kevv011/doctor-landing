import { Form, Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import ServiceFormFields from '@/pages/admin/services/components/service-form-fields';

export default function ServicesCreate() {
    return (
        <>
            <Head title="Nuevo servicio" />

            <div className="space-y-6 p-4">
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
                                cancelHref="/admin/services"
                                submitLabel="Crear servicio"
                            />
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
