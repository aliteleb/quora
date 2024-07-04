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
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $space = Space::create($data);

        return redirect()->route('index')->with([
            'space' => $space
        ]);
    }
}
