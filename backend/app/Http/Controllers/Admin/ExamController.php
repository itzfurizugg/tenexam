<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Question;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    // Daftar semua ujian
    public function index()
    {
        return Exam::with('questions')->get();
    }

    // Buat ujian baru
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date',
        ]);

        $exam = Exam::create($data);
        return response()->json($exam, 201);
    }

    // Lihat detail ujian
    public function show(Exam $exam)
    {
        return $exam->load('questions');
    }

    // Update ujian
    public function update(Request $request, Exam $exam)
    {
        $data = $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'duration_minutes' => 'sometimes|integer',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date',
        ]);

        $exam->update($data);
        return response()->json($exam);
    }

    // Hapus ujian
    public function destroy(Exam $exam)
    {
        $exam->delete();
        return response()->json(null, 204);
    }

    // Tambah soal ke ujian
    public function addQuestion(Request $request, Exam $exam)
    {
        $data = $request->validate([
            'prompt' => 'required|string',
            'options' => 'required|array',
            'answer' => 'required|string',
            'score' => 'required|integer',
        ]);

        $question = $exam->questions()->create($data);
        return response()->json($question, 201);
    }

    // Update soal dalam ujian
    public function updateQuestion(Request $request, Exam $exam, Question $question)
    {
        $data = $request->validate([
            'prompt' => 'sometimes|string',
            'options' => 'sometimes|array',
            'answer' => 'sometimes|string',
            'score' => 'sometimes|integer',
        ]);

        $question->update($data);
        return response()->json($question);
    }

    // Hapus soal dari ujian
    public function deleteQuestion(Exam $exam, Question $question)
    {
        $question->delete();
        return response()->json(null, 204);
    }
}