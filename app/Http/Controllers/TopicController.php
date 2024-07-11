<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\TopicResource;
use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function index(): \Inertia\Response
    {
        $context = [
            'topics' => TopicResource::collection(Topic::all())
        ];
        return InertiaResponse::render('SelectTopics', $context);
    }

    public function select_topics(Request $request)
    {
        dd($request);
        return InertiaResponse::render('SelectTopics');
    }
}
