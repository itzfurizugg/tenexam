<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'id',
        'title',
        'description',
        'duration_minutes',
        'start_at',
        'end_at'
    ];
}
