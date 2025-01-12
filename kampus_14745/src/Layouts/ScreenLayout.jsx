import React from "react";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaHospital, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

function ScreenLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex font-poppins">
      <Sider />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="flex-grow bg-white shadow-sm overflow-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function Sider() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col fixed top-0 left-0 bottom-0 z-10">
      <div className="p-6 flex items-center justify-center">
        <img
          src="./src/assets/logo.png"
          alt="Merapinet"
          className="w-10 h-auto object-cover rounded-full mr-3"
        />
        <p>MerapiNet</p>
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul className="space-y-3">
          <li>
            <Link
              to="/screens"
              className="block px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaTachometerAlt className="mr-2 inline-block" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="evacuations"
              className="block px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaHospital className="mr-2 inline-block" /> Evacuation Centers
            </Link>
          </li>
          <li>
            <Link
              to="reports"
              className="block px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaClipboardList className="mr-2 inline-block" /> Reports
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Apakah Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <header className="bg-white-900 text-black shadow p-5 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Selamat Datang di MerapiNet</h1>
      <button
        onClick={handleLogout}
        className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition ease-in-out duration-300 shadow-md"
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white-900 text-black text-center py-4 shadow-inner">
      &copy; 2025 Kyuusha. All rights reserved.
    </footer>
  );
}

export default ScreenLayout;
