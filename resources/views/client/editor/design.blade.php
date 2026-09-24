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
        @vite([
            'resources/js/app.js',
            'resources/js/editor.js'
        ])
    @else
        <link rel="stylesheet" href="{{ asset('assets/css/tailwindcss.min.css') }}">
    @endif
</head>
<body>
    <div id="gjs-page-{{ $page->id }}"></div>
    <script>
        window.pageId = @js($page->id);
    </script>
</body>
</html>