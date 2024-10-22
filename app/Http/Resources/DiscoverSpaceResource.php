<?php

namespace App\Http\Resources;

use App\Models\Space;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DiscoverSpaceResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected function resourceToArray(Request $request): array
    {
        $space_image = $this->getFirstMediaUrl('spaces_avatars');
        $space_cover_image = $this->getFirstMediaUrl('spaces_covers');

        $media =[];

        if ($space_image) {
            $media['poster'] = $space_image;
        }

        if ($space_cover_image) {
            $media['cover'] = $space_cover_image;
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
