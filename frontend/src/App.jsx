// src/App.jsx (VERSI LENGKAP)

// Wajib ada untuk JSX
import * as React from "react"; 
import { Routes, Route } from "react-router-dom"; 

// Pastikan semua komponen ini di-import
import Dashboard from "./pages/dashboard/Index";
import Login from "./pages/auth/index";
import Register from "./pages/register/index";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 
import Exams from "./pages/exams/Index.jsx";
// ... (Pastikan Anda meng-import komponen ManageUsers jika digunakan)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} /> 
      <Route path="/register" element={<Register/>} />
      
      {/* PENGGUNAAN PROTECTED ROUTE */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole={['siswa', 'guru', 'admin']}>
            <Dashboard/>
          </ProtectedRoute>
        } 
      />

      {/* Rute lain yang hanya bisa diakses guru/admin: */}
      <Route 
        path="/manage-users" 
        element={
          <ProtectedRoute requiredRole={['guru', 'admin']}>
            {/* Ganti ini dengan komponen yang sesungguhnya! */}
            <div>Halaman Kelola User (Demo)</div> 
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/exams" 
        element={
          <ProtectedRoute requiredRole={['siswa', 'guru', 'admin']}>
            <Exams />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

// BARIS INI WAJIB ADA UNTUK EXPORT DEFAULT
export default App;
