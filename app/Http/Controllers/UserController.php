<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function follow($type, $id)
    {
        $user = auth()->user();
        Log::info('called');

        if ($type !== 'unfollow') {
            $user->followerUser()->syncWithoutDetaching($id);
        } else {
            $user->followerUser()->detach($id);
        }
    }

    public function block($type, $id)
    {
        $user = auth()->user();
        if ($type !== 'unblock') {

            $user->blockedUser()->syncWithoutDetaching($id);
        } else {

            $user->blockedUser()->detach($id);
        }
    }
}
