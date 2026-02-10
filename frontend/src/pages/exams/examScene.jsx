import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

const ExamScene = () => {
    const [classList, setClassList] = useState([]); 
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isExamStarted, setIsExamStarted] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(false);

    // 1. Ambil daftar kelas dari API
    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            try {
                const res = await fetch("http://127.0.0.1:8001/api/admin/kelas");
                const data = await res.json();
                setClassList(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Gagal load kelas:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    // 2. Ambil Mapel berdasarkan Kelas
    const fetchSubjects = async (classId) => {
        setLoading(true);
        setSelectedClass(classId);
        try {
            const res = await fetch(`http://127.0.0.1:8001/api/admin/mapel/${classId}`);
            const data = await res.json();
            setSubjects(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Gagal load mapel:", err);
        } finally {
            setLoading(false);
        }
    };

    // 3. Ambil Soal berdasarkan Mapel
    const startExam = async (subject) => {
        setLoading(true);
        setSelectedSubject(subject);
        try {
            const res = await fetch(`http://127.0.0.1:8001/api/admin/soal/${subject.id}`);
            const data = await res.json();
            setQuestions(Array.isArray(data) ? data : []);
            setIsExamStarted(true);
        } catch (err) {
            alert("Error saat memuat soal.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (questionId, option) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleSubmitExam = () => {
        if (!confirm("Yakin ingin mengumpulkan?")) return;
        alert("Jawaban terkirim!");
        window.location.reload();
    };

    return (
        <div className="flex h-screen w-screen bg-gray-50 text-black">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b py-4 px-8 flex justify-between items-center shadow-sm">
                    <h2 className="text-xl font-bold uppercase">
                        {isExamStarted ? `Ujian: ${selectedSubject?.nama_mapel}` : "Ujian Online"}
                    </h2>
                    {(selectedClass || isExamStarted) && (
                        <button 
                            onClick={() => isExamStarted ? setIsExamStarted(false) : setSelectedClass(null)}
                            className="bg-gray-200 px-4 py-2 rounded-lg font-bold text-sm"
                        >
                            ← Kembali
                        </button>
                    )}
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {/* TAMPILAN LOADING */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                            <p className="text-gray-500 font-medium">Sedang mengambil data...</p>
                        </div>
                    )}

                    {!loading && (
                        <>
                            {/* STEP 1: PILIH KELAS */}
                            {!selectedClass && !isExamStarted && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {classList.map((item) => (
                                        <div key={item.id} onClick={() => fetchSubjects(item.id)} 
                                             className="bg-white p-10 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-500 cursor-pointer text-center transition-all">
                                            <h3 className="text-2xl font-black uppercase">{item.nama_kelas}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* STEP 2: PILIH MAPEL */}
                            {selectedClass && !isExamStarted && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {subjects.map(sub => (
                                        <div key={sub.id} onClick={() => startExam(sub)}
                                             className="bg-white p-6 rounded-xl border shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-all text-center font-bold uppercase">
                                            {sub.nama_mapel}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* STEP 3: SOAL UJIAN */}
                            {isExamStarted && (
                                <div className="max-w-3xl mx-auto space-y-8 pb-20">
                                    {questions.map((q, idx) => (
                                        <div key={q.id} className="bg-white p-8 rounded-3xl shadow-sm border">
                                            <p className="text-sm font-bold text-blue-500 mb-2 uppercase">Soal {idx + 1}</p>
                                            <p className="text-xl font-medium mb-6">{q.pertanyaan}</p>
                                            <div className="space-y-3">
                                                {['a', 'b', 'c', 'd'].map((opt) => (
                                                    <label key={opt} className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${userAnswers[q.id] === opt.toUpperCase() ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'}`}>
                                                        <input type="radio" className="hidden" onChange={() => handleAnswer(q.id, opt.toUpperCase())} />
                                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${userAnswers[q.id] === opt.toUpperCase() ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                                            {opt.toUpperCase()}
                                                        </span>
                                                        <span className="text-lg">{q[`opsi_${opt}`]}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={handleSubmitExam} className="w-full bg-green-600 text-white py-4 rounded-3xl font-black text-xl shadow-lg hover:bg-green-700">
                                        SUBMIT JAWABAN
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ExamScene;