<?php

namespace App\Http\Middleware;

use App\Http\Resources\FollowedSpacesResource;
use App\Http\Resources\UserResource;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = auth()->user();
        if ($user) {
            $followed_spaces = $user->followedSpaces->shuffle()->take(6);
            $followed_spaces = FollowedSpacesResource::collection($followed_spaces);
        }

        $settings = settings();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? (new UserResource($request->user()))->resolve() : null,
            ],
            'settings' => $settings,
            'followed_spaces' => $user ? $followed_spaces : [],
        ];
    }
}
