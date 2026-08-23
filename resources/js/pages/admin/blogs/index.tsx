import { Form, Head, Link } from '@inertiajs/react';
import { Edit, FileText, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type BlogPost = {
    id: number;
    title: string;
    slug: string;
    status: string;
    is_featured: boolean;
    category: string | null;
    author: string | null;
    published_at: string | null;
    created_at: string | null;
    featured_image_url: string;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedPosts = {
    data: BlogPost[];
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    posts: PaginatedPosts;
};

export default function BlogsIndex({ posts }: Props) {
    return (
        <>
            <Head title="Blogs" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Blogs"
                        description="Gestiona articulos educativos para el sitio."
                    />

                    <Button asChild>
                        <Link href="/admin/blogs/create">
                            <Plus className="h-4 w-4" />
                            Nuevo blog
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Articulo
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Autor
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Publicacion
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No hay blogs registrados.
                                        </td>
                                    </tr>
                                ) : (
                                    posts.data.map((post) => (
                                        <tr
                                            key={post.id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {post.featured_image_url ? (
                                                        <img
                                                            src={
                                                                post.featured_image_url
                                                            }
                                                            alt=""
                                                            className="h-12 w-16 rounded-md object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-12 w-16 items-center justify-center rounded-md bg-muted">
                                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-medium">
                                                            {post.title}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {post.slug}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            Categoria:{' '}
                                                            {post.category ??
                                                                'Sin categoria'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        post.status ===
                                                        'published'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {post.status === 'published'
                                                        ? 'Publicado'
                                                        : 'Borrador'}
                                                </Badge>
                                                {post.is_featured && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="ml-2"
                                                    >
                                                        Destacado
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {post.author ?? '-'}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {post.published_at ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/blogs/${post.id}/edit`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Editar
                                                        </Link>
                                                    </Button>

                                                    <Form
                                                        action={`/admin/blogs/${post.id}`}
                                                        method="delete"
                                                        options={{
                                                            preserveScroll: true,
                                                        }}
                                                    >
                                                        {({ processing }) => (
                                                            <Button
                                                                type="submit"
                                                                variant="destructive"
                                                                size="sm"
                                                                disabled={
                                                                    processing
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                                Eliminar
                                                            </Button>
                                                        )}
                                                    </Form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        Mostrando {posts.from ?? 0} a {posts.to ?? 0} de{' '}
                        {posts.total} blogs
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {posts.links.map((link, index) => (
                            <Button
                                key={`${link.label}-${index}`}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                asChild={Boolean(link.url)}
                            >
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

BlogsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Blogs',
            href: '/admin/blogs',
        },
    ],
};
