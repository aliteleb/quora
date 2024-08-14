<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\CommentResource;
use App\Http\Resources\ThreadResource;
use App\Models\Comment;
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
        $threads = null;
        $answers = null;

        if ($section !== 'profile') {
            if ($filter_type === 'most_popular') {
                $threads = Thread::where('user_id', $user_id)
                    ->where('type', $thread_type)
                    ->orderByRaw('(all_vote_up_count + all_vote_down_count) desc')
                    ->orderBy('created_at', 'desc')
                    ->paginate(5);
            } else {
                $threads = Thread::where('user_id', $user_id)
                    ->where('type', $thread_type)
                    ->orderBy('created_at', 'desc')
                    ->paginate(5);
            }
        } else {
            if ($filter_type === 'most_popular') {
                $threads = Thread::where('user_id', $user_id)
                    ->whereNull('space_id')
                    ->orderByRaw('(all_vote_up_count + all_vote_down_count) desc')
                    ->orderBy('created_at', 'desc')
                    ->paginate(5);
            } else {
                $threads = Thread::where('user_id', $user_id)
                    ->whereNull('space_id')
                    ->orderBy('created_at', 'desc')
                    ->paginate(5);
            }
        }

        $threads = $threads ? ThreadResource::collection($threads) : null;
        $answers = $answers ? ThreadResource::collection($answers) : null;

        $data = $section !== 'answers' ? ['threads' => $threads] : ['answers' => $answers];

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

    public function getAnswers($id, $type)
    {

    }

}


//$answers = Comment::where('user_id', $user_id)
//    ->where('type', 'answer')
//    ->orderBy('created_at', 'desc')
//    ->paginate(5);
