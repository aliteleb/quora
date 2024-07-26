<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\SpaceRequest;
use App\Http\Resources\DiscoverSpaceResource;
use App\Http\Resources\SpaceResource;
use App\Models\Space;
use App\Models\Topic;
use App\Triats\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        $space->user()->attach(auth()->id());

        return InertiaResponse::route('index', ['space' => $space]);
    }

    public function index()
    {
        $spaces = Space::paginate(8);
        $spaces = DiscoverSpaceResource::collection($spaces);
        $next_page_url = $spaces->nextPageUrl();

        $data = [
            'spaces' => $spaces,
            'next_page_url' => $next_page_url,
        ];

        return InertiaResponse::render('Spaces/Pages/Spaces', ['data' => $data]);
    }

    public function showSpace($slug)
    {
        $space = Space::where('slug', $slug)->first();
        $space = new SpaceResource($space);
        return InertiaResponse::render('Spaces/Pages/ShowSpace', ['space' => $space]);
    }

    public function followSpace($id)
    {
        $space = Space::where('id', $id)->first();
        $space->followers()->attach(auth()->id());
        $space = new SpaceResource($space);

        return InertiaResponse::render('Spaces/Pages/ShowSpace', ['space' => $space]);
    }

}
