import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/authslice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const data = response.data;
      if (response.status === 200) {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        Swal.fire("Login Berhasil!", "Selamat datang di MerapiNet!", "success");
        navigate("/screens");
      } else {
        Swal.fire("Login Gagal", data.message || "Periksa kredensial Anda!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan pada server!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img
            src="./src/assets/logo-black.png"
            alt="Logo"
            className="w-20 h-20"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to MerapiNet
          </h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Belum punya akun?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-purple-500 hover:underline font-semibold"
          >
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
