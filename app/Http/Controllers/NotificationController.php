<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Traits\GetUserSpaces;


class NotificationController extends Controller
{
    use GetUserSpaces;
    public function getNotifications()
    {
        $user_created_spaces = $this->getUserSpaces();

//        $created_posts_notifications = Notification::where('user_id', auth()->id())
//            ->where('type', 'post')
//            ->where('is_read', false)
//            ->get();
//        $created_questions_notifications = Notification::where('user_id', auth()->id())
//            ->where('type', 'question')
//            ->where('is_read', false)
//            ->get();

        $all_notifications = Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        $all_notifications = NotificationResource::collection($all_notifications);

        $data = [
            'user_created_spaces' => $user_created_spaces,
            'all_notifications' => $all_notifications
        ];
        return InertiaResponse::render('Notifications/Pages/Notifications', $data);
    }
}
