<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\EditProfileRequest;
use App\Http\Resources\AnswerResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\Comment;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class UserController extends Controller implements HasMedia
{
    use InteractsWithMedia;
    public function follow($type, $id)
    {
        $follower = User::find($id);
        $follower = new UserResource($follower);
        $user = auth()->user();

        if ($type !== 'unfollow') {
            $user->followerUser()->syncWithoutDetaching($id);
        } else {
            $user->followerUser()->detach($id);
        }

        $data = [
          'user' => $follower
        ];

        return InertiaResponse::back($data);
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
                    ->paginate(5);
                Log::info('questions', array($threads));
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

        $data = [
            'threads' => $threads
        ];

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
        if ($type === 'most_recent') {
            $answers = Comment::where('user_id', $id)
                ->where('type', 'answer')
                ->with([
                    'thread:id,title,created_at',
                    'thread.media',
                ])
                ->orderBy('created_at', 'desc')
                ->paginate(5);
        } else {
            $answers = Comment::where('user_id', $id)
                ->where('type', 'answer')
                ->with('thread')
                ->withCount('votes')
                ->orderBy('votes_count', 'desc')
                ->paginate(5);
        }

        $answers = AnswerResource::collection($answers);
        $data = ['answers' => $answers];

        return InertiaResponse::back($data);
    }

    public function edit(EditProfileRequest $request)
    {
        $user = auth()->user();

        $data = $request->only(['name', 'bio', 'new_password']);

        if ($request->hasFile('avatar')) {
            if ($user->hasMedia('users_avatars')) {
                $user->clearMediaCollection('users_avatars');
            }
            $user->addMediaFromRequest('avatar')->toMediaCollection('users_avatars');
        }

        $data = array_filter($data, function ($value) {
           return !is_null($value);
        });

        if (isset($data['new_password'])) {
            $data['password'] = Hash::make($data['new_password']);
            unset($data['new_password']);
        }

        $user->update($data);
        $user->loadCount(['posts', 'answers', 'followedSpaces', 'questions']);
        $user = new UserResource($user);

        return InertiaResponse::back(['user' => $user]);
    }

}



