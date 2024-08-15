<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $up_votes = $this->votes()->where('vote_type', 'up')->whereNull('thread_id')->count();
        $down_votes = $this->votes()->where('vote_type', 'down')->whereNull('thread_id')->count();
        $vote = $this->votes()->where('user_id', auth()->id())->whereNull('thread_id')->first(['vote_type']);

        $comment_image = $this->getFirstMediaUrl('comments_images');
        $comment_video = $this->getFirstMediaUrl('comments_videos');

        $media = null;

        if ($comment_image) {
            $media['image'] = $comment_image;
        }
        if ($comment_video) {
            $media['video'] = $comment_video;
        }

        $response = [
            'id' => $this->id,
            'type' => $this->type,
            'user_id' => $this->user_id,
            'comment_id' => $this->comment_id,
            'thread_id' => $this->thread_id,
            'body' => $this->body,
            'status' => $this->status,
            'created_at' => $this->created_at?->diffForHumans(),
            'updated_at' => $this->updated_at,
            'up_votes' => $up_votes,
            'down_votes' => $down_votes,
            'vote' => $vote,
            'media' => $media,
            'thread' => [
                'id' => $this->thread->id,
                'title' => $this->thread->title,
                'media' => $this->thread->media->isNotEmpty() ? $this->thread->media->first()->getUrl() : null,
            ],
        ];


        return $response;
    }
}
