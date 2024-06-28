<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
   public function index ()
   {
       return Inertia::render('Auth/Auth');
   }

    public function register(Request $request)
    {
        return $request;
    }
}
