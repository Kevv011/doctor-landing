import { Form, Head, Link } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Testimonial = {
    id: number;
    name: string;
    label: string;
    rating: number;
    is_active: boolean;
    sort_order: number;
    created_at: string | null;
    avatar_url: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedTestimonials = {
    data: Testimonial[];
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    testimonials: PaginatedTestimonials;
};

export default function TestimonialsIndex({ testimonials }: Props) {
    return (
        <>
            <Head title="Testimonios" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Testimonios"
                        description="Administra los comentarios que se mostraran en el sitio."
                    />

                    <Button asChild>
                        <Link href="/admin/testimonials/create">
                            <Plus className="h-4 w-4" />
                            Nuevo testimonio
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Paciente
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Calificacion
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
                                {testimonials.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No hay testimonios registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    testimonials.data.map((testimonial) => (
                                        <tr
                                            key={testimonial.id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {testimonial.avatar_url ? (
                                                        <img
                                                            src={
                                                                testimonial.avatar_url
                                                            }
                                                            alt=""
                                                            className="size-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="size-10 rounded-full bg-muted" />
                                                    )}
                                                    <div>
                                                        <div className="font-medium">
                                                            {testimonial.name}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {
                                                                testimonial.label
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        testimonial.is_active
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {testimonial.is_active
                                                        ? 'Activo'
                                                        : 'Inactivo'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {testimonial.rating}/5
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {testimonial.sort_order}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/testimonials/${testimonial.id}/edit`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Editar
                                                        </Link>
                                                    </Button>

                                                    <Form
                                                        action={`/admin/testimonials/${testimonial.id}`}
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
                        Mostrando {testimonials.from ?? 0} a{' '}
                        {testimonials.to ?? 0} de {testimonials.total}{' '}
                        testimonios
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {testimonials.links.map((link, index) => (
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

TestimonialsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Testimonios',
            href: '/admin/testimonials',
        },
    ],
};
