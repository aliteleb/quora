<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Triats\HttpResponses;
use Illuminate\Support\Facades\Auth;
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
        $user = User::create($request->only(['name', 'email', 'password']));
        Auth::loginUsingId($user->id);
        return InertiaResponse::route('index', $user);
    }

    public function login()
    {
        $credentials = request()->only(['email', 'password']);
        if (Auth::attempt($credentials, true))
        {
            return InertiaResponse::route('index');
        }

        return back()->withErrors(['invalid_credentials' => 'البيانات المدخلة غير صحيحة']);
    }

    public function logout()
    {
        auth()->logout();
        return Inertia::location('/account');
    }
}
