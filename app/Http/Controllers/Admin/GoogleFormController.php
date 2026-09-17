<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\GoogleFormApiService;
use Illuminate\Http\Request;

class GoogleFormController extends Controller
{
    public function index(Request $request, GoogleFormApiService $apiService)
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

        return view('admin.form', compact('forms', 'error'));
    }

    /**
     * Trả về JSON thông tin các field của Form
     */
    public function getFields(Request $request, string $formId, GoogleFormApiService $apiService)
    {
        try {
            $data = $apiService->getFormFields($request->user(), $formId);

            return response()->json([
                'success' => true,
                'data'    => $data,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
