<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Traits\GetUserSpaces;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;


class NotificationController extends Controller
{
    use GetUserSpaces;
    public function getNotifications(): Response|RedirectResponse
    {
        $user_created_spaces = $this->getUserSpaces();
        $all_notifications = Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->orderBy('created_at', 'desc')
            ->paginate(15);
        $all_notifications = NotificationResource::collection($all_notifications);

        $data = [
            'user_created_spaces' => $user_created_spaces,
            'all_notifications' => $all_notifications
        ];
        return InertiaResponse::render('Notifications/Pages/Notifications', $data);
    }
    public function getNotificationsQuestions(): RedirectResponse
    {
        $questions_notifications = Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->whereNotNull('question_id')
            ->orderBy('created_at', 'desc')
            ->paginate(15);
        $questions_notifications = NotificationResource::collection($questions_notifications);

        $data = [
            'questions_notifications' => $questions_notifications
        ];

        return InertiaResponse::back($data);
    }
    public function getNotificationsPosts(): RedirectResponse
    {
        $posts_notifications = Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->whereNotIn('type', ['reply', 'comment'])
            ->whereNotNull('post_id')
            ->whereNull('comment_id')
            ->orderBy('created_at', 'desc')
            ->paginate(15);
        $posts_notifications = NotificationResource::collection($posts_notifications);

        $data = [
            'posts_notifications' => $posts_notifications
        ];

        return InertiaResponse::back($data);
    }
    public function getNotificationsReactions(): RedirectResponse
    {
        $reactions_notifications = Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->whereIn('type', ['up_vote', 'down_vote'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);
        $reactions_notifications = NotificationResource::collection($reactions_notifications);

        $data = [
            'reactions_notifications' => $reactions_notifications
        ];

        return InertiaResponse::back($data);
    }
    public function getNotificationsComments(): RedirectResponse
    {
        $comments_notifications = Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->whereIn('type', ['reply', 'comment', 'answer'])
            ->orderBy('created_at', 'desc')
            ->paginate(15);
        $comments_notifications = NotificationResource::collection($comments_notifications);

        $data = [
            'comments_notifications' => $comments_notifications
        ];

        return InertiaResponse::back($data);
    }
}
