import { Form, Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AdminUser = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
};

type Props = {
    user: AdminUser;
};

export default function UsersEdit({ user }: Props) {
    return (
        <>
            <Head title={`Editar ${user.name}`} />

            <div className="max-w-2xl space-y-6 p-4">
                <Heading
                    title="Editar usuario"
                    description="Actualiza los datos y permisos de acceso."
                />

                <Form
                    action={`/admin/users/${user.id}`}
                    method="put"
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={user.name}
                                    required
                                    autoComplete="name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={user.email}
                                    required
                                    autoComplete="email"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Nueva contraseña
                                </Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Dejar vacío para conservarla"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirmar nueva contraseña
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    placeholder="Repite la nueva contraseña"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="flex items-start gap-3 rounded-lg border p-4">
                                <input
                                    type="hidden"
                                    name="is_admin"
                                    value="0"
                                />
                                <input
                                    id="is_admin"
                                    name="is_admin"
                                    type="checkbox"
                                    value="1"
                                    defaultChecked={user.is_admin}
                                    className="mt-1 h-4 w-4 rounded border-input"
                                />
                                <div className="space-y-1">
                                    <Label htmlFor="is_admin">
                                        Administrador
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Permite acceder y gestionar el panel
                                        privado.
                                    </p>
                                    <InputError message={errors.is_admin} />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button disabled={processing}>
                                    Guardar cambios
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/admin/users">Cancelar</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

UsersEdit.layout = {
    breadcrumbs: [
        {
            title: 'Usuarios',
            href: '/admin/users',
        },
        {
            title: 'Editar usuario',
            href: '#',
        },
    ],
};
