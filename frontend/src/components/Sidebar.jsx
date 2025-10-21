// src/components/Sidebar.jsx

import React from "react";
// Impor semua hook yang dibutuhkan
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { useAuth } from '../context/AuthContext.jsx'; 
// Pastikan jalur ini benar relatif dari components/ ke src/data/
import { DUMMY_SUBJECTS } from '../data/subjects.js'; 

// Import foto profil
import profilePic from "../assets/ningning.png"; 

const Sidebar = () => {
    // Ambil data user, role, dan fungsi hook
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Mendapatkan URL saat ini

    // Cek apakah path saat ini adalah bagian dari /exams (untuk membuka sub-menu)
    const isExamsActiveParent = location.pathname.startsWith('/exams');

    // Fungsi untuk Log Out
    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    if (!user) {
        return null;
    }

    // Tentukan menu berdasarkan peran (role)
    const getMenuItems = (role) => {
        const baseItems = [
            { name: "Dashboard", path: "/dashboard" },
        ];
        
        if (role === 'siswa') {
            return [
                ...baseItems,
                { name: "Ujian", path: "/exams" },
                { name: "Nilai", path: "/grades" },
            ];
        } 
        
        // Guru atau Admin
        return [
            ...baseItems,
            { name: "Kelola Soal", path: "/manage-questions" },
            { name: "Kelola User", path: "/manage-users" },
        ];
    };

    const menuItems = getMenuItems(user.role);

    // Ambil nama tampilan (Gunakan 'name' jika ada, jika tidak, gunakan 'username')
    const displayName = user.name || user.username || "Nama Pengguna"; 

    return (
        <div className="w-64 bg-white min-h-screen flex flex-col justify-between shadow-md">
            <div>
                {/* LOGO */}
                <div className="p-6 text-2xl font-bold text-[#1e56a0]">Sixamlify</div>

                {/* PROFILE SECTION - DINAMIS */}
                <div className="bg-indigo-100 mx-4 rounded-2xl flex items-center gap-3 p-3 shadow-sm">
                    <div className="relative">
                        <img
                            src={profilePic} 
                            alt="profile"
                            className="rounded-full w-14 h-14 object-cover border-4 border-indigo-400"
                        />
                    </div>
                    <div>
                        {/* TAMPILKAN NAMA PENGGUNA DARI CONTEXT */}
                        <h2 className="text-indigo-700 font-semibold text-lg leading-tight">
                            {displayName}
                        </h2>
                        {/* TAMPILKAN PERAN DARI CONTEXT */}
                        <p className="italic text-gray-700 text-sm">{user.role}</p> 
                    </div>
                </div>

                {/* MENU SECTION - DINAMIS */}
                <div className="mt-8 px-6">
                    <p className="text-xs text-gray-400 mb-2">MENU</p>
                    <ul>
                        {menuItems.map((item) => {
                            // Tentukan apakah item menu ini aktif
                            const isActive = item.path === '/exams' ? isExamsActiveParent : location.pathname === item.path;
                            
                            return (
                                <React.Fragment key={item.name}>
                                    <li 
                                        key={item.name}
                                        className={`
                                            rounded-lg py-2 px-3 mb-2 cursor-pointer transition-colors duration-200
                                            ${
                                                isActive 
                                                // Style Aktif: BG Biru Muda + Teks Biru Tua (text-indigo-700)
                                                ? 'bg-indigo-100 text-indigo-700 font-semibold' 
                                                // Style Tidak Aktif: Teks Abu-abu (text-gray-700) + Hover Biru
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                                            } 
                                        `}
                                    >
                                        {/* Tambahkan w-full block agar seluruh area li dapat diklik */}
                                        <Link to={item.path} className="w-full block"> 
                                            {item.name}
                                        </Link>
                                    </li>

                                    {/* LOGIKA SUB-MENU MAPEL UNTUK UJIAN (HANYA UNTUK SISWA & PATH AKTIF) */}
                                    {item.name === "Ujian" && user.role === 'siswa' && isExamsActiveParent && (
                                        <ul className="ml-4 border-l border-indigo-300 pl-3 mb-2">
                                            {DUMMY_SUBJECTS.map((subject) => {
                                                const isSubjectActive = location.pathname === subject.path;
                                                return (
                                                    <li 
                                                        key={subject.id} 
                                                        className={`
                                                            py-1 text-sm cursor-pointer 
                                                            ${isSubjectActive ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'}
                                                        `}
                                                    >
                                                        <Link to={subject.path} className="w-full block">{subject.name}</Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </ul>

                    {/* GENERAL SECTION */}
                    <p className="text-xs text-gray-400 mt-6 mb-2">GENERAL</p>
                    <ul>
                        {/* Profile */}
                        <li className={`py-2 px-3 mb-2 cursor-pointer transition-colors duration-200 
                            ${location.pathname === '/profile' 
                                ? 'bg-indigo-100 text-indigo-700 font-semibold rounded-lg' 
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg'}`}>
                            <Link to="/profile" className="w-full block">Profile</Link>
                        </li>
                        {/* Settings */}
                        <li className={`py-2 px-3 mb-2 cursor-pointer transition-colors duration-200 
                            ${location.pathname === '/settings' 
                                ? 'bg-indigo-100 text-indigo-700 font-semibold rounded-lg' 
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg'}`}>
                            <Link to="/settings" className="w-full block">Settings</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* LOG OUT */}
            <div className="p-6 text-gray-700 font-medium cursor-pointer hover:text-red-500" onClick={handleLogout}>
                Log Out
            </div>
        </div>
    );
};

export default Sidebar;