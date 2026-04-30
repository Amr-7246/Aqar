<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertySummaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      return [
        'id'    => $this->id,
        'uuid'  => $this->uuid,
        'title' => $this->title,
        'price' => $this->price . ' ' . $this->currency,
        
        'thumbnail' => $this->getFirstMediaUrl('images', 'thumb'),
        'category'  => $this->category->name ?? 'Uncategorized',
        'location'  => $this->location->city->name ?? 'N/A',
        
        'comments_count' => $this->comments_count,
        'likes_count'    => $this->likes_count,
        'created_at'     => $this->created_at->diffForHumans(),
      ];
    }
}
