<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\FollowedSpacesResource;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\PostAction;
use App\Models\Space;
use App\Models\Thread;
use App\Models\User;
use App\Traits\GetUserSpaces;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
    use GetUserSpaces;

    public function quickSearch(Request $request)
    {
        $keyword = $request->input('q');

        if(!$keyword) {
            return InertiaResponse::back();
        }

        $user = auth()->user();
        $user_spaces_ids = $user->space()->pluck('spaces.id');

        $users = User::whereAny(['name'], 'LIKE', "%$keyword%")->where('id', '!=', $user->id)->limit(5)->get();
        $spaces = Space::where('name', 'LIKE', "%$keyword%")->whereNotIn('id', $user_spaces_ids)->limit(5)->get();
        $threads = Thread::where('title', 'LIKE', "%$keyword%")->where('user_id', '!=', $user->id)->limit(5)->get();

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
        $user_spaces_ids = $user->space()->pluck('spaces.id');

        $users = User::whereAny(['name'], 'LIKE', "%$keyword%")->where('id', '!=', $user->id)->limit(5)->get();
        $spaces = Space::where('name', 'LIKE', "%$keyword%")->whereNotIn('id', $user_spaces_ids)->limit(5)->get();
        $threads = Thread::where('title', 'LIKE', "%$keyword%")->where('user_id', '!=', $user->id)->paginate(5);

        $data = [
            'users' => UserResource::collection($users),
            'spaces' => SpaceResource::collection($spaces),
            'threads' => ThreadResource::collection($threads),
            'user_created_spaces' => $this->getUserSpaces(),
        ];

        return InertiaResponse::render('Search/Pages/SearchResults', $data);
    }

    public function searchInSpaces($keyword)
    {
        $followed_spaces_ids = auth()->user()->followedSpaces()->pluck('follow_space.space_id');
        $spaces = Space::where('name', 'LIKE', "%$keyword%")->whereIn('id', $followed_spaces_ids)->limit(6)->get();
        $spaces = FollowedSpacesResource::collection($spaces);
        $data = [
            'followed_spaces' => $spaces
        ];

        return InertiaResponse::back($data);
    }

    public function savedThreads()
    {
        $saved_threads_ids = PostAction::where('type', 'save')
            ->where('user_id', auth()->id())
            ->pluck('thread_id');
        $saved_threads = Thread::whereIn('id', $saved_threads_ids)->paginate(3);
        $saved_threads = ThreadResource::collection($saved_threads);
        $data = [
            'saved_threads' => $saved_threads
        ];

        return InertiaResponse::render('Bookmarks/Pages/Bookmarks', $data);
    }
}
