<?php

namespace App\Http\Controllers;

use App\Models\Soal;
use Illuminate\Http\Request;
// use Maatwebsite\Excel\Facades\Excel;
// use App\Imports\SoalImport;

class SoalController extends Controller
{
    // Ambil semua soal per mapel
    public function index($mapel_id)
    {
        return response()->json(
            Soal::where('mapel_id', $mapel_id)->get()
        );
    }

    // Import soal dari Excel
    public function import(Request $request)
    {
        return response()->json(['message' => 'Fitur import Excel sedang dalam penyesuaian untuk Laravel 12'], 501);
    }

    // Update soal
    public function update(Request $request, $id)
    {
        $soal = Soal::findOrFail($id);

        $validated = $request->validate([
            'pertanyaan' => 'sometimes|string',
            'opsi_a' => 'sometimes|string',
            'opsi_b' => 'sometimes|string',
            'opsi_c' => 'sometimes|string',
            'opsi_d' => 'sometimes|string',
            'jawaban_benar' => 'sometimes|in:A,B,C,D',
        ]);

        $soal->update($validated);

        return response()->json([
            'message' => 'Soal berhasil diupdate',
            'data' => $soal
        ]);
    }

    // Hapus soal
    public function destroy($id)
    {
        $soal = Soal::findOrFail($id);
        $soal->delete();

        return response()->json([
            'message' => 'Soal berhasil dihapus'
        ]);
    }
}
