import { Form, Head, Link } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Service = {
    id: number;
    title: string;
    excerpt: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string | null;
    image_url: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedServices = {
    data: Service[];
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    services: PaginatedServices;
};

export default function ServicesIndex({ services }: Props) {
    return (
        <>
            <Head title="Servicios" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Servicios"
                        description="Administra los servicios que se publicarán en Home y en la página de servicios."
                    />

                    <Button asChild>
                        <Link href="/admin/services/create">
                            <Plus className="h-4 w-4" />
                            Nuevo servicio
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/40 text-left text-xs text-muted-foreground uppercase">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Servicio
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Orden
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No hay servicios registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    services.data.map((service) => (
                                        <tr
                                            key={service.id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {service.image_url ? (
                                                        <img
                                                            src={
                                                                service.image_url
                                                            }
                                                            alt=""
                                                            className="h-14 w-20 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-14 w-20 rounded-md bg-muted" />
                                                    )}
                                                    <div className="max-w-md">
                                                        <div className="font-medium">
                                                            {service.title}
                                                        </div>
                                                        {service.excerpt && (
                                                            <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                                {
                                                                    service.excerpt
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        service.is_active
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {service.is_active
                                                        ? 'Activo'
                                                        : 'Inactivo'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {service.sort_order}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/services/${service.id}/edit`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Editar
                                                        </Link>
                                                    </Button>

                                                    <Form
                                                        action={`/admin/services/${service.id}`}
                                                        method="delete"
                                                        options={{
                                                            preserveScroll: true,
                                                        }}
                                                    >
                                                        {({ processing }) => (
                                                            <Button
                                                                type="submit"
                                                                variant="destructive"
                                                                size="sm"
                                                                disabled={
                                                                    processing
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Eliminar
                                                            </Button>
                                                        )}
                                                    </Form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        Mostrando {services.from ?? 0} a {services.to ?? 0} de{' '}
                        {services.total} servicios
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {services.links.map((link, index) => (
                            <Button
                                key={`${link.label}-${index}`}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                asChild={Boolean(link.url)}
                            >
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

ServicesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Servicios',
            href: '/admin/services',
        },
    ],
};
