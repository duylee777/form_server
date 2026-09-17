<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Danh Sách Google Forms</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <div class="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        
        {{-- Header & Nút kết nối --}}
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Danh Sách Google Form Của Tôi</h1>
            
            <a href="{{ route('social.login', 'google') }}" 
               class="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition">
                {{ auth()->user()->getSocialAccount('google') ? '🔄 Kết nối lại Google' : '🔗 Kết nối Google Account' }}
            </a>
        </div>

        {{-- Thông báo thành công --}}
        @if(session('success'))
            <div class="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                {{ session('success') }}
            </div>
        @endif

        {{-- Thông báo lỗi --}}
        @if(session('error') || isset($error))
            <div class="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                <p class="font-bold">Lỗi:</p>
                <p>{{ session('error') ?? $error }}</p>
            </div>
        @endif

        {{-- TRƯỜNG HỢP 1: Chưa liên kết Google Account --}}
        @if(!auth()->user()->getSocialAccount('google'))
            <div class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p class="text-gray-600 mb-4">Bạn chưa kết nối tài khoản Google. Vui lòng kết nối để tải danh sách biểu mẫu.</p>
                <a href="{{ route('social.login', 'google') }}" 
                   class="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">
                    Kết nối Google ngay
                </a>
            </div>

        {{-- TRƯỜNG HỢP 2: Đã liên kết -> Hiển thị Bảng Form --}}
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-gray-700 text-sm uppercase">
                            <th class="py-3 px-4">Tên Form</th>
                            <th class="py-3 px-4">Form ID</th>
                            <th class="py-3 px-4">Sửa lần cuối</th>
                            <th class="py-3 px-4 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        @forelse($forms as $form)
                            <tr class="hover:bg-gray-50 transition">
                                <td class="py-3 px-4 font-semibold text-gray-800">
                                    📋 {{ $form['name'] }}
                                </td>
                                <td class="py-3 px-4 font-mono text-xs text-gray-600">
                                    {{ $form['id'] }}
                                </td>
                                <td class="py-3 px-4 text-sm text-gray-500">
                                    {{ $form['updated_at'] }}
                                </td>
                                <td class="py-3 px-4 text-center space-x-2">
                                    <a href="{{ $form['web_view_link'] }}" target="_blank" 
                                       class="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700">
                                        Xem trên Google
                                    </a>
                                    
                                    <button onclick="mapFields('{{ $form['id'] }}')" 
                                            class="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700">
                                        Lấy dữ liệu Fields
                                    </button>
                                </td>
                            </tr>
                        @empty
                            @if(!isset($error))
                                <tr>
                                    <td colspan="4" class="py-6 text-center text-gray-500">
                                        Không tìm thấy Google Form nào trong tài khoản của bạn.
                                    </td>
                                </tr>
                            @endif
                        @endforelse
                    </tbody>
                </table>
            </div>
        @endif

    </div>

    <script>
        function mapFields(formId) {
            // Bạn có thể gọi API AJAX tới Laravel để lấy các field JSON của Form theo formId này
            console.log('Đang lấy cấu trúc của Form ID:', formId);
        }
    </script>
</body>
</html>