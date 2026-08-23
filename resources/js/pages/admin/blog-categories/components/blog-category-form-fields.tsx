import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type BlogCategoryFormRecord = {
    id?: number;
    name?: string;
    slug?: string;
    is_active?: boolean;
    sort_order?: number;
};

type Props = {
    category?: BlogCategoryFormRecord;
    errors: Partial<Record<string, string>>;
    processing: boolean;
    submitLabel: string;
};

export default function BlogCategoryFormFields({
    category,
    errors,
    processing,
    submitLabel,
}: Props) {
    return (
        <div className="max-w-2xl space-y-5 rounded-xl border bg-card p-5">
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    name="name"
                    required
                    defaultValue={category?.name ?? ''}
                    placeholder="Ginecología"
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    name="slug"
                    defaultValue={category?.slug ?? ''}
                    placeholder="se-genera-si-lo-dejas-vacio"
                />
                <InputError message={errors.slug} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="sort_order">Orden</Label>
                <Input
                    id="sort_order"
                    name="sort_order"
                    type="number"
                    min={0}
                    defaultValue={category?.sort_order ?? 0}
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
                    defaultChecked={category?.is_active ?? true}
                    className="mt-1 h-4 w-4 rounded border-input"
                />
                <div className="space-y-1">
                    <Label htmlFor="is_active">Activa</Label>
                    <p className="text-sm text-muted-foreground">
                        Solo las categorías activas aparecerán en la landing.
                    </p>
                    <InputError message={errors.is_active} />
                </div>
            </div>

            <div className="flex gap-2">
                <Button disabled={processing}>{submitLabel}</Button>
                <Button variant="outline" asChild>
                    <Link href="/admin/blog-categories">Cancelar</Link>
                </Button>
            </div>
        </div>
    );
}
