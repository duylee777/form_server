<!DOCTYPE html>
<html class="bg-gray-100" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'Laravel') }} - @yield('title', 'Page')</title>

    @fonts

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @else
        <link rel="stylesheet" href="{{ assets/css/tailwindcss.min.css }}">
    @endif
</head>
<body class="max-w-lg bg-white h-full mx-auto p-4 space-y-4">
    <header class="pb-4 border-b-2 border-gray-300 text-right">
        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="">
                @switch (app()->getLocale())
                    @case('en')
                        <span class="fi fi-us"></span>
                        @break
                    @case('vi')
                        <span class="fi fi-vn"></span>
                        @break
                    @default
                        <span class="fi fi-vn"></span>
                @endswitch
            </div>
            <ul
                tabindex="-1"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                    <a href="{{ route('language.switch', 'en') }}">
                        <span class="fi fi-us"></span>
                        English
                    </a>
                </li>
                <li>
                    <a href="{{ route('language.switch', 'vi') }}">
                        <span class="fi fi-vn"></span>
                        Tiếng Việt
                    </a>
                </li>
                

            </ul>
        </div>
    </header>
    <main class="">
        @yield('content')
    </main>
    <footer class=""></footer>
    @stack('scripts')
</body>
</html>