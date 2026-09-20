import { ImagePlus, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export type ExistingGalleryImage = {
    id: number;
    url: string;
};

type MultiImagePickerProps = {
    name: string;
    label: string;
    description?: string;
    existingImages?: ExistingGalleryImage[];
    removeFieldName?: string;
    maxFiles?: number;
    errors: Partial<Record<string, string>>;
    accept?: string;
};

/**
 * Collects both the array-level error ("gallery_images") and Laravel's
 * per-index errors ("gallery_images.0", "gallery_images.1", ...) since
 * `gallery_images.*` validation rules report failures per file.
 */
function collectArrayErrors(
    errors: Partial<Record<string, string>>,
    name: string,
): string[] {
    const prefix = `${name}.`;

    return Object.entries(errors)
        .filter(([key]) => key === name || key.startsWith(prefix))
        .map(([, message]) => message)
        .filter((message): message is string => Boolean(message));
}

export default function MultiImagePicker({
    name,
    label,
    description,
    existingImages = [],
    removeFieldName,
    maxFiles = 10,
    errors,
    accept = 'image/jpeg,image/png,image/webp,image/avif',
}: MultiImagePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
    const messages = collectArrayErrors(errors, name);

    const previews = useMemo(
        () => files.map((file) => URL.createObjectURL(file)),
        [files],
    );

    useEffect(() => {
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const syncInput = (next: File[]) => {
        const transfer = new DataTransfer();
        next.forEach((file) => transfer.items.add(file));

        if (inputRef.current) {
            inputRef.current.files = transfer.files;
        }

        setFiles(next);
    };

    const remainingSlots =
        maxFiles - (existingImages.length - removedIds.size) - files.length;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const picked = Array.from(event.target.files ?? []);
        const allowed = picked.slice(0, Math.max(0, remainingSlots));
        // Note: this input also holds the merged selection (via syncInput),
        // so its `.files` must not be cleared afterward — resetting
        // `.value` here would wipe the FileList we just assigned.
        syncInput([...files, ...allowed]);
    };

    const removeNewFile = (index: number) => {
        syncInput(files.filter((_, i) => i !== index));
    };

    const toggleExistingRemoval = (id: number) => {
        setRemovedIds((prev) => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    };

    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>

            <input
                ref={inputRef}
                id={name}
                name={`${name}[]`}
                type="file"
                accept={accept}
                multiple
                onChange={handleChange}
                className="sr-only"
            />

            {(existingImages.length > 0 || files.length > 0) && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {existingImages.map((image) => {
                        const isRemoved = removedIds.has(image.id);

                        return (
                            <div
                                key={image.id}
                                className="relative overflow-hidden rounded-md border bg-background"
                            >
                                {removeFieldName && (
                                    <input
                                        type="checkbox"
                                        name={removeFieldName}
                                        value={image.id}
                                        checked={isRemoved}
                                        readOnly
                                        className="sr-only"
                                    />
                                )}
                                <img
                                    src={image.url}
                                    alt=""
                                    className={`aspect-[4/3] w-full object-cover ${isRemoved ? 'opacity-30' : ''}`}
                                />
                                <Button
                                    type="button"
                                    variant={
                                        isRemoved ? 'secondary' : 'destructive'
                                    }
                                    size="sm"
                                    className="absolute top-1.5 right-1.5 h-7 px-2"
                                    onClick={() =>
                                        toggleExistingRemoval(image.id)
                                    }
                                >
                                    {isRemoved ? (
                                        'Deshacer'
                                    ) : (
                                        <X className="size-4" />
                                    )}
                                </Button>
                            </div>
                        );
                    })}

                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${file.lastModified}-${index}`}
                            className="relative overflow-hidden rounded-md border bg-background"
                        >
                            <img
                                src={previews[index]}
                                alt=""
                                className="aspect-[4/3] w-full object-cover"
                            />
                            <span className="absolute bottom-0 left-0 rounded-tr-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                                Nueva
                            </span>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1.5 right-1.5 h-7 px-2"
                                onClick={() => removeNewFile(index)}
                            >
                                <X className="size-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={remainingSlots <= 0}
                className="flex items-center justify-center gap-2 rounded-lg border border-dashed py-3 text-sm text-muted-foreground transition hover:border-ring hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
                <ImagePlus className="size-4" />
                {remainingSlots > 0
                    ? 'Agregar imágenes'
                    : `Límite de ${maxFiles} imágenes alcanzado`}
            </button>

            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}

            {messages.map((message, index) => (
                <p
                    key={index}
                    className="text-sm text-red-600 dark:text-red-400"
                >
                    {message}
                </p>
            ))}
        </div>
    );
}
