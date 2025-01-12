import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire("Gagal", "Password dan konfirmasi password tidak cocok!", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire("Pendaftaran Berhasil!", "Silakan login untuk melanjutkan.", "success");
        navigate("/");
      } else {
        Swal.fire("Pendaftaran Gagal", data.message || "Coba lagi nanti!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan pada server!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md  mt-12 mb-12">
        <div className="flex flex-col items-center mb-8">
          <img
            src="./src/assets/logo-black.png"
            alt="Logo"
            className="w-20 h-20"
          />
          <h2 className="text-3xl font-bold text-gray-800">Daftar di MerapiNet</h2>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username Anda"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password Anda"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi password Anda"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Daftar
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Sudah punya akun?{" "}
          <a
            href="/"
            className="text-blue-600 hover:text-purple-500 hover:underline font-semibold"
          >
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
