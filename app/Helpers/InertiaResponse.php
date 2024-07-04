<?php

namespace App\Helpers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InertiaResponse
{
    public static function render($component, $data = []): Response
    {
        if (session()->has('redirected_data')) {
            $data = session()->get('redirected_data');
        }

        return Inertia::render($component, $data);
    }

    public static function route($name, $data = []): RedirectResponse
    {
        session()->flash('redirected_data', $data);
        return redirect()->route($name);
    }
}
