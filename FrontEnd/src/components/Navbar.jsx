import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navClass = ({ isActive }) =>
    `relative pb-2 transition-colors duration-300
     ${isActive ? "text-black" : "text-black hover:text-black"}
     after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-black after:rounded-full
     after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-black text-3xl font-bold">Desain Interior</div>

        {/* Menu */}
        <ul className="hidden sm:flex gap-6 font-medium text-[25px] tracking-wide">
          <li>
            <NavLink to="/" end className={navClass}>
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink to="/tentang" className={navClass}>
              Tentang
            </NavLink>
          </li>
          <li>
            <NavLink to="/kategori" className={navClass}>
              Kategori
            </NavLink>
          </li>
          <li>
            <NavLink to="/testimoni" className={navClass}>
              Testimoni
            </NavLink>
          </li>
          <li>
            <NavLink to="/kontak" className={navClass}>
              Kontak
            </NavLink>
          </li>
          <li>
            <NavLink to="/kontak" className={navClass}>
              Konsultasi
            </NavLink>
          </li>
        </ul>
      </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden text-black focus:outline-none" aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <i className="ph ph-x text-2xl"></i>
          ) : (
            <i className="ph ph-list text-2xl"></i>
          )}
        </button>

      {/* Menu mobile */}
      <div
        className={`transition-all duration-300 sm:hidden mt-3 overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-2 text-black">
          <li>
            <Link
              to="/"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Beranda
            </Link>
          </li>
          <li>
            <a
              href="#tentang"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Tentang
            </a>
          </li>
          <li>
            <a
              href="#kategori"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Kategori
            </a>
          </li>
          <li>
            <a
              href="#testimoni"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Testimoni
            </a>
          </li>
          <li>
            <a
              href="#kontak"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Kontak
            </a>
          </li>
          <li>
            <a
              href="#konsultasi"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Konsultasi
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
