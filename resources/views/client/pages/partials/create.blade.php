<dialog id="pageCreate" class="modal">
    <div class="modal-box w-11/12 max-w-3xl">
        <h3 class="text-lg font-bold">{{ __('create new page') }}</h3>
        <div class="pt-8">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <form method="POST" action="{{ route('client.pages.store') }}" enctype="multipart/form-data" class="grow">
                @csrf
                <div x-data="slugForm('name')" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <fieldset class="fieldset">
                        <label class="label" for="name">{{ __('page name') }}</label>
                        <input type="text" x-model="name" id="name" name="name" class="input w-full" placeholder="{{ __('page name') }}" />
                    </fieldset>
                    <fieldset class="fieldset">
                        <label class="label" for="slug">{{ __('page slug') }}</label>
                        <input type="text" x-model="slug" @focus="generateSlugOnFocus" id="slug" name="slug" class="input w-full" placeholder="{{ __('page slug') }}" />
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