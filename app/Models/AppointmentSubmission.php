<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentSubmission extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'phone',
        'email',
        'appointment_date',
        'message',
        'was_reviewed',
        'reviewed_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'appointment_date' => 'date',
            'was_reviewed' => 'boolean',
            'reviewed_at' => 'datetime',
        ];
    }
}
