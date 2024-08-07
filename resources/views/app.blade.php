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
                --theme-main-bg-color: {{ settings('theme-main-bg-color', '#262626')}};
                --theme-nav-bg-color-hover: {{settings('theme-nav-bg-color-hover', '#2f2f2f') }};
                --theme-secondary-bg-color-hover: {{settings('theme-secondary-bg-color-hover', '#393939') }};
                --theme-placeholder-color: {{settings('theme-body-bg', '#ffffff') }}77;
                --theme-primary-button-color: {{settings('theme-primary-button-color', '#f52936')}};
                --theme-primary-text-color: {{settings('theme-primary-text-color', '#e6e7e8')}};
                --theme-secondary-text-color: {{settings('theme-secondary-text-color', '#b1b3b6')}};
                --theme-input-bg-color: {{ settings('theme-input-bg-color', '#202020') }};
                --theme-button-border-color: {{ settings('theme-button-border-color', '#287dff') }};
                --theme-button-bg-color-hover: {{ settings('theme-button-bg-color-hover', '#1c1c1cb0') }};
                --theme-default-border-color: {{ settings('theme-default-border-color', '#393939') }};
                --theme-react-select-error-color: {{ settings('theme-react-select-error-color', '#ef4444') }};
                --theme-space-owner-main-color: {{ settings('theme-space-owner-main-color', '#D17078') }};
                --theme-select-space-border-color: {{ settings('theme-select-space-border-color', '#393839') }};

            }

        </style>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

    </head>
    <body class="font-sans antialiased bg-[--theme-body-bg] text-[--theme-body-color]">
        @inertia
    </body>
</html>
