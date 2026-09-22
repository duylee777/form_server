import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from "grapesjs";

window.grapesjs = grapesjs;

export function Editor() {
    const editor = grapesjs.init({
        container: '#gjs',
        height: '100vh',
        width: 'auto',
        fromElement: true,
        protectedCss: '',
        storageManager: false,
        allowScripts: true,
        forceId: false,
        selectorManager: {
            escapeName: name => name,
            componentFirst: true,
            // Giữ nguyên ký tự đặc biệt trong class name
            //    escapeName: name => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, '-'), 
        },
        // --- CẤU HÌNH UPLOAD ẢNH ---
        assetManager: {
            // Đường dẫn API upload ảnh trong Laravel
            // http://127.0.0.1:8000/admin/templates/upload-image
            upload: window.uploadApi, 
            
            // Tên param gửi file lên server (Laravel sẽ nhận $request->file('files'))
            uploadName: 'files', 
            
            // Đính kèm CSRF Token để Laravel không chặn request
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            
            // Tự động chèn ảnh vừa upload thành công vào danh sách Asset
            autoAdd: true,
            assets: images
        },
        canvas: {
            styles: [
                'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css'
            ],
            scripts: [
                'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
                'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js'
            ],
        }
    });

    return editor;
}


    // Đăng ký lệnh xóa sạch Canvas
// editor.Commands.add('core:canvas-clear-custom', {
//     run(editor) {
//         if (confirm('Bạn có chắc chắn muốn làm sạch toàn bộ trang không?')) {
//             const wrapper = editor.DomComponents.getWrapper();

//             // 1. Chỉ làm rỗng danh sách phần tử con (giữ nguyên thẻ wrapper gốc)
//             wrapper.components().reset();

//             // 2. Xóa toàn bộ CSS Rules trong bộ nhớ
//             editor.Css.clear();

//             // 3. Reset style và thuộc tính rác trên wrapper
//             wrapper.setStyle({});
//             wrapper.set('attributes', {});

//             // 4. Focus lại vào Canvas để tiếp tục kéo thả bình thường
//             editor.select(wrapper);
//         }
//     }
// });

// // Thêm nút bấm vào Panel thanh công cụ
// editor.Panels.addButton('options', {
//     id: 'clean-all-btn',
//     className: 'fa fa-trash', // Icon thùng rác FontAwesome
//     command: 'core:canvas-clear-custom',
//     attributes: { title: 'Xóa sạch trang' }
// });

//     return editor;
// }