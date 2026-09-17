@extends('auth.layouts.index')
@section('title', __('login'))
@section('content')
    <h1 class="mb-8 uppercase font-bold text-3xl">{{ __('login') }}</h1>
    <form action="">
        <fieldset class="fieldset">
            <label class="label">{{ __('email') }}</label>
            <input type="email" class="input w-full " placeholder="{{ __('email') }}" />
            <label class="label">{{__('password')}}</label>
            <input type="password" class="input w-full" placeholder="{{ __('password') }}" />
            <div>
                <a class="link link-hover">{{ __('forgot password') }}</a>
            </div>
            <button type="submit" class="btn btn-neutral mt-4 hover:btn-primary">{{ __('login') }}</button>
        </fieldset>
    </form>
    <div class="divider text-xs text-base-content/50">{{ __('or continue with') }}</div>
    <div class="flex justify-center">
        <a href="{{ route('social.login', 'google') }}" class="btn btn-outline border-gray-100 shadow">
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.4 14.7 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 12s4.2 9.6 9.3 9.6c5.4 0 9-3.8 9-9.1 0-.6-.1-1.1-.2-1.6H12Z"/>
            </svg>
            {{ __('login with google') }}
        </a>
    </div>
@endsection