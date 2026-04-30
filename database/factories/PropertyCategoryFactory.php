<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyCategory>
 */
class PropertyCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'شقة' => 'عقار سكني في مبنى سكني',
            'فيلا' => 'فيلا فاخرة مع حديقة',
            'أرض' => 'قطعة أرض لبناء أو استثمار',
            'مكتب' => 'عقار تجاري مكتبي',
            'محل تجاري' => 'مساحة تجارية للبيع أو للإيجار',
            'شقة مفروشة' => 'شقة مجهزة بالأثاث',
            'دوبلكس' => 'شقة مزدوجة الطابق',
            'بنتهاوس' => 'شقة في الطابق الأخير',
            'مزرعة' => 'أرض زراعية',
            'مستودع' => 'مساحة تخزين تجارية',
        ];

        $name = fake()->randomElement(array_keys($categories));

        return [
            'name' => $name,
            'description' => $categories[$name],
        ];
    }
}