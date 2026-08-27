<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateBusinessSettingsRequest;
use App\Models\BusinessHour;
use App\Models\BusinessProfile;
use App\Models\BusinessSocialLink;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BusinessSettingsController extends Controller
{
    /**
     * Show the business settings form.
     */
    public function edit(): Response
    {
        $profile = $this->profile()->load(['hours', 'socialLinks']);

        return Inertia::render('admin/business-settings/edit', [
            'profile' => [
                'name' => $profile->name,
                'email' => $profile->email,
                'phone' => $profile->phone,
                'appointment_phone' => $profile->appointment_phone,
                'address' => $profile->address,
                'google_maps_url' => $profile->google_maps_url,
                'latitude' => $profile->latitude,
                'longitude' => $profile->longitude,
            ],
            'heroVideoUrl' => $profile->getFirstMediaUrl(BusinessProfile::MEDIA_COLLECTION_HERO_VIDEO),
            'hours' => $profile->hours->map(fn (BusinessHour $hour) => [
                'id' => $hour->id,
                'day_of_week' => $hour->day_of_week,
                'label' => $hour->label,
                'opens_at' => $hour->opens_at ? substr($hour->opens_at, 0, 5) : null,
                'closes_at' => $hour->closes_at ? substr($hour->closes_at, 0, 5) : null,
                'special_text' => $hour->special_text,
                'is_active' => $hour->is_active,
                'sort_order' => $hour->sort_order,
            ])->values(),
            'socialLinks' => $profile->socialLinks->map(fn (BusinessSocialLink $socialLink) => [
                'id' => $socialLink->id,
                'platform' => $socialLink->platform,
                'label' => $socialLink->label,
                'url' => $socialLink->url,
                'is_active' => $socialLink->is_active,
                'sort_order' => $socialLink->sort_order,
            ])->values(),
            'socialPlatforms' => $this->socialPlatforms(),
        ]);
    }

    /**
     * Update the business settings.
     */
    public function update(UpdateBusinessSettingsRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $profile = $this->profile();

        $profile->update($validated['profile']);

        if ($request->boolean('remove_hero_video')) {
            $profile->clearMediaCollection(BusinessProfile::MEDIA_COLLECTION_HERO_VIDEO);
        }

        if ($request->hasFile('hero_video')) {
            $profile
                ->addMediaFromRequest('hero_video')
                ->toMediaCollection(BusinessProfile::MEDIA_COLLECTION_HERO_VIDEO);
        }

        $this->syncHours($profile, $validated['hours'] ?? []);
        $this->syncSocialLinks($profile, $validated['social_links'] ?? []);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Configuración del negocio actualizada.')]);

        return to_route('admin.business-settings.edit');
    }

    private function profile(): BusinessProfile
    {
        return BusinessProfile::query()->first()
            ?? BusinessProfile::create(['name' => 'Women\'s Health Clinic']);
    }

    /**
     * @param  array<int, array<string, mixed>>  $hours
     */
    private function syncHours(BusinessProfile $profile, array $hours): void
    {
        $keptIds = [];

        foreach ($hours as $hourPayload) {
            $hour = null;

            if (filled($hourPayload['id'] ?? null)) {
                $hour = $profile->hours()->whereKey($hourPayload['id'])->first();
            }

            $hour ??= new BusinessHour(['business_profile_id' => $profile->id]);
            $hour->fill([
                'day_of_week' => $hourPayload['day_of_week'] ?? null,
                'label' => $hourPayload['label'],
                'opens_at' => $hourPayload['opens_at'] ?: null,
                'closes_at' => $hourPayload['closes_at'] ?: null,
                'special_text' => $hourPayload['special_text'] ?: null,
                'is_active' => (bool) ($hourPayload['is_active'] ?? false),
                'sort_order' => $hourPayload['sort_order'] ?? 0,
            ]);
            $hour->business_profile_id = $profile->id;
            $hour->save();

            $keptIds[] = $hour->id;
        }

        $profile->hours()
            ->when($keptIds !== [], fn ($query) => $query->whereNotIn('id', $keptIds))
            ->delete();
    }

    /**
     * @param  array<int, array<string, mixed>>  $socialLinks
     */
    private function syncSocialLinks(BusinessProfile $profile, array $socialLinks): void
    {
        $keptIds = [];

        foreach ($socialLinks as $socialPayload) {
            $socialLink = null;

            if (filled($socialPayload['id'] ?? null)) {
                $socialLink = $profile->socialLinks()->whereKey($socialPayload['id'])->first();
            }

            $socialLink ??= new BusinessSocialLink(['business_profile_id' => $profile->id]);
            $socialLink->fill([
                'platform' => $socialPayload['platform'],
                'label' => $socialPayload['label'] ?: null,
                'url' => $socialPayload['url'],
                'is_active' => (bool) ($socialPayload['is_active'] ?? false),
                'sort_order' => $socialPayload['sort_order'] ?? 0,
            ]);
            $socialLink->business_profile_id = $profile->id;
            $socialLink->save();

            $keptIds[] = $socialLink->id;
        }

        $profile->socialLinks()
            ->when($keptIds !== [], fn ($query) => $query->whereNotIn('id', $keptIds))
            ->delete();
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    private function socialPlatforms(): array
    {
        return [
            ['value' => 'facebook', 'label' => 'Facebook'],
            ['value' => 'instagram', 'label' => 'Instagram'],
            ['value' => 'tiktok', 'label' => 'TikTok'],
            ['value' => 'whatsapp', 'label' => 'WhatsApp'],
            ['value' => 'youtube', 'label' => 'YouTube'],
            ['value' => 'linkedin', 'label' => 'LinkedIn'],
            ['value' => 'x', 'label' => 'X / Twitter'],
            ['value' => 'threads', 'label' => 'Threads'],
        ];
    }
}
