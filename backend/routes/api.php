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

// =======================
// AUTH
// =======================
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// =======================
// UJIAN (dengan middleware Sanctum)
// =======================
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('exams', [ExamController::class, 'index']);
    Route::get('exams/{exam}', [ExamController::class, 'show']);
    Route::post('exams/{exam}/submit', [ExamController::class, 'submit']);

    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::apiResource('exams', AdminExamController::class);
        Route::post('exams/{exam}/questions', [AdminExamController::class, 'addQuestion']);
        Route::put('exams/{exam}/questions/{question}', [AdminExamController::class, 'updateQuestion']);
        Route::delete('exams/{exam}/questions/{question}', [AdminExamController::class, 'deleteQuestion']);
    });
});

// =======================
// CRUD DATA SEKOLAH
// =======================

// Login untuk UserController (kalau ini versi berbeda dari AuthController, sesuaikan)
Route::post('/user/login', [UserController::class, 'login']);

// CRUD Kelas
Route::get('/kelas', [KelasController::class, 'index']);
Route::post('/kelas', [KelasController::class, 'store']);
Route::put('/kelas/{id}', [KelasController::class, 'update']);
Route::delete('/kelas/{id}', [KelasController::class, 'destroy']);

// CRUD Mapel
Route::get('/mapel/{kelas_id}', [MapelController::class, 'index']);
Route::post('/mapel', [MapelController::class, 'store']);
Route::put('/mapel/{id}', [MapelController::class, 'update']);
Route::delete('/mapel/{id}', [MapelController::class, 'destroy']);

// CRUD Soal
Route::get('/soal/{mapel_id}', [SoalController::class, 'index']);
Route::post('/soal/import', [SoalController::class, 'import']);
Route::put('/soal/{id}', [SoalController::class, 'update']);
Route::delete('/soal/{id}', [SoalController::class, 'destroy']);

// Nilai
Route::post('/nilai', [NilaiController::class, 'store']);
Route::get('/nilai/{user_id}', [NilaiController::class, 'show']);
