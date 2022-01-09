<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\OrderItem;
use App\Models\Option;
use Illuminate\Support\Facades\DB;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Order::all();
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
            'user_id' => 'required',
            'phone_number' => 'required|regex:/(0)[0-9]{9}/',
            'address' => 'required|string',
        ]);

        $name = User::find((int)($request->input('user_id')));

        $order = Order::create($request->all() + ['name' => $name->name]);

        return response([
            'order_id' => $order->id,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $orders = DB::table('orders')
        ->where('orders.id', $id)
        ->join('order_items', 'order_items.order_id', '=', 'orders.id')
        ->join('option_order_item', 'order_items.id', '=', 'option_order_item.order_item_id')
        ->join('options', 'options.id', '=', 'option_order_item.option_id')
        ->join('products', 'products.id', '=', 'options.product_id')
        ->select('orders.*', 'order_items.*', 'option_order_item.*','options.*', 'products.*' ,
        'orders.name as name', 'products.name as product_name', 'order_items.quantity as quantity')
        ->get();

        return $orders;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order = Order::find($id);

        $order->delete();
    }

    public function createOrderItems(Request $request, $id) {
        $order = Order::find($id);

        $shoppingCart = json_decode($request->input('shoppingCart'));

        foreach($shoppingCart as $cartItem) {
            $orderItem = OrderItem::create([
                'order_id' => $id,
                'quantity' => $cartItem->quantity,
                'pricing' => $cartItem->quantity * $cartItem->pricing,
            ]);

            $option = Option::where('product_id', $cartItem->productId)->where('size', $cartItem->size)->first();

            $option->orderItems()->sync([$orderItem->id]);

            DB::table('options')->where('product_id', $cartItem->productId)
            ->where('size', $cartItem->size)
            ->decrement('quantity', $cartItem->quantity);
        }
    }
}
