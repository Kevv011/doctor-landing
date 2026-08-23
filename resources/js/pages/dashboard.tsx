import { Head, Link } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    CalendarClock,
    FileText,
    MapPin,
    MessageSquareQuote,
    NotebookText,
    Phone,
    Star,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard } from '@/routes';

type BusinessSummary = {
    name: string;
    email: string | null;
    phone: string | null;
    appointment_phone: string | null;
    address: string | null;
    latitude: string | null;
    longitude: string | null;
};

type DashboardStats = {
    published_blogs: number;
    draft_blogs: number;
    pending_appointments: number;
    active_testimonials: number;
};

type LatestBlog = {
    id: number;
    title: string;
    status: string;
    is_featured: boolean;
    category: string | null;
    published_at: string | null;
    created_at: string | null;
};

type LatestAppointment = {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    appointment_date: string | null;
    message: string | null;
    was_reviewed: boolean;
    created_at: string | null;
};

type Props = {
    business: BusinessSummary | null;
    stats: DashboardStats;
    latestBlogs: LatestBlog[];
    latestAppointments: LatestAppointment[];
};

const statCards = [
    {
        key: 'published_blogs',
        title: 'Blogs publicados',
        description: 'Visibles en el sitio',
        icon: NotebookText,
    },
    {
        key: 'draft_blogs',
        title: 'Borradores',
        description: 'Pendientes de publicación',
        icon: FileText,
    },
    {
        key: 'pending_appointments',
        title: 'Citas pendientes',
        description: 'Aún sin marcar como revisadas',
        icon: CalendarClock,
    },
    {
        key: 'active_testimonials',
        title: 'Testimonios activos',
        description: 'Renderizados públicamente',
        icon: MessageSquareQuote,
    },
] as const;

