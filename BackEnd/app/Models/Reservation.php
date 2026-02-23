<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    protected $fillable = [
        'customer_name',
        'phone',
        'barber_id',
        'date',
        'start_time',
        'end_time',
        'status'
    ];

    public function barber()
    {
        return $this->belongsTo(Barber::class);
    }
}