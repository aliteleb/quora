<?php

namespace App\Http\Resources;

use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::where('id', $this->user_id)->first();
        $thread = Thread::where('id', $this->id)->first();
        $thread_image = $thread->getFirstMediaUrl('threads_images');
        $thread_video = $thread->getMedia('threads_videos');

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'type' => $this->type,
            'is_anonymous' => $this->is_anonymous,
            'visibility' => $this->visibility,
            'all_up_votes_count' => $this->all_up_votes_count,
            'all_down_votes_count' => $this->all_down_votes_count,
            'all_comments_count' => $this->all_comments_count,
            'all_shares_count' => $this->all_shares_count,
            'status' => $this->status,
            'sensitive_content' => $this->sensitive_content,
            'scheduled' => $this->scheduled,
            'image' => $thread_image,
            'video' => $thread_video,
            'user' => new UserResource($user),
        ];
    }
}
