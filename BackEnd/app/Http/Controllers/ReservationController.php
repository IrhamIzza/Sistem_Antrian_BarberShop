<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReservationController extends Controller
{
    // ADMIN
    public function index()
    {
        return Reservation::with('barber')
            ->orderBy('date', 'desc')
            ->get();
    }

    // CUSTOMER
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string',
            'phone' => 'required|string',
            'barber_id' => 'required|exists:barbers,id',
            'date' => 'required|date',
            'start_time' => 'required',
        ]);

        $start = Carbon::parse($request->start_time);
        $end = $start->copy()->addHour();

        // cek bentrok
        $exists = Reservation::where('barber_id', $request->barber_id)
            ->where('date', $request->date)
            ->where('start_time', $start->format('H:i:s'))
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Waktu sudah dibooking'
            ], 422);
        }

        return Reservation::create([
            'customer_name' => $request->customer_name,
            'phone' => $request->phone,
            'barber_id' => $request->barber_id,
            'date' => $request->date,
            'start_time' => $start,
            'end_time' => $end,
        ]);
    }
}