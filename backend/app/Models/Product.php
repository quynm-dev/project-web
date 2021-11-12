<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id',
        'name',
        'description',
        'pricing',
        'discount',
        'average_star',
        'rate_count',
    ];

    public function options() {
        return $this->hasMany(Option::class);
    }

    public function brand() {
        return $this->belongsTo(Brand::class);
    }
}
