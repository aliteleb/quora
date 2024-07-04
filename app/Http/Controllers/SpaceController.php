<?php

namespace App\Http\Controllers;

use App\Http\Requests\SpaceRequest;
use App\Models\Space;
use App\Triats\HttpResponses;
use Inertia\Inertia;

class SpaceController extends Controller
{
    use HttpResponses;
    public function create(SpaceRequest $request)
    {
        $space = Space::create($request->validated());

        return redirect()->route('index')->with([
            'space' => $space
        ]);
    }
}
