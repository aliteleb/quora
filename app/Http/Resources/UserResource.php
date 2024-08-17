<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $response = [];

        if (auth()->user()) {
            $response['id'] = $this->id;
            $response['name'] = $this->name;
            $response['username'] = $this->username;
            $response['bio'] = $this->bio;
            $response['email'] = $this->email;
            $response['posts_count'] = $this->posts_count;
            $response['questions_count'] = $this->questions_count;
            $response['answers_count'] = $this->answers_count;
            $response['followed_spaces_count'] = $this->followed_spaces_count;
            $response['followers_count'] = $this->followedUser->count();
            $response['follow_count'] = $this->followerUser->count();
            $response['avatar'] = $this->getFirstMediaUrl('users_avatars');
            $response['created_at'] = Carbon::parse($this->created_at)->locale('ar')->translatedFormat('j F Y');
        }
        return $response;
    }
}
