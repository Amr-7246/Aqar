<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;
use App\Models\PropertyCategory;
use App\Models\User;
use App\Models\Location;
use App\Models\Broker;
use App\Models\PropertyInquiry;

class Property extends Model implements HasMedia
{
    use InteractsWithMedia, HasUuid;
    
    protected $fillable = [ 'title', 'description', 'price', 'purpose', 
                            'location_id', 'category_id', 'area_m2', 'status', 'owner_id', 'broker_id',
                            'is_flexable_price', 'currency', 'is_active', 'approved_at'];

    protected $casts = [
        'approved_at' => 'datetime'
    ];
    //& define a media settings, set a default image thumb
      public function registerMediaCollections(): void
        {
          $this->addMediaCollection('images')
            ->singleFile()
            ->useFallbackUrl(asset('images/defaults/default-property.png')) 
            ->useFallbackPath(public_path('images/defaults/default-property.png'));
          
          $this->addMediaCollection('property_gallery')
            ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'video/mp4'])
            ->withResponsiveImages();
        }
    //& The relations 
      public function category() {
        return $this->belongsTo(PropertyCategory::class, 'category_id');
      }

      public function location() {
        return $this->belongsTo(Location::class);
      }

      public function user() {
          return $this->belongsTo(User::class, 'owner_id');
      }

      public function broker() {
          return $this->belongsTo(Broker::class, 'broker_id', 'uuid');
      }
      
      public function inquiries() {
          return $this->hasMany(PropertyInquiry::class);
      }
      
      public function views() {
          return $this->hasMany(\App\Models\PropertyView::class);
      }
      
      public function likes() {
        return $this->hasMany(\App\Models\PropertyLike::class);
      }
      
      public function comments() {
        return $this->hasMany(\App\Models\Comment::class);
      }
      
      public function favorites() {
        return $this->hasMany(\App\Models\Favorite::class);
      }
    
    //& Auto-optimize on upload
    public function registerMediaConversions($media = null): void {
        $this->addMediaConversion('thumb')
              ->width(300)
              ->height(200)
              ->sharpen(10);
            
        $this->addMediaConversion('medium')
              ->width(800)
              ->height(600);
    }
}
