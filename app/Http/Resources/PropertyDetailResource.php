<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PropertyDetailResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'           => $this->id,
            'uuid'         => $this->uuid,
            'title'        => $this->title,
            'description'  => $this->description,
            'price'        => $this->price,
            'currency'     => $this->currency,
            'area_m2'      => $this->area_m2,
            'purpose'      => $this->purpose,
            'broker'       => [
                'id'    => $this->broker_id,
                'name'  => $this->broker->name ?? 'Unknown',
                'image' => $this->broker?->getFirstMediaUrl('avatars'),
            ],
            'location'     => [
                'country'    => $this->location->city->country->name ?? 'N/A',
                'government' => $this->location->government->name ?? 'N/A',
                'city'       => $this->location->city->name ?? 'N/A',
                'address'    => $this->location->address,
            ],
            // Use Spatie fallback system we set up earlier
            'thumbnail'    => $this->getFirstMediaUrl('images', 'thumb'), 
            'gallery'       => $this->getMedia('images')->map(fn($m) => $m->getUrl())->toArray() ?: [$this->getFallbackMediaUrl('images')],
            'videos'       => $this->getMedia('videos')->map(fn($m) => $m->getUrl()),
            'stats'        => [
                'likes'     => $this->likes_count,
                'views'     => $this->views_count,
                'inquiries' => $this->inquiries_count,
                'comments'  => $this->comments_count,
            ],
            'comments'     => $this->comments->map(fn($c) => [
                'id'         => $c->id,
                'userName'   => $c->user->name,
                'userAvatar' => $c->user->getFirstMediaUrl('avatars'),
                'text'       => $c->comment,
                'date'       => $c->created_at->diffForHumans(),
            ]),
            'created_at'   => $this->created_at->toDateTimeString(),
        ];
    }
}
