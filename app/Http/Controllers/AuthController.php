<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use Inertia\Inertia;

class AuthController extends Controller
{
   public function index ()
   {
       return Inertia::render('Auth/Auth');
   }

    public function register(RegisterRequest $request)
    {
        return Inertia::render('Auth/Auth', [
            'info' => $request
        ]);
    }
}
