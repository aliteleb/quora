<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\TopicResource;
use App\Models\Thread;
use App\Models\Topic;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    public function index()
    {
        $threads = Thread::where('user_id', '!=', auth()->id())->latest()->paginate(5);
        $data = [
            'threads' => ThreadResource::collection($threads),
        ];
        return InertiaResponse::render('Home/Pages/Home', $data);
    }

}
