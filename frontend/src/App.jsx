// ... (Import komponen lainnya tetap sama)
import { Routes, Route, Navigate } from "react-router-dom"; // TAMBAHKAN Navigate
import { useAuth } from "./context/AuthContext"; // TAMBAHKAN Import ini
import Dashboard from "./pages/dashboard/Index";
import Login from "./pages/auth/index";
import Register from "./pages/register/index";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 
import Exams from "./pages/exams/Index.jsx";
import ExamDetailPage from "./pages/exams/Index.jsx";
import ProfilePage from "./pages/profile/Index.jsx";
import GradesPage from "./pages/grades/Index.jsx";
import ExamScene from "./pages/exams/examScene.jsx";
import ManageQuestions from "./pages/exams/manageQuestion.jsx";

function App() {
  // AMBIL DATA USER DARI CONTEXT DI SINI
  const { user } = useAuth(); 

  return (
    <Routes>
      <Route path="/" element={<Login/>} /> 
      <Route path="/register" element={<Register/>} />
      <Route path="/exam/:subjectId/start" element={<ExamScene />} />
      
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Rute lain yang hanya bisa diakses guru/admin: */}
      <Route 
        path="/manage-users" 
        element={
          <ProtectedRoute requiredRole={['guru', 'admin']}>
            <div>Halaman Kelola User (Demo)</div> 
          </ProtectedRoute>
        }
      />

      {/* SEKARANG VARIABEL user SUDAH DEFINED */}
      <Route 
        path="/manage-questions" 
        element={
          user && user.role === 'admin' 
            ? <ManageQuestions /> 
            : <Navigate to="/dashboard" />
        } 
      />

      {/* Tambahkan pembungkus ProtectedRoute agar token selalu terkirim */}
      <Route 
        path="/grades" 
        element={
          <ProtectedRoute>
            <GradesPage />
          </ProtectedRoute>
        } 
      />

      <Route path="/exams/:subjectId" element={<ExamDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />

    </Routes>
  )
}

export default App;