<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\CreateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Thread;
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
        $comment = Comment::where('id', $request->input('comment_id'))->first();
        if($request->has('comment_id') && !$comment) {
            return InertiaResponse::error();
        }

        $comment = Comment::create([
            'type' => $request->comment_id ? 'reply' : (!$request->comment_id && $thread->type === 'question' ? 'answer' : 'comment'),
            'user_id' => $request->user_id,
            'body' => $request->body,
            'thread_id' => $request->thread_id,
            'comment_id' => $comment?->id ?? null,
        ]);
        if ($request->hasFile('image')) {
            $comment->addMediaFromRequest('image')->toMediaCollection('comments_images');
        }

        if ($request->hasFile('video')) {
            $comment->addMediaFromRequest('video')->toMediaCollection('comments_videos');
        }

        if ($thread->type === 'question' && !$comment->comment_id) {
            $thread->all_answers_count++;
            $thread->save();
        }

        if ($comment->comment_id) {
            $data = [
                'reply' => new CommentResource($comment),
            ];
            return InertiaResponse::back($data);
        } else {
            $data = [
                'comment' => new CommentResource($comment),
            ];
            return InertiaResponse::back($data);
        }


    }

    public function getComments(Request $request)
    {
        $comments = Comment::where(['thread_id' => $request->thread_id])->whereNull('comment_id')->with(['replies', 'replies.user'])->latest()->paginate(2);
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
        Log::info('id', array($comment_id));

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
