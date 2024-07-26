<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\ThreadResource;
use App\Models\Thread;

class HomeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $topics = $user->topics;

        if ($topics->count() === 0) {
            return InertiaResponse::route('select_topics');
        }

        $threads = Thread::latest()->paginate(3);

        $data = [
            'threads' => ThreadResource::collection($threads),
        ];
        return InertiaResponse::render('Home/Pages/Home', $data);
    }

}
