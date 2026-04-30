<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attribute>
 */
class AttributeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $attributes = [
            'عدد الغرف' => 'integer',
            'عدد الحمامات' => 'integer',
            'مساحة الأرض' => 'integer',
            'سنة البناء' => 'integer',
            'عدد مواقف السيارات' => 'integer',
            'الطابق' => 'integer',
            'عدد المصاعد' => 'integer',
            'الإطلالة' => 'string',
            'نوع التشطيب' => 'string',
            'المرافق' => 'string',
        ];

        $name = fake()->randomElement(array_keys($attributes));

        return [
            'name' => $name,
            'type' => $attributes[$name],
        ];
    }
}