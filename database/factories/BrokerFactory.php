<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Broker>
 */
class BrokerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'license_number' => 'BROKER-' . fake()->unique()->numberBetween(10000, 99999),
            'commission_rate' => fake()->randomFloat(2, 1.00, 5.00),
            'specialization' => fake()->randomElement(['عقارات سكنية', 'عقارات تجارية', 'عقارات صناعية', 'عقارات زراعية', 'عقارات ساحلية']),
            'is_active' => fake()->boolean(90), // 90% chance of being active
        ];
    }
}