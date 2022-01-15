<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rate;
use Illuminate\Support\Facades\DB;
class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DB::table('rates')
        ->join('users', 'users.id', '=', 'rates.user_id')
        ->join('products', 'products.id', '=', 'rates.product_id')
        ->orderBy('rates.updated_at', 'desc')
        ->select('rates.*', 'users.*', 'products.*', 'rates.id as id',
         'rates.created_at as created_at', 'rates.updated_at as updated_at',
         'products.name as product_name', 'users.name as user_name')
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
            'product_id' => 'required|numeric',
            'user_id' => 'required|numeric',
            'comment' => 'required',
            'star' => 'required|numeric'
        ]);

        Rate::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DB::table('rates')
        ->join('users', 'users.id', '=', 'rates.user_id')
        ->where('rates.id', $id)
        ->select('rates.*', 'users.*', 'rates.id as id',
        'rates.updated_at as updated_at', 'rates.created_at as created_at')
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
            'star' => 'required|numeric',
            'comment' => 'required|string'
        ]);

        $rate = Rate::find($id);

        $rate->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $rate = Rate::find($id);

        $rate->delete();
    }
}
