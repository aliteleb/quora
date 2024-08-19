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
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class HomeController extends Controller
{
    public function index()
    {
        $blocked_user_ids = auth()->user()
            ?->blockedUser()
            ->pluck('block_user.blocked_id')
            ->toArray() ?? [];

        $user_commented_threads = Comment::where('user_id', auth()->id())
            ->distinct()
            ->pluck('thread_id');

        $user_voted_threads = Vote::where('user_id', auth()->id())
            ->whereNotNull('thread_id')
            ->pluck('thread_id');

        $threads = Thread::where('user_id', '!=', auth()->id())
            ->whereNotIn('user_id', $blocked_user_ids)
            ->whereNotIn('id', $user_commented_threads)
            ->whereNotIn('id', $user_voted_threads)
            ->latest()
            ->paginate(5);

        $data = [
            'threads' => ThreadResource::collection($threads),
        ];
        return InertiaResponse::render('Home/Pages/Home', $data);
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
