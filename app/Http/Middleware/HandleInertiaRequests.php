<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = Cache::rememberForever('settings', function () {
            $all_settings = Setting::all()->pluck('value', 'key');

            $all_settings['icon'] = Storage::disk('public')->url($all_settings['icon'] ?? null);
            $all_settings['logo'] = Storage::disk('public')->url($all_settings['logo'] ?? null);
            $all_settings['background'] = Storage::disk('public')->url($all_settings['background'] ?? null);

            return $all_settings;
        });

        view()->share('settings', $settings);

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'settings' => $settings,
        ];
    }
}
