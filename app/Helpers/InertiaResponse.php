<?php

namespace App\Helpers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class InertiaResponse
{
    public static function render($component, $data = [], $hidePaginationUrl = true): Response | RedirectResponse
    {
        if (session()->has('redirected_data')) {
            if ( session()->has('redirected_data')) {
                $data = session()->get('redirected_data');
            }

            session()->forget('redirected_data');
        }

        if (request()->has('page') && $hidePaginationUrl) {
            return self::back($data);
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

    public static function error($data = null): RedirectResponse
    {
        return redirect()->back()->withErrors($data ?? [
            'message' => 'حدث خطأ غير متوقع!',
        ]);
    }


}
