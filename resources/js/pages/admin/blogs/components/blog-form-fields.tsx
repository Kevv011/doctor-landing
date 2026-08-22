import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BlogEditor from '@/pages/admin/blogs/components/blog-editor';

export type BlogStatusOption = {
    value: string;
    label: string;
};

export type BlogFormPost = {
    id?: number;
    title?: string;
    slug?: string;
    excerpt?: string | null;
    body?: Record<string, unknown>[] | null;
    status?: string;
    is_featured?: boolean;
    published_at?: string | null;
    seo_title?: string | null;
    seo_description?: string | null;
    featured_image_url?: string | null;
    media_upload_url?: string | null;
};

type Props = {
    post?: BlogFormPost;
    statuses: BlogStatusOption[];
    errors: Partial<Record<string, string>>;
    processing: boolean;
    cancelHref: string;
    submitLabel: string;
};

export default function BlogFormFields({
    post,
    statuses,
    errors,
    processing,
    cancelHref,
    submitLabel,
}: Props) {
    return (
        <div className="grid gap-6 lg:h-[calc(100vh-13rem)] lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
            <aside className="space-y-5 rounded-xl border bg-card p-4 shadow-xs lg:max-h-full lg:overflow-y-auto">
                <div className="space-y-1">
                    <h2 className="text-sm font-semibold">
                        Configuracion del articulo
                    </h2>
                    <p className="text-xs text-muted-foreground">
                        Datos de publicacion, portada y SEO.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="title">Titulo</Label>
                    <Input
                        id="title"
                        name="title"
                        required
                        defaultValue={post?.title ?? ''}
                        placeholder="Titulo del articulo"
                    />
                    <InputError message={errors.title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                        id="slug"
                        name="slug"
                        defaultValue={post?.slug ?? ''}
                        placeholder="se-genera-si-lo-dejas-vacio"
                    />
                    <InputError message={errors.slug} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="excerpt">Extracto</Label>
                    <textarea
                        id="excerpt"
                        name="excerpt"
                        defaultValue={post?.excerpt ?? ''}
                        rows={4}
                        className="min-h-28 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        placeholder="Resumen corto para tarjetas y SEO"
                    />
                    <InputError message={errors.excerpt} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="grid gap-2">
                        <Label htmlFor="status">Estado</Label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={post?.status ?? 'draft'}
                            className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        >
                            {statuses.map((status) => (
                                <option
                                    key={status.value}
                                    value={status.value}
                                >
                                    {status.label}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.status} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="published_at">
                            Fecha de publicacion
                        </Label>
                        <Input
                            id="published_at"
                            name="published_at"
                            type="datetime-local"
                            defaultValue={post?.published_at ?? ''}
                        />
                        <InputError message={errors.published_at} />
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border p-4">
                    <input type="hidden" name="is_featured" value="0" />
                    <input
                        id="is_featured"
                        name="is_featured"
                        type="checkbox"
                        value="1"
                        defaultChecked={post?.is_featured ?? false}
                        className="mt-1 h-4 w-4 rounded border-input"
                    />
                    <div className="space-y-1">
                        <Label htmlFor="is_featured">Blog destacado</Label>
                        <p className="text-sm text-muted-foreground">
                            Permite mostrar este articulo en la seccion de
                            articulos destacados de la landing.
                        </p>
                        <InputError message={errors.is_featured} />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="featured_image">Imagen destacada</Label>
                    {post?.featured_image_url && (
                        <div className="overflow-hidden rounded-lg border">
                            <img
                                src={post.featured_image_url}
                                alt=""
                                className="h-36 w-full object-cover"
                            />
                        </div>
                    )}
                    <Input
                        id="featured_image"
                        name="featured_image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                    />
                    <InputError message={errors.featured_image} />
                </div>

                {post?.featured_image_url && (
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="remove_featured_image"
                            value="1"
                            className="h-4 w-4 rounded border-input"
                        />
                        Quitar imagen destacada actual
                    </label>
                )}

                <div className="grid gap-4 rounded-lg border p-4">
                    <div>
                        <h3 className="font-medium">SEO</h3>
                        <p className="text-sm text-muted-foreground">
                            Campos opcionales para buscadores y previews.
                        </p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="seo_title">Titulo SEO</Label>
                        <Input
                            id="seo_title"
                            name="seo_title"
                            defaultValue={post?.seo_title ?? ''}
                        />
                        <InputError message={errors.seo_title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="seo_description">
                            Descripcion SEO
                        </Label>
                        <textarea
                            id="seo_description"
                            name="seo_description"
                            defaultValue={post?.seo_description ?? ''}
                            rows={3}
                            className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <InputError message={errors.seo_description} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row lg:flex-col">
                    <Button disabled={processing}>{submitLabel}</Button>
                    <Button variant="outline" asChild>
                        <Link href={cancelHref}>Cancelar</Link>
                    </Button>
                </div>
            </aside>

            <section className="flex min-h-[70vh] flex-col gap-3 rounded-xl border bg-card p-4 shadow-xs lg:min-h-0">
                <div className="grid gap-2">
                    <Label htmlFor="body">Editor de contenido</Label>
                    <p className="text-sm text-muted-foreground">
                        Construye el articulo con bloques. Esta zona mantiene
                        su propio scroll para revisar el contenido completo.
                    </p>
                </div>

                <div className="min-h-0 flex-1">
                    <BlogEditor
                        name="body"
                        initialContent={post?.body}
                        uploadUrl={post?.media_upload_url}
                        className="h-[65vh] lg:h-full"
                    />
                </div>

                <p className="text-xs text-muted-foreground">
                    {post?.media_upload_url
                        ? 'Las imagenes seran procesadas una vez guardado.'
                        : 'Guarda el borrador y editalo para habilitar la subida de imagenes.'}
                </p>
                <InputError message={errors.body} />
            </section>
        </div>
    );
}
