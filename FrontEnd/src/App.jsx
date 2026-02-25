import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReservationForm from "@/pages/customer/ReservationForm";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ReservationForm />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}
