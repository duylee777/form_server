export function SaveTemplateCommand(editor, templateId) {
    editor.Commands.add('save-template', {
        run: function(editor, sender) {
            // Tắt trạng thái kích hoạt của nút sau khi bấm
            sender && sender.set('active', 0);

            // Gom toàn bộ dữ liệu cần thiết
            const payload = {
                gjs_data: editor.getProjectData(), // Dữ liệu JSON cực kỳ quan trọng để sửa lại
                html: editor.getHtml(),
                css: editor.getCss()
            };

            const componentsData = editor.getComponents().toJSON();
            const stylesData = editor.getStyle().toJSON();

            const conf = confirm('Bạn có chắc chắn muốn lưu lại?');
            if(conf) {
                //Gửi POST request qua Laravel
                // `/admin/templates/${templateId}/store-design`
                fetch(window.savedTemplate, {
                    method: 'POST',
                    headers: {
                        // Bắt buộc phải có Token CSRF để Laravel không chặn request
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then((response) => response.json())
                .then((data) => {
                    if(data.success) {
                        alert('Lưu giao diện thành công!');
                    } else {
                        alert('Có lỗi xảy ra từ máy chủ!');
                    }
                })
                .catch(error => {
                    console.error('Lỗi kết nối:', error);
                    alert('Không thể kết nối tới máy chủ!');
                });
            }
        }
    });

    return 'save-template';
}