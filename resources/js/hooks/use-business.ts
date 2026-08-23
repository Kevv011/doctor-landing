import { usePage } from '@inertiajs/react';
import type { LandingBusiness } from '@/types';

export function useBusiness(): LandingBusiness {
    return usePage().props.business;
}

export function businessPhoneHref(phone?: string | null): string {
    const normalized = phone?.replace(/[^\d+]/g, '') || '';

    return normalized ? `tel:${normalized}` : '#';
}

export function businessMailHref(email?: string | null): string {
    return email ? `mailto:${email}` : '#';
}

export function businessHourText(
    opensAt?: string | null,
    closesAt?: string | null,
): string | null {
    if (!opensAt || !closesAt) {
        return null;
    }

    return `${toDisplayTime(opensAt)} a ${toDisplayTime(closesAt)}`;
}

function toDisplayTime(time: string): string {
    const [hourValue, minuteValue] = time.split(':');
    const hour = Number(hourValue);
    const suffix = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minuteValue}${suffix}`;
}
