import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import CurrentTime from "@/components/CurrentTime";

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
  const [slots, setSlots] = useState([]);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    api.get("/barbers").then((res) => setBarbers(res.data));
  }, []);

  // Fetch slots dari backend setiap barber atau tanggal berubah
  useEffect(() => {
    const fetchSlots = async () => {
      if (!form.barber_id || !form.date) return;

      setChecking(true);
      try {
        const res = await api.get(
          `/reservations/check?barber_id=${form.barber_id}&date=${form.date}`
        );
        setSlots(res.data.slots);
      } catch (err) {
        toast.error("Gagal load slot");
        setSlots([]);
      } finally {
        setChecking(false);
      }
    };

    fetchSlots();
  }, [form.barber_id, form.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.start_time) {
      toast.error("Pilih jam terlebih dahulu");
      return;
    }
    try {
      setLoading(true);
      await api.post("/reservations", form);
      toast.success("Reservasi berhasil 🎉", { position: "top-right" });
      setForm(initialForm);
      setSlots([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Terjadi kesalahan", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 px-20">
      <Loading loading={loading || checking} />
      <div className="text-right">
        <CurrentTime />
      </div>
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="text-xl font-bold text-center">Reservasi Barbershop</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Nama"
            value={form.customer_name}
            onChange={(e) =>
              setForm({ ...form, customer_name: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Nomor Telepon"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            maxLength={15}
          />
          <Input
            type="date"
            value={form.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            className="w-full border rounded p-2"
            value={form.barber_id}
            onChange={(e) => setForm({ ...form, barber_id: e.target.value })}
          >
            <option value="">Pilih Barber</option>
            {barbers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Slot Jam Dinamis */}
          <div className="grid grid-cols-4 gap-2">
            {slots.length > 0 ? (
              slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={slot.status === "booked"}
                  className={`p-2 rounded ${
                    slot.status === "booked"
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : form.start_time === slot.time
                      ? "bg-black text-white"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={() => setForm({ ...form, start_time: slot.time })}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500">
                Pilih barber dan tanggal untuk melihat slot
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Booking
          </Button>
        </form>
      </div>
    </div>
  );
}