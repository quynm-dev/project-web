<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_item_id',
        'star',
        'comment',
        'like',
    ];

    public function orderItem() {
        return $this->belongsTo(OrderItem::class);
    }
}
