import React from "react";
import { DUMMY_GRADES } from '../../data/grades.js';
import Sidebar from "../../components/Sidebar";
import { useAuth } from '../../context/AuthContext.jsx';

function GradesPage() {
    // const navigate = useNavigate(); // Jika ingin fungsionalitas Lihat Detail

    const handleViewDetail = (examId) => {
        alert(`Lihat detail ujian ID: ${examId}`);
        // Di masa depan: navigate(`/grades/detail/${examId}`);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <Sidebar />
        <div className="flex-1 bg-gradient-to-b from-indigo-400 to-blue-200 p-6 sm:p-10 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-6 text-white">📊 Hasil Ujian Siswa</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MATA PELAJARAN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TANGGAL UJIAN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NILAI AKHIR</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">POIN MAKS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS HASIL</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AKSI</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {DUMMY_GRADES.map((result) => (
                            <tr key={result.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{result.subject}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 font-bold">{result.score}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{result.maxScore}</td>
                                
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span 
                                        className={`
                                            px-3 py-1 rounded-full text-xs font-semibold 
                                            ${result.status === 'Tuntas' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-red-100 text-red-700'}
                                        `}
                                    >
                                        {result.status}
                                    </span>
                                </td>
                                
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        className="text-indigo-600 hover:text-indigo-800"
                                        onClick={() => handleViewDetail(result.id)}>
                                        Lihat Detail
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}

export default GradesPage;