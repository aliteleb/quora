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

        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'posts_count' => $this->posts_count,
            'questions_count' => $this->questions_count,
            'answers_count' => $this->answers_count,
            'followed_spaces_count' => $this->followed_spaces_count,
            'followers_count' => $this->followedUser->count(),
            'follow_count' => $this->followerUser->count(),
            'created_at' => Carbon::parse($this->created_at)->locale('ar')->translatedFormat('j F Y'),
        ];
    }
}
