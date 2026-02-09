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
// AUTH ROUTES (Public)
// =======================
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// =======================
// AUTHENTICATED ROUTES
// =======================
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth related
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    // =======================
    // EXAM ROUTES (Student)
    // =======================
    Route::prefix('exams')->group(function () {
        Route::get('/', [ExamController::class, 'index']);
        Route::get('/{exam}', [ExamController::class, 'show']);
        Route::post('/{exam}/start', [ExamController::class, 'start']);
        Route::post('/{exam}/submit', [ExamController::class, 'submit']);
        
        // Results
        Route::get('/results/history', [ExamController::class, 'results']);
        Route::get('/results/{userExamId}', [ExamController::class, 'resultDetail']);
    });

    // =======================
    // ADMIN ROUTES
    // =======================
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        // Exam Management
        Route::apiResource('exams', AdminExamController::class);
        Route::post('exams/{exam}/questions', [AdminExamController::class, 'addQuestion']);
        Route::put('exams/{exam}/questions/{question}', [AdminExamController::class, 'updateQuestion']);
        Route::delete('exams/{exam}/questions/{question}', [AdminExamController::class, 'deleteQuestion']);
        
        // Kelas Management
        Route::get('/kelas', [KelasController::class, 'index']);
        Route::post('/kelas', [KelasController::class, 'store']);
        Route::put('/kelas/{id}', [KelasController::class, 'update']);
        Route::delete('/kelas/{id}', [KelasController::class, 'destroy']);
        
        // Mapel Management
        Route::get('/mapel/{kelas_id}', [MapelController::class, 'index']);
        Route::post('/mapel', [MapelController::class, 'store']);
        Route::put('/mapel/{id}', [MapelController::class, 'update']);
        Route::delete('/mapel/{id}', [MapelController::class, 'destroy']);
        
        // Soal Management
        Route::get('/soal/{mapel_id}', [SoalController::class, 'index']);
        Route::post('/soal/import', [SoalController::class, 'import']);
        Route::put('/soal/{id}', [SoalController::class, 'update']);
        Route::delete('/soal/{id}', [SoalController::class, 'destroy']);
        
        // Nilai Management
        Route::post('/nilai', [NilaiController::class, 'store']);
        Route::get('/nilai/{user_id}', [NilaiController::class, 'show']);
    });
});

// =======================
// LEGACY ROUTES (Optional - Consider removing if not needed)
// =======================
// Route::post('/user/login', [UserController::class, 'login']);

