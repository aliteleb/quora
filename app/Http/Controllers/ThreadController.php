<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\CreateThreadRequest;
use App\Models\Space;
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
    use InteractsWithMedia;
    public function create(CreateThreadRequest $request)
    {
        $space_id = Space::where('name', $request->space)->first('id');
        Log::info('id', array($space_id));
        $thread = Thread::create([
            'type' => $request->type,
            'title' => $request->title,
            'visibility' => $request->visibility,
            'user_id' => $request->user_id,
            'space_id' => $space_id ? $space_id['id'] : null ,
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
        $thread = Thread::where('id', $thread_id)->first();
        $vote_type = $request->vote_type;

        $user_has_voted_up = Vote::where('user_id', $user_id)->where('vote_type', 'up')->where('thread_id', $thread_id);
        $user_has_voted_down = Vote::where('user_id', $user_id)->where('vote_type', 'down')->where('thread_id', $thread_id);

        $vote = [];
        if ($vote_type === 'up' && $user_has_voted_up->exists()) {
            $user_has_voted_up->delete();
            $this->updateVoteCounts($thread, $vote_type, true);
        } else if ($vote_type === 'down' && $user_has_voted_down->exists()) {
            $user_has_voted_down->delete();
            $this->updateVoteCounts($thread, $vote_type, true);
        } else {
            if ($vote_type === 'up' || $vote_type === 'down') {
                $opposite_vote = ($vote_type === 'up') ? $user_has_voted_down : $user_has_voted_up;
                if ($opposite_vote->exists()) {
                    $opposite_vote->delete();
                }

                $vote = Vote::create([
                    'user_id' => $user_id,
                    'vote_type' => $vote_type,
                    'thread_id' => $thread_id
                ]);
                $opposite_vote = ($vote_type === 'up') ? 'down' : 'up';

                $this->updateVoteCounts($thread, $opposite_vote);
            }
        }
        $thread->save();

        $thread_up_votes_count = Vote::where('thread_id', $thread_id)->where('vote_type', 'up')->count();
        $thread_down_votes_count = Vote::where('thread_id', $thread_id)->where('vote_type', 'down')->count();

        $vote_count = [
            'all_up_votes_count' => $thread_up_votes_count,
            'all_down_votes_count' => $thread_down_votes_count
        ];

        return InertiaResponse::back(['vote' => $vote ?: null, 'vote_count' => $vote_count]);
    }
    protected function updateVoteCounts($thread, $vote_type, $removeVote = false)
    {
        if ($vote_type === 'up') {
            if (!$removeVote) {
                $thread->all_vote_down_count++;
            }
            if ($thread->all_vote_up_count > 0) {
                $thread->all_vote_up_count--;
            }
        } else {
            if (!$removeVote) {
                $thread->all_vote_up_count++;
            }
            if ($thread->all_vote_down_count > 0) {
                $thread->all_vote_down_count--;
            }
        }
    }

    public function deletePost($id)
    {
        $thread = Thread::find($id);
        if ($thread) {
            $thread->delete();
        }
    }


}
