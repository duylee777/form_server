<div class="pb-4 flex flex-row items-center justify-between">
    <h2 class="text-xl font-semibold text-gray-600">{{ __('page list') }}</h2>
    <button class="btn" onclick="pageCreate.showModal()">{{ __('create') }}</button>
    @include('client.pages.partials.create') 
</div>

<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
        <!-- head -->
        <thead>
            <tr>
                <th>{{ __('no.') }}</th>
                <th>{{ __('page name') }}</th>
                <th>{{ __('page slug') }}</th>
                <th>{{ __('page status') }}</th>
                <th>{{ __('page created') }}</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            @foreach($pages as $key => $page)
                <tr>
                    <td>{{ $key + 1 }}</td>
                    <td>{{ $page->name }}</td>
                    <td>{{ $page->slug }}</td>
                    <td>{{ $page->status }}</td>
                    <td>{{ $page->created_at }}</td>
                    <td class="text-end">
                        <div class="dropdown dropdown-left dropdown-end">
                            <button class="cursor-pointer" popovertarget="popover-{{ $page->id }}" style="--anchor-name: anchor-{{ $page->id }};">
                                <i data-lucide="grip-vertical"></i>
                            </button>
                            <ul class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
                            popover="auto" id="popover-{{ $page->id }}" style="position-anchor: var(--anchor-name);">
                                <li>
                                    <a href="{{ route('client.builder.design', $page->slug) }}" class="flex flex-row flex-nowrap items-center gap-1" target="_blank" rel="noopener noreferrer">
                                        <i data-lucide="pencil-sparkles" class="w-4 h-4"></i>
                                        {{ __('design') }} 
                                    </a>
                                </li>
                                <li>
                                    <button class="flex flex-row flex-nowrap items-center gap-1" onclick="document.getElementById('pageEdit{{ $page->id }}').showModal()">
                                        <i data-lucide="square-pen" class="w-4 h-4"></i>  
                                        {{ __('edit') }}
                                    </button>
                                </li>
                                <li>
                                    <a class="text-red-600 flex flex-row flex-nowrap items-center gap-1" href="{{ route('client.pages.destroy', $page) }}"
                                        data-confirm-delete
                                        data-confirm-title="{{ __('delete :name', ['name' => ucfirst($page->name)]) }}"
                                        data-confirm-text="{{ __('this cannot be undone') }}"
                                        data-confirm-button="{{ __('yes, delete it') }}">
                                        <i data-lucide="trash" class="w-4 h-4"></i>  
                                        {{ __('delete') }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
    
</div>
<div class="py-4">
    {{ $pages->withQueryString()->links() }}
</div>
@foreach($pages as $page)
    @include('client.pages.partials.edit', ['page' => $page]) 
@endforeach

@push('head_scripts')
    @vite('resources/js/slugForm.js')
@endpush