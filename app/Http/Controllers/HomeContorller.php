<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeContorller extends Controller
{
    public function index()
    {
        return Inertia::render('Home/Home', ['mmmm' => 'from home']);
    }
}
