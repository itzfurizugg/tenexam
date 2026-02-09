<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Kelas;
use App\Models\Mapel;
use App\Models\Exam;
use App\Models\Question;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::create([
            'name' => 'Admin CBT',
            'username' => 'admin',
            'email' => 'admin@cbt.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Create Sample Kelas
        $kelas10 = Kelas::create(['nama_kelas' => 'Kelas 10']);
        $kelas11 = Kelas::create(['nama_kelas' => 'Kelas 11']);
        $kelas12 = Kelas::create(['nama_kelas' => 'Kelas 12']);

        // Create Sample Students
        User::create([
            'name' => 'Budi Santoso',
            'username' => 'budi',
            'email' => 'budi@student.com',
            'password' => Hash::make('password'),
            'role' => 'siswa',
            'kelas_id' => $kelas10->id,
        ]);

        User::create([
            'name' => 'Siti Aminah',
            'username' => 'siti',
            'email' => 'siti@student.com',
            'password' => Hash::make('password'),
            'role' => 'siswa',
            'kelas_id' => $kelas11->id,
        ]);

        // Create Sample Mapel
        $matematika = Mapel::create([
            'kelas_id' => $kelas10->id,
            'nama_mapel' => 'Matematika',
        ]);

        $fisika = Mapel::create([
            'kelas_id' => $kelas10->id,
            'nama_mapel' => 'Fisika',
        ]);

        // Create Sample Exam
        $exam = Exam::create([
            'title' => 'Ujian Matematika Semester 1',
            'description' => 'Ujian tengah semester mata pelajaran matematika',
            'duration_minutes' => 90,
            'start_at' => now(),
            'end_at' => now()->addDays(7),
        ]);

        // Create Sample Questions
        Question::create([
            'exam_id' => $exam->id,
            'prompt' => 'Berapa hasil dari 2 + 2?',
            'options' => ['2', '3', '4', '5'],
            'answer' => '4',
            'score' => 10,
        ]);

        Question::create([
            'exam_id' => $exam->id,
            'prompt' => 'Berapa hasil dari 5 x 3?',
            'options' => ['10', '15', '20', '25'],
            'answer' => '15',
            'score' => 10,
        ]);

        Question::create([
            'exam_id' => $exam->id,
            'prompt' => 'Berapa hasil dari 100 / 4?',
            'options' => ['20', '25', '30', '35'],
            'answer' => '25',
            'score' => 10,
        ]);
    }
}
