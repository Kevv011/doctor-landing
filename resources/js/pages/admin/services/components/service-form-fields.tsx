import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlogEditor from '@/pages/admin/blogs/components/blog-editor';

export type ServiceFormRecord = {
    id?: number;
    title?: string;
    excerpt?: string | null;
    body?: Record<string, unknown>[] | null;
    tags?: string | null;
    is_active?: boolean;
    sort_order?: number;
    has_image?: boolean;
    image_url?: string | null;
    media_upload_url?: string | null;
};

type Props = {
    service?: ServiceFormRecord;
    errors: Partial<Record<string, string>>;
    processing: boolean;
    cancelHref: string;
    submitLabel: string;
};

export default function ServiceFormFields({
    service,
    errors,
    processing,
    cancelHref,
    submitLabel,
}: Props) {
    return (
        <div className="grid gap-6 lg:h-[calc(100vh-13rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <aside className="space-y-5 rounded-xl border bg-card p-4 shadow-xs lg:max-h-full lg:overflow-y-auto">
                <div className="space-y-1">
                    <h2 className="text-sm font-semibold">
                        Configuración del servicio
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Información para las tarjetas, la portada y la
                        visibilidad pública.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                        id="title"
                        name="title"
                        required
                        defaultValue={service?.title ?? ''}
                        placeholder="Consulta ginecológica y obstétrica"
                    />
                    <p className="text-xs text-muted-foreground">
                        Este título se mostrará en las tarjetas y en el detalle
                        del servicio.
                    </p>
                    <InputError message={errors.title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="excerpt">Resumen para tarjetas</Label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        rows={4}
                        defaultValue={service?.excerpt ?? ''}
                        className="min-h-28 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        placeholder="Texto corto que se mostrará en el listado de servicios."
                    />
                    <InputError message={errors.excerpt} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tags">Etiquetas</Label>
                    <Input
                        id="tags"
                        name="tags"
                        defaultValue={service?.tags ?? ''}
                        placeholder="Cuidado, atención, salud"
                    />
                    <p className="text-xs text-muted-foreground">
                        Sepáralas por coma. Se mostrarán como temas
                        relacionados.
                    </p>
                    <InputError message={errors.tags} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="sort_order">Orden</Label>
                        <Input
                            id="sort_order"
                            name="sort_order"
                            type="number"
                            min={0}
                            defaultValue={service?.sort_order ?? 0}
                        />
                        <InputError message={errors.sort_order} />
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border p-4">
                        <input type="hidden" name="is_active" value="0" />
                        <input
                            id="is_active"
                            name="is_active"
                            type="checkbox"
                            value="1"
                            defaultChecked={service?.is_active ?? true}
                            className="mt-1 h-4 w-4 rounded border-input"
                        />
                        <div className="space-y-1">
                            <Label htmlFor="is_active">Activo</Label>
                            <p className="text-sm text-muted-foreground">
                                Solo los servicios activos se publicarán en el
                                sitio.
                            </p>
                            <InputError message={errors.is_active} />
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="image">Imagen del servicio</Label>
                    {service?.image_url && (
                        <div className="overflow-hidden rounded-lg border">
                            <img
                                src={service.image_url}
                                alt=""
                                className="h-44 w-full object-cover"
                            />
                        </div>
                    )}
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                    />
                    <p className="text-xs text-muted-foreground">
                        Si no agregas una imagen, el sitio usará la imagen
                        predeterminada de servicios.
                    </p>
                    <InputError message={errors.image} />
                </div>

                {service?.has_image && (
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="remove_image"
                            value="1"
                            className="h-4 w-4 rounded border-input"
                        />
                        Quitar imagen actual
                    </label>
                )}

                <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row lg:flex-col xl:flex-row">
                    <Button disabled={processing}>{submitLabel}</Button>
                    <Button variant="outline" asChild>
                        <Link href={cancelHref}>Cancelar</Link>
                    </Button>
                </div>
            </aside>

            <section className="flex min-h-[70vh] flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs lg:min-h-0">
                <div className="grid gap-2">
                    <Label htmlFor="body">Contenido del servicio</Label>
                    <p className="text-sm text-muted-foreground">
                        Construye el detalle con bloques: encabezados, listas,
                        citas, imágenes y formato de texto.
                    </p>
                </div>

                <div className="min-h-0 flex-1">
                    <BlogEditor
                        name="body"
                        initialContent={service?.body}
                        uploadUrl={service?.media_upload_url}
                        className="h-[65vh] lg:h-full"
                    />
                </div>

                <p className="text-xs text-muted-foreground">
                    {service?.media_upload_url
                        ? 'Las imágenes insertadas se guardarán con este servicio.'
                        : 'Guarda el servicio y edítalo para habilitar la subida de imágenes dentro del contenido.'}
                </p>
                <InputError message={errors.body} />
            </section>
        </div>
    );
}
