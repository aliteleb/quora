<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function index(): \Inertia\Response
    {
        return InertiaResponse::render('SelectTopics');
    }

    public function select_topics(Request $request)
    {
        dd($request);
        return InertiaResponse::render('SelectTopics');
    }
}
