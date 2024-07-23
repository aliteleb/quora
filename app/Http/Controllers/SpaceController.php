<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\SpaceRequest;
use App\Models\Space;
use App\Models\Topic;
use App\Triats\HttpResponses;
use Illuminate\Http\Request;

class SpaceController extends Controller
{
    use HttpResponses;
    public function create(SpaceRequest $request)
    {
        $validated_data = $request->validated();
        $request_topics = $validated_data['topics'];
        $topics_ids = Topic::whereIn('name', $request_topics)->pluck('id');

        unset($validated_data['topics']);

        $space = Space::create($validated_data);

        $space->topics()->attach($topics_ids);

        return InertiaResponse::route('index', [
            'space' => $space
        ]);
    }

    public function index()
    {
        return InertiaResponse::render('Spaces/Spaces');
    }

}
