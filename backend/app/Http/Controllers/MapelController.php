<?php

namespace App\Http\Controllers;

use App\Models\Mapel;
use Illuminate\Http\Request;

class MapelController extends Controller
{
    public function index($kelas_id)
    {
        $mapel = Mapel::where('kelas_id', $kelas_id)->get();
        return response()->json($mapel);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_mapel' => 'required|string|max:100',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        $mapel = Mapel::create([
            'nama_mapel' => $request->nama_mapel,
            'kelas_id' => $request->kelas_id
        ]);

        return response()->json([
            'message' => 'Mapel berhasil ditambahkan',
            'data' => $mapel
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_mapel' => 'required|string|max:100',
            'kelas_id' => 'required|exists:kelas,id',
        ]);

        $mapel = Mapel::findOrFail($id);
        $mapel->update([
            'nama_mapel' => $request->nama_mapel,
            'kelas_id' => $request->kelas_id
        ]);

        return response()->json([
            'message' => 'Mapel berhasil diperbarui',
            'data' => $mapel
        ]);
    }

    public function destroy($id)
    {
        $mapel = Mapel::find($id);
        if (!$mapel) {
            return response()->json(['message' => 'Mapel tidak ditemukan'], 404);
        }

        $mapel->delete();

        return response()->json(['message' => 'Mapel berhasil dihapus']);
    }
}
