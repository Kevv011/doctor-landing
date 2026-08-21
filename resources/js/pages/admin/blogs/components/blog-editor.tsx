import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import { useState } from 'react';

type BlogBlock = Record<string, unknown>;

type UploadResponse = {
    url: string;
};

type Props = {
    name: string;
    initialContent?: BlogBlock[] | null;
    uploadUrl?: string | null;
    className?: string;
};

const emptyDocument: BlogBlock[] = [
    {
        type: 'paragraph',
        content: '',
    },
];

function getCsrfToken(): string {
    return (
        document
            .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.getAttribute('content') ?? ''
    );
}

export default function BlogEditor({
    name,
    initialContent,
    uploadUrl,
    className = '',
}: Props) {
    const [serializedContent, setSerializedContent] = useState(() =>
        JSON.stringify(
            initialContent && initialContent.length > 0
                ? initialContent
                : emptyDocument,
        ),
    );

    const editor = useCreateBlockNote(
        uploadUrl
            ? {
                  initialContent:
                      initialContent && initialContent.length > 0
                          ? initialContent
                          : emptyDocument,
                  uploadFile: async (file) => {
                      const formData = new FormData();
                      formData.append('file', file);

                      const response = await fetch(uploadUrl, {
                          method: 'POST',
                          headers: {
                              Accept: 'application/json',
                              'X-CSRF-TOKEN': getCsrfToken(),
                          },
                          body: formData,
                      });

                      if (!response.ok) {
                          throw new Error('No se pudo subir la imagen.');
                      }

                      const data = (await response.json()) as UploadResponse;

                      return data.url;
                  },
              }
            : {
                  initialContent:
                      initialContent && initialContent.length > 0
                          ? initialContent
                          : emptyDocument,
              },
    );

    return (
        <div
            className={`overflow-y-auto rounded-md border border-input bg-background ${className}`}
        >
            <input type="hidden" name={name} value={serializedContent} />
            <BlockNoteView
                editor={editor}
                onChange={() =>
                    setSerializedContent(JSON.stringify(editor.document))
                }
            />
        </div>
    );
}
