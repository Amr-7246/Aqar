<?php
namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

trait HasUuid {
  protected static function bootHasUuid() : void 
  {
    static::creating(function (Model $model) {
      if(empty($model->uuid)){
        $model->uuid = (string) Str::uuid();
      }
    });
  }
    
  /**
   * Use the UUID for public URLs instead of the integer ID.
   */
  public function getRouteKeyName(): string
  {
    return 'uuid';
  }
}