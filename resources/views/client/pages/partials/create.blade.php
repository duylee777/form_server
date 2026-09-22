<button class="btn" onclick="pageCreate.showModal()">{{ __('create') }}</button>

<dialog id="pageCreate" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Click the button below to close</p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button, it will close the modal -->
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
</dialog>
<!-- end create -->
<div class="py-4">
    <ul>
        @foreach($pages as $page)
            <li>{{ $page->name }}</li>
        @endforeach
    </ul>
</div>