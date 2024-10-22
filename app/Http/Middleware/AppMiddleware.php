<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AppMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (auth()->check())
        {
            $user = auth()->user();
            $user = User::with(['topics', 'un_read_notifications', 'followedSpaces'])->find($user->id);
            $user->followed_ids = $user->followerUser()->pluck('followed_id')->toArray();
            $user->blocked_ids = $user->blockedUser()->pluck('blocked_id')->toArray();
            context()->add('user', $user);
        }

        return $next($request);
    }
}
