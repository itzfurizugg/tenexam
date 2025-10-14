<?php

namespace App\Http\Controllers;

use app\Models\Exam;
use app\Models\Question;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index()
    {
        return Exam::all();
    }

    public function show(Exam $exam)
    {
        $questions = $exam->questions()->get()->map(function($q){
            return [
                'id' => $q->id,
                'prompt' => $q->prompt,
                'options' => $q->options,
                'score' => $q->score,
            ];
        });

        return response()->json([
            'exam' => [
                'id' => $exam->id,
                'title' => $exam->title,
                'duration' => $exam->duration_minutes,
            ],
            'questions' => $questions,
        ]);
    }

    public function submit(Request $request, Exam $exam)
    {
        $payload = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|integer',
            'answers.*.answer' => 'required',
        ]);

        $score = 0;
        foreach ($payload['answers'] as $ans) {
            $q = Question::find($ans['question_id']);
            if (!$q) continue;
            if ((string) $q->answer === (string) $ans['answer']) {
                $score += $q->score;
            }
        }

        return response()->json(['score' => $score]);
    }
}
