<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
   public function index ()
   {
       return Inertia::render('Auth/Pages/Auth');
   }

    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());
        Auth::loginUsingId($user->id);
        return InertiaResponse::back($user);
    }

    public function login()
    {
        $credentials = request()->only(['email', 'password']);
        if (Auth::attempt($credentials, true))
        {
            return InertiaResponse::back();
        }

        return back()->withErrors(['invalid_credentials' => 'البيانات المدخلة غير صحيحة']);
    }

    public function logout()
    {
        auth()->logout();
        return Inertia::location('/account');
    }
}
