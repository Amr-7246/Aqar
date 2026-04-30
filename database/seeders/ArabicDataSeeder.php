<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class ArabicDataSeeder extends Seeder
{
    /**
     * Seed the application's database with Arabic demo data.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();

        $now = now();

        DB::table('governments')->insertOrIgnore([
            ['id' => 1, 'name' => 'القاهرة', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'الجيزة', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'الإسكندرية', 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('cities')->insertOrIgnore([
            ['id' => 1, 'name' => 'القاهرة', 'country' => 'مصر', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'الجيزة', 'country' => 'مصر', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'الإسكندرية', 'country' => 'مصر', 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('property_categories')->insertOrIgnore([
            ['id' => 1, 'name' => 'شقة', 'description' => 'عقار سكني في مبنى سكني', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'فيلا', 'description' => 'فيلا فاخرة مع حديقة', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'أرض', 'description' => 'قطعة أرض لبناء أو استثمار', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name' => 'مكتب', 'description' => 'عقار تجاري مكتبي', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name' => 'محل تجاري', 'description' => 'مساحة تجارية للبيع أو للإيجار', 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('attributes')->insertOrIgnore([
            ['id' => 1, 'name' => 'عدد الغرف', 'type' => 'integer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name' => 'عدد الحمامات', 'type' => 'integer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name' => 'مساحة الأرض', 'type' => 'integer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name' => 'سنة البناء', 'type' => 'integer', 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name' => 'عدد مواقف السيارات', 'type' => 'integer', 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('users')->insertOrIgnore([
            [
                'id' => 1,
                'name' => 'أحمد علي',
                'username' => 'ahmad_ali',
                'email' => 'admin@aqar.test',
                'email_verified_at' => $now,
                'password' => Hash::make('password'),
                'phone' => '01000000001',
                'phone_verified_at' => $now,
                'bio' => 'مدير النظام ومالك حساب تجريبي',
                'preferred_language' => 'ar',
                'status' => 'active',
                'last_login_at' => $now,
                'remember_token' => Str::random(10),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 2,
                'name' => 'سارة محمد',
                'username' => 'sarah_mohamed',
                'email' => 'broker@aqar.test',
                'email_verified_at' => $now,
                'password' => Hash::make('password'),
                'phone' => '01000000002',
                'phone_verified_at' => $now,
                'bio' => 'وسيط عقاري متخصص في المنازل الفاخرة',
                'preferred_language' => 'ar',
                'status' => 'active',
                'last_login_at' => $now,
                'remember_token' => Str::random(10),
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 3,
                'name' => 'محمد سعيد',
                'username' => 'mohamed_saeed',
                'email' => 'customer@aqar.test',
                'email_verified_at' => $now,
                'password' => Hash::make('password'),
                'phone' => '01000000003',
                'phone_verified_at' => $now,
                'bio' => 'عميل يبحث عن عقارات سكنية وتجارية',
                'preferred_language' => 'ar',
                'status' => 'active',
                'last_login_at' => $now,
                'remember_token' => Str::random(10),
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        $brokerUserId = DB::table('users')->where('email', 'broker@aqar.test')->value('id');

        DB::table('brokers')->insertOrIgnore([
            [
                'uuid' => '11111111-1111-1111-1111-111111111111',
                'user_id' => $brokerUserId,
                'license_number' => 'BROKER-12345',
                'commission_rate' => 2.50,
                'specialization' => 'عقارات سكنية وتجارية',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        $governmentIds = DB::table('governments')->pluck('id', 'name')->toArray();
        $cityIds = DB::table('cities')->pluck('id', 'name')->toArray();
        $categoryIds = DB::table('property_categories')->pluck('id', 'name')->toArray();
        $attributeIds = DB::table('attributes')->pluck('id', 'name')->toArray();

        DB::table('locations')->insertOrIgnore([
            [
                'id' => 1,
                'city_id' => $cityIds['القاهرة'] ?? 1,
                'government_id' => $governmentIds['القاهرة'] ?? 1,
                'country' => 'egypt',
                'name' => 'مدينة نصر',
                'address' => '١٠ شارع الثورة، المنطقة الخامسة، مدينة نصر',
                'coordinates' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 2,
                'city_id' => $cityIds['الإسكندرية'] ?? 3,
                'government_id' => $governmentIds['الإسكندرية'] ?? 3,
                'country' => 'egypt',
                'name' => 'سبورتنج',
                'address' => '١٥ شارع فؤاد، بالقرب من كورنيش الإسكندرية',
                'coordinates' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        DB::table('properties')->insertOrIgnore([
            [
                'id' => 1,
                'uuid' => '22222222-2222-2222-2222-222222222222',
                'owner_id' => 1,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['شقة'] ?? 1,
                'title' => 'شقة فاخرة للبيع في مدينة نصر',
                'description' => 'شقة بتشطيب ممتاز، ٣ غرف، ٢ حمام، مطبخ أمريكي، وتصميم عصري بالقرب من الخدمات.',
                'area_m2' => 120,
                'price' => 2500000.00,
                'is_flexable_price' => false,
                'purpose' => 'sale',
                'status' => 'approved',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 2,
                'uuid' => '33333333-3333-3333-3333-333333333333',
                'owner_id' => 1,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 2,
                'property_category_id' => $categoryIds['فيلا'] ?? 2,
                'title' => 'فيلا مميزة للإيجار في الإسكندرية',
                'description' => 'فيلا فاخرة تطل على البحر، ٥ غرف نوم، ٤ حمامات، حديقة خاصة، وقريبة من الكورنيش.',
                'area_m2' => 320,
                'price' => 15000.00,
                'is_flexable_price' => true,
                'purpose' => 'rent',
                'status' => 'approved',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 3,
                'uuid' => '44444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 4,
                'uuid' => '54444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 5,
                'uuid' => '64444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 6,
                'uuid' => '74444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 7,
                'uuid' => '84444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 8,
                'uuid' => '94444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 9,
                'uuid' => '91444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 10,
                'uuid' => '92444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 11,
                'uuid' => '93444444-4444-4444-4444-444444444444',
                'owner_id' => 3,
                'broker_id' => '11111111-1111-1111-1111-111111111111',
                'location_id' => 1,
                'property_category_id' => $categoryIds['محل تجاري'] ?? 5,
                'title' => 'محل تجاري بموقع مميز على شارع رئيسي',
                'description' => 'مساحة تجارية جاهزة للتشغيل، مناسبة لمطعم أو متجر، بالقرب من محور رئيسي وخدمات.',
                'area_m2' => 80,
                'price' => 1200000.00,
                'is_flexable_price' => true,
                'purpose' => 'sale',
                'status' => 'pending',
                'currency' => 'EG',
                'is_active' => true,
                'approved_at' => null,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);

        $propertyIds = DB::table('properties')->pluck('id', 'uuid')->toArray();

        DB::table('attribute_properties')->insertOrIgnore([
            ['property_id' => $propertyIds['22222222-2222-2222-2222-222222222222'] ?? 1, 'attribute_id' => $attributeIds['عدد الغرف'] ?? 1, 'value' => '3', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['22222222-2222-2222-2222-222222222222'] ?? 1, 'attribute_id' => $attributeIds['عدد الحمامات'] ?? 2, 'value' => '2', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['22222222-2222-2222-2222-222222222222'] ?? 1, 'attribute_id' => $attributeIds['سنة البناء'] ?? 4, 'value' => '2018', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['33333333-3333-3333-3333-333333333333'] ?? 2, 'attribute_id' => $attributeIds['عدد الغرف'] ?? 1, 'value' => '5', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['33333333-3333-3333-3333-333333333333'] ?? 2, 'attribute_id' => $attributeIds['عدد الحمامات'] ?? 2, 'value' => '4', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['33333333-3333-3333-3333-333333333333'] ?? 2, 'attribute_id' => $attributeIds['مساحة الأرض'] ?? 3, 'value' => '320', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['44444444-4444-4444-4444-444444444444'] ?? 3, 'attribute_id' => $attributeIds['عدد الغرف'] ?? 1, 'value' => '1', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['44444444-4444-4444-4444-444444444444'] ?? 3, 'attribute_id' => $attributeIds['عدد الحمامات'] ?? 2, 'value' => '1', 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('comments')->insertOrIgnore([
            ['property_id' => $propertyIds['22222222-2222-2222-2222-222222222222'] ?? 1, 'user_id' => 3, 'comment' => 'هذه الشقة تبدو ممتازة وأحب الموقع القريب من الخدمات.', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['33333333-3333-3333-3333-333333333333'] ?? 2, 'user_id' => 3, 'comment' => 'الفيلا رائعة ولكن أحتاج معرفة تفاصيل عن المرافق والسعر النهائي.', 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('property_inquiries')->insertOrIgnore([
            ['property_id' => $propertyIds['22222222-2222-2222-2222-222222222222'] ?? 1, 'user_id' => 3, 'message' => 'هل يمكنني ترتيب زيارة خلال نهاية هذا الأسبوع؟', 'status' => 'unread', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['44444444-4444-4444-4444-444444444444'] ?? 3, 'user_id' => 3, 'message' => 'هل يمكن أن تخبرني عن إمكانية تغيير الديكور الداخلي؟', 'status' => 'unread', 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('favorites')->insertOrIgnore([
            ['property_id' => $propertyIds['22222222-2222-2222-2222-222222222222'] ?? 1, 'user_id' => 3, 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['33333333-3333-3333-3333-333333333333'] ?? 2, 'user_id' => 3, 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('property_views')->insertOrIgnore([
            ['property_id' => $propertyIds['22222222-2222-2222-2222-222222222222'] ?? 1, 'ip' => '192.168.1.10', 'user_id' => null, 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['33333333-3333-3333-3333-333333333333'] ?? 2, 'ip' => '185.12.10.5', 'user_id' => 3, 'created_at' => $now, 'updated_at' => $now],
        ]);

        DB::table('property_likes')->insertOrIgnore([
            ['property_id' => $propertyIds['22222222-2222-2222-2222-222222222222'] ?? 1, 'user_id' => 3, 'type' => 'heart', 'created_at' => $now, 'updated_at' => $now],
            ['property_id' => $propertyIds['33333333-3333-3333-3333-333333333333'] ?? 2, 'user_id' => 1, 'type' => 'like', 'created_at' => $now, 'updated_at' => $now],
        ]);

        $existingBroker = DB::table('brokers')->where('uuid', '11111111-1111-1111-1111-111111111111')->first();
        $brokerRelationId = $existingBroker->id ?? 1;

        Schema::enableForeignKeyConstraints();
    }
}
