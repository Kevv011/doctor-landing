import { Star } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type TestimonialFormRecord = {
    id?: number;
    name?: string;
    label?: string;
    quote?: string;
    rating?: number;
    is_active?: boolean;
    sort_order?: number;
    avatar_url?: string | null;
};

type Props = {
    testimonial?: TestimonialFormRecord;
    errors: Partial<Record<string, string>>;
    processing: boolean;
    submitLabel: string;
};

export default function TestimonialFormFields({
    testimonial,
    errors,
    processing,
    submitLabel,
}: Props) {
    const [selectedRating, setSelectedRating] = useState(
        testimonial?.rating ?? 5,
    );

    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    name="name"
                    required
                    defaultValue={testimonial?.name ?? ''}
                    placeholder="Nombre Apellido"
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="label">Etiqueta</Label>
                <Input
                    id="label"
                    name="label"
                    defaultValue={testimonial?.label ?? 'Paciente'}
                    placeholder="Paciente"
                />
                <InputError message={errors.label} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="quote">Testimonio</Label>
                <textarea
                    id="quote"
                    name="quote"
                    required
                    rows={5}
                    defaultValue={testimonial?.quote ?? ''}
                    className="min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    placeholder="Escribe el comentario de la paciente"
                />
                <InputError message={errors.quote} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label>Clasificacion</Label>
                    <div className="flex justify-start gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <label
                                key={rating}
                                className="group cursor-pointer"
                                title={`${rating} de 5`}
                            >
                                <input
                                    type="radio"
                                    name="rating"
                                    value={rating}
                                    checked={selectedRating === rating}
                                    onChange={() => setSelectedRating(rating)}
                                    className="peer sr-only"
                                />
                                <Star
                                    className={`size-7 text-[#e9648d] transition ${
                                        rating <= selectedRating
                                            ? 'fill-[#e9648d]'
                                            : 'fill-transparent'
                                    }`}
                                />
                            </label>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Selecciona de 1 a 5 estrellas.
                    </p>
                    <InputError message={errors.rating} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="sort_order">Orden</Label>
                    <Input
                        id="sort_order"
                        name="sort_order"
                        type="number"
                        min={0}
                        defaultValue={testimonial?.sort_order ?? 0}
                    />
                    <InputError message={errors.sort_order} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="avatar">Avatar</Label>
                {testimonial?.avatar_url && (
                    <img
                        src={testimonial.avatar_url}
                        alt=""
                        className="size-20 rounded-full object-cover"
                    />
                )}
                <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                />
                <InputError message={errors.avatar} />
            </div>

            {testimonial?.avatar_url && (
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        name="remove_avatar"
                        value="1"
                        className="h-4 w-4 rounded border-input"
                    />
                    Quitar avatar actual
                </label>
            )}

            <div className="flex items-start gap-3 rounded-lg border p-4">
                <input type="hidden" name="is_active" value="0" />
                <input
                    id="is_active"
                    name="is_active"
                    type="checkbox"
                    value="1"
                    defaultChecked={testimonial?.is_active ?? true}
                    className="mt-1 h-4 w-4 rounded border-input"
                />
                <div className="space-y-1">
                    <Label htmlFor="is_active">Activo</Label>
                    <p className="text-sm text-muted-foreground">
                        Solo los testimonios activos se publicaran en el sitio.
                    </p>
                    <InputError message={errors.is_active} />
                </div>
            </div>

            <Button disabled={processing}>{submitLabel}</Button>
        </>
    );
}
