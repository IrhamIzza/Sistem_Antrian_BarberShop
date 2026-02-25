<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Barber;

class BarberSeeder extends Seeder
{
    public function run(): void
    {
        Barber::insert([
            ['name' => 'Andi', 'is_active' => 1],
            ['name' => 'Budi', 'is_active' => 1],
            ['name' => 'Rizky', 'is_active' => 1],
            ['name' => 'Dimas', 'is_active' => 0],
        ]);
    }
}