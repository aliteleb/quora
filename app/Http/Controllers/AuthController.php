<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Triats\HttpResponses;
use Illuminate\Support\Facades\Auth;
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
        $user = User::create($request->except('password_confirmation'));
        Auth::loginUsingId($user->id);
        return redirect()->route('index');
    }

    public function login(LoginRequest $request)
    {
        return $this->success([
            'user_info' => $request->toArray()
        ]);
    }
}
