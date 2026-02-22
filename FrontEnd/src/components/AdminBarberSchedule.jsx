import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { bookedSlots } from "../data/dummyData";

export default function AdminBarberSchedule({
  barber,
  slots,
  blocked,
  setBlocked,
}) {
  const booked = bookedSlots[barber.id] || [];
  const blockedForBarber = blocked[barber.id] || [];

  const toggleBlock = slot => {
    setBlocked(prev => {
      const current = prev[barber.id] || [];

      const updated = current.includes(slot)
        ? current.filter(s => s !== slot)
        : [...current, slot];

      return {
        ...prev,
        [barber.id]: updated,
      };
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{barber.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-4 gap-2">
          {slots.map(slot => {
            const isBooked = booked.includes(slot);
            const isBlocked = blockedForBarber.includes(slot);

            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => toggleBlock(slot)}
                className={`
                  py-2 rounded-lg text-sm border transition
                  ${
                    isBooked
                      ? "bg-red-200 text-red-800 cursor-not-allowed"
                      : isBlocked
                      ? "bg-gray-300 text-gray-700"
                      : "bg-green-200 text-green-800 hover:scale-105"
                  }
                `}
              >
                {slot}
                {isBooked && " (Booked)"}
                {!isBooked && isBlocked && " (Blocked)"}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}