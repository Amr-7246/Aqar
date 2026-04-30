<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\City>
 */
class CityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['القاهرة', 'الجيزة', 'الإسكندرية', 'طنطا', 'المنصورة', 'الزقازيق', 'دمنهور', 'أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'الغردقة', 'شرم الشيخ', 'مرسى مطروح']),
            'country' => 'مصر',
        ];
    }
}