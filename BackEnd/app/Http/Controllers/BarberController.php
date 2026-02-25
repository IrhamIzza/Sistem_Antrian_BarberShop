<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Barber;
class BarberController extends Controller
{
    public function index()
    {
        return Barber::where('is_active', true)->get();
    }
}
