<?php

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

function settings (string|null $key = null, $default = null) {
    $settings = Cache::rememberForever('settings', function () {
        $all_settings = Setting::all()->pluck('value', 'key');

        $all_settings['icon'] = Storage::disk('public')->url($all_settings['icon'] ?? null);
        $all_settings['logo'] = Storage::disk('public')->url($all_settings['logo'] ?? null);
        $all_settings['background'] = Storage::disk('public')->url($all_settings['background'] ?? null);

        return $all_settings;
    });

    if (is_null($key)) {
        return $settings;
    }

    return $settings[$key] ?? $default;

}

function flattenAllReplies(array $comments)
{
    $flattened = [];

    foreach ($comments as $commentArray) {
        $comment = Comment::find($commentArray['id']);

        $nestedComments = $commentArray['replies'];
        $commentArray['created_at'] = Carbon::parse($commentArray['created_at'])->diffForHumans();
        unset($commentArray['replies']);
        $commentArray['up_votes'] = $comment->votes()->where('vote_type', 'up')->whereNull('thread_id')->count();
        $commentArray['down_votes'] = $comment->votes()->where('vote_type', 'down')->whereNull('thread_id')->count();
        $commentArray['vote'] = $comment->votes()->where('user_id', auth()->id())->whereNull('thread_id')->first(['vote_type'])?->vote_type;

        $flattened[] = $commentArray;

        if (!empty($nestedComments)) {
            $flattened = array_merge($flattened, flattenAllReplies($nestedComments));
        }
    }

    return $flattened;
}

function flattenComments(Collection $comments)
{
    foreach ($comments as $comment) {
        $nestedComments = $comment['replies'] ?? [];
        unset($comment['replies']);
        $commentInstance = Comment::find($comment['id']);
        $comment['up_votes'] = $commentInstance->votes()->where('vote_type', 'up')->whereNull('thread_id')->count();
        $comment['down_votes'] = $commentInstance->votes()->where('vote_type', 'down')->whereNull('thread_id')->count();
        $comment['vote'] = $commentInstance->votes()->where('user_id', auth()->id())->whereNull('thread_id')->first(['vote_type'])?->vote_type;

        if ($nestedComments) {
            $comment['replies'] = flattenAllReplies($nestedComments->toArray());
        }
    }
    return $comments;
}


