import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ReservationPage from "./pages/ReservationPage";
import AdminDashboardPage from "./pages/AdmimDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import RequireAdmin from "./auth/requireAdmin";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/" element={<ReservationPage />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboardPage />
            </RequireAdmin>
          }
        />
      </Routes>
    </>
  );
}
export default App;
