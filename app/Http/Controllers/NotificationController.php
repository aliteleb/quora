<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Traits\GetUserSpaces;


class NotificationController extends Controller
{
    use GetUserSpaces;
    public function getNotifications()
    {
        $user_created_spaces = $this->getUserSpaces();
        $data = [
            'user_created_spaces' => $user_created_spaces
        ];
        return InertiaResponse::render('Notifications/Pages/Notifications', $data);
    }
}
