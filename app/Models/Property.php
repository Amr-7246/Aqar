<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class Property extends Model implements HasMedia
{
    use InteractsWithMedia, HasUuid;
    
    protected $fillable = [ 'title', 'description', 'price', 'type', 'purpose', 
                            'location_id', 'area_m2', 'status'];

    protected $casts = [
        'approved_at' => 'datetime'
    ];
    // relations 
    public function proertyCategory() {
      return $this->belongsTo('property_categories');
    }

    public function proertyLocation() {
      return $this->belongsTo('property_locations');
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function inquiries() {
        return $this->hasMany(PropertyInquiry::class);
    }
    
    public function views() {
        return $this->hasMany(PropertyView::class);
    }
    
    //& Register media collections hrlper
    public function registerMediaCollections(): void {
        $this->addMediaCollection('property_gallery')
              ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'video/mp4'])
              ->withResponsiveImages();
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
