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
            $data = array_merge(session()->get('redirected_data') ?? [], $data);
        }

        return Inertia::render($component, $data);
    }

    public static function route($name, $params = [], $data = []): RedirectResponse
    {
        session()->flash('redirected_data', $data);
        return redirect()->route($name, $params);
    }

    public static function back($data = []): RedirectResponse
    {
        session()->flash('redirected_data', $data);
        return redirect()->back();
    }
}
