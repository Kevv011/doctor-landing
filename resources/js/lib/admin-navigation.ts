import {
    Building2,
    CalendarCheck,
    FileText,
    LayoutGrid,
    MessageSquareQuote,
    Tags,
    Users,
} from 'lucide-react';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export type AdminNavGroup = {
    title: string;
    items: NavItem[];
};

export const adminNavGroups: AdminNavGroup[] = [
    {
        title: 'General',
        items: [
            {
                title: 'Panel',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Administración',
        items: [
            {
                title: 'Usuarios',
                href: '/admin/users',
                icon: Users,
            },
            {
                title: 'Negocio',
                href: '/admin/business-settings',
                icon: Building2,
            },
        ],
    },
    {
        title: 'Contenido',
        items: [
            {
                title: 'Blogs',
                href: '/admin/blogs',
                icon: FileText,
            },
            {
                title: 'Categorías blog',
                href: '/admin/blog-categories',
                icon: Tags,
            },
            {
                title: 'Testimonios',
                href: '/admin/testimonials',
                icon: MessageSquareQuote,
            },
        ],
    },
    {
        title: 'Atención',
        items: [
            {
                title: 'Citas',
                href: '/admin/appointments',
                icon: CalendarCheck,
            },
        ],
    },
];

export const adminNavItems = adminNavGroups.flatMap((group) => group.items);
