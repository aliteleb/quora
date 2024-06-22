<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeContorller extends Controller
{
    public function index()
    {
        return Inertia::render('Home/Home');
    }
}
