<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\SpaceRequest;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\Space;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;


class HomeController extends Controller
{
    public function index()
    {
        $blocked_user_ids = auth()->user()?->blockedUser()->pluck('block_user.blocked_id')->toArray() ?? [];
        $threads = Thread::where('user_id', '!=', auth()->id())->whereNotIn('user_id', $blocked_user_ids)->latest()->paginate(5);
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
