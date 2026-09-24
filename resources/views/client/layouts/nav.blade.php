<nav class="navbar w-full bg-base-300">
    <label for="my-drawer-4" aria-label="open sidebar" class="btn btn-square btn-ghost drawer-button">
        <!-- Sidebar toggle icon -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
    </label>
    <!-- <div class="px-4">Navbar Title</div> -->
    <div class="navbar p-0 min-h-auto">
        <div class="flex-1">{{ env('APP_NAME', 'Page Builder') }}</div>
        <!-- language -->
        <div class="dropdown dropdown-end py-1.5 px-2 rounded-full shadow-xs shadow-gray-600 cursor-pointer mr-2 hover:bg-gray-200">
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
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-6 w-52 p-2 shadow">
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
        <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar avatar-placeholder">
                <!-- <div class="w-9 rounded-full bg-neutral text-neutral-content">
                    <span class="text-sm">A</span>
                </div> -->
                <div class="rounded-full w-9 shadow-xs shadow-gray-600">
                    <img src="{{ asset('assets/imgs/boy.png') }}" alt="avatar">
                </div>
            </div>
            <ul tabindex="0" class="menu dropdown-content z-40 mt-3 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                <li>
                    <a href="#">{{ __('my account') }}</a>
                </li>
                <li>
                    <form action="{{ route('client.logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="cursor-pointer">{{ __('logout') }}</button>
                    </form>
                </li>
            </ul>
        </div>
    </div>
</nav>