<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

function settings (string|null $key = null, $default = null) {
    $settings = Cache::rememberForever('settings', function () {
        $all_settings = Setting::all()->pluck('value', 'key');

        $all_settings['icon'] = Storage::disk('public')->url($all_settings['icon'] ?? null);
        $all_settings['logo'] = Storage::disk('public')->url($all_settings['logo'] ?? null);
        $all_settings['background'] = Storage::disk('public')->url($all_settings['background'] ?? null);

        return $all_settings;
    });

    if (is_null($key)) {
        return $settings;
    }

    return $settings[$key] ?? $default;

}
