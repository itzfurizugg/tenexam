import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import * as XLSX from 'xlsx';

const ManageQuestions = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [existingSoal, setExistingSoal] = useState([]); // Soal dari DB
    const [previewSoal, setPreviewSoal] = useState([]);   // Soal dari Excel
    const [loading, setLoading] = useState(false);

    // Form State untuk Tambah Manual
    const [manualSoal, setManualSoal] = useState({
        pertanyaan: '', a: '', b: '', c: '', d: '', kunci: 'A'
    });

    // 1. Fetch Mapel
    const fetchSubjects = async (classId) => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:8001/api/admin/mapel/${classId}`);
            const data = await res.json();
            setSubjects(Array.isArray(data) ? data : []);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    // 2. Fetch Soal yang sudah ada di DB
    const fetchExistingSoal = async (mapelId) => {
        try {
            const res = await fetch(`http://127.0.0.1:8001/api/admin/soal/${mapelId}`);
            const data = await res.json();
            setExistingSoal(data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        if (selectedClass) fetchSubjects(selectedClass.id);
    }, [selectedClass]);

    useEffect(() => {
        if (selectedSubject) fetchExistingSoal(selectedSubject.id);
    }, [selectedSubject]);

    // 3. Handlers
    const handleImportExcel = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const workbook = XLSX.read(new Uint8Array(event.target.result), { type: 'array' });
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            setPreviewSoal(json);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleSaveBulk = async () => {
        const response = await fetch('http://127.0.0.1:8001/api/admin/soal/bulk-store', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mapel_id: selectedSubject.id, data: previewSoal })
        });
        if (response.ok) {
            alert("Berhasil Import!");
            setPreviewSoal([]);
            fetchExistingSoal(selectedSubject.id);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Hapus soal ini?")) return;
        await fetch(`http://127.0.0.1:8001/api/admin/soal/${id}`, { method: 'DELETE' });
        fetchExistingSoal(selectedSubject.id);
    };

    const handleAddManual = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8001/api/admin/soal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mapel_id: selectedSubject.id,
                pertanyaan: manualSoal.pertanyaan,
                opsi_a: manualSoal.a, opsi_b: manualSoal.b, opsi_c: manualSoal.c, opsi_d: manualSoal.d,
                jawaban_benar: manualSoal.kunci
            })
        });
        if (response.ok) {
            setManualSoal({ pertanyaan: '', a: '', b: '', c: '', d: '', kunci: 'A' });
            fetchExistingSoal(selectedSubject.id);
        }
    };

    return (
        <div className="flex h-screen w-screen bg-gray-100 text-black">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b py-4 px-8 flex justify-between shadow-sm">
                    <h2 className="text-xl font-bold uppercase">
                        {selectedSubject ? `Kelola: ${selectedSubject.nama_mapel}` : "Manajemen Soal"}
                    </h2>
                    {selectedClass && (
                        <button onClick={() => selectedSubject ? setSelectedSubject(null) : setSelectedClass(null)} className="bg-gray-200 px-4 py-2 rounded-lg font-bold">← Kembali</button>
                    )}
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {/* STEP 1 & 2: Pilih Kelas & Mapel (Sama seperti kode sebelumnya) */}
                    {!selectedClass && (
                        <div className="grid grid-cols-3 gap-6">
                            {classList.map(cls => (
                                <div key={cls.id} onClick={() => setSelectedClass(cls)} className="bg-white p-10 rounded-2xl shadow-md cursor-pointer hover:border-blue-500 border-2 border-transparent transition-all text-center">
                                    <h3 className="text-3xl font-black">KELAS {cls.label}</h3>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedClass && !selectedSubject && (
                        <div className="grid grid-cols-4 gap-4">
                            {subjects.map(sub => (
                                <div key={sub.id} onClick={() => setSelectedSubject(sub)} className="bg-white p-6 rounded-xl shadow-sm border cursor-pointer hover:bg-blue-50 text-center uppercase font-bold">
                                    {sub.nama_mapel}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* STEP 3: KELOLA SOAL */}
                    {selectedSubject && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            
                            {/* 1. LIST SOAL TERSEDIA */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold">Soal Tersedia di Database:</h3>
                                {existingSoal.length === 0 && <p className="text-gray-400 italic">Belum ada soal.</p>}
                                {existingSoal.map((s, idx) => (
                                    <div key={s.id} className="bg-white p-4 rounded-xl shadow-sm border group relative">
                                        <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="text-blue-500 font-bold text-sm">Edit</button>
                                            <button onClick={() => handleDelete(s.id)} className="text-red-500 font-bold text-sm">Hapus</button>
                                        </div>
                                        <p className="font-bold text-blue-600">No. {idx + 1}</p>
                                        <p className="mb-2">{s.pertanyaan}</p>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                            <p>A: {s.opsi_a}</p> <p>B: {s.opsi_b}</p>
                                            <p>C: {s.opsi_c}</p> <p>D: {s.opsi_d}</p>
                                        </div>
                                        <p className="mt-2 font-bold text-green-600">Kunci: {s.jawaban_benar}</p>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-gray-300" />

                            {/* 2. IMPORT EXCEL SECTION */}
                            <div className="bg-green-50 border-2 border-dashed border-green-500 p-6 rounded-2xl text-center">
                                <h4 className="font-bold mb-2">Import Banyak Soal (Excel)</h4>
                                <input type="file" onChange={handleImportExcel} className="mb-4 block w-full text-sm" />
                                {previewSoal.length > 0 && (
                                    <button onClick={handleSaveBulk} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">Simpan {previewSoal.length} Soal Excel</button>
                                )}
                            </div>

                            {/* 3. TAMBAH MANUAL SECTION */}
                            <form onSubmit={handleAddManual} className="bg-white p-6 rounded-2xl shadow-md border space-y-4">
                                <h3 className="font-bold text-xl text-blue-600 border-b pb-2">Tambah Soal Baru</h3>
                                <textarea 
                                    value={manualSoal.pertanyaan} 
                                    onChange={e => setManualSoal({...manualSoal, pertanyaan: e.target.value})}
                                    className="w-full border p-3 rounded-lg" placeholder="Tulis Pertanyaan..." required 
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Opsi A" className="border p-2 rounded" value={manualSoal.a} onChange={e => setManualSoal({...manualSoal, a: e.target.value})} required />
                                    <input type="text" placeholder="Opsi B" className="border p-2 rounded" value={manualSoal.b} onChange={e => setManualSoal({...manualSoal, b: e.target.value})} required />
                                    <input type="text" placeholder="Opsi C" className="border p-2 rounded" value={manualSoal.c} onChange={e => setManualSoal({...manualSoal, c: e.target.value})} required />
                                    <input type="text" placeholder="Opsi D" className="border p-2 rounded" value={manualSoal.d} onChange={e => setManualSoal({...manualSoal, d: e.target.value})} required />
                                </div>
                                <div className="flex justify-between items-center">
                                    <select className="border p-2 rounded font-bold" value={manualSoal.kunci} onChange={e => setManualSoal({...manualSoal, kunci: e.target.value})}>
                                        <option value="A">Kunci A</option> <option value="B">Kunci B</option>
                                        <option value="C">Kunci C</option> <option value="D">Kunci D</option>
                                    </select>
                                    <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold">TAMBAH KE DAFTAR</button>
                                </div>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

const classList = [{ id: 1, label: "X" }, { id: 2, label: "XI" }, { id: 3, label: "XII" }];

export default ManageQuestions;