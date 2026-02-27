import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CircleCheckIcon, OctagonXIcon } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/Loading";
export default function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  async function logout() {
    try {
      setLoading(true)
      await api.post("/admin/logout");
      localStorage.removeItem("token");
      navigate("/admin/login");
    } catch (error) {

    }finally{
      setLoading(false)
    }
  }

  async function updateStatus(id, newStatus) {
    try {
      await api.post(`/reservations/${id}/status`, {
        status: newStatus,
      });

      // update state tanpa reload
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Gagal update status");
    }
  }

  async function deleteReservation(id) {
    try {
      await api.delete(`/reservations/${id}`);
      toast.success("Reservasi berhasil dihapus", { position: "top-right" });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus reservasi", { position: "top-right" });
    }
  }

  async function getData() {
    try {
      await api.get("/admin/reservations").then((res) => setData(res.data));
    } catch (error) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-6 px-20 flex flex-col gap-4">
      <Loading loading={loading} />

      <h1 className="text-xl font-bold ">Data Reservasi</h1>

      <table className="w-full border ">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 min-w-30">Nama</th>
            <th className="border p-2 w-16">No HP</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Waktu</th>
            <th className="border p-2">Barber</th>
            <th className="border p-2 w-10">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.customer_name}</td>
              <td className="border p-2 ">{r.phone}</td>
              <td className="border p-2">{r.date}</td>
              <td className="border p-2">
                {r.start_time} - {r.end_time}
              </td>
              <td className="border p-2">{r.barber.name}</td>
              <td className="border p-2 flex gap-2 items-center">
                <span>{r.status}</span>
                <div className="flex gap-2">
                  {r.status === "booked" && (
                    <>
                      <Button
                        size="xs"
                        onClick={() => updateStatus(r.id, "done")}
                      >
                        <CircleCheckIcon className="size-4" />
                      </Button>

                      <Button
                        size="xs"
                        variant="destructive"
                        onClick={() => updateStatus(r.id, "cancelled")}
                      >
                        <OctagonXIcon className="size-4" />
                      </Button>
                    </>
                  )}
                </div>
              </td>
              <td className="border p-2 ">
                <Button
                  size="sm"
                  onClick={() => deleteReservation(r.id)}
                  className="bg-red-500 flex mx-auto hover:bg-red-700"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
