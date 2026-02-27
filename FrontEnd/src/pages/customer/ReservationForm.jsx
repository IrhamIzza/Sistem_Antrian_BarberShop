import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loading from "@/components/Loading";

export default function ReservationForm() {
  const initialForm = {
    customer_name: "",
    phone: "",
    barber_id: "",
    date: "",
    start_time: "",
  };
  const [barbers, setBarbers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/barbers").then((res) => setBarbers(res.data));
  }, []);

  const hours = Array.from({ length: 12 }, (_, i) => {
    const h = i + 11;
    return `${h.toString().padStart(2, "0")}:00`;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/reservations", form);
      toast.success("Reservasi berhasil 🎉", { position: "top-right" });
      setForm(initialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || "Terjadi kesalahan", {
        position: "top-right",
      });
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <Loading loading={loading} />
      <h1 className="text-xl font-bold">Reservasi Barbershop</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Nama"
          value = {form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
        />
        <Input
          placeholder="Nomor Telepon"
          value = {form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          type="date"
          value = {form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <select
          className="w-full border rounded p-2"
          value = {form.barber_id}
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
          value={form.start_time}
          onChange={(e) => setForm({ ...form, start_time: e.target.value })}
        >
          <option value="">Pilih Waktu</option>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <Button type="submit" className="w-full">
          Booking
        </Button>
      </form>
    </div>
  );
}
