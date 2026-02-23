<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reservation;
use Carbon\Carbon;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        Reservation::create([
            'user_id' => 2,
            'barber_id' => 1,
            'date' => now()->toDateString(),
            'start_time' => '10:00:00',
            'end_time' => '10:30:00',
            'status' => 'booked',
        ]);

        Reservation::create([
            'user_id' => 3,
            'barber_id' => 1,
            'date' => now()->toDateString(),
            'start_time' => '11:00:00',
            'end_time' => '11:30:00',
            'status' => 'done',
        ]);

        Reservation::create([
            'user_id' => 2,
            'barber_id' => 2,
            'date' => now()->addDay()->toDateString(),
            'start_time' => '13:00:00',
            'end_time' => '13:30:00',
            'status' => 'booked',
        ]);
        
    }
}