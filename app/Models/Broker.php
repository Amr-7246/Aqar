<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;
use App\Traits\HasUuid;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Broker extends Model implements HasMedia
{
    use InteractsWithMedia, HasRoles, HasUuid;

    protected $fillable = ['user_id', 'license_number', 'commission_rate', 'specialization', 'is_active'];

    protected $keyType = 'string';

    public $incrementing = false;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function properties()
    {
        return $this->hasMany(Property::class, 'broker_id', 'uuid');
    }
}
