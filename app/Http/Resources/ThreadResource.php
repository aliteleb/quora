<?php

namespace App\Http\Resources;

use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

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
        $thread_image = $thread ? $thread->getFirstMediaUrl('threads_images') : '';
        $thread_video = $thread ? $thread->getMedia('threads_videos') : '';

        $up_votes = $this->votes()->where('vote_type', 'up')->whereNull('comment_id')->count();
        $down_votes = $this->votes()->where('vote_type', 'down')->whereNull('comment_id')->count();
        $vote = $this->votes()->where('user_id', auth()->id())->whereNull('comment_id')->first(['vote_type']);

        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'type' => $this->type,
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'is_anonymous' => $this->is_anonymous,
            'visibility' => $this->visibility,
            'status' => $this->status,
            'sensitive_content' => $this->sensitive_content,
            'scheduled' => $this->scheduled,
            'image' => $thread_image,
            'video' => $thread_video,
            'user' => new UserResource($user),
            'up_votes' => $up_votes,
            'down_votes' => $down_votes,
            'vote' => $vote?->vote_type,
            'comments_count' => count($this->comments),
        ];
    }
}
