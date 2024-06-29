<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Triats\HttpResponses;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AuthController extends Controller
{
    use HttpResponses;
   public function index ()
   {
       return Inertia::render('Auth/Auth');
   }

    public function register(RegisterRequest $request)
    {
//        return $this->response_success([
//            'user_info' => $request->toArray()
//        ], 'Register success');

        return Inertia::render('Auth/Auth', [
            'info' => $request->toArray(),
            'successMessage' => 'Register success',
        ]);
    }

    public function login(LoginRequest $request)
    {
        return $this->response_success([
            'user_info' => $request->toArray()
        ]);
    }
}
