import { Form, Head, Link } from '@inertiajs/react';
import { CalendarCheck, RotateCcw } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type AppointmentSubmission = {
    id: number;
    name: string;
    phone: string;
    email: string;
    appointment_date: string | null;
    message: string;
    was_reviewed: boolean;
    reviewed_at: string | null;
    created_at: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedAppointmentSubmissions = {
    data: AppointmentSubmission[];
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    submissions: PaginatedAppointmentSubmissions;
};

export default function AppointmentSubmissionsIndex({ submissions }: Props) {
    return (
        <>
            <Head title="Solicitudes de cita" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Solicitudes de cita"
                        description="Visualiza los registros enviados desde el formulario del sitio."
                    />

                    <div className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-muted-foreground">
                        <CalendarCheck className="size-4" />
                        {submissions.total} registros
                    </div>
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
                                        Contacto
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Fecha solicitada
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Mensaje
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Recibido
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {submissions.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No hay solicitudes de cita
                                            registradas.
                                        </td>
                                    </tr>
                                ) : (
                                    submissions.data.map((submission) => (
                                        <tr
                                            key={submission.id}
                                            className="border-b align-top last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="font-medium">
                                                    {submission.name}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="space-y-1 text-muted-foreground">
                                                    <a
                                                        href={`tel:${submission.phone.replace(/[^\d+]/g, '')}`}
                                                        className="block transition hover:text-foreground"
                                                    >
                                                        {submission.phone}
                                                    </a>
                                                    <a
                                                        href={`mailto:${submission.email}`}
                                                        className="block transition hover:text-foreground"
                                                    >
                                                        {submission.email}
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {submission.appointment_date ??
                                                    '-'}
                                            </td>
                                            <td className="max-w-md px-4 py-3 text-muted-foreground">
                                                <p className="line-clamp-4">
                                                    {submission.message}
                                                </p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="space-y-1">
                                                    <Badge
                                                        variant={
                                                            submission.was_reviewed
                                                                ? 'default'
                                                                : 'secondary'
                                                        }
                                                    >
                                                        {submission.was_reviewed
                                                            ? 'Tomada en cuenta'
                                                            : 'Pendiente'}
                                                    </Badge>
                                                    {submission.reviewed_at && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {
                                                                submission.reviewed_at
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {submission.created_at ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end">
                                                    <Form
                                                        action={`/admin/appointments/${submission.id}/review`}
                                                        method="patch"
                                                        options={{
                                                            preserveScroll: true,
                                                        }}
                                                    >
                                                        {({ processing }) => (
                                                            <Button
                                                                type="submit"
                                                                variant={
                                                                    submission.was_reviewed
                                                                        ? 'outline'
                                                                        : 'default'
                                                                }
                                                                size="sm"
                                                                disabled={
                                                                    processing
                                                                }
                                                            >
                                                                {submission.was_reviewed ? (
                                                                    <>
                                                                        <RotateCcw className="size-4" />
                                                                        Marcar pendiente
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <CalendarCheck className="size-4" />
                                                                        Tomar en cuenta
                                                                    </>
                                                                )}
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
                        Mostrando {submissions.from ?? 0} a{' '}
                        {submissions.to ?? 0} de {submissions.total}{' '}
                        solicitudes
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {submissions.links.map((link, index) => (
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

AppointmentSubmissionsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Solicitudes de cita',
            href: '/admin/appointments',
        },
    ],
};
