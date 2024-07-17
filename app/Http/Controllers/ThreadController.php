<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\CreateThreadRequest;
use App\Models\Thread;
use App\Models\Vote;
use App\Triats\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ThreadController extends Controller implements HasMedia
{
    use HttpResponses, InteractsWithMedia;
    public function create(CreateThreadRequest $request)
    {
        $thread = Thread::create([
            'type' => $request->type,
            'title' => $request->title,
            'visibility' => $request->visibility,
            'user_id' => $request->user_id,
        ]);

        if ($request->hasFile('image'))
        {
            $thread->addMediaFromRequest('image')->toMediaCollection('threads_images');
        }

        if ($request->hasFile('video'))
        {
            $thread->addMediaFromRequest('video')->toMediaCollection('threads_videos');
        }
    }

    public function vote(Request $request)
    {
        $user_id = auth()->id();
        $thread_id = $request->thread_id;
        $vote_type = $request->vote_type;

        $voted_up = Vote::where('user_id', $user_id)->where('vote_type', 'up')->where('thread_id', $thread_id);
        $voted_down = Vote::where('user_id', $user_id)->where('vote_type', 'down')->where('thread_id', $thread_id);

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
                    'thread_id' => $thread_id
                ]);
            }
        }

        $thread_up_votes_count = Vote::where('thread_id', $thread_id)->where('vote_type', 'up')->count();
        $thread_down_votes_count = Vote::where('thread_id', $thread_id)->where('vote_type', 'down')->count();

        $vote_count = [
            'all_up_votes_count' => $thread_up_votes_count,
            'all_down_votes_count' => $thread_down_votes_count
        ];

        return InertiaResponse::route('index', ['vote' => $vote ?: null, 'vote_count' => $vote_count]);
    }


}
