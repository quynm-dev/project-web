<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Brand;
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
        ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:products',
            'brand_name' => 'required|string',
            'description' => 'required|string',
            'pricing' => 'required',
            'discount' => 'required',
            'product_image_url' => 'required|string'
        ]);

        $brand = Brand::where('name', $request->brand_name)->first();

        Product::create($request->all() + ['brand_id' => $brand->id]);
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
        $request->validate([
            'name' => 'required|string|unique:products,name,'.$product->id,
            'brand_name' => 'required|string',
            'description' => 'required|string',
            'pricing' => 'required',
            'discount' => 'required',
            'product_image_url' => 'required|string'
        ]);

        $product->update($request->all());

        $brand = Brand::where('name', $request->brand_name)->first();
        $product->brand_id = $brand->id;
        $product->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }

    public function getCartItems(Request $request) {
        return DB::table('products')
        ->join('brands', 'products.brand_id', 'brands.id')
        ->select('products.*', 'brands.name as brand_name')
        ->whereIn('products.id', $request->input('cartItemsId'))
        ->get();
    }

    public function getNewProducts() {
        return DB::table('products')
        ->join('brands', 'products.brand_id', 'brands.id')
        ->select('products.*', 'brands.name as brand_name', 'products.created_at as created_at')
        ->orderBy('products.created_at', 'desc')
        ->limit(8)
        ->get();
    }

    public function getProductsPagination() {
        return DB::table('products')
        ->join('brands', 'products.brand_id', 'brands.id')
        ->select('products.*', 'brands.name as brand_name')
        ->paginate(9)
        ->all();
    }

    public function getProductOptions($id) {
        return DB::table('options')->where('product_id', $id)->get();
    }

    public function search(Request $request) {
        return DB::table('products')
        ->where('name', 'like', '%' . $request->input('product-name') . '%')
        ->get();
    }

    public function getProductRates($id) {
        return DB::table('rates')
        ->join('users', 'users.id', '=', 'rates.user_id')
        ->where('product_id', '=', $id)
        ->orderBy('rates.created_at', 'desc')
        ->select('rates.*', 'users.*', 'rates.id as id', 'rates.created_at as created_at',
        'rates.updated_at as updated_at')
        ->get();
    }

    public function getRelatedProducts($id) {
        $product = Product::find($id);

        return DB::table('products')
        ->where('brand_id', '=', $product->brand_id)
        ->where('id','<>', $id)
        ->get();
    }
}
