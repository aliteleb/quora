<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $spaces = $user->spaces;
        $topics = $user->topics;

        if ($topics->count() === 0) {
//            return InertiaResponse::route('select_topics');
        }

        return InertiaResponse::render('Home/Home');
    }
}
