<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="rtl">
    <head>
    @php
        $nav_color = '#343434';
        $placeholder_text_color = '#b1b3b6';
        $primary_button_color = '#f52936';
    @endphp
        <style>
            :root {
                --theme-body-color: {{ settings('theme-body-color', '#ffffff') }};
                --theme-body-bg: {{ settings('theme-body-bg', '#181818') }};
                --theme-nav-bg-color: {{ settings('theme-nav-bg-color', '#343434')}}B0;
                --theme-nav-bg-color-hover: {{settings('theme-nav-bg-color', '#343434') }};
                --placeholder-color: {{settings('theme-body-color', '#ffffff') }}77;
                --primary_button_color: {{$primary_button_color}};
                --theme-primary-text-color: {{settings('theme-primary-text-color', '#e6e7e8')}};
                --theme-secondary-text-color: {{settings('theme-secondary-text-color', '#b1b3b6')}};
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
