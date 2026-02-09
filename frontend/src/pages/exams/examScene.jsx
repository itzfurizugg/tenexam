import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ExamScene = () => {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    
    // State soal dan jawaban
    const [questions, setQuestions] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(0); // Soal ke-berapa
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Simpan jawaban siswa { soalId: 'A' }
    const [timeLeft, setTimeLeft] = useState(3600); // Contoh 60 menit dalam detik
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Fetch Soal dari Backend Laravel
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8001/api/exams/${subjectId}`);
                if (!response.ok) throw new Error('Gagal mengambil data dari server');
                
                const data = await response.json();
                setQuestions(data.questions || []); // Pastikan selalu array
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [subjectId]);

    // PROTEKSI: Jika loading atau error, tampilkan pesan, jangan paksa render soal
    if (loading) return <div className="p-20 text-center font-bold">Sedang memuat soal...</div>;
    if (error) return <div className="p-20 text-center text-red-500 font-bold">Error: {error}</div>;
    if (questions.length === 0) return <div className="p-20 text-center">Tidak ada soal tersedia untuk ujian ini.</div>;

    const currentQuestion = questions[currentNumber];

    // 2. Logic Timer
    useEffect(() => {
        if (timeLeft <= 0) handleFinish();
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleAnswer = (questionId, option) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
    };

    const handleFinish = async () => {
        const confirmSubmit = window.confirm("Apakah Anda yakin ingin mengakhiri ujian?");
        if (!confirmSubmit) return;

        // Format data sesuai validasi di Controller: answers.*.question_id & answers.*.answer
        const payload = {
            answers: questions.map(q => ({
                question_id: q.id,
                answer: selectedAnswers[q.id] || "" // Kosong jika tidak dijawab
            }))
        };

        try {
            const response = await fetch(`http://127.0.0.1:8001/api/exams/${subjectId}/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            alert(`Ujian selesai! Skor Anda: ${result.score}`);
            navigate('/grades');
        } catch (err) {
            alert("Gagal mengirim jawaban. Cek koneksi internet!");
        }
    };

    if (!questions || questions.length === 0) {
        return 
        <div className="p-10 text-center">Memuat soal atau terjadi kesalahan server...</div>;
    }

    // ... kode import dan logic (fetch, timer, dll)

return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header (Tetap sama) */}
        <div className="bg-indigo-700 p-4 text-white flex justify-between items-center shadow-lg">
            <h2 className="font-bold text-white">Ujian: {subjectId?.toUpperCase()}</h2>
            <div className="bg-red-500 px-4 py-1 rounded-lg font-mono font-bold">
                Sisa Waktu: {formatTime(timeLeft)}
            </div>
        </div>

        <div className="flex flex-1 p-6 gap-6">
            {/* AREA SOAL - TARUH DI SINI */}
            <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="mb-6 flex justify-between items-center text-gray-400 font-bold text-sm">
                    {/* Gunakan optional chaining agar tidak error saat questions masih null */}
                    <span>PERTANYAAN {currentNumber + 1} DARI {questions?.length || 0}</span>
                </div>
                
                {/* 1. TAMPILKAN PROMPT (TEKS SOAL) */}
                <h3 className="text-xl text-gray-800 font-medium mb-8">
                    {currentQuestion?.prompt} 
                </h3>

                {/* 2. TAMPILKAN OPTIONS (PILIHAN JAWABAN) */}
                <div className="space-y-4">
                    {currentQuestion?.options && Object.entries(currentQuestion.options).map(([key, value]) => (
                        <button
                            key={key}
                            onClick={() => handleAnswer(currentQuestion.id, key)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                                selectedAnswers[currentQuestion.id] === key 
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' 
                                : 'border-gray-100 hover:border-indigo-200 text-gray-600'
                            }`}
                        >
                            <span className="mr-4 opacity-50">{key}.</span> {value}
                        </button>
                    ))}
                </div>

                {/* Navigasi Tombol Bawah (Sebelumnya / Selanjutnya) */}
                <div className="mt-12 flex justify-between">
                    <button 
                        disabled={currentNumber === 0}
                        onClick={() => setCurrentNumber(n => n - 1)}
                        className="px-6 py-2 text-indigo-600 font-bold disabled:opacity-30"
                    >
                        ← Sebelumnya
                    </button>
                    
                    {currentNumber === questions.length - 1 ? (
                        <button onClick={handleFinish} className="bg-green-600 text-white px-8 py-2 rounded-xl font-bold">
                            Selesai Ujian
                        </button>
                    ) : (
                        <button onClick={() => setCurrentNumber(n => n + 1)} className="bg-indigo-600 text-white px-8 py-2 rounded-xl font-bold">
                            Selanjutnya →
                        </button>
                    )}
                </div>
            </div>

            {/* Navigasi Nomor Kanan (Tetap sama) */}
            {/* ... */}
        </div>
    </div>
);
};

export default ExamScene;