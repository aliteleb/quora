<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\ThreadResource;
use App\Models\Thread;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function follow($type, $id)
    {
        $user = auth()->user();
        Log::info('called');

        if ($type !== 'unfollow') {
            $user->followerUser()->syncWithoutDetaching($id);
        } else {
            $user->followerUser()->detach($id);
        }
    }

    public function block($type, $id)
    {
        $user = auth()->user();
        if ($type !== 'unblock') {

            $user->blockedUser()->syncWithoutDetaching($id);
        } else {

            $user->blockedUser()->detach($id);
        }
    }

    protected function filterThreads($section, $thread_type, $filter_type, $user_id)
    {
        if ($section !== 'profile') {
            if ($filter_type === 'most_popular') {
                $threads = Thread::where('user_id', $user_id)
                    ->where('type', $thread_type)
                    ->orderByRaw('(all_vote_up_count + all_vote_down_count) desc')
                    ->orderBy('created_at', 'desc')
                    ->paginate(3);
            } else {
                $threads = Thread::where('user_id', $user_id)
                    ->where('type', $thread_type)
                    ->orderBy('created_at', 'desc')
                    ->paginate(3);
            }
        } else {
            if ($filter_type === 'most_popular') {
                $threads = Thread::where('user_id', $user_id)
                    ->whereNull('space_id')
                    ->orderByRaw('(all_vote_up_count + all_vote_down_count) desc')
                    ->orderBy('created_at', 'desc')
//                    ->paginate(3);
                    ->get();
                Log::info('inside', array($threads));

            } else {
                $threads = Thread::where('user_id', $user_id)
                    ->whereNull('space_id')
                    ->orderBy('created_at', 'desc')
                    ->paginate(3);
            }
        }

        $threads = ThreadResource::collection($threads);
//        Log::info('th', array($threads));

        $data = ['threads' => $threads];

        return InertiaResponse::back($data);
    }

    public function callFilterThreadsFn($user_id, $section, $type)
    {
        if ($section === 'posts') {
            $this->filterThreads($section, 'post', $type, $user_id);
        } elseif ($section === 'questions') {
            $this->filterThreads($section, 'question', $type, $user_id);
        } else {
            $this->filterThreads($section, 'thread', $type, $user_id);
        }
    }
}
