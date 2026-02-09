<?php

namespace App\Http\Controllers;

use App\Models\Soal;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SoalImport;

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
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
            'mapel_id' => 'required|exists:mapel,id'
        ]);

        // Hapus soal lama berdasarkan mapel_id
        Soal::where('mapel_id', $request->mapel_id)->delete();

        // Import soal baru
        Excel::import(new SoalImport($request->mapel_id), $request->file('file'));

        return response()->json(['message' => 'Soal lama dihapus dan soal baru berhasil diimport']);
    }
}
