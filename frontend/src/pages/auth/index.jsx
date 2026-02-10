import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("siswa"); 
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const validate = () => {
    const e = {};
    if (!username) e.username = "Username wajib diisi";
    if (!password) e.password = "Password wajib diisi";
    return e;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
          const response = await fetch("http://127.0.0.1:8001/api/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
              },
              body: JSON.stringify({ username, password }),
          });

          // AMBIL JSON CUKUP SEKALI DI SINI
          const data = await response.json(); 

          if (response.ok) {
              // Pastikan backend kamu mengirimkan 'token'
              const userWithRole = {
                  ...data.user,
                  role: data.user.username === 'admin' ? 'admin' : 'siswa'
              };

              // KIRIM TOKEN JUGA KE SINI (Sesuai update AuthContext kita sebelumnya)
              login(userWithRole, data.token); 
              
              navigate("/dashboard");
          } else {
              // Jika error, ambil pesan dari 'data'
              setMessage({ type: "error", text: data.message || "Login Gagal" });
          }
      } catch (err) {
          console.error("Error saat login:", err);
          setMessage({ type: "error", text: "Terjadi kesalahan koneksi" });
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="container min-w-screen">  
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-white px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
            <header className="mb-6 text-center">
              <h2 className="text-3xl font-semibold text-blue-950 mb-2">Selamat Datang</h2>
              <p className="text-sm text-gray-600">Masuk kembali ke akunmu</p>
            </header>

            {message && (
              <div className={`mb-4 px-4 py-2 rounded-md text-sm ${
                message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label className="block mb-4">
                  <span className="text-sm text-gray-700">Username</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Masukkan Username"
                  />
                  {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
              </label>

              <label className="block mb-4">
                  <span className="text-sm text-gray-700">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Masukkan Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              </label>

              <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-2 text-white bg-blue-950 hover:bg-blue-900 disabled:opacity-60 transition-all"
                  disabled={loading}
              >
                  {loading ? "Sedang Memproses..." : "Masuk"}
              </button>
            </form>
        </div>
        </div>
    </div>
  );
}