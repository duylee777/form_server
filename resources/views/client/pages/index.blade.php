@extends('client.layouts.index')
@section('content')
    <!-- breadcrumbs -->
    <div class="breadcrumbs text-sm border-b border-gray-200 pt-0 pb-4 mb-4">
        <ul>
            <li>{{ __('dashboard') }}</li>
        </ul>
    </div>

    <!-- content -->
    <div class="flex flex-row items-center justify-between">
        <h1 class="pb-4 text-2xl font-bold text-gray-800">{{ __('page list') }}</h1>
        <div>
            @include('client.pages.partials.create') 
        </div>
    </div>
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>{{ __('page id') }}</th>
                    <th>{{ __('page name') }}</th>
                    <th>{{ __('page slug') }}</th>
                    <th>{{ __('page status') }}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                @foreach($pages as $page)
                    <tr>
                        <td>{{ $page->id }}</td>
                        <td>{{ $page->name }}</td>
                        <td>{{ $page->slug }}</td>
                        <td>{{ $page->status }}</td>
                        <td>
                            
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection