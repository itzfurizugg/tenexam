import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

// --- SIMULASI DATA PENGGUNA YANG SUDAH LOGIN ---
const LOGGED_IN_USER_DATA_MINIMAL = {
    nisn: '123456789', 
    fullName: 'Fanny Ramadhani', 
    email: 'fanny.r@sekolah.com', 
    dateOfBirth: '', // Wajib diisi user
    contact: '',     // Wajib diisi user
    address: '',     // Wajib diisi user
    currentClass: '', // Data dari sistem
};

const AVAILABLE_CLASSES = [
    'X RPL', 'X AK-1', 'X AK-2', 'X MP', 'X MLOG', 'X BR', 'X BD',
    'XI RPL', 'XI AK-1', 'XI AK-2', 'XI MP', 'XI MLOG', 'XI BR', 'XI BD',
    'XII RPL', 'XII AK-1', 'XII AK-2', 'XII MP', 'XII MLOG', 'XII BR', 'XII BD',
];
// -------------------------------------------------------------------------

function ProfilePage() {
    const [profileData, setProfileData] = useState(LOGGED_IN_USER_DATA_MINIMAL);
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(LOGGED_IN_USER_DATA_MINIMAL);

    // Tambahkan 'currentClass' ke pengecekan wajib
    const isProfileIncomplete = !profileData.dateOfBirth || !profileData.contact || !profileData.address || !profileData.currentClass;
    
    // Handlers... (tetap sama)
    const handleEdit = () => {
        setTempData(profileData); 
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!tempData.dateOfBirth || !tempData.contact || !tempData.address || !tempData.currentClass) {
            alert("Semua field wajib diisi sebelum menyimpan!");
            return;
        }
        
        setProfileData(tempData);
        setIsEditing(false);
        alert('Data Profil Berhasil Diperbarui!');
    };

    const handleCancel = () => {
        if (isProfileIncomplete) {
            alert("Anda harus mengisi data wajib terlebih dahulu sebelum melanjutkan.");
            return;
        }
        setTempData(profileData);
        setIsEditing(false);
    };
    
    const handleChange = (e) => {
        setTempData(prev => ({ 
            ...prev, 
            [e.target.name]: e.target.value 
        }));
    };
    
    return (
        // Wrapper Utama (Layout Dashboard)
        <div className="flex h-screen w-screen overflow-hidden"> 
            <Sidebar />
            
            {/* Content Wrapper */}
            <div className="flex-1 bg-gradient-to-b from-indigo-400 to-blue-200 p-6 sm:p-10 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">👤 Profil Pengguna</h1>

                {/* --- Tombol Simpan/Batal --- */}
                <div className="flex justify-end mb-4">
                    {isEditing && (
                        <>
                            <button 
                                onClick={handleSave}
                                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition shadow-md mr-3">
                                Simpan Perubahan
                            </button>
                            {!isProfileIncomplete && (
                                <button 
                                    onClick={handleCancel}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition shadow-md">
                                    Batal
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* === 1. KARTU PROFIL DASAR === */}
                <div className="flex items-center p-6 bg-white rounded-lg shadow-md mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden mr-6 border-2 border-indigo-500">
                          
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-800">{profileData.fullName}</p>
                        <p className="text-lg text-gray-600">NISN: {profileData.nisn}</p>
                        <p className="text-md font-semibold text-indigo-600">ROLE: SISWA</p>
                    </div>
                </div>

                {/* === 2. PERINGATAN DAN TOMBOL LENGKAPI PROFIL === */}
                {isProfileIncomplete && !isEditing && (
                    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-6 flex justify-between items-center rounded-md shadow-sm">
                        <div>
                            <p className="font-bold">⚠️ Perhatian:</p>
                            <p>Data profil Anda belum lengkap. Mohon lengkapi detail pribadi Anda.</p>
                        </div>
                        <button 
                            onClick={handleEdit}
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition shadow-md whitespace-nowrap">
                            Lengkapi Profil
                        </button>
                    </div>
                )}
                
                {/* === 3. DETAIL DATA FORM (KUNCI: relative z-10) === */}
                {(!isProfileIncomplete || isEditing) && (
                    <div className={`bg-white p-6 rounded-lg shadow-md relative  ${isEditing ? 'border-2 border-indigo-300' : ''}`}>
                        <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-indigo-700">Detail Lengkap</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            
                            <ProfileField label="Nama Lengkap" value={tempData.fullName} isEditing={isEditing} name="fullName" onChange={handleChange} />
                            <ProfileField label="Email" value={tempData.email} isEditing={isEditing} name="email" onChange={handleChange} />
                            
                            {/* Data Pribadi (Wajib Dilengkapi) */}
                            <ProfileField label="Tanggal Lahir" value={tempData.dateOfBirth} isEditing={isEditing} name="dateOfBirth" onChange={handleChange} isRequired={true} />
                            <ProfileField label="Nomor Kontak" value={tempData.contact} isEditing={isEditing} name="contact" onChange={handleChange} isRequired={true} />
                            <ProfileField label="Alamat Lengkap" value={tempData.address} isEditing={isEditing} name="address" onChange={handleChange} isRequired={true} />
                            <ProfileField label="Kelas" value={tempData.currentClass} isEditing={isEditing} name="currentClass" onChange={handleChange} isRequired={true}/>
                            
                            {/* Ubah Password */}
                            <div className="sm:col-span-2 mt-2">
                                <label className="block text-sm font-medium text-gray-500">Kata Sandi</label>
                                <button className="text-sm text-red-500 hover:text-red-700 mt-1" disabled={isEditing}>Ubah Kata Sandi</button>
                            </div>
                        </div>
                        
                        {/* Tampilkan tombol Edit kecil jika profil lengkap dan tidak sedang edit */}
                        {!isEditing && !isProfileIncomplete && (
                            <div className='mt-6 text-right'>
                                <button 
                                    onClick={handleEdit}
                                    className="text-indigo-600 hover:text-indigo-800 font-medium">
                                    Edit Data Pribadi
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;

// --- KOMPONEN PEMBANTU UNTUK BARIS INPUT (REVISI FINAL: Custom Dropdown & Error State) ---
const ProfileField = ({ label, value, isEditing, name, onChange, isRequired = false }) => {
    
    // State untuk mengontrol tampilan dropdown kustom (hanya digunakan untuk Kelas)
    const [isOpen, setIsOpen] = useState(false);

    // LOGIKA KRITIS: Class border untuk error atau normal
    const errorBorderClass = isEditing && isRequired && !value 
        ? 'border-red-500 ring-red-500' // Merah jika edit & wajib & kosong
        : 'border-gray-300'; // Abu-abu jika normal

    const isClassField = name === 'currentClass';
    const isEditable = isEditing && !isClassField; 

    // Handler saat item di dropdown diklik
    const handleSelect = (cls) => {
        onChange({ target: { name, value: cls } });
        setIsOpen(false);
    };

    // ----------------------------------------------------------------------
    // Bagian 1: RENDERING DROPDOWN KELAS (CUSTOM REACT COMPONENT)
    // ----------------------------------------------------------------------
    if (isClassField && isEditing) {
        return (
            // HARUS ada relative z-50 di sini!
            <div className="relative z-50"> 
                <label className="block text-sm font-medium text-gray-500">
                    {label}
                    {/* KOREKSI: Tambahkan tanda * di sini */}
                    {isRequired && <span className="text-red-500"> *</span>}
                </label>
                
                {/* TOMBOL YANG MENJADI INPUT FIELD */}
                <button
                    type="button"
                    onClick={() => setIsOpen(prev => !prev)}
                    // KOREKSI: Terapkan errorBorderClass di sini
                    className={`mt-1 flex justify-between items-center w-full border ${errorBorderClass} rounded-md shadow-sm p-2 text-left text-gray-800 bg-white focus:ring-indigo-500 focus:border-indigo-500`}
                >
                    {value || 'Pilih Kelas'}
                    <svg className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {/* DROPDOWN LIST (Absolute Positioned) */}
                {isOpen && (
                    <div 
                        // Tambahkan z-index yang lebih tinggi lagi untuk memastikan dia muncul di atas elemen lain
                        className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-[60]"
                    >
                        {AVAILABLE_CLASSES.map(cls => (
                            <div
                                key={cls}
                                onClick={() => handleSelect(cls)}
                                className="px-3 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer"
                            >
                                {cls}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // ----------------------------------------------------------------------
    // Bagian 2: RENDERING INPUT BIASA atau Teks Statis
    // ----------------------------------------------------------------------
    return (
        <div> 
            <label className="block text-sm font-medium text-gray-500">
                {label}
                {isRequired && <span className="text-red-500"> *</span>}
            </label>
            
            {isEditable ? ( 
                <input
                    type="text"
                    value={value}
                    name={name}
                    onChange={onChange}
                    className={`mt-1 block w-full border ${errorBorderClass} rounded-md shadow-sm p-2 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500`}
                />
            ) : (
                <p className={`mt-1 text-gray-800 font-semibold ${value === '' ? 'text-gray-400 italic' : ''}`}>
                    {value || (isEditing && isRequired ? 'Wajib diisi' : '- Belum diisi -')}
                </p>
            )}
            
            {/* Hanya tampilkan nilai statis jika tidak sedang editing */}
            {(!isEditing && (name === 'nisn' || isClassField)) && (
                 <p className="mt-1 text-gray-800 font-semibold">{value}</p>
            )}
        </div>
    );
};