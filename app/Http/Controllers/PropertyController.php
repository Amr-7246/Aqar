<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\User;
use App\Models\PropertyDetailResource;
use App\Http\Requests\PropertyRequest;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
      //TODO: Applay the Windowing & Virtual Scrolling to prevent craching (frontent) + Build a Feed Pre-computation & Ranking Algorithem for beater UX (Advanced)
      $properties = Property::query()
        ->with([
            'broker', 
            'location.city.country', 
            'location.government',
            'category'
        ])
        ->withCount(['likes', 'comments', 'inquiries', 'views']) //! efficent way to avoid the N + 1 issue
        ->where('is_active', true)
        ->whereIn('status', ['approved', 'in_negotiation', 'sold'])
        ->latest()
        ->cursorPaginate(10); //! this func automaticlly catch the cursor from the coming requst to go forward with the nex chunck
        //TODO: sort by the likes count

      return $this->emit(
        component: 'home/page', 
        data: [
          'properties' => PropertyDetailResource::collection($properties)->response()->getData(true), //! This structure gives the React frontend the 'next_page_url'
          'propertiesCount' => Property::where('is_active', true)->count(),
          'clientsCount' => User::count(),
          'dealCount' => 500, //TODO: handle that
          'propertyComments' => Inertia::lazy(function () use ($request) { //! this will return just if the front end asked for
            $propertyId = $request->query('propertyId');
            if (!$propertyId) return [];
            return \App\Models\Comment::where('property_id', $propertyId)
              ->with('user:id,name')
              ->latest()
              ->get()
              ->map(fn($c) => [
                  'id'         => $c->id,
                  'userName'   => $c->user->name,
                  'userAvatar' => $c->user->getFirstMediaUrl('avatars'),
                  'text'       => $c->comment,
                  'date'       => $c->created_at->diffForHumans(),
              ]);
        }),
        ]
      );
    }
    /**
     * Display the specified resource.
     */
    public function show($id){
      //& Prepare the prop
        //! implementing the Eager loading over the default lazy loading here alleviates the "N + 1" query problem
          $property = Property::with([
                  'broker', 
                  'location.city', 
                  'location.government', 
                  'comments.user', 
                  'category'
              ])
              ->withCount(['likes', 'views', 'inquiries', 'comments'])
              ->where("uuid", $id)
              ->firstOrFail();
      //& record view
        $property->views()->create([
          'ip' => request()->ip(),
          'user_id' => auth()->check() ? auth()->id() : null
        ]);

      //& Get similar properties (Simplified for cards)
      $similar = Property::with(['location.city', 'category'])
          ->where('status', 'approved')
          ->where('property_category_id', $property->property_category_id)
          ->where('id', '!=', $property->id)
          ->limit(4)
          ->get()
          ->map(fn($item) => [
              'id' => $item->id,
              'uuid' => $item->uuid,
              'title' => $item->title,
              'price' => $item->price,
              'currency' => $item->currency,
              'image' => $item->getFirstMediaUrl('images') ?: '/default-property.jpg', //TODO: set a default prop image
              'city' => $item->location->city->name ?? 'N/A',
              'purpose' => $item->purpose,
          ]);
      
      //& Check if user has favorited this property
      $isFavorited = auth()->check() 
          ? auth()->user()->favorites()->where('property_id', $property->id)->exists() 
          : false;

      return $this->emit(
        component: 'property/details/page',
        data: [
          'propertyDetails' => new \App\Http\Resources\PropertyDetailResource($property),
          'similarProperties' => $similar, //TODO: implement the Lazy data extraction via Inertia::difer()
          'isFavorited' => $isFavorited,
          ]
      );
    }
    /**
     * Show the form for creating a new resource.
     */
    public function showMyOwn(Request $request)
    {
      $user = auth()->user();

      $properties = $user->properties()
          ->with(['category', 'location.city', 'broker'])
          ->withCount(['comments', 'likes'])
          ->latest()
          ->paginate(10);
      //& show the prop status 
        $statusCounts = $user->properties()
            ->groupBy('status')
            ->selectRaw('status, count(*) as total')
            ->pluck('total', 'status'); 
          
      return $this->emit(
        component: 'Properties/MyProperties', 
        data: [
          'properties' => \App\Http\Resources\PropertySummaryResource::collection($properties),
          'statusCounts' => [
              'pending'  => (int) $statusCounts->pending,
              'approved' => (int) $statusCounts->approved,
              'rejected' => (int) $statusCounts->rejected,
          ]
      ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
      //& return the drop list items
        $categories = \App\Models\PropertyCategory::all(['name', 'description']);
        $cities = \App\Models\City::pluck('name');
        $governments = \App\Models\Government::pluck('name');
        $countries = ['مصر', 'المملكة العربية السعودية'];
        
        $attributeValue = [];
        foreach (\App\Models\Attribute::with('values')->get() as $attr) {
          $attributeValue[$attr->name] = $attr->values->pluck('value')->toArray();
        }

      return $this->emit(
        component: 'property/create/page', 
        data: [
          'categories' => $categories,
          'countries' => $countries,
          'governments' => $governments,
          'cities' => $cities,
          'attributeValue' => $attributeValue,
        ]
      );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PropertyRequest $request)
    {
      //& insert at the DB with pending status
        $property = auth()->user()->properties()->create([ //TODO: sync with your
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'type' => $request->type,
            'purpose' => $request->purpose,
            'bedrooms' => $request->bedrooms ?? 0,
            'bathrooms' => $request->bathrooms ?? 0,
            'area_sqm' => $request->area_sqm,
            'address' => $request->address,
            'city' => $request->city,
            'status' => 'pending' // Always pending for admin review
        ]);
      //& Handle media upload
        if($request->hasFile('images')){ //? tell me more about the hasFile() and the functions like it like filtered() + why it is images what if Isent videos
          foreach($request->file('images') as $image){ //? how exactlly I send that file from the front and why it not just like any field, why has spesific access 
            $property->addMedia($image)->toMediaCollection('property_gallary');
          }
        }
      //& Handle location (if using Mapbox)
        if ($request->filled('latitude') && $request->filled('longitude')) {
            $property->location()->location = \DB::raw("ST_SetSRID(ST_MakePoint({$request->longitude}, {$request->latitude}), 4326)"); //? Explain the raw function and that syntax insid it
            $property->saveQuietly();
        }

      return redirect()->route('properties.my')
          ->with('success', 'Property submitted for admin review');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
      $property = auth()->user()->properties()->findOrFail($id);
      
      //TODO: build a re-submit flow, but for now Only allow editing if not approved yet
      if ($property->status === 'approved') {
          return back()->with('error', 'للاسف مش هينفع تعدل العقار بعد مخد كوافقة من الادمن, قدم طلب تعديل الاول'); //? what is the back() func
      }

      return $this->emit(
        component: 'Properties/Edit', 
        data: ['property' => $property->load('media')] //? tell me more about the load() func
      );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PropertyRequest $request, string $id)
    {
      $property = auth()->user()->properties()->findOrFail($id);
      //TODO: build a re-submit flow, but for now Only allow editing if not approved yet
      if ($property->status === 'approved') {
          return back()->with('error', 'للاسف مش هينفع تعدل العقار بعد مخد كوافقة من الادمن, قدم طلب تعديل الاول'); //TODO: that message should be arabic/english later
      }
      $property->update($request->validated());

      //& handle the media 
        if ($request->has('delete_images')) {
            foreach ($request->delete_images as $mediaId) {
                $property->media()->where('id', $mediaId)->delete();
            }
        }
        
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $property->addMedia($image)->toMediaCollection('property_gallery');
            }
        }
        
        return redirect()->route('properties.my') //TODO: handle the redirction at the response wrapper
            ->with('success', 'عدلناها ياسيدى');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
      $property = auth()->user()->properties()->findOrFail($id);
      
      //& Only allow deletion if not sold/rented
      if ($property->status === 'approved' && $property->inquiries()->where('status', 'unread')->exists()) {
          return back()->with('error', 'Cannot delete property with active inquiries');
      }
      
      $property->delete();
      
      return redirect()->route('properties.my')
          ->with('success', 'Property deleted successfully');
    }
}

