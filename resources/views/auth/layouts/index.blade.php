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
<body class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-lg bg-white h-max mx-auto p-4 rounded-xl shadow-xl">
        <header class="pb-4 text-right">
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
                            {{ __('english') }}
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('language.switch', 'vi') }}">
                            <span class="fi fi-vn"></span>
                            {{ __('vietnamese') }}
                        </a>
                    </li>
                </ul>
            </div>
        </header>
        <main class="">
            @yield('content')
        </main>
        <footer class="pt-4 mt-8">
            <p class="text-sm italic text-gray-600">© itc - 2026</p>
        </footer>
        @stack('scripts')
    </div>
</body>
</html>