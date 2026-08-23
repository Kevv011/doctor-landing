<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BusinessProfile extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'appointment_phone',
        'address',
        'google_maps_url',
        'latitude',
        'longitude',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
        ];
    }

    /**
     * @return HasMany<BusinessHour, $this>
     */
    public function hours(): HasMany
    {
        return $this->hasMany(BusinessHour::class)->orderBy('sort_order');
    }

    /**
     * @return HasMany<BusinessSocialLink, $this>
     */
    public function socialLinks(): HasMany
    {
        return $this->hasMany(BusinessSocialLink::class)->orderBy('sort_order');
    }
}
