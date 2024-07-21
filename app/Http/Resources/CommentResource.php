<?php

namespace App\Http\Resources;

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
            'comment_id' => $this->comment_id,
            'thread_id' => $this->thread_id,
            'body' => $this->body,
            'status' => $this->status,
            'created_at' => $this->created_at?->diffForHumans(),
            'replies' => flattenComments(collect($this->replies)),
            'user' => $this->user,
        ];
    }
}
