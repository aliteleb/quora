<?php

namespace App\Http\Controllers;

use App\Http\Requests\SpaceRequest;

class SpaceController extends Controller
{
    public function create(SpaceRequest $request)
    {
        return request();
    }
}
