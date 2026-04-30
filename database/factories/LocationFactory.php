<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\Government;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'city_id' => City::factory(),
            'government_id' => Government::factory(),
            'country' => 'egypt',
            'name' => fake()->randomElement(['مدينة نصر', 'هليوبوليس', 'المعادي', 'الزمالك', 'الدقي', 'الهرم', 'الجيزة', 'سبورتنج', 'ستانلي', 'المنتزه', 'المنصورة', 'طنطا', 'الزقازيق', 'أسيوط', 'سوهاج']),
            'address' => fake()->streetAddress() . ', ' . fake()->city(),
            'location' => null, // For POINT type, would need special handling
        ];
    }
}