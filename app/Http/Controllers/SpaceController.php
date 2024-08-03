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
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

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

    protected function getThreadsByType($space_id, $type)
    {
        $threads = Thread::where('space_id', $space_id)->where('type', $type)->latest()->paginate(3);
        return ThreadResource::collection($threads);
    }

    protected function getThreeRandomSimilarSpaces($space, $slug)
    {
        $recommended_spaces = collect();
        $topics = $space->topics;

        foreach ($topics as $topic) {
            $recommended_spaces = $recommended_spaces->merge($topic->spaces);
        }

        $recommended_spaces = $recommended_spaces->unique('id');
        $recommended_spaces = array_filter($recommended_spaces->toArray(), function ($space) use ($slug) {
            return $space['slug'] !== $slug;
        });
        $recommended_spaces = collect($recommended_spaces);

        if ($recommended_spaces->count() > 3) {
            $random_keys = array_rand($recommended_spaces->toArray(), 3);
            $random_spaces = array_map(function ($key) use ($recommended_spaces) {
                return $recommended_spaces[$key];
            }, $random_keys);
            $recommended_spaces = collect($random_spaces);
        }

        return $recommended_spaces->values();
    }

    public function showSpace($slug)
    {
        $space = Space::where('slug', $slug)->first();
        $space = new SpaceResource($space);

        $posts = $this->getThreadsByType($space->id, 'post');
        $questions = $this->getThreadsByType($space->id, 'question');

        $recommended_spaces = $this->getThreeRandomSimilarSpaces($space, $slug);

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
