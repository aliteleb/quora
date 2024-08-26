<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    public function getNotifications()
    {
//        $followers = auth()->user()->followedUser()->pluck('follow_user.user_id')->count();
//        Log::info('f', array($followers));
        $user = auth()->user();
        return InertiaResponse::render('Notifications/Pages/Notifications');
    }
}
