import { Head } from '@inertiajs/react';

export default function Register() {
    return (
        <>
            <Head title="Registro deshabilitado" />
            <div className="text-center text-sm text-muted-foreground">
                El registro publico esta deshabilitado.
            </div>
        </>
    );
}

Register.layout = {
    title: 'Registro deshabilitado',
    description: 'Los usuarios se gestionan desde el panel privado.',
};
