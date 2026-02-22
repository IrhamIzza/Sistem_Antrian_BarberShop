import { useState } from "react";
import { barbers, allSlots } from "../data/dummyData";
import AdminBarberSchedule from "../components/AdminBarberSchedule";
import AdminDatePicker from "../components/AdminDatePicker";
import { blockedSlots as initialBlocked } from "../data/dummyData";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const [blocked, setBlocked] = useState(initialBlocked);
  const [date, setDate] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard 💈</h1>

        <AdminDatePicker date={date} onChange={setDate} />

        {date && (
          <div className="space-y-4">
            {barbers.map((barber) => (
              <AdminBarberSchedule
                key={barber.id}
                barber={barber}
                slots={allSlots}
                blocked={blocked}
                setBlocked={setBlocked}
              />
            ))}
          </div>
        )}

        {!date && (
          <p className="text-gray-500">
            Pilih tanggal untuk melihat jadwal barber
          </p>
        )}
        <Button
          variant="destructive"
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
