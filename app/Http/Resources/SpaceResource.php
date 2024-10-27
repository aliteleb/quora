<?php

namespace App\Http\Resources;

use App\Models\Space;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class SpaceResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected function resourceToArray(Request $request): array
    {

        $user = context('user');
        $space_image = $this->getFirstMediaUrl('spaces_avatars');
        $space_cover_image = $this->getFirstMediaUrl('spaces_covers');

        $media = [];

        $media['avatar'] = $space_image !== "" ? $space_image : null;
        $media['cover'] = $space_cover_image !== "" ? $space_cover_image : null;

        $is_followed = false;

        if (auth()->check()) {
            $user_followed_spaces = $user->followedSpaces;
            foreach ($user_followed_spaces as $space) {
                if ($space->pivot->space_id === $this->id) {
                    $is_followed = true;
                    break;
                }
            }
        }

        //test
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'details' => $this->details,
            'status' => $this->status,
            'media' => $media,
            'created_at' => $this->created_at,
            'user' => new UserResource($this->user->first()),
            'is_followed' => $is_followed,
            'followers_count' => $this->followers_count,
            'last_week_posts_count' => $this->posts_count,
        ];

    }
}
