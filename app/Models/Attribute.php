<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model 
{
    protected $fillable = [ 'name','type'];

    protected $casts = [
        'approved_at' => 'datetime'
    ];
    //& The relations 
    public function values() {
      return $this->hasMany(\App\Models\AttributeProperty::class);
    }
}