<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Option;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('options')
        ->join('products', 'products.id', '=', 'options.product_id')
        ->select('options.*', 'products.*', 'options.id as id')
        ->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'size' => 'required|numeric',
            'quantity' => 'required|numeric',
            'product_name' => 'required',
        ]);

        $product = DB::table('products')->where('name', '=', $request->input('product_name'))->first();

        Option::create($request->all() + ['product_id' => $product->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DB::table('options')
        ->where('options.id', $id)
        ->join('products', 'products.id', '=', 'options.product_id')
        ->select('options.*', 'products.*', 'options.id as id')
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|numeric'
        ]);

        $option = Option::find($id);

        $option->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $option = Option::find($id);

        $option->delete();
    }

    public function getCartItemOption(Request $request) {
        $option = DB::table('options')
        ->where('product_id', '=', $request->input('product_id'))
        ->where('size', '=', $request->input('size'))
        ->first();

        return $option;
    }
}
