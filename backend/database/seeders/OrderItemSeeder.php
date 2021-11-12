<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\OrderItem;
use App\Models\Option;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderItem::factory()->count(50)->create();

        OrderItem::all()->each(function ($orderItem) {
            $orderItem->options()->sync(
                Option::all()->random(2)->pluck('id')->toArray()
            );
        });
    }
}
