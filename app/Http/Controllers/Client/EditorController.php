<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;

class EditorController extends Controller
{
    public function design(string $slugPage)
    {
        $page = Page::where('slug', $slugPage)->first();
        if (!$page) {
            Alert::error(__('error'), __('no data available'));
        }

        return view('client.editor.design', compact('page'));
    }
}
