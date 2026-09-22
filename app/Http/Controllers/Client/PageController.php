<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use RealRashid\SweetAlert\Facades\Alert;

class PageController extends Controller
{
    public function index ()
    {
        $user = Auth::user();
        $pages = Page::where('user_id', $user->id)->get();
        return view('client.pages.index', compact('pages'));
    }

    public function store (Request $request)
    {
        $data = [
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'slug' => $request->slug, 
            'status' => $request->status, 
            'content' => $request->content, 
            'gjs_data' => $request->gjs_data
        ];

        Page::create($data);
    }
}
