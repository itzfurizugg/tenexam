import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email wajib diisi";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Format email tidak valid";
    if (!password) e.password = "Password wajib diisi";
    else if (password.length < 6) e.password = "Password minimal 6 karakter";
    if (!username) e.Username = "Username wajib diisi";
    else if (username.length < 6) e.username = "Username minimal 4 karakter";
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
      // contoh request: ganti URL & metode sesuai API backend mu
      // const res = await fetch("/api/Register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password, remember }),
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || "Register gagal");

      // MOCK: simulasi sukses
      await new Promise((r) => setTimeout(r, 700));
      setMessage({ type: "success", text: "Register berhasil — (simulasi)" });
      // redirect contoh: router.push('/dashboard')
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Gagal Register" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-w-screen">  
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-white px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 md:p-8">
            <header className="mb-6 text-center">
            <h1 className="font-semibold text-blue-950 mb-2">Selamat Datang</h1>
            <p className="text-sm text-gray-600">Isi untuk melanjutkan mendaftar akunmu</p>
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
            <label className="block mb-2">
                <span className="text-sm text-gray-700">Username</span>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 text-black block w-full rounded-md border px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.username ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="input username kamu ya!!"
                aria-invalid={errors.username ? "true" : "false"}
                aria-describedby={errors.username ? "err-username" : undefined}
                />
                {errors.username && (
                <p id="err-username" className="mt-1 text-xs text-red-600">{errors.username}</p>
                )}
            </label>
            <label className="block mb-2">
                <span className="text-sm text-gray-700">Email</span>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 text-black block w-full rounded-md border px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="contoh@domain.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "err-email" : undefined}
                />
                {errors.email && (
                <p id="err-email" className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
            </label>

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
                    placeholder="Masukkan password"
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "err-pass" : undefined}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="bg-blue-900 absolute right-0 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded-md focus:outline-none"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                    {showPassword ? "hidden" : "show"}
                </button>
                </div>
                {errors.password && (
                <p id="err-pass" className="mt-1 text-xs text-red-600">{errors.password}</p>
                )}
            </label>

            <div className="flex items-center justify-between mt-4">
                {/* <label className="inline-flex items-center text-sm">
                <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-blue-300"
                />
                <span className="ml-2 text-gray-600">Ingat saya</span>
                </label> */}

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

            {/* <div className="mt-6 text-center text-sm text-gray-600">atau masuk dengan</div> */}

            {/* <div className="mt-4 grid grid-cols-2 gap-3">
            <button
                type="button"
                className=" bg-blue-950 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-blue-900"
                onClick={() => setMessage({ type: "info", text: "Fitur social Register belum terpasang (placeholder)." })}
            > */}
                {/* icon placeholder */}
                {/* <span>Google</span>
            </button>
            <button
                type="button"
                className="bg-blue-950 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-blue-900"
                onClick={() => setMessage({ type: "info", text: "Fitur social Register belum terpasang (placeholder)." })}
            >
                <span>GitHub</span>
            </button>
            </div> */}

            <footer className="mt-6 text-center text-sm text-gray-600">
            Sudah punya akun? <Link className="link-lgn" to="/">Log in disini</Link> 
            </footer>
        </div>
        </div>
    </div>
  );
}
