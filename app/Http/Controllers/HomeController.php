<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\ThreadResource;
use App\Models\Thread;


class HomeController extends Controller
{
    public function index()
    {
        $blocked_user_ids = auth()->user()->blockedUser()->pluck('block_user.blocked_id')->toArray();
        $threads = Thread::where('user_id', '!=', auth()->id())->whereNotIn('user_id', $blocked_user_ids)->latest()->paginate(5);
        $data = [
            'threads' => ThreadResource::collection($threads),
        ];
        return InertiaResponse::render('Home/Pages/Home', $data);
    }

}
