<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarberController;
use App\Http\Controllers\ReservationController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// PUBLIC (Customer)
Route::get('/barbers', [BarberController::class, 'index']);
Route::post('/reservations', [ReservationController::class, 'store']);

// ADMIN (Protected)
Route::post('/admin/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/reservations', [ReservationController::class, 'index']);
    Route::post('/admin/logout', [AuthController::class, 'logout']);
});