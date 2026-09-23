<!DOCTYPE html>
<html class="bg-gray-100" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'Laravel') }} - @yield('title', 'Page')</title>

    @fonts

    @stack('head_scripts')

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @else
        <link rel="stylesheet" href="{{ assets/css/tailwindcss.min.css }}">
    @endif
</head>
<body>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" class="drawer-toggle inline" />
        <div class="drawer-content bg-white">
            <!-- Navbar -->
            @include('client.layouts.nav')
            <!-- Page content here -->
            <div class="p-4">
                @yield('content')
            </div>
        </div>

        @include('client.layouts.sidebar')
    </div>
    @stack('scripts')
    @sweetAlert
</body>
</html>