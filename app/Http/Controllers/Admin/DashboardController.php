<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Services\GoogleFormApiService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index (Request $request, GoogleFormApiService $apiService)
    {
        $user = $request->user();
        $forms = [];
        $error = null;

        // Chỉ gọi API nếu người dùng đã liên kết tài khoản Google
        if ($user->getSocialAccount('google')) {
            try {
                $forms = $apiService->getUserForms($user);
            } catch (\Exception $e) {
                $error = $e->getMessage();
            }
        }

        //Lấy danh sách các trang do người dùng tạo
        $pages = Page::where('user_id', $user->id)->get();

        return view('admin.dashboard', compact('forms', 'error', 'pages'));
    }
}
