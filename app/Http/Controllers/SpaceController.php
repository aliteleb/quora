<?php

namespace App\Http\Controllers;

use App\Helpers\InertiaResponse;
use App\Http\Requests\SpaceRequest;
use App\Models\Space;
use App\Triats\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SpaceController extends Controller
{
    use HttpResponses;
    public function create(SpaceRequest $request)
    {
        $space = Space::create($request->validated());

        return InertiaResponse::route('index', [
            'space' => $space
        ]);
    }

    public function addSpaces (Request $request)
    {

    }
}
