import { Head, useForm } from '@inertiajs/react';
import { Plus, Save, Trash2 } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type BusinessProfile = {
    name: string;
    email: string | null;
    phone: string | null;
    appointment_phone: string | null;
    address: string | null;
    google_maps_url: string | null;
    latitude: string | null;
    longitude: string | null;
};

type BusinessHour = {
    id?: number;
    day_of_week: number | null;
    label: string;
    opens_at: string | null;
    closes_at: string | null;
    special_text: string | null;
    is_active: boolean;
    sort_order: number;
};

type BusinessSocialLink = {
    id?: number;
    platform: string;
    label: string | null;
    url: string;
    is_active: boolean;
    sort_order: number;
};

type SocialPlatform = {
    value: string;
    label: string;
};

type Props = {
    profile: BusinessProfile;
    heroVideoUrl: string | null;
    hours: BusinessHour[];
    socialLinks: BusinessSocialLink[];
    socialPlatforms: SocialPlatform[];
};

type FormData = {
    profile: BusinessProfile;
    hero_video: File | null;
    remove_hero_video: boolean;
    hours: BusinessHour[];
    social_links: BusinessSocialLink[];
};

const defaultHours: BusinessHour[] = [
    {
        day_of_week: null,
        label: 'Martes a viernes',
        opens_at: '10:30',
        closes_at: '18:00',
        special_text: '',
        is_active: true,
        sort_order: 1,
    },
    {
        day_of_week: 6,
        label: 'Sábados',
        opens_at: '10:00',
        closes_at: '14:00',
        special_text: '',
        is_active: true,
        sort_order: 2,
    },
];

const dayOptions = [
    { value: 'empty', label: 'Personalizado' },
    { value: '0', label: 'Domingo' },
    { value: '1', label: 'Lunes' },
    { value: '2', label: 'Martes' },
    { value: '3', label: 'Miércoles' },
    { value: '4', label: 'Jueves' },
    { value: '5', label: 'Viernes' },
    { value: '6', label: 'Sábado' },
];

