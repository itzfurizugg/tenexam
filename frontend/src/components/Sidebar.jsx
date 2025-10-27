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
                { name: "Exams", path: "/exams" },
                { name: "Grades", path: "/grades" },
            ];
        } 
        
        // Guru atau Admin
        return [
            ...baseItems,
            { name: "Exams", path: "/manage-questions" },
            { name: "Grades", path: "/manage-users" },
        ];
    };

    const menuItems = getMenuItems(user.role);

    // Ambil nama tampilan (Gunakan 'name' jika ada, jika tidak, gunakan 'username')
    const displayName = user.name || user.username || "Nama Pengguna"; 

    // Kelas yang digunakan
    // *******************************************************************
    // *** PENYESUAIAN KELAS UNTUK MENGHAPUS HOVER BACKGROUND & BOLD ***
    // *******************************************************************
    const baseItemClasses = 'py-2 px-3 mb-2 rounded-lg cursor-pointer transition-all duration-200';
    
    // LI hanya menangani background dan font-weight tebal (untuk item AKTIF saja)
    const activeItemClasses = 'bg-indigo-100 font-semibold';
    
    // LINK menangani warna teks default (abu-abu) dan hover (biru) (untuk item NON-AKTIF)
    const inactiveLinkClasses = 'text-gray-700 hover:text-indigo-600'; 
    
    // LINK menangani warna teks (biru) (untuk item AKTIF)
    const activeLinkClasses = 'text-indigo-700';

    


    return (
        <div className="w-64 bg-white min-h-screen flex flex-col justify-between shadow-md">
            <div>
                {/* LOGO & PROFILE SECTION (TIDAK BERUBAH) */}
                <div className="p-6 text-2xl font-bold text-[#1e56a0]">Sixamlify</div>

                <div className="bg-indigo-100 mx-4 rounded-2xl flex items-center gap-3 p-3">
                    <div className="relative">
                        <img
                            src={profilePic} 
                            alt="profile"
                            className="rounded-full w-14 h-14 object-cover border-4 border-indigo-400"
                        />
                    </div>
                    <div>
                        <h2 className="text-indigo-700 font-semibold text-lg leading-tight">
                            {displayName}
                        </h2>
                        <p className="italic text-gray-700 text-sm">{user.role}</p> 
                    </div>
                </div>

                {/* MENU SECTION - DINAMIS */}
                <div className="mt-8 px-6">
                    <p className="text-xs text-gray-400 mb-2">MENU</p>
                    <ul>
                        {menuItems.map((item) => {
                            const isActive = item.path === '/exams' ? isExamsActiveParent : location.pathname === item.path;
                            
                            return (
                                <li 
                                    key={item.name}
                                    // LI hanya menangani BG dan font-weight saat AKTIF. NON-AKTIF tidak ada hover BG.
                                    className={`${baseItemClasses} ${isActive ? activeItemClasses : 'hover:bg-transparent'}`} 
                                >
                                    {/* LINK menangani warna teks default dan hover teks. */}
                                    <Link 
                                        to={item.path} 
                                        // Jika AKTIF -> Biru tebal (font-weight dari LI), Jika NON-AKTIF -> Abu-abu, hover jadi biru, TIDAK BOLD
                                        className={`w-full block font-normal ${ isActive ? "text-indigo-700" : "!text-gray-700 hover:text-indigo-600" }`}
 
                                    > 
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* GENERAL SECTION */}
                    <p className="text-xs text-gray-400 mt-6 mb-2">GENERAL</p>
                    <ul>
                        {/* Profile */}
                        {(() => {
                            const isActive = location.pathname === '/profile';
                            return (
                                <li className={`${baseItemClasses} ${isActive ? activeItemClasses : 'hover:bg-transparent'}`}>
                                    <Link to="/profile" className={`w-full block font-normal ${ isActive ? "text-indigo-700" : "!text-gray-700 hover:text-indigo-600" }`}>Profile</Link>
                                </li>
                            );
                        })()}

                        {/* Settings */}
                        {(() => {
                            const isActive = location.pathname === '/settings';
                            return (
                                <li className={`${baseItemClasses} ${isActive ? activeItemClasses : 'hover:bg-transparent'}`}>
                                    <Link to="/settings" className={`w-full block font-normal ${ isActive ? "text-indigo-700" : "!text-gray-700 hover:text-indigo-600" }`}>Settings</Link>
                                </li>
                            );
                        })()}
                    </ul>
                </div>
            </div>

            {/* LOG OUT (TIDAK BERUBAH) */}
            <div className="p-6 text-gray-700 font-medium cursor-pointer hover:text-red-500" onClick={handleLogout}>
                Log Out
            </div>
        </div>
    );
};

export default Sidebar;