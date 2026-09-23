<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StorePageRequest;
use App\Http\Requests\Client\UpdatePageRequest;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use RealRashid\SweetAlert\Facades\Alert;

class PageController extends Controller
{
    public function index ()
    {
        $user = Auth::user();
        $pages = Page::where('user_id', $user->id)->get();
        return view('client.pages.index', compact('pages'));
    }

    public function store (StorePageRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = Auth::id();

        Page::create($validated);

        Alert::success(__('complete'), __('your changes have been saved successfully'));
        return redirect()->route('client.pages.index');
    }

    public function update (UpdatePageRequest $request, Page $page)
    {
        $page->update($request->validated());

        Alert::success(__('complete'), __('your changes have been saved successfully'));
        return redirect()->route('client.pages.index');
    }

    public function destroy (Page $page)
    {
        $page->delete();

        Alert::success(__('complete'), __('your changes have been saved successfully'));
        return redirect()->route('client.pages.index');
    }
}
