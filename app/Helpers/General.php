<?php

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

    foreach ($comments as $comment) {
        $nestedComments = $comment['replies'];
        $comment['created_at'] = Carbon::parse($comment['created_at'])->diffForHumans();
        unset($comment['replies'], $comment['updated_at']);
        $flattened[] = $comment;

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
        $comment['creation_date'] = $comment['created_at']->diffForHumans();
        unset($comment['replies'], $comment['updated_at'], $comment['created_at']);
        if ($nestedComments) {
            $comment['replies'] = flattenAllReplies($nestedComments->toArray());
        }
    }
    return $comments;
}

