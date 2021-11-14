<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'size',
        'quantity',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function orderItems() {
        return $this->belongsToMany(OrderItem::class);
    }
}
