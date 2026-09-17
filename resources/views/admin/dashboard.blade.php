@extends('admin.layouts.index')
@section('title', __('dashboard'))
@section('content')
    <!-- breadcrumbs -->
    <div class="breadcrumbs text-sm border-b border-gray-200 pt-0 pb-4 mb-4">
        <ul>
            <li>{{ __('dashboard') }}</li>
        </ul>
    </div>
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
      <div role="alert" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ session('success') }}</span>
      </div>
  @endif

  {{-- Thông báo lỗi --}}
  @if(session('error') || isset($error))
      <div role="alert" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ session('error') ?? $error }}</span>
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

      <!-- KHU VỰC HIỂN THỊ JSON (Ban đầu ẩn đi) -->
      <div id="json-viewer-container" class="mt-8 hidden bg-gray-900 text-green-400 p-6 rounded-lg shadow-xl border border-gray-700">
          <div class="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔍 Cấu trúc JSON Fields:</span>
                  <span id="current-form-id" class="text-sm font-mono text-yellow-400"></span>
              </h3>
              <button onclick="closeJsonViewer()" class="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded hover:bg-gray-700 hover:text-white">
                  ✕ Đóng lại
              </button>
          </div>
          
          {{-- Khung hiển thị Code JSON --}}
          <pre class="overflow-x-auto text-xs font-mono max-h-96 leading-relaxed bg-gray-950 p-4 rounded border border-gray-800"><code id="json-code">Đang tải dữ liệu...</code></pre>
      </div>

  @endif
  <script>
      async function mapFields(formId) {
          const container = document.getElementById('json-viewer-container');
          const formIdSpan = document.getElementById('current-form-id');
          const jsonCode = document.getElementById('json-code');

          // 1. Hiển thị khung chứa và hiệu ứng đang tải
          container.classList.remove('hidden');
          formIdSpan.textContent = `[ID: ${formId}]`;
          jsonCode.textContent = "⏳ Đang kết nối tới Google Forms API để tải dữ liệu...";

          // 2. Cuộn mượt xuống khu vực hiển thị JSON
          container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          try {
              // 3. Gọi API lấy dữ liệu
              const response = await fetch(`/admin/my-forms/${formId}/fields`, {
                  headers: {
                      'Accept': 'application/json',
                      'X-Requested-With': 'XMLHttpRequest'
                  }
              });

              if (!response.ok) {
                  throw new Error(`Lỗi HTTP ${response.status}: Không thể lấy dữ liệu từ server.`);
              }

              const result = await response.json();

              if (result.success) {
                  // 4. Formatting JSON đẹp mắt (thụt lề 2 spaces)
                  jsonCode.textContent = JSON.stringify(result.data, null, 2);
              } else {
                  jsonCode.textContent = `❌ Lỗi: ${result.message}`;
              }
          } catch (error) {
              console.error("Lỗi kết nối:", error);
              jsonCode.textContent = `❌ Có lỗi xảy ra: ${error.message}`;
          }
      }

      // Hàm đóng khung xem JSON
      function closeJsonViewer() {
          document.getElementById('json-viewer-container').classList.add('hidden');
      }
  </script>
@endsection