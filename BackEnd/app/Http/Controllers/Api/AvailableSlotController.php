<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class AvailableSlotController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'barber_id' => 'required|integer',
            'date'      => 'required|date',
        ]);

        // ⏰ slot kerja (hardcode dulu)
        $allSlots = [
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
        ];

        // 🔴 slot yang sudah dibooking
        $bookedSlots = Reservation::where('barber_id', $request->barber_id)
            ->where('date', $request->date)
            ->where('status', 'booked')
            ->pluck('start_time')
            ->map(fn($time) => substr($time, 0, 5))
            ->toArray();

        // ✅ slot tersedia
        $availableSlots = array_values(
            array_diff($allSlots, $bookedSlots)
        );

        return response()->json([
            'barber_id' => $request->barber_id,
            'date'      => $request->date,
            'slots'     => $availableSlots,
        ]);
    }
}
