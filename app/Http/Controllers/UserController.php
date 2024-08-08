<?php

namespace App\Http\Controllers;

class UserController extends Controller
{
    public function follow($type, $id)
    {
        $user = auth()->user();

        if ($type !== 'unfollow') {
            $user->followerUser()->syncWithoutDetaching($id);
        } else {
            $user->followerUser()->detach($id);
        }

    }
}
