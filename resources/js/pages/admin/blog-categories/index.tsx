import { Form, Head, Link } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type BlogCategory = {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    sort_order: number;
    posts_count: number;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginatedCategories = {
    data: BlogCategory[];
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
};

type Props = {
    categories: PaginatedCategories;
};

export default function BlogCategoriesIndex({ categories }: Props) {
    return (
        <>
            <Head title="Categorías de blog" />

            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Categorías de blog"
                        description="Administra las categorías que organizan los artículos."
                    />

                    <Button asChild>
                        <Link href="/admin/blog-categories/create">
                            <Plus className="size-4" />
                            Nueva categoría
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">
                                        Categoría
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Estado
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Blogs
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Orden
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-10 text-center text-muted-foreground"
                                        >
                                            No hay categorías registradas.
                                        </td>
                                    </tr>
                                ) : (
                                    categories.data.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="font-medium">
                                                    {category.name}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {category.slug}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <Badge
                                                    variant={
                                                        category.is_active
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {category.is_active
                                                        ? 'Activa'
                                                        : 'Inactiva'}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {category.posts_count}
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {category.sort_order}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/blog-categories/${category.id}/edit`}
                                                        >
                                                            <Edit className="size-4" />
                                                            Editar
                                                        </Link>
                                                    </Button>

                                                    <Form
                                                        action={`/admin/blog-categories/${category.id}`}
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
                                                                    processing ||
                                                                    category.posts_count >
                                                                        0
                                                                }
                                                            >
                                                                <Trash2 className="size-4" />
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
                        Mostrando {categories.from ?? 0} a{' '}
                        {categories.to ?? 0} de {categories.total} categorías
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {categories.links.map((link, index) => (
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

BlogCategoriesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Categorías de blog',
            href: '/admin/blog-categories',
        },
    ],
};
