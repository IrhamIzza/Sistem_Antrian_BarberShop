import { useState,useEffect } from "react";
import { barbers, bookedSlots, allSlots } from "../data/dummyData";
import DatePicker from "../components/DatePicker";
import TimeSlots from "../components/TimeSlots";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarberList from "../components/BarberList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ReservationPage() {
  const [barberId, setBarberId] = useState(null);
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [lockedSlots, setLockedSlots] = useState(bookedSlots);

  const unavailable = barberId ? lockedSlots[barberId] || [] : [];

  const availableSlots = allSlots.filter((slot) => !unavailable.includes(slot));
  useEffect(() => {
    setSelectedTime("");
    setConfirmed(false);
  }, [barberId, date]);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Reservasi Barbershop</h2>

        <BarberList
          barbers={barbers}
          barberId={barberId}
          onSelect={setBarberId}
        />
        <DatePicker date={date} onChange={setDate} />

        {barberId && date && (
          <TimeSlots
            slots={availableSlots}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
          />
        )}
        {selectedTime && !confirmed && (
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Konfirmasi Booking</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <p>
                <b>Barber:</b> {barbers.find((b) => b.id === barberId)?.name}
              </p>
              <p>
                <b>Tanggal:</b> {date}
              </p>
              <p>
                <b>Jam:</b> {selectedTime}
              </p>

              <Button
                className="w-full mt-4"
                onClick={() => {
                  setLockedSlots((prev) => ({
                    ...prev,
                    [barberId]: [...(prev[barberId] || []), selectedTime],
                  }));
                  setConfirmed(true);
                }}
              >
                Konfirmasi Booking
              </Button>
            </CardContent>
          </Card>
        )}
        {confirmed && (
          <Alert className="border-green-500">
            <AlertTitle>Booking Berhasil 🎉</AlertTitle>
            <AlertDescription>
              Reservasi kamu sudah tercatat. Silakan datang tepat waktu.
            </AlertDescription>
          </Alert>
        )}
        {selectedTime && (
          <div className="bg-green-100 text-green-800 p-3 rounded text-center">
            Booking: <b>{date}</b> jam <b>{selectedTime}</b>
          </div>
        )}
      </div>
    </div>
  );
}
