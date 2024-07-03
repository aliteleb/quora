<?php

namespace App\Http\Controllers;

class ThreadController extends Controller
{
    public function create()
    {
        return request()->input('image');
    }
}
