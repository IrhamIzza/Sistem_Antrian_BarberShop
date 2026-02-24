import { useState } from "react";
import api from "@/api/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch {
      alert("Login gagal");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <form className="flex flex-col gap-4 " onSubmit={handelSubmit}>
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}
