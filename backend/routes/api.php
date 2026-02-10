<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\Admin\ExamController as AdminExamController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\MapelController;
use App\Http\Controllers\SoalController;
use App\Http\Controllers\NilaiController;
// ... baris kode lainnya ...

// =======================
// PUBLIC ROUTES (Tanpa Token)
// =======================
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/grades', [NilaiController::class, 'getUserGrades']);
    Route::post('/exams/submit', [NilaiController::class, 'submitExam']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Tambahkan ini supaya React bisa ambil data tanpa error Unauthenticated
// Tambahkan ini di bagian PUBLIC ROUTES (Tanpa Token) agar mudah diakses siswa
Route::get('/admin/kelas', [KelasController::class, 'index']);
Route::get('/admin/mapel/{kelas_id}', [MapelController::class, 'index']);
Route::get('/admin/soal/{mapel_id}', [SoalController::class, 'index']);


    // =======================
    // AUTHENTICATED ROUTES (Tetap di sini untuk fitur penting)
// =======================
Route::middleware('auth:sanctum')->group(function () {
    // Biarkan fitur simpan/hapus tetap di sini agar aman
    Route::post('logout', [AuthController::class, 'logout']);

    Route::prefix('admin')->middleware('role:admin')->group(function () {
        // Hapus atau komentar baris GET yang sudah dipindah ke atas
        // Route::get('/kelas', [KelasController::class, 'index']); <-- Komentar ini
        // Route::get('/mapel/{kelas_id}', [MapelController::class, 'index']); <-- Komentar ini

        // Fitur Store, Update, Delete tetap di bawah proteksi
        Route::post('/kelas', [KelasController::class, 'store']);
        Route::post('/mapel', [MapelController::class, 'store']);
        Route::post('/soal/import', [SoalController::class, 'import']);
        Route::post('/exams/submit', [NilaiController::class, 'submitExam']);
        Route::get('/user/grades', [NilaiController::class, 'getUserGrades']);
    });
});
