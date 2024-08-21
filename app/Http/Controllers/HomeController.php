<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\Comment;
use App\Models\PostAction;
use App\Models\Space;
use App\Models\Thread;
use App\Models\User;
use App\Models\Vote;
use App\Traits\GetUserSpaces;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class HomeController extends Controller
{
    use GetUserSpaces;
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

        $user_hide_and_saved_threads = PostAction::where('user_id', $user->id)
            ->whereIn('type', ['hide', 'save', 'share'])
            ->whereNotNull('thread_id')
            ->pluck('thread_id');

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

}
