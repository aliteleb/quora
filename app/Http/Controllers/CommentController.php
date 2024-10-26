<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\CreateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\UserResource;
use App\Models\Comment;
use App\Models\Notification;
use App\Models\Thread;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CommentController extends Controller implements HasMedia
{
    use InteractsWithMedia;
    public function addComment(CreateCommentRequest $request)
    {
        $thread = Thread::where('id', $request->input('thread_id'))->first();
        if(!$thread) {
            return InertiaResponse::error();
        }
        $comment = Comment::with(['user'])->where('id', $request->input('comment_id'))->first();
        if($request->has('comment_id') && !$comment) {
            return InertiaResponse::error();
        }

        $created_comment = Comment::create([
            'type' => $request->comment_id ? 'reply' : (!$request->comment_id && $thread->type === 'question' ? 'answer' : 'comment'),
            'user_id' => $request->user_id,
            'body' => $request->body,
            'thread_id' => $request->thread_id,
            'comment_id' => $comment->id ?? null,
            'mention_id' => $comment->user?->id ?? null,
        ]);

        if ($request->hasFile('image')) {
            $created_comment->addMediaFromRequest('image')->toMediaCollection('comments_images');
        }

        if ($request->hasFile('video')) {
            $created_comment->addMediaFromRequest('video')->toMediaCollection('comments_videos');
        }

        if ($thread->type === 'question' && !$created_comment->comment_id) {
            $thread->all_answers_count++;
            $thread->save();
        }
        $comment_user_id = User::find($created_comment->user_id)->id;
        if ($comment_user_id !== auth()->id()) {
            if ($created_comment->comment_id) {
                $this->addCommentNotification($created_comment->comment_id, $thread->user_id, $thread->type, $thread->id, $created_comment->mention_id, true);
            } else {
                $this->addCommentNotification($created_comment->id, $thread->user_id, $thread->type, $thread->id, $created_comment->mention_id);
            }
        }

        if ($created_comment->comment_id) {
            $data = [
                'reply' => new CommentResource($created_comment),
            ];
            return InertiaResponse::back($data);
        } else {
            $data = [
                'comment' => new CommentResource($created_comment),
            ];
            return InertiaResponse::back($data);
        }
    }
    protected function addCommentNotification($comment_id, $user_id, $thread_type, $thread_id, $reply_to, $is_reply = false )
    {
        if ($is_reply && $comment_id) {
            if ($user_id !== $reply_to) {
                Notification::create([
                    'type' => 'reply',
                    'user_id' => $user_id,
                    'comment_id' => $comment_id,
                    'question_id' => $thread_type === 'question' ? $thread_id : null,
                    'post_id' => $thread_type === 'post' ? $thread_id : null,
                    'notification_maker_id' => auth()->id(),
                    'reply_to_comment' => true,
                ]);
            }
            if ($reply_to !== auth()->id()) {
                Notification::create([
                    'type' => 'reply',
                    'user_id' => $reply_to,
                    'comment_id' => $comment_id,
                    'question_id' => $thread_type === 'question' ? $thread_id : null,
                    'post_id' => $thread_type === 'post' ? $thread_id : null,
                    'notification_maker_id' => auth()->id()
                ]);
            }

        } else {
            Notification::create([
                'type' => $thread_type === 'question' && !$is_reply ? 'answer' : 'comment',
                'user_id' => $user_id,
                'question_id' => $thread_type === 'question' ? $thread_id : null,
                'post_id' => $thread_type === 'post' ? $thread_id : null,
                'comment_id' => $comment_id,
                'notification_maker_id' => auth()->id(),
            ]);
        }
    }
    protected function addVotingCommentNotification($type, $thread_type, $thread_id, $comment_id, $is_answer, $comment_user_id = null): void
    {

        $vote_type = $type === 'up' ? 'up_vote' : 'down_vote';
        $notification_exists = Notification::where('type', $vote_type)
            ->where('user_id', $comment_user_id)
            ->where('notification_maker_id', auth()->id())
            ->where('comment_id', $comment_id)
            ->exists();
        if (!$notification_exists) {
            Notification::create([
                'type' => $vote_type,
                'user_id' => $comment_user_id,
                'comment_id' => $comment_id,
                'question_id' => $thread_type === 'question' ? $thread_id : null,
                'post_id' => $thread_type === 'post' ? $thread_id : null,
                'notification_maker_id' => auth()->id(),
                'is_answer' => $is_answer
            ]);
        }
    }
    public function getComments(Request $request)
    {
        $comments = Comment::where(['thread_id' => $request->thread_id])
            ->whereNull('comment_id')
            ->with(['replies', 'replies.user'])
            ->latest()
            ->paginate(5);

        $next_page_url = $comments->nextPageUrl();
        $comments = $comments->getCollection();
        $comments = flattenComments($comments);
        $comments = CommentResource::collection($comments);
        $data = [
            'comments' => $comments,
            'next_page_url' => $next_page_url,
        ];
        return InertiaResponse::back($data);
    }

    public function vote(Request $request)
    {
        $user_id = auth()->id();
        $comment_id = $request->comment_id ?: $request->thread_id;
        $vote_type = $request->vote_type;
        $thread = Thread::where('id', $request->thread_id)->first();
        $voted_up = Vote::where('user_id', $user_id)->where('vote_type', 'up')->where('comment_id', $comment_id);
        $voted_down = Vote::where('user_id', $user_id)->where('vote_type', 'down')->where('comment_id', $comment_id);

        $vote = [];
        if ($vote_type === 'up' && $voted_up->exists()) {
            $voted_up->delete();
        } elseif ($vote_type === 'down' && $voted_down->exists()) {
            $voted_down->delete();
        } else {
            if ($vote_type === 'up' || $vote_type === 'down') {
                $opposite_vote = ($vote_type === 'up') ? $voted_down : $voted_up;
                if ($opposite_vote->exists()) {
                    $opposite_vote->delete();
                }

                $vote = Vote::create([
                    'user_id' => $user_id,
                    'vote_type' => $vote_type,
                    'comment_id' => $comment_id,
                ]);
                $comment = Comment::find($comment_id);

                $comment_user_id = User::find($comment->user_id)->id;
                if ($comment_user_id !== $user_id) {
                    if ($request->thread_id && $thread->type === 'question') {
                        $this->addVotingCommentNotification($vote_type, $thread->type, $thread->id, $comment_id,true, $comment->user_id);
                    } else {
                        $this->addVotingCommentNotification($vote_type, $thread->type, $thread->id, $comment_id,false, $comment->user_id);
                    }
                }

            }
        }

        $comment_up_votes_count = Vote::where('comment_id', $comment_id)->where('vote_type', 'up')->count();
        $comment_down_votes_count = Vote::where('comment_id', $comment_id)->where('vote_type', 'down')->count();

        $vote_count = [
            'all_up_votes_count' => $comment_up_votes_count,
            'all_down_votes_count' => $comment_down_votes_count,
        ];
        return InertiaResponse::back(['vote' => $vote ?: null, 'vote_count' => $vote_count]);
    }

    public function deleteComment($id)
    {
        $comment = Comment::where('id', $id)->first();
        $replies = $comment->replies;

        foreach ($replies as $reply) {
            $reply->clearMediaCollection();
            $reply->delete();
        }

        $comment->clearMediaCollection();
        $comment->delete();
    }

}
