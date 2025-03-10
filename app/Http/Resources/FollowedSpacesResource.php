<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FollowedSpacesResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected function resourceToArray(Request $request): array
    {
        $space_poster = $this->getFirstMediaUrl('spaces_avatars');
        $media = [];
        if ($space_poster) {
            $media['avatar'] = $space_poster;
        }

        return [
            'name' => $this->name,
            'media' => $media,
            'followers_count' => $this->followers_count,
        ];
    }
}
