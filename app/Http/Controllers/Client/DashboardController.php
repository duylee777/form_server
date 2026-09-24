<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Services\GoogleFormApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\LengthAwarePaginator; 
use Illuminate\Pagination\Paginator;            
use Illuminate\Support\Collection;
use RealRashid\SweetAlert\Facades\Alert;

class DashboardController extends Controller
{
    protected $perPage = 12;

    public function index (Request $request, GoogleFormApiService $apiService)
    {
        $user = $request->user();
        $pages = Page::where('user_id', $user->id)->latest()->paginate($this->perPage, ['*'], 'pages_page');

        $rawForms = [];
        $error = null;
        // Chỉ gọi API nếu người dùng đã liên kết tài khoản Google
        if ($user->getSocialAccount('google')) {
            try {
                $rawForms = $apiService->getUserForms($user);
            } catch (\Exception $e) {
                Alert::error(__('google connection error'), $e->getMessage());
            }
        }
        // Tạo Phân trang thủ công cho Forms
        $formsCollection = collect($rawForms); // Chuyển sang Collection
        $pageName = 'forms_page';              // Tham số trang trên URL (VD: ?forms_page=2)

        // Lấy số trang hiện tại từ URL (mặc định là 1 nếu không có)
        $currentPage = Paginator::resolveCurrentPage($pageName);

        // Cắt dữ liệu đúng với trang hiện tại
        $currentPageItems = $formsCollection->slice(($currentPage - 1) * $this->perPage, $this->perPage)->values();

        // Khởi tạo LengthAwarePaginator
        $forms = new LengthAwarePaginator(
            $currentPageItems,
            $formsCollection->count(),
            $this->perPage,
            $currentPage,
            [
                'path' => Paginator::resolveCurrentPath(),
                'pageName' => $pageName,
            ]
        );

        return view('client.dashboard', compact('pages', 'error', 'forms'));
    }
}
