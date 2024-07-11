<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function select_topics()
    {
        return InertiaResponse::render('SelectTopics');
    }
}
