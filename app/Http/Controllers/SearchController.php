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
use Illuminate\Support\Facades\Log;

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

        $user = auth()->user();
        $user_space_ids = $user->space()->pluck('spaces.id');

        $users = User::whereAny(['name'], 'LIKE', "%$keyword%")->where('id', '!=', auth()->id())->limit(5)->get();
        $spaces = Space::where('name', 'LIKE', "%$keyword%")->whereNotIn('id', $user_space_ids)->limit(5)->get();
        $threads = Thread::where('title', 'LIKE', "%$keyword%")->limit(5)->get();

        $data = [
            'users' => UserResource::collection($users),
            'spaces' => SpaceResource::collection($spaces),
            'threads' => ThreadResource::collection($threads),
            'user_created_spaces' => $this->getUserSpaces(),
        ];

        return InertiaResponse::route('search.index', [], $data);
    }
}
