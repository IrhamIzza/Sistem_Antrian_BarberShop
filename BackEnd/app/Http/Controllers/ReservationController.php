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
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
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
            ->where('status', 'booked')
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

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:booked,cancelled,done'
        ]);

        $reservation = Reservation::findOrFail($id);

        $reservation->status = $request->status;
        $reservation->save();

        return response()->json([
            'message' => 'Status berhasil diperbarui',
            'data' => $reservation
        ]);
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json(['message' => 'Reservasi berhasil dihapus']);
    }

    public function checkAvailability(Request $request)
    {
        $request->validate([
            'barber_id' => 'required|exists:barbers,id',
            'date' => 'required|date',
        ]);

        $startWork = Carbon::parse('12:00');
        $endWork   = Carbon::parse('23:00');

        // Ambil jam yang sudah dibooking
        $bookedSlots = Reservation::where('barber_id', $request->barber_id)
            ->where('date', $request->date)
            ->where('status', 'booked')
            ->pluck('start_time')
            ->map(function ($time) {
                return Carbon::parse($time)->format('H:i');
            })
            ->toArray();

        $slots = [];

        while ($startWork < $endWork) {

            $timeFormatted = $startWork->format('H:i');

            $slots[] = [
                'time' => $timeFormatted,
                'status' => in_array($timeFormatted, $bookedSlots)
                    ? 'booked'
                    : 'available'
            ];

            $startWork->addHour();
        }

        $bookedCount = count($bookedSlots);
        $maxSlotPerDay = count($slots);

        return response()->json([
            'is_full' => $bookedCount >= $maxSlotPerDay,
            'booked_count' => $bookedCount,
            'slots' => $slots
        ]);
    }
}
