<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [

    ];
    
    // relations 
    public function proertyCategory() {
      return $this->belongsTo('property_categories');
    }

    public function proertyLocation() {
      return $this->belongsTo('property_locations');
    }
}
