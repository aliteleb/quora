<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return InertiaResponse::render('Home/Home');
    }
}
