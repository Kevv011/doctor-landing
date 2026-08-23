import { Fragment, type ElementType, type ReactNode } from 'react';

type BlogInlineContent = {
    type?: string;
    text?: string;
    content?: BlogInlineContent[] | string;
    styles?: Record<string, boolean | string> | [];
};

type BlogBlockProps = {
    level?: number;
    url?: string;
    name?: string;
    caption?: string;
    textAlignment?: 'left' | 'center' | 'right' | 'justify';
};

export type BlogContentBlock = {
    id?: string;
    type?: string;
    props?: BlogBlockProps | [];
    content?: BlogInlineContent[] | string;
    children?: BlogContentBlock[];
};

type Props = {
    body: BlogContentBlock[];
};

const headingClasses: Record<number, string> = {
    1: 'mt-10 text-4xl font-black leading-tight tracking-[-0.04em] text-[#09123f] sm:text-5xl',
    2: 'mt-9 text-3xl font-black leading-tight tracking-[-0.035em] text-[#09123f] sm:text-4xl',
    3: 'mt-8 text-2xl font-black leading-tight tracking-[-0.025em] text-[#09123f]',
    4: 'mt-7 text-xl font-black leading-tight text-[#09123f]',
    5: 'mt-6 text-lg font-black leading-tight text-[#09123f]',
    6: 'mt-5 text-base font-black uppercase tracking-[0.12em] text-[#e9648d]',
};

export default function BlogContentRenderer({ body }: Props) {
    const renderedBlocks: ReactNode[] = [];

    for (let index = 0; index < body.length; index += 1) {
        const block = body[index];

        if (isEmptyParagraph(block)) {
            const { emptyCount, nextIndex } = collectEmptyParagraphs(
                body,
                index,
            );

            if (
                renderedBlocks.length > 0 &&
                hasRenderableBlockAfter(body, nextIndex)
            ) {
                renderedBlocks.push(
                    <div
                        key={block.id ?? `spacer-${index}`}
                        aria-hidden="true"
                        style={{
                            height: `${Math.min(emptyCount, 3) * 0.85}rem`,
                        }}
                    />,
                );
            }

            index = nextIndex - 1;
            continue;
        }

        if (block.type === 'numberedListItem') {
            const { items, nextIndex } = collectListItems(
                body,
                index,
                'numberedListItem',
            );

            renderedBlocks.push(
                <ol
                    key={block.id ?? `ol-${index}`}
                    className="my-4 list-decimal space-y-2 pl-6 text-base leading-8 text-[#6f7080] marker:font-black marker:text-[#e9648d]"
                >
                    {items.map((item, itemIndex) => (
                        <li key={item.id ?? `ol-item-${index}-${itemIndex}`}>
                            {renderInlineContent(item.content)}
                        </li>
                    ))}
                </ol>,
            );
            index = nextIndex - 1;
            continue;
        }

        if (block.type === 'bulletListItem') {
            const { items, nextIndex } = collectListItems(
                body,
                index,
                'bulletListItem',
            );

            renderedBlocks.push(
                <ul
                    key={block.id ?? `ul-${index}`}
                    className="my-4 list-disc space-y-2 pl-6 text-base leading-8 text-[#6f7080] marker:text-[#e9648d]"
                >
                    {items.map((item, itemIndex) => (
                        <li key={item.id ?? `ul-item-${index}-${itemIndex}`}>
                            {renderInlineContent(item.content)}
                        </li>
                    ))}
                </ul>,
            );
            index = nextIndex - 1;
            continue;
        }

        const renderedBlock = renderBlock(block, index);

        if (renderedBlock) {
            renderedBlocks.push(renderedBlock);
        }
    }

    if (renderedBlocks.length === 0) {
        return null;
    }

    return <div className="mt-8">{renderedBlocks}</div>;
}

