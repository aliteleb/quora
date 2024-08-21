<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\Space;
use App\Models\Thread;
use App\Models\User;
use App\Traits\GetUserSpaces;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    use GetUserSpaces;
    public function index()
    {
        $user_created_spaces = $this->getUserSpaces();
        $data = ['user_created_spaces' => $user_created_spaces];

        return InertiaResponse::render('Search/Pages/SearchResults', $data);
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

        return InertiaResponse::route('search.index', [], ['search' => $data]);
    }
}
