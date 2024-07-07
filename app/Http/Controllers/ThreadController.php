<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateThreadRequest;
use App\Models\Thread;
use App\Triats\HttpResponses;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ThreadController extends Controller implements HasMedia
{
    use HttpResponses, InteractsWithMedia;
    public function create(CreateThreadRequest $request)
    {
        $thread = Thread::create([
           'title' => $request->title,
           'user_id' => $request->user_id,
        ]);

        if ($request->hasFile('image'))
        {
            $thread->addMediaFromRequest('image')->toMediaCollection('threads_images');
        }

        if ($request->hasFile('video'))
        {
            $thread->addMediaFromRequest('video')->toMediaCollection('threads_videos');
        }
    }
}
