<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $notification_maker = User::find($this->notification_maker_id);
        return [
            'id' => $this->id,
            'type' => $this->type,
            'user_id' => $this->user_id,
            'question_id' => $this->question_id,
            'post_id' => $this->post_id,
            'comment_id' => $this->comment_id,
            'is_read' => $this->is_read,
            'notification_maker' => new UserResource($notification_maker),
            'reply_to_comment' => $this->reply_to_comment === 1,
            'is_answer' => $this->is_answer === 1,
            'thread_slug' => $this->thread_slug,
            'created_at' => Carbon::make($this->created_at)->locale('ar')->translatedFormat('d F Y')
        ];
    }
}
