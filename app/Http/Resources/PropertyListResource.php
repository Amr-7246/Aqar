<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PropertyListResource extends JsonResource
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
          'thumbnail'    => $this->getFirstMediaUrl('images', 'thumb'), 
          'gallery'       => $this->getMedia('images')->map(fn($m) => $m->getUrl())->toArray() ?: [$this->getFallbackMediaUrl('images')],
          'videos'       => $this->getMedia('videos')->map(fn($m) => $m->getUrl()),
          'status' => $this->status,
          'stats'        => [
              'likes'     => $this->likes_count,
              'views'     => $this->views_count,
              'inquiries' => $this->inquiries_count,
              'comments'  => $this->comments_count,
          ],
          'created_at'   => $this->created_at->toDateTimeString(),
      ];
    }
}
