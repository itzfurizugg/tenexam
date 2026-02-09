import React from "react";
import Card from "../../components/Card";
import Sidebar from "../../components/Sidebar";
import { useAuth } from '../../context/AuthContext.jsx'; 

const Dashboard = () => {
    const { user } = useAuth(); 

    // Gunakan optional chaining (?.) agar tidak crash jika user null
    const username = user?.username || "Pengguna";
    const role = user?.role || "Siswa";

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
            {/* Sidebar tetap di kiri */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header Halus */}
                <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-indigo-900">Dashboard {role}</h2>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                            {username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-700 font-medium">{username}</span>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-indigo-950">
                                Selamat Datang, {username}! 👋
                            </h1>
                            <p className="text-indigo-800/70 mt-1 font-medium">Berikut adalah ringkasan aktivitas ujian kamu hari ini.</p>
                        </div>

                        {/* Statistik Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {/* Kita bisa kirim props ke Card jika Card.jsx mendukung */}
                            <Card title="Ujian Tersedia" count="12" icon="📝" />
                            <Card title="Tugas Selesai" count="45" icon="✅" />
                            <Card title="Nilai Rata-rata" count="88" icon="⭐" />
                        </div>

                        {/* Tabel Aktivitas atau Informasi Tambahan */}
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white p-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terakhir</h3>
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-gray-500 text-center py-10">Belum ada aktivitas ujian terbaru.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;