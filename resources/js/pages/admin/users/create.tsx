import { Form, Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UsersCreate() {
    return (
        <>
            <Head title="Nuevo usuario" />

            <div className="max-w-2xl space-y-6 p-4">
                <Heading
                    title="Nuevo usuario"
                    description="Crea una cuenta para acceder al panel administrativo."
                />

                <Form
                    action="/admin/users"
                    method="post"
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
                                    required
                                    autoComplete="name"
                                    placeholder="Nombre completo"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="correo@ejemplo.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    autoComplete="new-password"
                                    placeholder="Contraseña"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirmar contraseña
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    required
                                    autoComplete="new-password"
                                    placeholder="Confirmar contraseña"
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
                                    Crear usuario
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

UsersCreate.layout = {
    breadcrumbs: [
        {
            title: 'Usuarios',
            href: '/admin/users',
        },
        {
            title: 'Nuevo usuario',
            href: '/admin/users/create',
        },
    ],
};
