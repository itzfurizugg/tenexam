<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\Admin\ExamController as AdminExamController;

// Auth
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Protected routes
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