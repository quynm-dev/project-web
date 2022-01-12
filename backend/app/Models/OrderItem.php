<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'quantity',
        'pricing',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function options() {
        return $this->belongsToMany(Option::class);
    }

    public function order() {
        return $this->belongsTo(Order::class);
    }
}
