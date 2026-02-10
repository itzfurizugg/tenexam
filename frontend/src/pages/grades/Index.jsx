import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from '../../context/AuthContext.jsx';

function GradesPage() {
    const [grades, setGrades] = useState([]); // State untuk menampung data dari database
    const [loading, setLoading] = useState(true); // State loading
    const { user } = useAuth(); // Mengambil data user jika diperlukan

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8001/api/user/grades", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                const data = await res.json();
                
                // Pastikan data yang diterima adalah array
                setGrades(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Gagal mengambil nilai:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGrades();
    }, []);

    const handleViewDetail = (examId) => {
        alert(`Lihat detail ujian ID: ${examId}`);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 bg-gradient-to-b from-indigo-400 to-blue-200 p-6 sm:p-10 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6 text-white">📊 Hasil Ujian Siswa</h1>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {loading ? (
                        <div className="text-center py-10 font-bold text-gray-500 italic">
                            ⏳ Sedang memuat nilai kamu...
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MATA PELAJARAN</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TANGGAL UJIAN</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">NILAI</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">STATUS</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">AKSI</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {grades.length > 0 ? grades.map((result) => (
                                    <tr key={result.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                            {result.mapel?.nama_mapel || "Mata Pelajaran"}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(result.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-800 font-bold text-center">
                                            {result.nilai}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-center">
                                            <span 
                                                className={`
                                                    px-3 py-1 rounded-full text-xs font-semibold 
                                                    ${result.nilai >= 75 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-red-100 text-red-700'}
                                                `}
                                            >
                                                {result.nilai >= 75 ? 'Tuntas' : 'Remedi'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-right">
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-800 font-bold underline"
                                                onClick={() => handleViewDetail(result.id)}>
                                                Lihat Detail
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-10 text-center text-gray-400 italic">
                                            Kamu belum memiliki riwayat nilai ujian.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GradesPage;