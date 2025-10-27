<?php

namespace App\Http\Controllers;

use App\Models\Nilai;
use Illuminate\Http\Request;

class NilaiController extends Controller
{
    public function store(Request $request)
    {
        $nilai = Nilai::create([
            'user_id' => $request->user_id,
            'mapel_id' => $request->mapel_id,
            'skor' => $request->skor
        ]);

        return response()->json([
            'message' => 'Nilai berhasil disimpan',
            'data' => $nilai
        ]);
    }

    public function show($user_id)
    {
        return response()->json(Nilai::where('user_id', $user_id)->with('mapel')->get());
    }
}
