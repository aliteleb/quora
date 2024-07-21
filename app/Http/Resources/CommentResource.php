<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'comment_id' => $this->comment_id,
            'thread_id' => $this->thread_id,
            'body' => $this->body,
            'replies' => CommentResource::collection($this->replies),
            'status' => $this->status,
            'user' => $this->user,
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
        ];
    }
}
