<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\RateController;

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

Route::resource('/orders', OrderController::class);

Route::resource('/order-items', OrderItemController::class);

Route::resource('/options', OptionController::class);

Route::resource('rates', RateController::class);

Route::post('/cart-items', [ProductController::class, 'getCartItems']);
Route::get('/new-products', [ProductController::class, 'getNewProducts']);
Route::get('/products/{id}/related-products', [ProductController::class, 'getRelatedProducts']);
Route::get('/products-pagination', [ProductController::class, 'getProductsPagination']);
Route::get('/products/{id}/options', [ProductController::class, 'getProductOptions']);
Route::get('/products/{id}/rates', [ProductController::class, 'getProductRates']);
Route::get('/search', [ProductController::class, 'search']);
Route::post('/orders/{id}/order-items', [OrderController::class, 'createOrderItems']);
Route::get('users/{id}/orders', [UserController::class, 'getOrders']);
Route::get('/cart-item/option', [OptionController::class, 'getCartItemOption']);

