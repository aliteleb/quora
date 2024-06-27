<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">
    <head>
    @php
        $nav_color = '#343434';
        $placeholder_text_color = '#b1b3b6';
    @endphp
        <style>
            :root {
                --theme-body-color: {{ settings('theme-body-color', '#ffffff') }};
                --theme-body-bg: {{ settings('theme-body-bg', '#181818') }};
                --theme-nav-bg-color: {{ settings('theme-nav-bg-color', '#343434')}}B0;
                --theme-nav-bg-color-hover: {{settings('theme-nav-bg-color', '#343434') }};
                --theme-placeholder-color: {{settings('theme-body-bg', '#ffffff') }}77;
                --theme-primary-button-color: {{settings('theme-primary-button-color', '#f52936')}};
                --theme-primary-text-color: {{settings('theme-primary-text-color', '#e6e7e8')}};
                --theme-secondary-text-color: {{settings('theme-secondary-text-color', '#b1b3b6')}};
                --theme-input-bg-color: {{ settings('theme-input-bg-color', '#202020') }};
                --theme-button-border-color: {{ settings('theme-button-border-color', '#287dff') }};
                --theme-button-bg-color-hover: {{ settings('theme-button-bg-color-hover', '#1c1c1cb0') }};
            }
        </style>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

    </head>
    <body class="font-sans antialiased bg-[--theme-body-bg]">
        @inertia
    </body>
</html>
