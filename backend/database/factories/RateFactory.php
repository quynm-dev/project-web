<?php

namespace Database\Factories;

use App\Models\Rate;
use Illuminate\Database\Eloquent\Factories\Factory;

class RateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Rate::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'order_item_id' => $this->faker->numberBetween(1, 50),
            'star' => $this->faker->randomNumber(),
            'comment' => $this->faker->text(),
            'like' => $this->faker->randomNumber()
        ];
    }
}
