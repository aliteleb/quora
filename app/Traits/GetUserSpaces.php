<?php

namespace App\Traits;

use App\Http\Resources\SpaceResource;

trait GetUserSpaces
{
    protected function getUserSpaces()
    {
        $user = context('user');
        if ($user) {
            $spaces = $user->space()
                ->with('media')
                ->paginate(5);
            return SpaceResource::collection($spaces);
        }
    }
}
