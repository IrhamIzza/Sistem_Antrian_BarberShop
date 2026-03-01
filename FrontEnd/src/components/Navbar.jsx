import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navClass = ({ isActive }) =>
    `relative transition-colors duration-300
     ${isActive ? "text-white" : "text-white hover:text-white"}
     after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-white after:rounded-full
     after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav className="p-4 bg-gray-700 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-3xl font-bold">Barber Shop</div>

        {/* Menu */}
        <ul className="hidden sm:flex gap-6 font-medium text-[25px] tracking-wide">
          <li>
            <NavLink to="/" end className={navClass}>
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard" className={navClass}>
              Admin
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
              href="admin"
              className="block px-2 py-1 hover:bg-blue-500 rounded"
              onClick={() => setIsOpen(false)}
            >
              Tentang
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
