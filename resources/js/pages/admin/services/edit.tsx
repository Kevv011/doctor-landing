import { Form, Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import ServiceFormFields, {
    type ServiceFormRecord,
} from '@/pages/admin/services/components/service-form-fields';

type Props = {
    service: ServiceFormRecord & { id: number; title: string };
};

export default function ServicesEdit({ service }: Props) {
    return (
        <>
            <Head title={`Editar ${service.title}`} />

            <div className="max-w-3xl space-y-6 p-4">
                <Heading
                    title="Editar servicio"
                    description="Actualiza la información, imagen, orden y visibilidad."
                />

                <Form
                    action={`/admin/services/${service.id}`}
                    method="post"
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="_method" value="PUT" />
                            <ServiceFormFields
                                service={service}
                                errors={errors}
                                processing={processing}
                                submitLabel="Guardar cambios"
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

ServicesEdit.layout = {
    breadcrumbs: [
        {
            title: 'Servicios',
            href: '/admin/services',
        },
        {
            title: 'Editar servicio',
            href: '#',
        },
    ],
};