export default function BusinessSettingsEdit({
    profile,
    heroVideoUrl,
    hours,
    socialLinks,
    socialPlatforms,
}: Props) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        profile: normalizeProfile(profile),
        hero_video: null,
        remove_hero_video: false,
        hours: hours.length > 0 ? hours : defaultHours,
        social_links: socialLinks,
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put('/admin/business-settings', {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const error = (key: string) => errors[key as keyof typeof errors];

    const updateProfile = (key: keyof BusinessProfile, value: string) => {
        setData('profile', {
            ...data.profile,
            [key]: value,
        });
    };

    const updateHour = (
        index: number,
        key: keyof BusinessHour,
        value: string | number | boolean | null,
    ) => {
        setData(
            'hours',
            data.hours.map((hour, hourIndex) =>
                hourIndex === index ? { ...hour, [key]: value } : hour,
            ),
        );
    };

    const updateSocialLink = (
        index: number,
        key: keyof BusinessSocialLink,
        value: string | number | boolean | null,
    ) => {
        setData(
            'social_links',
            data.social_links.map((socialLink, socialIndex) =>
                socialIndex === index
                    ? { ...socialLink, [key]: value }
                    : socialLink,
            ),
        );
    };

    const addHour = () => {
        setData('hours', [
            ...data.hours,
            {
                day_of_week: null,
                label: '',
                opens_at: '',
                closes_at: '',
                special_text: '',
                is_active: true,
                sort_order: data.hours.length + 1,
            },
        ]);
    };

    const addSocialLink = () => {
        setData('social_links', [
            ...data.social_links,
            {
                platform: socialPlatforms[0]?.value ?? 'instagram',
                label: '',
                url: '',
                is_active: true,
                sort_order: data.social_links.length + 1,
            },
        ]);
    };

    return (
        <>
            <Head title="Configuración del negocio" />

            <form onSubmit={submit} className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Configuración del negocio"
                        description="Administra los datos base que luego se renderizarán en el sitio."
                    />

                    <Button type="submit" disabled={processing}>
                        <Save className="size-4" />
                        Guardar cambios
                    </Button>
                </div>

                <section className="rounded-xl border bg-card p-5">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Información general
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Nombre, contacto principal y datos para la futura
                            integración con mapa.
                        </p>
                    </div>

                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                        <Field
                            label="Nombre del negocio"
                            error={error('profile.name')}
                        >
                            <Input
                                value={data.profile.name}
                                onChange={(event) =>
                                    updateProfile('name', event.target.value)
                                }
                                placeholder="Women's Health Clinic"
                            />
                        </Field>

                        <Field label="Email" error={error('profile.email')}>
                            <Input
                                type="email"
                                value={data.profile.email ?? ''}
                                onChange={(event) =>
                                    updateProfile('email', event.target.value)
                                }
                                placeholder="hola@correo.com"
                            />
                        </Field>

                        <Field
                            label="Teléfono principal"
                            error={error('profile.phone')}
                        >
                            <Input
                                value={data.profile.phone ?? ''}
                                onChange={(event) =>
                                    updateProfile('phone', event.target.value)
                                }
                                placeholder="+503 7345 1108"
                            />
                        </Field>

                        <Field
                            label="WhatsApp / teléfono de citas"
                            error={error('profile.appointment_phone')}
                        >
                            <Input
                                value={data.profile.appointment_phone ?? ''}
                                onChange={(event) =>
                                    updateProfile(
                                        'appointment_phone',
                                        event.target.value,
                                    )
                                }
                                placeholder="+503 7345 1108"
                            />
                        </Field>

                        <Field
                            label="URL de Google Maps"
                            error={error('profile.google_maps_url')}
                        >
                            <Input
                                value={data.profile.google_maps_url ?? ''}
                                onChange={(event) =>
                                    updateProfile(
                                        'google_maps_url',
                                        event.target.value,
                                    )
                                }
                                placeholder="https://maps.google.com/..."
                            />
                        </Field>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                label="Latitud"
                                error={error('profile.latitude')}
                            >
                                <Input
                                    value={data.profile.latitude ?? ''}
                                    onChange={(event) =>
                                        updateProfile(
                                            'latitude',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="13.6989000"
                                />
                            </Field>

                            <Field
                                label="Longitud"
                                error={error('profile.longitude')}
                            >
                                <Input
                                    value={data.profile.longitude ?? ''}
                                    onChange={(event) =>
                                        updateProfile(
                                            'longitude',
                                            event.target.value,
                                        )
                                    }
                                    placeholder="-89.2182000"
                                />
                            </Field>
                        </div>
                    </div>

                    <Field
                        className="mt-5"
                        label="Dirección"
                        error={error('profile.address')}
                    >
                        <textarea
                            value={data.profile.address ?? ''}
                            onChange={(event) =>
                                updateProfile('address', event.target.value)
                            }
                            rows={4}
                            className="min-h-28 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            placeholder="Hospital Avante Especializado..."
                        />
                    </Field>
                </section>

                <section className="rounded-xl border bg-card p-5">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Video de presentación
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Este video aparecerá al seleccionar “Ver video” al
                            inicio del sitio.
                        </p>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                        <Field
                            label="Archivo de video"
                            error={error('hero_video')}
                        >
                            <Input
                                type="file"
                                accept="video/mp4,video/webm,video/ogg,video/quicktime"
                                onChange={(event) => {
                                    setData(
                                        'hero_video',
                                        event.target.files?.[0] ?? null,
                                    );
                                    setData('remove_hero_video', false);
                                }}
                            />
                            <p className="text-xs text-muted-foreground">
                                Formatos recomendados: MP4, WebM, OGG o MOV. Peso máximo: 200 MB.
                            </p>
                        </Field>

                        {heroVideoUrl && !data.remove_hero_video && (
                            <div className="flex items-center gap-3 rounded-lg border border-primary/25 bg-secondary/50 p-3 text-sm">
                                <video
                                    src={heroVideoUrl}
                                    className="h-16 w-28 rounded-md bg-black object-cover"
                                    muted
                                    controls
                                />
                                <div className="flex flex-col gap-2">
                                    <span className="font-medium">
                                        Video actual
                                    </span>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setData('hero_video', null);
                                            setData('remove_hero_video', true);
                                        }}
                                    >
                                        <Trash2 className="size-4" />
                                        Quitar video
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="rounded-xl border bg-card p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">Horarios</h2>
                            <p className="text-sm text-muted-foreground">
                                Define bloques visibles para el sitio. El texto
                                especial puede usarse para feriados o notas.
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addHour}
                        >
                            <Plus className="size-4" />
                            Agregar horario
                        </Button>
                    </div>

                    <div className="mt-5 space-y-4">
                        {data.hours.map((hour, index) => (
                            <div
                                key={hour.id ?? `new-hour-${index}`}
                                className="rounded-lg border p-4"
                            >
                                <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_0.8fr_0.8fr_0.7fr_auto]">
                                    <Field
                                        label="Día"
                                        error={error(
                                            `hours.${index}.day_of_week`,
                                        )}
                                    >
                                        <Select
                                            value={
                                                hour.day_of_week === null
                                                    ? 'empty'
                                                    : String(hour.day_of_week)
                                            }
                                            onValueChange={(value) =>
                                                updateHour(
                                                    index,
                                                    'day_of_week',
                                                    value === 'empty'
                                                        ? null
                                                        : Number(value),
                                                )
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent
                                                position="item-aligned"
                                                className="w-[var(--radix-select-trigger-width)]"
                                            >
                                                {dayOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    <Field
                                        label="Etiqueta"
                                        error={error(`hours.${index}.label`)}
                                    >
                                        <Input
                                            value={hour.label}
                                            onChange={(event) =>
                                                updateHour(
                                                    index,
                                                    'label',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Martes a viernes"
                                        />
                                    </Field>

                                    <Field
                                        label="Apertura"
                                        error={error(`hours.${index}.opens_at`)}
                                    >
                                        <Input
                                            type="time"
                                            value={hour.opens_at ?? ''}
                                            onChange={(event) =>
                                                updateHour(
                                                    index,
                                                    'opens_at',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </Field>

                                    <Field
                                        label="Cierre"
                                        error={error(
                                            `hours.${index}.closes_at`,
                                        )}
                                    >
                                        <Input
                                            type="time"
                                            value={hour.closes_at ?? ''}
                                            onChange={(event) =>
                                                updateHour(
                                                    index,
                                                    'closes_at',
                                                    event.target.value,
                                                )
                                            }
                                        />
                                    </Field>

                                    <Field
                                        label="Orden"
                                        error={error(
                                            `hours.${index}.sort_order`,
                                        )}
                                    >
                                        <Input
                                            type="number"
                                            min={0}
                                            value={hour.sort_order}
                                            onChange={(event) =>
                                                updateHour(
                                                    index,
                                                    'sort_order',
                                                    Number(event.target.value),
                                                )
                                            }
                                        />
                                    </Field>

                                    <div className="flex items-end justify-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setData(
                                                    'hours',
                                                    data.hours.filter(
                                                        (_, hourIndex) =>
                                                            hourIndex !== index,
                                                    ),
                                                )
                                            }
                                            aria-label="Eliminar horario"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto]">
                                    <Field
                                        label="Texto especial"
                                        error={error(
                                            `hours.${index}.special_text`,
                                        )}
                                    >
                                        <Input
                                            value={hour.special_text ?? ''}
                                            onChange={(event) =>
                                                updateHour(
                                                    index,
                                                    'special_text',
                                                    event.target.value,
                                                )
                                            }
                                            placeholder="Atención solo con cita previa"
                                        />
                                    </Field>

                                    <label className="flex items-center gap-2 self-end text-sm">
                                        <input
                                            type="checkbox"
                                            checked={hour.is_active}
                                            onChange={(event) =>
                                                updateHour(
                                                    index,
                                                    'is_active',
                                                    event.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 rounded border-input"
                                        />
                                        Activo
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-xl border bg-card p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Redes sociales
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Selecciona la plataforma y coloca la URL pública
                                del perfil.
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addSocialLink}
                        >
                            <Plus className="size-4" />
                            Agregar red
                        </Button>
                    </div>

                    <div className="mt-5 space-y-4">
                        {data.social_links.length === 0 && (
                            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                                Aún no hay redes sociales configuradas.
                            </div>
                        )}

                        {data.social_links.map((socialLink, index) => (
                            <div
                                key={socialLink.id ?? `new-social-${index}`}
                                className="grid gap-4 rounded-lg border p-4 lg:grid-cols-[1fr_1fr_2fr_0.7fr_auto_auto]"
                            >
                                <Field
                                    label="Red social"
                                    error={error(
                                        `social_links.${index}.platform`,
                                    )}
                                >
                                    <Select
                                        value={socialLink.platform}
                                        onValueChange={(value) =>
                                            updateSocialLink(
                                                index,
                                                'platform',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent
                                            position="item-aligned"
                                            className="w-[var(--radix-select-trigger-width)]"
                                        >
                                            {socialPlatforms.map((platform) => (
                                                <SelectItem
                                                    key={platform.value}
                                                    value={platform.value}
                                                >
                                                    {platform.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field
                                    label="Etiqueta"
                                    error={error(`social_links.${index}.label`)}
                                >
                                    <Input
                                        value={socialLink.label ?? ''}
                                        onChange={(event) =>
                                            updateSocialLink(
                                                index,
                                                'label',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Instagram"
                                    />
                                </Field>

                                <Field
                                    label="URL"
                                    error={error(`social_links.${index}.url`)}
                                >
                                    <Input
                                        value={socialLink.url}
                                        onChange={(event) =>
                                            updateSocialLink(
                                                index,
                                                'url',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="https://instagram.com/..."
                                    />
                                </Field>

                                <Field
                                    label="Orden"
                                    error={error(
                                        `social_links.${index}.sort_order`,
                                    )}
                                >
                                    <Input
                                        type="number"
                                        min={0}
                                        value={socialLink.sort_order}
                                        onChange={(event) =>
                                            updateSocialLink(
                                                index,
                                                'sort_order',
                                                Number(event.target.value),
                                            )
                                        }
                                    />
                                </Field>

                                <label className="flex items-center gap-2 self-end pb-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={socialLink.is_active}
                                        onChange={(event) =>
                                            updateSocialLink(
                                                index,
                                                'is_active',
                                                event.target.checked,
                                            )
                                        }
                                        className="h-4 w-4 rounded border-input"
                                    />
                                    Activa
                                </label>

                                <div className="flex items-end justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() =>
                                            setData(
                                                'social_links',
                                                data.social_links.filter(
                                                    (_, socialIndex) =>
                                                        socialIndex !== index,
                                                ),
                                            )
                                        }
                                        aria-label="Eliminar red social"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </form>
        </>
    );
}

function Field({
    label,
    error,
    children,
    className = '',
}: {
    label: string;
    error?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`grid gap-2 ${className}`}>
            <Label>{label}</Label>
            {children}
            <InputError message={error} />
        </div>
    );
}

function normalizeProfile(profile: BusinessProfile): BusinessProfile {
    return {
        name: profile.name ?? '',
        email: profile.email ?? '',
        phone: profile.phone ?? '',
        appointment_phone: profile.appointment_phone ?? '',
        address: profile.address ?? '',
        google_maps_url: profile.google_maps_url ?? '',
        latitude: profile.latitude ?? '',
        longitude: profile.longitude ?? '',
    };
}

BusinessSettingsEdit.layout = {
    breadcrumbs: [
        {
            title: 'Negocio',
            href: '/admin/business-settings',
        },
    ],
};
