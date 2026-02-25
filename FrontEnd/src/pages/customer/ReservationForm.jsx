import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

export default function ReservationForm() {
  const [barbers, setBarbers] = useState([]);
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    barber_id: "",
    date: "",
    start_time: "",
  });

  useEffect(() => {
    api.get("/barbers").then((res) => setBarbers(res.data));
  }, []);

  const hours = Array.from({ length: 12 }, (_, i) => {
    const h = i + 11;
    return `${h.toString().padStart(2, "0")}:00`;
  });

  const submit = async () => {
    try {
      await api.post("/reservations", form);
      alert("Reservasi berhasil");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-bold">Reservasi Barbershop</h1>

      <Input
        placeholder="Nama"
        onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
      />
      <Input
        placeholder="Nomor Telepon"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <Input
        type="date"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <select
        className="w-full border rounded p-2"
        onChange={(e) => setForm({ ...form, barber_id: e.target.value })}
      >
        <option value="">Pilih Barber</option>
        {barbers.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <select
        className="w-full border rounded p-2"
        onChange={(e) => setForm({ ...form, start_time: e.target.value })}
      >
        <option value="">Pilih Waktu</option>
        {hours.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>

      <Button onClick={submit} className="w-full">
        Booking
      </Button>
    </div>
  );
}