export default function Dashboard({
    business,
    stats,
    latestBlogs,
    latestAppointments,
}: Props) {
    return (
        <>
            <Head title="Panel" />

            <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-4">
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((statCard) => {
                        const StatIcon = statCard.icon;

                        return (
                            <Card key={statCard.key}>
                                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                                    <div>
                                        <CardDescription>
                                            {statCard.title}
                                        </CardDescription>
                                        <CardTitle className="mt-2 text-3xl">
                                            {stats[statCard.key]}
                                        </CardTitle>
                                    </div>
                                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                                        <StatIcon className="size-5" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {statCard.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </section>

                <section className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.2fr)]">
                    <Card className="xl:min-h-[420px]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BriefcaseBusiness className="size-5" />
                                Información del negocio
                            </CardTitle>
                            <CardDescription>
                                Resumen rápido de los datos visibles en el
                                sitio.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {business ? (
                                <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(240px,1fr)]">
                                    <div className="space-y-5">
                                        <div>
                                            <p className="text-lg font-semibold">
                                                {business.name}
                                            </p>
                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {business.email ??
                                                    'Correo no configurado'}
                                            </p>
                                        </div>

                                        <div className="grid gap-3 text-sm">
                                            <InfoRow
                                                icon={Phone}
                                                label="Teléfono principal"
                                                value={
                                                    business.phone ??
                                                    'No configurado'
                                                }
                                            />
                                            <InfoRow
                                                icon={CalendarClock}
                                                label="Teléfono de citas"
                                                value={
                                                    business.appointment_phone ??
                                                    'No configurado'
                                                }
                                            />
                                            <InfoRow
                                                icon={MapPin}
                                                label="Dirección"
                                                value={
                                                    business.address ??
                                                    'No configurada'
                                                }
                                            />
                                        </div>

                                        <Link
                                            href="/admin/business-settings"
                                            className="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                                        >
                                            Editar datos del negocio
                                        </Link>
                                    </div>

                                    <BusinessMap business={business} />
                                </div>
                            ) : (
                                <EmptyState
                                    title="Negocio sin configurar"
                                    description="Agrega los datos base para activar la información pública de contacto."
                                    actionHref="/admin/business-settings"
                                    actionLabel="Configurar negocio"
                                />
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Últimos blogs</CardTitle>
                            <CardDescription>
                                Artículos recientes creados o actualizados en el
                                admin.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {latestBlogs.length > 0 ? (
                                <div className="divide-y">
                                    {latestBlogs.map((blog) => (
                                        <div
                                            key={blog.id}
                                            className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">
                                                    {blog.title}
                                                </p>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {blog.category ??
                                                        'Sin categoría'}{' '}
                                                    ·{' '}
                                                    {blog.published_at ??
                                                        blog.created_at ??
                                                        'Sin fecha'}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge
                                                    variant={
                                                        blog.status ===
                                                        'published'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {blog.status === 'published'
                                                        ? 'Publicado'
                                                        : 'Borrador'}
                                                </Badge>
                                                {blog.is_featured && (
                                                    <Badge variant="outline">
                                                        <Star className="size-3" />
                                                        Destacado
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="Sin blogs aún"
                                    description="Crea el primer artículo para alimentar la landing y la página de blog."
                                    actionHref="/admin/blogs/create"
                                    actionLabel="Crear blog"
                                />
                            )}
                        </CardContent>
                    </Card>
                </section>

                <Card>
                    <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <CardTitle>Últimas 5 citas</CardTitle>
                            <CardDescription>
                                Solicitudes recibidas desde el formulario del
                                sitio.
                            </CardDescription>
                        </div>
                        <Link
                            href="/admin/appointments"
                            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                            Ver todas
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {latestAppointments.length > 0 ? (
                            <div className="grid gap-3">
                                {latestAppointments.map((appointment) => (
                                    <article
                                        key={appointment.id}
                                        className="rounded-lg border bg-muted/20 p-4"
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="font-semibold">
                                                        {appointment.name}
                                                    </h3>
                                                    <Badge
                                                        variant={
                                                            appointment.was_reviewed
                                                                ? 'secondary'
                                                                : 'default'
                                                        }
                                                    >
                                                        {appointment.was_reviewed
                                                            ? 'Revisada'
                                                            : 'Pendiente'}
                                                    </Badge>
                                                </div>
                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    Solicitada:{' '}
                                                    {appointment.created_at ??
                                                        'Sin fecha'}
                                                </p>
                                            </div>
                                            {appointment.appointment_date && (
                                                <div className="text-sm font-medium">
                                                    Fecha preferida:{' '}
                                                    {
                                                        appointment.appointment_date
                                                    }
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                                            <span>
                                                Teléfono: {appointment.phone}
                                            </span>
                                            <span>
                                                Correo:{' '}
                                                {appointment.email ??
                                                    'No indicado'}
                                            </span>
                                        </div>

                                        {appointment.message && (
                                            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                                                {appointment.message}
                                            </p>
                                        )}
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="Sin solicitudes de cita"
                                description="Cuando alguien complete el formulario, aparecerá aquí."
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: typeof Phone;
    label: string;
    value: string;
}) {
    return (
        <div className="flex gap-3">
            <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-muted-foreground">{value}</p>
            </div>
        </div>
    );
}

function BusinessMap({ business }: { business: BusinessSummary }) {
    if (!business.latitude || !business.longitude) {
        return (
            <div className="grid min-h-[220px] place-items-center rounded-lg border border-dashed bg-muted/20 p-5 text-center">
                <div>
                    <MapPin className="mx-auto size-8 text-muted-foreground" />
                    <p className="mt-3 font-medium">
                        Coordenadas no configuradas
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Agrega latitud y longitud para visualizar el mapa.
                    </p>
                </div>
            </div>
        );
    }

    const coordinates = `${business.latitude},${business.longitude}`;
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(coordinates)}&z=15&output=embed`;

    return (
        <div className="overflow-hidden rounded-lg border bg-muted/20">
            <iframe
                title={`Mapa de ${business.name}`}
                src={mapUrl}
                className="h-[260px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-muted-foreground">
                <span className="truncate">Ubicación configurada</span>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinates)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 font-medium text-primary underline-offset-4 hover:underline"
                >
                    Abrir mapa
                </a>
            </div>
        </div>
    );
}

function EmptyState({
    title,
    description,
    actionHref,
    actionLabel,
}: {
    title: string;
    description: string;
    actionHref?: string;
    actionLabel?: string;
}) {
    return (
        <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="font-semibold">{title}</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {description}
            </p>
            {actionHref && actionLabel && (
                <Link
                    href={actionHref}
                    className="mt-4 inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Panel',
            href: dashboard(),
        },
    ],
};
