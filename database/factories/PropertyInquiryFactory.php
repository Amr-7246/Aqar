<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyInquiry>
 */
class PropertyInquiryFactory extends Factory
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
            'message' => fake()->randomElement([
                'هل يمكنني ترتيب زيارة لهذا العقار؟',
                'أريد معرفة إذا كان السعر قابل للتفاوض.',
                'هل هناك أي رسوم إضافية؟',
                'متى يمكنني الاطلاع على العقار؟',
                'أحتاج لمعرفة تفاصيل المرافق والخدمات.',
                'هل يمكن الحصول على عقد إيجار طويل الأمد؟',
            ]),
            'status' => fake()->randomElement(['unread', 'read', 'replied']),
        ];
    }
}