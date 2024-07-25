<?php

namespace App\Http\Resources;

use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscoverSpaceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $space = Space::where('id', $this->id)->first();
        $space_image = $space->getFirstMediaUrl('spaces_poster_images');
        $space_cover_image = $space->getFirstMediaUrl('spaces_cover_images');

        $media =[];

        if ($space_image) {
            $media['poster_img'] = $space_image;
        }

        if ($space_cover_image) {
            $media['cover_img'] = $space_cover_image;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'status' => $this->status,
            'media' => $media,
        ];
    }
}
