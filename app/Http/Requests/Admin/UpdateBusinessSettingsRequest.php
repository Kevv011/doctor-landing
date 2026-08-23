<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBusinessSettingsRequest extends FormRequest
{
    /**
     * @var list<string>
     */
    public const SOCIAL_PLATFORMS = [
        'facebook',
        'instagram',
        'tiktok',
        'whatsapp',
        'youtube',
        'linkedin',
        'x',
        'threads',
    ];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'profile' => ['required', 'array'],
            'profile.name' => ['required', 'string', 'max:255'],
            'profile.email' => ['nullable', 'email', 'max:255'],
            'profile.phone' => ['nullable', 'string', 'max:50'],
            'profile.appointment_phone' => ['nullable', 'string', 'max:50'],
            'profile.address' => ['nullable', 'string', 'max:1000'],
            'profile.google_maps_url' => ['nullable', 'url', 'max:2048'],
            'profile.latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'profile.longitude' => ['nullable', 'numeric', 'between:-180,180'],

            'hours' => ['nullable', 'array'],
            'hours.*.id' => ['nullable', 'integer', 'exists:business_hours,id'],
            'hours.*.day_of_week' => ['nullable', 'integer', 'min:0', 'max:6'],
            'hours.*.label' => ['required', 'string', 'max:120'],
            'hours.*.opens_at' => ['nullable', 'date_format:H:i'],
            'hours.*.closes_at' => ['nullable', 'date_format:H:i'],
            'hours.*.special_text' => ['nullable', 'string', 'max:500'],
            'hours.*.is_active' => ['boolean'],
            'hours.*.sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],

            'social_links' => ['nullable', 'array'],
            'social_links.*.id' => ['nullable', 'integer', 'exists:business_social_links,id'],
            'social_links.*.platform' => ['required', 'string', Rule::in(self::SOCIAL_PLATFORMS)],
            'social_links.*.label' => ['nullable', 'string', 'max:80'],
            'social_links.*.url' => ['required', 'url', 'max:2048'],
            'social_links.*.is_active' => ['boolean'],
            'social_links.*.sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
        ];
    }
}
