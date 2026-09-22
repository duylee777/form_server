<dialog id="pageEdit{{ $page->id }}" class="modal">
    <div class="modal-box w-11/12 max-w-3xl">
        <h3 class="text-lg font-bold">{{ __('update page') }} : {{ $page->name }}</h3>
        <div class="pt-8">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form method="POST" action="{{ route('client.pages.update', $page) }}" enctype="multipart/form-data" class="grow">
                @csrf
                @method('PUT')
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <fieldset class="fieldset">
                        <label class="label" for="name">{{ __('page name') }}</label>
                        <input type="text" id="name" name="name" class="input w-full" placeholder="{{ __('page name') }}" value="{{ $page->name }}" />
                    </fieldset>
                    <fieldset class="fieldset">
                        <label class="label" for="slug">{{ __('page slug') }}</label>
                        <input type="text" id="slug" name="slug" class="input w-full" placeholder="{{ __('page slug') }}" value="{{ $page->slug }}" />
                    </fieldset>
                </div>
                <!-- if there is a button, it will close the modal -->
                <div class="pt-8 text-end">
                    <button type="submit" class="btn btn-success text-white">{{ __('save') }}</button>
                </div>
            </form>
        </div>
    </div>
</dialog>