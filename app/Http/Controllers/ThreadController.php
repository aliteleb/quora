<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\CreateThreadRequest;
use App\Http\Resources\ThreadResource;
use App\Models\Notification;
use App\Models\PostAction;
use App\Models\Space;
use App\Models\Thread;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ThreadController extends Controller implements HasMedia
{
    use InteractsWithMedia;

    public function create(CreateThreadRequest $request)
    {
        $space_id = Space::where('name', $request->space)->first('id');
        $thread = Thread::create([
            'type' => $request->type,
            'title' => $request->title,
            'visibility' => $request->visibility,
            'user_id' => $request->user_id,
            'space_id' => $space_id ? $space_id['id'] : null,
        ]);

        if ($request->hasFile('image')) {
            $thread->addMediaFromRequest('image')->toMediaCollection('threads_images');
        }

        if ($request->hasFile('video')) {
            $thread->addMediaFromRequest('video')->toMediaCollection('threads_videos');
        }

        if ($request->visibility === 'public') {
            $this->addThreadNotification($request->input('type'), $thread->id, $thread->type, 'public');
        } else {
            $this->addThreadNotification($request->input('type'), $thread->id, $thread->type, 'private');
        }
    }

    protected function addThreadNotification($type, $thread_id, $thread_type, $visibility = null, $add_type = '', $thread_user_id = null): void
    {
        if ($add_type === 'vote') {
            $vote_type = $type === 'up' ? 'up_vote' : 'down_vote';
            if ($thread_type === 'question') {
                $notification_exists = Notification::where('type', $vote_type)
                    ->where('user_id', $thread_user_id)
                    ->where('question_id', $thread_id)
                    ->exists();
                if (!$notification_exists) {
                    Notification::create([
                        'type' => $vote_type,
                        'user_id' => $thread_user_id,
                        'question_id' => $thread_id,
                        'notification_maker_id' => auth()->id(),
                    ]);
                }
            } else if ($thread_type === 'post'){
                $notification_exists = Notification::where('type', $vote_type)
                    ->where('user_id', $thread_user_id)
                    ->where('post_id', $thread_id)
                    ->exists();
                if (!$notification_exists) {
                    Notification::create([
                        'type' => $vote_type,
                        'user_id' => $thread_user_id,
                        'post_id' => $thread_id,
                        'notification_maker_id' => auth()->id(),
                    ]);
                }
            }

        } else {
            $followers_ids = auth()->user()->followedUser()->pluck('follow_user.user_id');
            if ($followers_ids->count() > 0 && (!$visibility || $visibility === 'public')) {
                foreach ($followers_ids as $follower_id) {
                    Notification::create([
                        'type' => $type,
                        'user_id' => $follower_id,
                        'question_id' => $thread_type === 'question' ? $thread_id : null,
                        'post_id' => $thread_type === 'post' ? $thread_id : null,
                        'notification_maker_id' => auth()->id(),
                    ]);
                }
            }
        }

    }

    public function vote(Request $request)
    {
        $user_id = auth()->id();
        $thread = Thread::where('id', $request->thread_id)->first();
        $vote_type = $request->vote_type;
        $is_answer = $request->isAnswer;

        $up_vote_query = Vote::where('user_id', $user_id)->where('vote_type', 'up');
        $down_vote_query = Vote::where('user_id', $user_id)->where('vote_type', 'down');

        $user_has_voted_up = $is_answer ? $up_vote_query->where('comment_id', $thread->id) : $up_vote_query->where('thread_id', $thread->id);
        $user_has_voted_down = $is_answer ? $down_vote_query->where('comment_id', $thread->id) : $down_vote_query->where('thread_id', $thread->id);

        if ($vote_type === 'up' && $user_has_voted_up->exists()) {
            $user_has_voted_up->delete();
            $this->getVotesCount('thread_id', $thread->id);
            if (!$is_answer) {
                $this->updateVoteCounts($thread, $vote_type, true);
            }
        } else if ($vote_type === 'down' && $user_has_voted_down->exists()) {
            $user_has_voted_down->delete();
            $this->getVotesCount('thread_id', $thread->id);
            if (!$is_answer) {
                $this->updateVoteCounts($thread, $vote_type, true);
            }
        } else {
            if ($vote_type === 'up' || $vote_type === 'down') {
                $opposite_vote = ($vote_type === 'up') ? $user_has_voted_down : $user_has_voted_up;
                if ($opposite_vote->exists()) {
                    $opposite_vote->delete();
                }

                if (!$is_answer) {
                    $vote = Vote::create([
                        'user_id' => $user_id,
                        'vote_type' => $vote_type,
                        'thread_id' => $thread->id
                    ]);
                    $opposite_vote = ($vote_type === 'up') ? 'down' : 'up';
                    $this->updateVoteCounts($thread, $opposite_vote);

                    $this->getVotesCount('thread_id', $thread->id, $vote);

                } else {
                    $vote = Vote::create([
                        'user_id' => $user_id,
                        'vote_type' => $vote_type,
                        'comment_id' => $thread->id
                    ]);
                    $this->getVotesCount('comment_id', $thread->id, $vote);
                }
            }
            $thread_user_id = User::find($thread->user_id)->id;
            $this->addThreadNotification($vote_type, $thread->id, $thread->type, 'vote', $thread_user_id);
        }

        if ($thread) {
            $thread->save();
        }
    }

    protected function updateVoteCounts($thread, $vote_type, $removeVote = false)
    {
        if ($vote_type === 'up') {
            if (!$removeVote) {
                $thread->all_vote_down_count++;
            } elseif ($thread->all_vote_up_count > 0) {
                $thread->all_vote_up_count--;
            }
        } else {
            if (!$removeVote) {
                $thread->all_vote_up_count++;
            } elseif ($thread->all_vote_down_count > 0) {
                $thread->all_vote_down_count--;
            }
        }
    }

    protected function getVotesCount($type, $thread_id, $vote = null)
    {
        $thread_up_votes_count = Vote::where($type, $thread_id)->where('vote_type', 'up')->count();
        $thread_down_votes_count = Vote::where($type, $thread_id)->where('vote_type', 'down')->count();

        $vote_count = [
            'all_up_votes_count' => $thread_up_votes_count,
            'all_down_votes_count' => $thread_down_votes_count
        ];

        return InertiaResponse::back(['vote' => $vote ?: null, 'vote_count' => $vote_count]);
    }

    public function deleteThread($id)
    {
        $thread = Thread::find($id);
        if ($thread) {
            $thread->delete();
        }
    }

    public function hideThread($id)
    {
        $this->postAction('hide', $id);
    }

    public function saveThread($id)
    {
        $this->postAction('save', $id);
    }

    public function shareThread($id, $share_type)
    {
        $thread = Thread::find($id);

        $shares_count = $thread->shares()->where('user_id', auth()->user()->id)->count();
        if ($share_type === 'share') {
            if ($shares_count === 0) {
                $thread->shares()->create(['user_id' => auth()->user()->id]);
                $thread->all_shares_count++;
            }
        } else {
            $thread->shares()->where(['user_id' => auth()->user()->id])->delete();
            $thread->all_shares_count -= $shares_count;
        }

        $thread->update();
        $thread = $thread->fresh();
        $thread = new ThreadResource($thread);

        $data = [
            'thread' => $thread
        ];
        return InertiaResponse::back($data);
    }

    protected function postAction($type, $id, $remove_share = false)
    {
        $exist_Thread = PostAction::where('thread_id', $id)
            ->where('type', $type)
            ->first();

        if ($remove_share && $exist_Thread) {
            $exist_Thread->delete();
        } else {
            if (!$exist_Thread) {
                PostAction::create([
                    'type' => $type,
                    'user_id' => auth()->id(),
                    'thread_id' => $id,
                ]);
            }
        }
    }

    public function getQuestions()
    {
        $questions = Thread::where('user_id', '!=', auth()->id())
            ->where('visibility', 'public')
            ->where('type', 'question')
            ->paginate(5);
        $questions = ThreadResource::collection($questions);
        $data = [
            'questions' => $questions
        ];

        return InertiaResponse::render('Questions/Pages/Questions', $data);
    }

}
