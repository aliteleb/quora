<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\SpaceRequest;
use App\Http\Resources\DiscoverSpaceResource;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ThreadResource;
use App\Models\Space;
use App\Models\Thread;
use App\Models\Topic;
use App\Triats\HttpResponses;
use Illuminate\Support\Facades\Log;

class SpaceController extends Controller
{
    use HttpResponses;
    public function create(SpaceRequest $request)
    {
        $validated_data = $request->validated();
        unset($validated_data['user_id']);
        $request_topics = $validated_data['topics'];
        $topics_ids = Topic::whereIn('name', $request_topics)->pluck('id');

        unset($validated_data['topics']);
        $space = Space::create($validated_data);

        $space->topics()->attach($topics_ids);
        $space->user()->attach(auth()->id());

        return InertiaResponse::back(['space' => $space]);
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

        $posts = Thread::where('space_id', $space->id)->where('type', 'post')->latest()->paginate(3);
        $posts = ThreadResource::collection($posts);

        $questions = Thread::where('space_id', $space->id)->where('type', 'question')->latest()->paginate(3);
        $questions = ThreadResource::collection($questions);

        $recommended_spaces = [];
        $topics = $space->topics;
        if (count($topics) === 1) {
            $topic = $topics[0];
            $spaces = $topic->spaces;

            if ($spaces->count() > 3) {
                $random_keys = array_rand($spaces->toArray(), 3);
                $random_spaces = array_map(function($key) use ($spaces) {
                    return $spaces[$key];
                }, $random_keys);
            } else {
                $random_spaces = $spaces;
            }
            array_push($recommended_spaces, ...$random_spaces);
        }

        $data = [
            'space' => $space,
            'posts' => $posts,
            'questions' => $questions,
            'recommended_spaces' => $recommended_spaces,
        ];
        return InertiaResponse::render('Spaces/Pages/ShowSpace', ['data' => $data]);
    }

    public function followSpace($id)
    {
        $space = Space::where('id', $id)->first();
        $space->followers()->attach(auth()->id());
        $space = new SpaceResource($space);

        $data = [
          'space' => $space
        ];

        return InertiaResponse::back(['data' => $data]);
    }

    public function unFollowSpace($id)
    {
        $space = Space::where('id', $id)->first();
        $space->followers()->detach(auth()->id());
        $space = new SpaceResource($space);

        $data = [
            'space' => $space
        ];
        return InertiaResponse::back(['data' => $data]);
    }

}
