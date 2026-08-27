<?php

namespace App\Http\Middleware;

use App\Models\BusinessHour;
use App\Models\BusinessProfile;
use App\Models\BusinessSocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;
use Throwable;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'site_url' => rtrim((string) config('app.url'), '/'),
            'auth' => [
                'user' => $request->user(),
            ],
            'business' => fn () => $this->business(),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function business(): array
    {
        try {
            if (! Schema::hasTable('business_profiles')) {
                return $this->fallbackBusiness();
            }

            $profile = BusinessProfile::query()
                ->with([
                    'hours' => fn ($query) => $query
                        ->where('is_active', true)
                        ->orderBy('sort_order'),
                    'socialLinks' => fn ($query) => $query
                        ->where('is_active', true)
                        ->orderBy('sort_order'),
                ])
                ->first();

            if (! $profile) {
                return $this->fallbackBusiness();
            }

            return [
                'profile' => [
                    'name' => $profile->name,
                    'email' => $profile->email,
                    'phone' => $profile->phone,
                    'appointment_phone' => $profile->appointment_phone,
                    'address' => $profile->address,
                    'google_maps_url' => $profile->google_maps_url,
                    'latitude' => $profile->latitude,
                    'longitude' => $profile->longitude,
                    'hero_video_url' => $profile->getFirstMediaUrl(BusinessProfile::MEDIA_COLLECTION_HERO_VIDEO),
                ],
                'hours' => $profile->hours->map(fn (BusinessHour $hour) => [
                    'label' => $hour->label,
                    'opens_at' => $hour->opens_at ? substr($hour->opens_at, 0, 5) : null,
                    'closes_at' => $hour->closes_at ? substr($hour->closes_at, 0, 5) : null,
                    'special_text' => $hour->special_text,
                    'sort_order' => $hour->sort_order,
                ])->values(),
                'social_links' => $profile->socialLinks->map(fn (BusinessSocialLink $socialLink) => [
                    'platform' => $socialLink->platform,
                    'label' => $socialLink->label,
                    'url' => $socialLink->url,
                    'sort_order' => $socialLink->sort_order,
                ])->values(),
            ];
        } catch (Throwable) {
            return $this->fallbackBusiness();
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function fallbackBusiness(): array
    {
        return [
            'profile' => [
                'name' => 'Women\'s Health Clinic',
                'email' => 'hola@correo.com',
                'phone' => '+503 7345 1108',
                'appointment_phone' => '+503 7345 1108',
                'address' => 'Hospital Avante Especializado, Paseo General Escalón #4920, primer nivel, clínica 5 (contiguo a Hospital de Diagnóstico Escalón) San Salvador.',
                'google_maps_url' => '#',
                'latitude' => null,
                'longitude' => null,
                'hero_video_url' => null,
            ],
            'hours' => [
                [
                    'label' => 'Martes a viernes',
                    'opens_at' => '10:30',
                    'closes_at' => '18:00',
                    'special_text' => null,
                    'sort_order' => 1,
                ],
                [
                    'label' => 'Sábados',
                    'opens_at' => '10:00',
                    'closes_at' => '14:00',
                    'special_text' => null,
                    'sort_order' => 2,
                ],
            ],
            'social_links' => [],
        ];
    }
}
