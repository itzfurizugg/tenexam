<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'title',
        'slug', // Pastikan slug ada di fillable
        'description',
        'duration_minutes',
        'start_at',
        'end_at'
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    // --- TAMBAHKAN INI ---
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
