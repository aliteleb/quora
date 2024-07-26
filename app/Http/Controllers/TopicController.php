<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\TopicRequest;
use App\Http\Resources\TopicResource;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TopicController extends Controller
{
    public function index(): \Inertia\Response
    {
        $context = [
            'topics' => TopicResource::collection(Topic::all())
        ];
        return InertiaResponse::render('SelectTopics', $context);
    }

    public function select_topics(TopicRequest $request)
    {
        $array_values = array_values($request->topics);
        $topics_ids = Topic::whereIn('id', $array_values)->pluck('id');
        auth()->user()->topics()->syncWithoutDetaching($topics_ids);

        return InertiaResponse::back();
    }
}
