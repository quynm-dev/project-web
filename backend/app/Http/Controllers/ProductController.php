<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('products')
        ->join('brands', 'products.brand_id', 'brands.id')
        ->select('products.*', 'brands.name as brand_name')
        ->paginate(9)
        ->all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return "product create page";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(auth()->user()->can('create', Product::class)) {
            $product = Product::create($request->all());

            return response()->json($product, 201);
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DB::table('products')
        ->join('brands', 'products.brand_id', 'brands.id')
        ->select('products.*', 'brands.name as brand_name')
        ->where('products.id', $id)
        ->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return "product edit page";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        if(auth()->user()->can('update', $product)) {
            $product->update($request->all());

            return response()->json($product, 200);
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if(auth()->user()->can('delete', $product)) {
            $product->options()->delete();
            $product->delete();

            return response()->json(null, 204);
        }

        return response()->json(['message' => 'Forbidden'], 403);
    }

    public function getCartItems(Request $request) {
        return DB::table('products')
        ->join('brands', 'products.brand_id', 'brands.id')
        ->select('products.*', 'brands.name as brand_name')
        ->whereIn('products.id', $request->input('cartItemsId'))
        ->get();
    }

    public function getBestSellers() {
        return DB::table('products')
        ->join('brands', 'products.brand_id', 'brands.id')
        ->select('products.*', 'brands.name as brand_name')
        ->orderBy('rate_count', 'desc')
        ->limit(8)
        ->get();
    }
}
