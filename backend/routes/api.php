<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Models\Product;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::resource('/users', UserController::class);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/users/{id}/update-password', [UserController::class, 'updatePassword']);

Route::resource('/products', ProductController::class);

Route::resource('/brands', BrandController::class);

Route::post('/cart-items', [ProductController::class, 'getCartItems']);
Route::get('/best-sellers', [ProductController::class, 'getBestSellers']);
Route::get('/products-pagination', [ProductController::class, 'getProductsPagination']);
Route::get('/products/{id}/options', [ProductController::class, 'getProductOptions']);
Route::post('/products/{id}/options', [ProductController::class, 'updateProductOptions']);
