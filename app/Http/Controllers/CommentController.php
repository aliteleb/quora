<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\CreateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CommentController extends Controller implements HasMedia
{
    use InteractsWithMedia;
    public function addComment(CreateCommentRequest $request)
    {
        $comment = Comment::create([
            'user_id' => $request->user_id,
            'body' => $request->body,
            'thread_id' => $request->thread_id,
        ]);

        if ($request->hasFile('image'))
        {
            $comment->addMediaFromRequest('image')->toMediaCollection('comments_images');
        }

        if ($request->hasFile('video'))
        {
            $comment->addMediaFromRequest('video')->toMediaCollection('comments_videos');
        }
    }

    public function getComments(Request $request)
    {
        $comments = Comment::where(['thread_id' => $request->thread_id])->whereNull('comment_id')->with(['replies', 'replies.user'])->latest()->paginate(5);
        $next_page_url = $comments->nextPageUrl();
        $comments = $comments->getCollection();

        flattenComments($comments);

        Log::info('comments_without_resource', array($comments));
        Log::info('comments_with_resource', array(CommentResource::collection($comments)));
        $data = [
            'comments' => CommentResource::collection($comments),
            'next_page_url' => $next_page_url,
        ];
        return InertiaResponse::render('Home/Home', $data);
    }

}
