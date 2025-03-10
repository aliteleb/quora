<?php

namespace App\Http\Middleware;

use App\Helpers\InertiaResponse;
use App\Http\Resources\TopicResource;
use App\Models\Topic;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserSelectTopic
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $context = [
           'topics' => TopicResource::collection(Topic::all())
        ];

        $user = auth()->user()?->load(['topics']);
        if ($user) {
            $topics = $user->topics ?? collect();
            if ($topics->count() === 0) {
                return InertiaResponse::route('select_topics', [], $context);
            }
        }

        return $next($request);
    }
}
