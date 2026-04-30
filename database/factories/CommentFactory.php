<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'property_id' => Property::factory(),
            'user_id' => User::factory(),
            'comment' => fake()->randomElement([
                'هذه العقار يبدو ممتازاً وأحب الموقع.',
                'أريد معرفة المزيد عن التفاصيل والسعر.',
                'هل يمكن ترتيب زيارة؟',
                'العقار جميل ولكن أحتاج لمعرفة المرافق المتاحة.',
                'سعر مناسب جداً لهذه المنطقة.',
                'أتمنى لو كان هناك صور أكثر.',
            ]),
        ];
    }
}