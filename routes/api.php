<?php

use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\UserCollectionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('media', MediaController::class)->parameters([
    'media' => 'media',
]);

Route::get('/users/{user}/collection', [UserCollectionController::class, 'index']);
Route::post('/users/{user}/collection', [UserCollectionController::class, 'attach']);
Route::delete('/users/{user}/collection/{media}', [UserCollectionController::class, 'detach']);
