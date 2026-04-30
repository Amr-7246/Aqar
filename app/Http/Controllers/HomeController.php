<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class HomeController extends Controller {
  public function show(){
      // $properties = Property::latest()->get() ?? null;
      // $properties = $crud->read(model: Property); //! How can I pass the model to the function
      //TODO: get that from the DB
        $propertiesCount = 500; 
        $clientsCount = 500;
        $dealCount = 500;
        $propertyPostData = [
          [
              'id' => 1,
              'brokerId' => 101,
              'brokerName' => 'أحمد المنصوري',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'شقق سكنية',
              'locations' => ['الرياض', 'حي النرجس'],
              'title' => 'شقة مودرن بتصميم عصري',
              'description' => 'شقة رائعة في قلب الرياض تتميز بنظام المنزل الذكي وإطلالة خلابة.',
              'area_m2' => 145,
              'type' => 'sell',
              'price' => 750000,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop', 'apt1_2.jpg'],
              'videos' => [],
              'liks' => 24,
              'comments' => ['هل السعر قابل للتفاوض؟', 'موقع ممتاز جداً'],
              'created_at' => '2023-10-01 10:00:00'
          ],
          [
              'id' => 2,
              'brokerId' => 105,
              'brokerName' => 'سارة العقارية',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'فيلات',
              'locations' => ['جدة', 'حي أبحر الشمالي'],
              'title' => 'فيلا فاخرة على البحر مباشرة',
              'description' => 'فيلا بمساحة واسعة مع مسبح خاص وحديقة مصممة بشكل احترافي.',
              'area_m2' => 500,
              'type' => 'sell',
              'price' => 3200000,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop', 'villa2.jpg', 'villa3.jpg'],
              'videos' => ['drone_view.mp4'],
              'liks' => 156,
              'comments' => ['ما شاء الله تبارك الله', 'كم مسطح البناء؟'],
              'created_at' => '2023-10-05 14:30:00'
          ],
          [
              'id' => 3,
              'brokerId' => 110,
              'brokerName' => 'شركة الإتقان العقارية',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'مكاتب تجارية',
              'locations' => ['دبي', 'خليج الأعمال'],
              'title' => 'مكتب إداري مجهز بالكامل',
              'description' => 'مكتب جاهز للعمل فوراً في أرقى الأبراج التجارية مع خدمات استقبال.',
              'area_m2' => 85,
              'type' => 'rent',
              'price' => 120000,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop'],
              'videos' => [],
              'liks' => 12,
              'comments' => [],
              'created_at' => '2023-10-08 09:15:00'
          ],
          [
              'id' => 4,
              'brokerId' => 101,
              'brokerName' => 'أحمد المنصوري',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'استراحات',
              'locations' => ['الدمام', 'طريق المطار'],
              'title' => 'استراحة هادئة للإيجار اليومي',
              'description' => 'مكان مثالي للعائلات لقضاء عطلة نهاية الأسبوع بعيداً عن صخب المدينة.',
              'area_m2' => 1200,
              'type' => 'rent',
              'price' => 1500,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop', 'resort2.jpg'],
              'videos' => ['tour.mp4'],
              'liks' => 89,
              'comments' => ['هل هي متاحة يوم الجمعة القادم؟'],
              'created_at' => '2023-10-10 16:45:00'
          ],
          [
              'id' => 5,
              'brokerId' => 120,
              'brokerName' => 'خالد العقاري',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'أراضي',
              'locations' => ['مكة المكرمة', 'حي ولي العهد'],
              'title' => 'أرض سكنية بموقع مميز',
              'description' => 'أرض زاوية على شارعين، قريبة من الخدمات والمسجد.',
              'area_m2' => 600,
              'type' => 'sell',
              'price' => 900000,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop'],
              'videos' => [],
              'liks' => 45,
              'comments' => ['ممكن اللوكيشن بالضبط؟'],
              'created_at' => '2023-10-12 11:20:00'
          ],
          [
              'id' => 6,
              'brokerId' => 105,
              'brokerName' => 'سارة العقارية',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'شقق سكنية',
              'locations' => ['المنامة', 'الجفير'],
              'title' => 'استوديو مؤثث بالكامل للإيجار',
              'description' => 'استوديو راقي يشمل الكهرباء والماء مع إطلالة على المارينا.',
              'area_m2' => 55,
              'type' => 'rent',
              'price' => 450,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop'],
              'videos' => [],
              'liks' => 33,
              'comments' => ['السعر شامل الضريبة؟'],
              'created_at' => '2023-10-14 13:00:00'
          ],
          [
              'id' => 7,
              'brokerId' => 130,
              'brokerName' => 'مجموعة الراشد',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'مستودعات',
              'locations' => ['الرياض', 'منطقة السلي'],
              'title' => 'مستودع كبير للتخزين اللوجستي',
              'description' => 'مستودع مطابق لاشتراطات الدفاع المدني مع مساحة كافية لدوران الشاحنات.',
              'area_m2' => 2500,
              'type' => 'rent',
              'price' => 350000,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop', 'wh2.jpg'],
              'videos' => [],
              'liks' => 5,
              'comments' => [],
              'created_at' => '2023-10-15 08:30:00'
          ],
          [
              'id' => 8,
              'brokerId' => 101,
              'brokerName' => 'أحمد المنصوري',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'فيلات',
              'locations' => ['أبوظبي', 'جزيرة ياس'],
              'title' => 'فيلا ملكية بتشطيب سوبر لوكس',
              'description' => 'فيلا فخمة جداً تحتوي على ٧ غرف نوم ومجلسين واسعة.',
              'area_m2' => 800,
              'type' => 'sell',
              'price' => 5500000,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop', 'royal2.jpg'],
              'videos' => ['inside_villa.mp4'],
              'liks' => 210,
              'comments' => ['تحفة فنية', 'هل تقبلون التمويل العقاري؟'],
              'created_at' => '2023-10-18 10:10:00'
          ],
          [
              'id' => 9,
              'brokerId' => 140,
              'brokerName' => 'يوسف للخدمات العقارية',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'محلات تجارية',
              'locations' => ['الكويت', 'السالمية'],
              'title' => 'محل تجاري في شارع حيوي',
              'description' => 'محل بمساحة عرض ممتازة في منطقة تجارية مزدحمة.',
              'area_m2' => 40,
              'type' => 'rent',
              'price' => 1200,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop'],
              'videos' => [],
              'liks' => 18,
              'comments' => ['يصلح لمطعم؟'],
              'created_at' => '2023-10-20 12:00:00'
          ],
          [
              'id' => 10,
              'brokerId' => 120,
              'brokerName' => 'خالد العقاري',
              'brokerImage' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop',
              'categoryName' => 'شقق سكنية',
              'locations' => ['الخبر', 'حي الحزام الذهبي'],
              'title' => 'شقة دوبلكس واسعة',
              'description' => 'شقة طابقين بتصميم مودرن وتشطيبات راقية جداً.',
              'area_m2' => 220,
              'type' => 'sell',
              'price' => 1100000,
              'images' => ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop', 'duplex2.jpg'],
              'videos' => [],
              'liks' => 67,
              'comments' => ['تصميم رائع'],
              'created_at' => '2023-10-22 15:20:00'
          ],
        ];
      
      return $this->emit(
        component: 'home/page', 
        data: [
          'propertyPostData' => $propertyPostData,
          'propertiesCount' => $propertiesCount,
          'clientsCount' => $clientsCount,
          'dealCount' => $dealCount,
        ]
      );
  }
}