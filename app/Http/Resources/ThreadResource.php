<?php

namespace App\Http\Resources;

use App\Models\PostAction;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class ThreadResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    protected function resourceToArray(Request $request): array
    {
        $user = context('user');
        $thread_image = $this->getFirstMediaUrl('threads_images');
        $vote = $this->votes()->where('user_id', $user->id)->first(['vote_type']);
        $is_shared = $this->shared_count > 0;

//        dd(new UserResource($user));

        $data = [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'share' => new ThreadResource($this->whenLoaded('share')),
            'title' => $this->title,
            'type' => $this->type,
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'is_anonymous' => $this->is_anonymous,
            'visibility' => $this->visibility,
            'status' => $this->status,
            'sensitive_content' => $this->sensitive_content,
            'scheduled' => $this->scheduled,
            'image' => $thread_image,
            'is_shared' => $is_shared,
            'user' => new UserResource($this->user),
            'up_votes' => $this->votes_up_count,
            'down_votes' => $this->votes_down_count,
            'vote' => $vote?->vote_type,
            'comments_count' => $this->comments_count,
            'shares_count' => $this->all_shares_count,
        ];
//        dd($data);
        return $data;
    }
}
