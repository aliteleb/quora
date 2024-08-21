<?php

namespace App\Traits;

use App\Http\Resources\SpaceResource;

trait GetUserSpaces
{
    protected function getUserSpaces()
    {
        $user = auth()->user();
        $spaces = $user->space()
            ->with('media')
            ->withCount('followers')
            ->paginate(5);
        return SpaceResource::collection($spaces);
    }
}
