import { Form, Head, Link, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Auth } from '@/types';

type AdminUser = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    email_verified_at: string | null;
    created_at: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedUsers = {
    data: AdminUser[];
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    users: PaginatedUsers;
};

type PageProps = {
    auth: Auth;
};

export default function UsersIndex({ users }: Props) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Usuarios" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Usuarios"
                        description="Administra los accesos al panel privado."
                    />

                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus className="h-4 w-4" />
                            Nuevo usuario
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Nombre
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Correo
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Rol
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Creado
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No hay usuarios registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="font-medium">
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        user.is_admin
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {user.is_admin
                                                        ? 'Administrador'
                                                        : 'Usuario'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {user.created_at ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/users/${user.id}/edit`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Editar
                                                        </Link>
                                                    </Button>

                                                    <Form
                                                        action={`/admin/users/${user.id}`}
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
                                                                    processing ||
                                                                    auth.user
                                                                        .id ===
                                                                        user.id
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
                        Mostrando {users.from ?? 0} a {users.to ?? 0} de{' '}
                        {users.total} usuarios
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {users.links.map((link, index) => (
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

UsersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Usuarios',
            href: '/admin/users',
        },
    ],
};