function renderBlock(block: BlogContentBlock, index: number): ReactNode {
    const key = block.id ?? `block-${index}`;

    if (block.type === 'heading') {
        const level = getProps(block).level ?? 2;
        const HeadingTag = `h${Math.min(Math.max(level, 1), 6)}` as ElementType;
        const content = renderInlineContent(block.content);

        if (!hasContent(block)) {
            return null;
        }

        return (
            <HeadingTag
                key={key}
                className={headingClasses[level] ?? headingClasses[2]}
            >
                {content}
            </HeadingTag>
        );
    }

    if (block.type === 'paragraph') {
        if (!hasContent(block)) {
            return null;
        }

        return (
            <p
                key={key}
                className="my-2 text-base leading-8 text-[#6f7080]"
                style={getTextAlignment(block)}
            >
                {renderInlineContent(block.content)}
            </p>
        );
    }

    if (block.type === 'quote') {
        if (!hasContent(block)) {
            return null;
        }

        return (
            <blockquote
                key={key}
                className="my-8 rounded-md bg-[#e9648d] p-7 text-white shadow-[0_18px_35px_rgba(233,100,141,0.18)] sm:p-8"
            >
                <div className="text-5xl font-black leading-none">”</div>
                <p className="mt-2 text-base font-medium leading-8">
                    {renderInlineContent(block.content)}
                </p>
            </blockquote>
        );
    }

    if (block.type === 'divider') {
        return <hr key={key} className="my-9 border-t border-[#e9648d]/35" />;
    }

    if (block.type === 'image') {
        const props = getProps(block);

        if (!props.url) {
            return null;
        }

        return (
            <figure
                key={key}
                className="my-9 rounded-md bg-[#fff7fb] p-3 shadow-[0_18px_45px_rgba(21,35,74,0.06)] sm:p-4"
                style={getTextAlignment(block)}
            >
                <img
                    src={props.url}
                    alt={props.name || props.caption || ''}
                    className="mx-auto max-h-[520px] w-auto max-w-full rounded-md object-contain"
                />
                {props.caption && (
                    <figcaption className="mt-3 text-sm font-medium leading-6 text-[#8a7a84]">
                        {props.caption}
                    </figcaption>
                )}
            </figure>
        );
    }

    return null;
}

function collectListItems(
    body: BlogContentBlock[],
    startIndex: number,
    type: string,
) {
    const items: BlogContentBlock[] = [];
    let index = startIndex;

    while (index < body.length && body[index].type === type) {
        if (hasContent(body[index])) {
            items.push(body[index]);
        }
        index += 1;
    }

    return {
        items,
        nextIndex: index,
    };
}

function collectEmptyParagraphs(body: BlogContentBlock[], startIndex: number) {
    let index = startIndex;
    let emptyCount = 0;

    while (index < body.length && isEmptyParagraph(body[index])) {
        emptyCount += 1;
        index += 1;
    }

    return {
        emptyCount,
        nextIndex: index,
    };
}

function renderInlineContent(
    content: BlogInlineContent[] | string | undefined,
): ReactNode {
    if (typeof content === 'string') {
        return content;
    }

    if (!Array.isArray(content)) {
        return null;
    }

    return content.map((item, index) => {
        if (item.type === 'link') {
            const linkText = renderInlineContent(item.content);

            return (
                <a
                    key={`inline-${index}`}
                    href={String((item as { href?: string }).href ?? '#')}
                    className="font-semibold text-[#e9648d] underline decoration-[#e9648d]/30 underline-offset-4 transition hover:text-[#d94e7a]"
                    target="_blank"
                    rel="noreferrer"
                >
                    {linkText}
                </a>
            );
        }

        const text = item.text ?? '';

        if (!text) {
            return null;
        }

        return (
            <Fragment key={`inline-${index}`}>
                {applyTextStyles(text, item.styles)}
            </Fragment>
        );
    });
}

function applyTextStyles(
    text: string,
    styles: BlogInlineContent['styles'],
): ReactNode {
    if (!styles || Array.isArray(styles)) {
        return text;
    }

    let node: ReactNode = text;

    if (styles.bold) {
        node = <strong className="font-black">{node}</strong>;
    }

    if (styles.italic) {
        node = <em>{node}</em>;
    }

    if (styles.underline) {
        node = <span className="underline underline-offset-4">{node}</span>;
    }

    if (styles.strike) {
        node = <span className="line-through">{node}</span>;
    }

    if (styles.code) {
        node = (
            <code className="rounded bg-[#fff0f7] px-1.5 py-1 font-mono text-sm text-[#d94e7a]">
                {node}
            </code>
        );
    }

    return node;
}

function hasContent(block: BlogContentBlock): boolean {
    if (typeof block.content === 'string') {
        return block.content.trim().length > 0;
    }

    if (!Array.isArray(block.content)) {
        return false;
    }

    return block.content.some((item) => {
        if (item.text?.trim()) {
            return true;
        }

        if (typeof item.content === 'string') {
            return item.content.trim().length > 0;
        }

        return item.content?.some((child) => child.text?.trim()) ?? false;
    });
}

function isEmptyParagraph(block: BlogContentBlock): boolean {
    return block.type === 'paragraph' && !hasContent(block);
}

function hasRenderableBlockAfter(
    body: BlogContentBlock[],
    startIndex: number,
): boolean {
    return body.slice(startIndex).some((block) => {
        if (block.type === 'divider' || block.type === 'image') {
            return true;
        }

        return hasContent(block);
    });
}

function getProps(block: BlogContentBlock): BlogBlockProps {
    return Array.isArray(block.props) ? {} : (block.props ?? {});
}

function getTextAlignment(block: BlogContentBlock) {
    const textAlignment = getProps(block).textAlignment;

    if (!textAlignment || textAlignment === 'left') {
        return undefined;
    }

    return {
        textAlign: textAlignment,
    };
}
