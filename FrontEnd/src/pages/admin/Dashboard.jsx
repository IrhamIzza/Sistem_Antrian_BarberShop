import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  
  async function logout() {
    await api.post("/admin/logout");
    localStorage.removeItem("token");
    navigate("/admin/login");
  }

  useEffect(() => {
    api.get("/admin/reservations").then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-xl font-bold ">Data Reservasi</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nama</th>
            <th className="border p-2">No HP</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Waktu</th>
            <th className="border p-2">Barber</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.customer_name}</td>
              <td className="border p-2">{r.phone}</td>
              <td className="border p-2">{r.date}</td>
              <td className="border p-2">
                {r.start_time} - {r.end_time}
              </td>
              <td className="border p-2">{r.barber.name}</td>
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
