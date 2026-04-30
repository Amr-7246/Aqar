<?php

namespace Database\Factories;

use App\Models\Broker;
use App\Models\Location;
use App\Models\PropertyCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $purpose = fake()->randomElement(['rent', 'sale']);
        $status = fake()->randomElement(['pending', 'approved', 'rejected', 'in_negotiation', 'sold', 'rented']);

        return [
            'owner_id' => User::factory(),
            'broker_id' => Broker::factory(),
            'location_id' => Location::factory(),
            'category_id' => PropertyCategory::factory(),
            'title' => fake()->randomElement([
                'شقة فاخرة للبيع في ' . fake()->city(),
                'فيلا مميزة للإيجار في ' . fake()->city(),
                'محل تجاري بموقع مميز',
                'أرض زراعية للبيع',
                'مكتب تجاري في منطقة حيوية',
                'شقة مفروشة قريبة من المترو',
                'دوبلكس فاخر مع حديقة',
                'بنتهاوس مع إطلالة على النيل',
            ]),
            'description' => fake()->paragraphs(2, true),
            'area_m2' => fake()->numberBetween(50, 1000),
            'price' => fake()->numberBetween(500000, 10000000),
            'is_flexable_price' => fake()->boolean(30),
            'purpose' => $purpose,
            'status' => $status,
            'currency' => 'EG',
            'is_active' => fake()->boolean(80),
            'approved_at' => $status === 'approved' ? now() : null,
        ];
    }

    /**
     * Indicate that the property is for sale.
     */
    public function forSale(): static
    {
        return $this->state(fn (array $attributes) => [
            'purpose' => 'sale',
        ]);
    }

    /**
     * Indicate that the property is for rent.
     */
    public function forRent(): static
    {
        return $this->state(fn (array $attributes) => [
            'purpose' => 'rent',
        ]);
    }

    /**
     * Indicate that the property is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_at' => now(),
        ]);
    }
}