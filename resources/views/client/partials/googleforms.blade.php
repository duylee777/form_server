<div class="pb-4 flex flex-row items-center justify-between">
    <h2 class="text-xl font-semibold text-gray-600">{{ __('google form list') }}</h2>
    <a href="{{ route('social.login', 'google') }}" class="btn">
        {{ __('connect google') }}
    </a>
</div>

<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
        <!-- head -->
        <thead>
            <tr>
                <th>{{ __('no.') }}</th>
                <th>{{ __('form name') }}</th>
                <th>{{ __('form id') }}</th>
                <th>{{ __('updated_at') }}</th>
            </tr>
        </thead>
        <tbody>
            @foreach($forms as $key => $form)
                <tr>
                    <td>{{ $key + 1 }}</td>
                    <td>{{ $form['name'] }}</td>
                    <td>{{ $form['id'] }}</td>
                    <td>{{ $form['updated_at'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
<div class="py-4">
    {{ $forms->withQueryString()->links() }}
</div>