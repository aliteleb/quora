<?php

namespace App\Http\Resources;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $comment = Comment::where('id', $this->id)->first();
        $comment_image = $comment->getFirstMediaUrl('comments_images');
        $comment_video = $comment->getFirstMediaUrl('comments_videos');

        $up_votes = $this->votes()->where('vote_type', 'up')->whereNull('thread_id')->count();
        $down_votes = $this->votes()->where('vote_type', 'down')->whereNull('thread_id')->count();
        $vote = $this->votes()->where('user_id', auth()->id())->whereNull('thread_id')->first(['vote_type']);

        $media = [];

        if ($comment_image) {
            $media['image'] = $comment_image;
;
        }

        if ($comment_video) {
            $media['video'] = $comment_video;
        }

        return [
            'id' => $this->id,
            'comment_id' => $this->comment_id,
            'thread_id' => $this->thread_id,
            'body' => $this->body,
            'status' => $this->status,
            'media' => $media,
            'created_at' => $this->created_at?->diffForHumans(),
            'replies' => flattenComments(collect($this->replies)),
            'user' => $this->user,
            'up_votes' => $up_votes,
            'down_votes' => $down_votes,
            'vote' => $vote?->vote_type,
            'mention' => $this->mention,
        ];
    }
}
