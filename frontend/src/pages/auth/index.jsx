import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// IMPORT DATA DUMMY & CONTEXT: Jalur sudah benar berdasarkan struktur folder Anda (../../)
import { DUMMY_USERS } from '../../data/users';
import { useAuth } from '../../context/AuthContext';


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // TAMBAH STATE UNTUK ROLE (nilai default 'siswa')
  const [role, setRole] = useState("siswa"); 
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  // AMBIL FUNGSI LOGIN DARI CONTEXT
  const { login } = useAuth(); 

  const validate = () => {
    const e = {};
    
    // Perbaikan: Anda harus mengisi objek 'e' di sini
    if (!username) {
      e.username = "Username wajib diisi"; // Perbaikan
    }
    
    if (!password) e.password = "Password wajib diisi";
    // Sesuaikan minimal karakter dengan password dummy (misalnya 3 karakter)
    else if (password.length < 3) e.password = "Password minimal 3 karakter"; 
    
    if (!role) e.role = "Role wajib dipilih";
    
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setMessage(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);

    try {
      // 1. LOGIKA AUTENTIKASI DUMMY
      // Cari user yang cocok berdasarkan username, password, DAN role yang dipilih
      const user = DUMMY_USERS.find(
        (u) => 
          u.username === username && 
          u.password === password && 
          u.role === role // Cek role yang dipilih
      );

      // Simulasi delay/loading
      await new Promise((r) => setTimeout(r, 700));

      if (user) {
        // Panggil fungsi login dari AuthContext untuk menyimpan status global
        login(user); 

        setMessage({ type: "success", text: `Login berhasil. Selamat datang ${user.name} sebagai ${user.role}!` });
        
        navigate("/dashboard"); 
      } else {
        // Jika tidak cocok
        throw new Error("Username, Password, atau Role salah. Coba lagi.");
      }
      
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Gagal login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-w-screen">  
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-white px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
            <header className="mb-6 text-center">
            <h2 className="text-3xl font-semibold text-blue-950 mb-2">Selamat Datang Kembali</h2>
            <p className="text-sm text-gray-600">Masuk untuk melanjutkan ke akunmu</p>
            </header>

            {message && (
            <div
                role="alert"
                className={`mb-4 px-4 py-2 rounded-md text-sm ${
                message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
            >
                {message.text}
            </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

            {/* INPUT USERNAME */}
            <label className="block mb-2 mt-4">
                <span className="text-sm text-gray-700">Username</span>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 text-black block w-full rounded-md border px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.username ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Masukkan Username"
                aria-invalid={errors.username ? "true" : "false"}
                aria-describedby={errors.username ? "err-username" : undefined}
                />
                {errors.username && (
                <p id="err-username" className="mt-1 text-xs text-red-600">{errors.username}</p>
                )}
            </label>

            {/* INPUT PASSWORD */}
            <label className="block mb-2 mt-4">
                <span className="text-sm text-gray-700">Password</span>
                <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mt-1 block text-black w-full rounded-md border px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? "border-red-300" : "border-gray-200"
                    }`}
                    placeholder="Masukkan password (contoh: 123/456)"
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "err-pass" : undefined}
                />


                <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    // PERBAIKAN STYLING: agar tombol show/hide terlihat
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-r-md text-white bg-blue-500 hover:bg-blue-600 h-full focus:outline-none"
                    aria-label={showPassword ? "Sembunyikan Password" : "Tampilkan Password"}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
                </div>
                {errors.password && (
                <p id="err-pass" className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
            </label>

                <label className="block mb-2">
                    <span className="text-sm text-gray-700">Masuk Sebagai</span>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={`mt-1 text-black block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.role ? "border-red-300" : "border-gray-200"
                      }`}
                      aria-invalid={errors.role ? "true" : "false"}
                      aria-describedby={errors.role ? "err-role" : undefined}
                    >
                      <option value="siswa">Siswa</option>
                      <option value="guru">Guru</option>
                    </select>
                    {errors.role && (
                    <p id="err-role" className="mt-1 text-xs text-red-600">{errors.role}</p>
                    )}
                </label>

            <div className="flex items-center justify-end mt-4">
                <a href="#" className="text-sm text-blue-600 hover:underline">Lupa password?</a>
            </div>

            <button
                type="submit"
                className="mt-6 w-full inline-flex items-center justify-center rounded-xl px-4 py-2 text-white bg-blue-950 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
                disabled={loading}
            >
                {loading ? "Masuk..." : "Masuk"}
            </button>
            </form>
        </div>
        </div>
    </div>
  );
}