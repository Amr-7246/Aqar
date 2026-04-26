<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Helpers\ClientResolver;
use App\Models\Property;
use Illuminate\Database\Eloquent\Model;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

      //& resolve the prop Cursor number, then send the data based on it 
        $request->validate([
          "cursor_index" => "int"
        ]);
      //& Applay the Windowing & Virtual Scrolling to prevent craching
      //& Advanced - Build a Feed Pre-computation & Ranking Algorithem for beater UX


      $resolver = new ClientResolver();

      $properties = Property::latest()->get();
      // $properties = $crud->read(model: Property); //! How can I pass the model to the function
      //TODO: get that from th eDB
        $propertiesCount = 500; 
        $clientsCount = 500;
        $dealCount = 500;
      
      return $resolver->resolve(
        component: 'home.page', 
        data: [
          'properties' => $properties,
          'propertiesCount' => $propertiesCount,
          'clientsCount' => $clientsCount,
          'dealCount' => $dealCount,
        ]
      );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
    public function showPropertyDetails($propertyId){
      //TODO: build the filter logic
        $resolver = new ClientResolver();
        $propertyDetails = [
          'id' => $propertyId,
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
        ];
      
      return $resolver->resolve(
        component: 'property/details', //TODO: centerlize these pages names + make it accessabel via all controllers
        data: [
          'propertyDetails' => $propertyDetails,
        ]
      );
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

class CRUDOperations {
  public function read(Model $model){
    return $model->get();
  }
}
