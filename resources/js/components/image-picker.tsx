import { ImageUp, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type ImagePickerProps = {
    name: string;
    label: string;
    description?: string;
    existingUrl?: string | null;
    removeFieldName?: string;
    removeLabel?: string;
    error?: string;
    accept?: string;
};

export default function ImagePicker({
    name,
    label,
    description,
    existingUrl = null,
    removeFieldName,
    removeLabel = 'Quitar imagen actual',
    error,
    accept = 'image/jpeg,image/png,image/webp,image/avif',
}: ImagePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [markedForRemoval, setMarkedForRemoval] = useState(false);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(file ? URL.createObjectURL(file) : null);
        setMarkedForRemoval(false);
    };

    const clearSelection = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(null);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const showingExisting = !preview && existingUrl && !markedForRemoval;

    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>

            <input
                ref={inputRef}
                id={name}
                name={name}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="sr-only"
            />

            {removeFieldName && (
                <input
                    type="checkbox"
                    name={removeFieldName}
                    value="1"
                    checked={markedForRemoval}
                    readOnly
                    className="sr-only"
                />
            )}

            {preview || showingExisting ? (
                <div className="relative overflow-hidden rounded-lg border">
                    <img
                        src={preview ?? existingUrl ?? undefined}
                        alt=""
                        className="h-44 w-full object-cover"
                    />
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2 shadow"
                        onClick={() => {
                            if (preview) {
                                clearSelection();
                            } else {
                                setMarkedForRemoval(true);
                            }
                        }}
                    >
                        <X className="size-4" />
                        {preview ? 'Cancelar selección' : removeLabel}
                    </Button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="flex h-44 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm text-muted-foreground transition hover:border-ring hover:text-foreground"
                >
                    <ImageUp className="size-6" />
                    Subir imagen
                </button>
            )}

            {(preview || showingExisting) && (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="text-left text-xs text-muted-foreground underline-offset-2 hover:underline"
                >
                    Cambiar imagen
                </button>
            )}

            {markedForRemoval && (
                <p className="text-xs text-muted-foreground">
                    La imagen actual se quitará al guardar.{' '}
                    <button
                        type="button"
                        onClick={() => setMarkedForRemoval(false)}
                        className="underline-offset-2 hover:underline"
                    >
                        Deshacer
                    </button>
                </p>
            )}

            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}

            <InputError message={error} />
        </div>
    );
}
