<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class UserResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected function resourceToArray(Request $request): array
    {
        $user = $this->resource;
        $auth_user = context()->get('user');
        $is_followed = $auth_user && in_array($user->id, $auth_user->followed_ids);

        $response = [];


        $avatar = $user->getFirstMediaUrl('users_avatars');
        if ($avatar === "") {
            $avatar = null;
        }

        $response['id'] = $this->id;
        $response['name'] = $this->name;
        $response['username'] = $this->username;
        $response['bio'] = $this->bio;
        $response['email'] = $this->email;
        $response['posts_count'] = $this->posts_count;
        $response['questions_count'] = $this->questions_count;
        $response['answers_count'] = $this->answers_count;
        $response['followed_spaces_count'] = $this->followed_spaces_count;
        $response['followers_count'] = $this->followed_user_count;
        $response['follow_count'] = $this->follower_user_count;
        $response['is_followed'] = $is_followed;
        $response['avatar'] = $avatar;
        $response['created_at'] = Carbon::parse($this->created_at)->locale('ar')->translatedFormat('j F Y');

        return $response;
    }
}
