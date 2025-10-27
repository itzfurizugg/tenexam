<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasController extends Controller
{
    public function index()
    {
        return response()->json(Kelas::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kelas' => 'required|string|max:100',
        ]);

        $kelas = Kelas::create([
            'nama_kelas' => $request->nama_kelas
        ]);

        return response()->json([
            'message' => 'Kelas berhasil ditambahkan',
            'data' => $kelas
        ]);
    }

    public function update(Request $request, $id)
    {
        if ($request->isMethod('put') || $request->isMethod('patch')) {
            $request->merge($request->all());
        }

        $request->validate([
            'nama_kelas' => 'required|string|max:100',
        ]);

        $kelas = Kelas::findOrFail($id);
        $kelas->update([
            'nama_kelas' => $request->nama_kelas
        ]);

        return response()->json([
            'message' => 'Kelas berhasil diperbarui',
            'data' => $kelas
        ]);
    }

    public function destroy($id)
    {
        $kelas = Kelas::find($id);
        if (!$kelas) {
            return response()->json(['message' => 'Kelas tidak ditemukan'], 404);
        }

        $kelas->delete();

        return response()->json(['message' => 'Kelas berhasil dihapus']);
    }
}
