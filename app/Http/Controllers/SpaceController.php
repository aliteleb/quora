<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\EditSpaceAboutRequest;
use App\Http\Requests\EditSpaceRequest;
use App\Http\Requests\SpaceRequest;
use App\Http\Resources\DiscoverSpaceResource;
use App\Http\Resources\SpaceResource;
use App\Http\Resources\ThreadResource;
use App\Http\Resources\UserResource;
use App\Models\Space;
use App\Models\Thread;
use App\Models\Topic;
use App\Triats\HttpResponses;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Response;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class SpaceController extends Controller implements HasMedia
{
    use HttpResponses, InteractsWithMedia;
    public function create(SpaceRequest $request)
    {
        $validated_data = $request->validated();

        $user_id = $validated_data['user_id'];

        unset($validated_data['user_id']);
        $request_topics = $validated_data['topics'];
        $topics_ids = Topic::whereIn('name', $request_topics)->pluck('id');

        unset($validated_data['topics']);
        $space = Space::create($validated_data);
        $space->followers()->attach($user_id);

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
        $topics = $space->topics;
        $recommended_spaces = collect();

        foreach ($topics as $topic) {
            $recommended_spaces = $recommended_spaces->merge($topic->spaces);
        }

        $recommended_spaces = $recommended_spaces->unique('id')
            ->filter(function ($space) use ($slug) {
                $spaceResource = new SpaceResource($space);
                $spaceArray = $spaceResource->toArray(request());

                return $space->slug !== $slug && $space->user[0]->id !== auth()->id() && !$spaceArray['is_followed'];
            });

        if ($recommended_spaces->count() > 3) {
            $recommended_spaces = $recommended_spaces->random(3);
        }

        return $recommended_spaces->values();
    }

    public function showSpace($slug)
    {
        $space = Space::where('slug', $slug)->first();
        if (!$space) {
            return InertiaResponse::error(['error' => 'تعذر العثور على المساحة.']);
        }
        $space = new SpaceResource($space);

        $posts = $this->getThreadsByType($space->id, 'post');
        $questions = $this->getThreadsByType($space->id, 'question');

        $recommended_spaces = $this->getThreeRandomSimilarSpaces($space, $slug);
        $recommended_spaces = SpaceResource::collection($recommended_spaces);

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

    protected function filterThreads($filter_type, $space_id, $thread_type)
    {
        if ($filter_type === 'most_popular') {
            $threads = Thread::where('space_id', $space_id)->where('type', $thread_type)->orderByRaw('(all_vote_up_count + all_vote_down_count) desc')->paginate(3);
        } else {
            $threads = Thread::where('space_id', $space_id)->where('type', $thread_type)->orderBy('created_at', 'desc')->paginate(3);
        }
        $threads = ThreadResource::collection($threads);
        $data = ['threads' => $threads];

        return InertiaResponse::back($data);
    }

    public function callFilterThreadsFn($section, $type, $space_id)
    {
        if ($section === 'posts') {
            $this->filterThreads($type, $space_id, 'post');
        } else {
            $this->filterThreads($type, $space_id, 'question');
        }
    }

    public function edit(EditSpaceRequest $request, $id)
    {
        $space = Space::find($id);

        if (!$space) {
            return InertiaResponse::error(['error' => 'تعذر العثور على المساحة.']);
        }

        $data = $request->only(['name', 'description']);

        if ($request->hasFile('avatar')) {
            if ($space->hasMedia('spaces_avatars')) {
                $space->clearMediaCollection('spaces_avatars');
            }
            $space->addMediaFromRequest('avatar')->toMediaCollection('spaces_avatars');
        }

        if ($request->hasFile('cover')) {
            if ($space->hasMedia('spaces_covers')) {
                $space->clearMediaCollection('spaces_covers');
            }
            $space->addMediaFromRequest('cover')->toMediaCollection('spaces_covers');
        }

        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });


        $space->update($data);
        $space = new SpaceResource($space);

        $data = [
            'space' => $space
        ];

        return InertiaResponse::route('showSpace', ['slug' => $space->slug], $data);
    }

    public function about(EditSpaceAboutRequest $request, $id)
    {
        $space = Space::find($id);

        if (!$space) {
            return InertiaResponse::error(['error' => 'تعذر العثور على المساحة.']);
        }

        $details = $request->text;
        $space->details = $details;
        $space->update();
    }


}
