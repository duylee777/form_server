@extends('client.layouts.index')
@section('title', __('dashboard'))
@section('content')
    <!-- breadcrumbs -->
    <div class="breadcrumbs text-sm border-b border-gray-200 pt-0 pb-4 mb-4 ml-0">
        <ul>
            <li>{{ __('dashboard') }}</li>
        </ul>
    </div>
    <h1 class="text-2xl font-bold text-gray-900 mb-8">{{ __('dashboard') }}</h1>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <div class="p-4 shadow-md shadow-gray-300 rounded-md border border-gray-100">
                @include('client.partials.pages')
            </div>
        </div>
        <div>
            <div class="p-4 shadow-md shadow-gray-300 rounded-md border border-gray-100">
                @include('client.partials.googleforms')
            </div>
        </div>
    </section>
@endsection