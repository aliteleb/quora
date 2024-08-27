<?php

namespace App\Http\Resources;

use App\Models\User;
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
//        $user = $this->id ? User::find($this->id) : null;
        $user = $this->resource;
        $is_followed = $user->followedUser()->where('user_id', auth()->id())->exists();

        $response = [];

        $avatar = $user->getFirstMediaUrl('users_avatars');
        if ($avatar === "") {
            $avatar = null;
        }
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
            $response['is_followed'] = $is_followed;
            $response['avatar'] = $avatar;
            $response['created_at'] = Carbon::parse($this->created_at)->locale('ar')->translatedFormat('j F Y');
        }
        return $response;
    }
}
