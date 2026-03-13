<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'SkiBoom',
            'email' => 'admin@skiboom.ge',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'language_pref' => 'en',
            'email_verified_at' => now(),
        ]);

        User::create([
            'first_name' => 'Staff',
            'last_name' => 'Member',
            'email' => 'staff@skiboom.ge',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'language_pref' => 'en',
            'email_verified_at' => now(),
        ]);
    }
}
