<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'brand_id' => $this->faker->numberBetween(1, 50),
            'name' => $this->faker->name(),
            'description' => $this->faker->text(),
            'pricing' => $this->faker->randomFloat(2, 0, 200),
            'discount' => $this->faker->randomFloat(2, 0, 100),
            'average_star' => $this->faker->randomFloat(2, 0, 5),
            'rate_count' => $this->faker->randomNumber()
        ];
    }
}
