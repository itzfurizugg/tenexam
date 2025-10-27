<?php

namespace App\Imports;

use App\Models\Soal;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SoalImport implements ToModel, WithHeadingRow
{
    protected $mapel_id;

    public function __construct($mapel_id)
    {
        $this->mapel_id = $mapel_id;
    }
    
    public function model(array $row)
    {
        return new Soal([
            'mapel_id' => $this->mapel_id,
            'pertanyaan' => $row['pertanyaan'],
            'opsi_a' => $row['opsi_a'],
            'opsi_b' => $row['opsi_b'],
            'opsi_c' => $row['opsi_c'],
            'opsi_d' => $row['opsi_d'],
            'jawaban_benar' => $row['jawaban_benar'],
        ]);
    }
    
}
