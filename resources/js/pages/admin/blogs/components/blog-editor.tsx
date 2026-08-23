import '@blocknote/core/fonts/inter.css';
import { filterSuggestionItems } from '@blocknote/core/extensions';
import { es } from '@blocknote/core/locales';
import {
    AddBlockButton,
    DragHandleButton,
    DragHandleMenu,
    getDefaultReactSlashMenuItems,
    RemoveBlockItem,
    SideMenu,
    SideMenuController,
    SuggestionMenuController,
    useCreateBlockNote,
} from '@blocknote/react';
import type { SideMenuProps } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import { useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';

type BlogBlock = Record<string, unknown>;

type UploadResponse = {
    url: string;
};

type SlashMenuItemWithKey = ReturnType<
    typeof getDefaultReactSlashMenuItems
>[number] & {
    key: string;
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

const allowedSlashMenuItems = new Set([
    'heading',
    'heading_2',
    'heading_3',
    'heading_4',
    'heading_5',
    'heading_6',
    'quote',
    'numbered_list',
    'bullet_list',
    'paragraph',
    'divider',
    'image',
    'emoji',
]);

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
    const { resolvedAppearance } = useAppearance();
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
                  dictionary: es,
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
                  dictionary: es,
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
                theme={resolvedAppearance}
                sideMenu={false}
                slashMenu={false}
                portalElements={{
                    default: null,
                }}
                onChange={() =>
                    setSerializedContent(JSON.stringify(editor.document))
                }
            >
                <SideMenuController sideMenu={SideMenuWithoutColors} />
                <SuggestionMenuController
                    triggerCharacter="/"
                    getItems={async (query) =>
                        filterSuggestionItems(
                            getDefaultReactSlashMenuItems(editor).filter(
                                (item) =>
                                    allowedSlashMenuItems.has(
                                        (item as SlashMenuItemWithKey).key,
                                    ),
                            ),
                            query,
                        )
                    }
                />
            </BlockNoteView>
        </div>
    );
}

function SideMenuWithoutColors(props: SideMenuProps) {
    return (
        <SideMenu {...props}>
            <AddBlockButton />
            <DragHandleButton
                {...props}
                dragHandleMenu={DragHandleMenuWithoutColors}
            />
        </SideMenu>
    );
}

function DragHandleMenuWithoutColors() {
    return (
        <DragHandleMenu>
            <RemoveBlockItem>Eliminar</RemoveBlockItem>
        </DragHandleMenu>
    );
}
