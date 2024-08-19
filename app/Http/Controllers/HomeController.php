<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\SpaceRequest;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\Comment;
use App\Models\Space;
use App\Models\Thread;
use App\Models\Uninterested;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class HomeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $blocked_user_ids = $user
            ?->blockedUser()
            ->pluck('block_user.blocked_id')
            ->toArray() ?? [];

        $user_commented_threads = Comment::where('user_id', $user->id)
            ->distinct()
            ->pluck('thread_id');

        $user_voted_threads = Vote::where('user_id', $user->id)
            ->whereNotNull('thread_id')
            ->pluck('thread_id');

        $user_hide_and_saved_threads = Uninterested::where('user_id', $user->id)
            ->whereIn('type', ['hide', 'save'])
            ->whereNotNull('thread_id')
            ->pluck('thread_id');

        Log::info('save', array($user_hide_and_saved_threads));

        $excluded_thread_ids = array_merge(
            $user_commented_threads->toArray(),
            $user_voted_threads->toArray(),
            $user_hide_and_saved_threads->toArray(),
        );

        $threads = Thread::where('user_id', '!=', $user->id)
            ->whereNotIn('user_id', $blocked_user_ids)
            ->whereNotIn('id', $excluded_thread_ids)
            ->latest()
            ->paginate(5);

        $user_created_spaces = $this->getUserSpaces();

        $data = [
            'threads' => ThreadResource::collection($threads),
            'user_created_spaces' => $user_created_spaces,
        ];
        return InertiaResponse::render('Home/Pages/Home', $data);
    }

    protected function getUserSpaces()
    {
        $user = auth()->user();
        $spaces = $user->space()
            ->with('media')
            ->withCount('followers')
            ->paginate(5);
        return SpaceResource::collection($spaces);
    }

    public function quickSearch(Request $request)
    {
        $keyword = $request->input('q');

        if(!$keyword) {
            return InertiaResponse::back();
        }

        $users = User::whereAny(['name', 'username',], 'LIKE', "%$keyword%")->limit(5)->get();
        $spaces = Space::where('name', 'LIKE', "%$keyword%")->limit(5)->get();
        $threads = Thread::where('title', 'LIKE', "%$keyword%")->limit(5)->get();

        $data = [
            'users' => UserResource::collection($users),
            'spaces' => SpaceResource::collection($spaces),
            'threads' => ThreadResource::collection($threads),
        ];

        return InertiaResponse::back(['search' => $data]);
    }

    public function search(Request $request)
    {
        $keyword = $request->input('q');

        dd($keyword);
        if(!$keyword) {
            return InertiaResponse::back();
        }

        $users = User::whereAny(['name', 'username',], 'LIKE', "%$keyword%")->limit(5)->get();
        $spaces = Space::where('name', 'LIKE', "%$keyword%")->limit(5)->get();
        $threads = Thread::where('title', 'LIKE', "%$keyword%")->limit(5)->get();

        $data = [
            'users' => UserResource::collection($users),
            'spaces' => SpaceResource::collection($spaces),
            'threads' => ThreadResource::collection($threads),
        ];

        return InertiaResponse::back(['search' => $data]);
    }

}
