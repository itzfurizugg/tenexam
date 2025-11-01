// src/pages/exams/Index.jsx

import React from "react";
import { useParams, Link } from 'react-router-dom'; // Tambahkan Link
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx'; 
// Pastikan jalur ini benar
import { DUMMY_SUBJECTS } from '../../data/subjects.js'; 

// Komponen Reusable untuk Badge Status (mirip gambar contoh)
const StatusBadge = ({ status }) => {
    let colorClass;
    switch (status) {
        case 'Completed':
            colorClass = 'bg-green-100 text-green-700';
            break;
        case 'Absent':
            colorClass = 'bg-red-100 text-red-700';
            break;
        case 'Pending':
        default:
            colorClass = 'bg-purple-100 text-purple-700';
            break;
    }
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
            {status}
        </span>
    );
};

const ExamsIndex = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { subjectId } = useParams(); 
    const kembali = () => {
        navigate('/exams', { replace: true });
    }

    const displayName = user.name || user.username || "Pengguna";

    let pageTitle;
    let mainContent;

    if (subjectId) {
        console.log('Subject ID yang terambil:', subjectId);
        // --- LOGIKA HALAMAN UJIAN SPESIFIK (/exams/:subjectId) ---
        const subject = DUMMY_SUBJECTS.find(s => s.path.endsWith(`/${subjectId}`));
        const subjectName = subject ? subject.name : subjectId.charAt(0).toUpperCase() + subjectId.slice(1);
        
        pageTitle = `Ujian Mata Pelajaran: ${subjectName}`;
        mainContent = (
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Detail Ujian {subjectName}</h3>
                <p className="text-black"><strong>Total Soal:</strong> {subject?.totalQuestions || 'N/A'}</p>
                <p className="text-black"><strong>Waktu:</strong> {subject?.durationMinutes || 'N/A'} menit</p>
                <p className="mt-4 text-black">
                  <span className="text-lg font-bold text-red-600">Peringatan:</span> Setelah dimulai, ujian tidak bisa dijeda.
                </p>
                <button 
                  className="mt-6 bg-indigo-700 text-white py-2 px-6 rounded-lg hover:bg-indigo-800 transition shadow-md">
                    Mulai Ujian {subjectName} Sekarang
                </button>
                <button
                    onClick={kembali}
                    className="mt-4 ml-4 bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition shadow-md">
                    Kembali ke Daftar Ujian 
                </button>
            </div>
        );

    } else {
        // --- LOGIKA HALAMAN DAFTAR UJIAN (/exams) ---
        pageTitle = "Daftar Ujian Aktif";
        mainContent = (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Soal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu (Menit)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poin Maks</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {DUMMY_SUBJECTS.map((subject) => (
                            <tr key={subject.id} className="hover:bg-indigo-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Link to={subject.path} className="text-indigo-600 hover:text-indigo-900 font-semibold">
                                        {subject.name}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {subject.totalQuestions}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {subject.durationMinutes}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {subject.maxPoints}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    {/* Contoh penggunaan StatusBadge jika Anda memiliki data status */}
                                    <StatusBadge status="Pending" /> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    
    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />

            <div className="flex-1 bg-gradient-to-b from-indigo-400 to-blue-200 p-6 sm:p-10 overflow-y-auto">
                {/* <h1 className="text-2xl font-semibold text-white mb-8">
                    Hey, {displayName}!
                </h1> */}

                <div className="bg-white rounded-2xl shadow-xl min-h-[80vh] p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
                        {pageTitle}
                    </h2>
                    {mainContent}
                </div>
            </div>
        </div>
    );
};

export default ExamsIndex;