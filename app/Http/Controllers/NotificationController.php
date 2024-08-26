<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotifications()
    {
        $user = auth()->user();
        return InertiaResponse::render('Notifications/Pages/Notifications');
    }
}
