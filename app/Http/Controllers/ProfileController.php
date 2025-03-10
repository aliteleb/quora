<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\FollowedSpacesResource;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    protected function getProfileThreads($id)
    {
        $user = context('user');
        $threads = Thread::where('user_id', $id)
            ->whereNull('space_id')
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        if ($user->id !== $id) {
            $threads = Thread::where('user_id', $id)
                ->where('visibility', 'public')
                ->whereNull('space_id')
                ->orderBy('created_at', 'desc')
                ->paginate(5);
        }

        return ThreadResource::collection($threads);

    }
    public function showUser($username)
    {
        $user = User::whereUsername($username)
            ->withCount('posts', 'answers', 'followedSpaces', 'questions', 'followedUser', 'followerUser')
            ->first(['name', 'bio', 'username', 'id', 'created_at']);
        if (!$user) {
            abort(404);
        }

        $followed_spaces = $user->followedSpaces;
        $followed_spaces = FollowedSpacesResource::collection($followed_spaces);

        $auth_user = context('user');
        $is_followed = in_array($user->id ,$auth_user->followed_ids);
        $is_blocked = in_array($user->id ,$auth_user->blocked_ids);

        $threads = $this->getProfileThreads($user->id);

        $user = new UserResource($user);
        $data = [
            'user' => $user,
            'is_followed' => $is_followed,
            'is_blocked' => $is_blocked,
            'threads' => $threads,
        ];

        if ($followed_spaces->isNotEmpty()) {
            $data['followed_spaces'] = $followed_spaces;
        }

        return InertiaResponse::render('Profile/Pages/Profile', $data);
    }
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
