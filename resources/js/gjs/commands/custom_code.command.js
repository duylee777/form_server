export function CustomCodeCommand(editor) {
    editor.Commands.add('open-custom-code-modal', {
        run(editor, sender, options = {}) {
            const target = options.target || editor.getSelected();
            if (!target) return;

            const currentCode = target.get('customCode') || '';

            // Tạo giao diện bên trong Modal
            const container = document.createElement('div');
            container.innerHTML = `
                <div style="margin-bottom: 10px; color: #b9b9b9; font-size: 13px;">
                    Nhập đoạn mã HTML, CSS (thẻ &lt;style&gt;) hoặc JavaScript (thẻ &lt;script&gt;) của bạn bên dưới:
                </div>
                <textarea id="gjs-custom-code-editor"></textarea>
                <div style="margin-top: 15px; display: flex; justify-content: flex-end; gap: 10px;">
                    <button id="gjs-btn-cancel-code" style="padding: 8px 16px; background: #4a5568; color: white; border: none; border-radius: 4px; cursor: pointer;">Hủy</button>
                    <button id="gjs-btn-save-code" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Lưu lại</button>
                </div>
            `;

            const modal = editor.Modal;
            modal.setTitle('Chỉnh sửa Mã Tùy Chỉnh (Custom Code)');
            modal.setContent(container);
            modal.open();

            let codeViewer = null;

            // Sử dụng CodeMirror để hỗ trợ tô màu cú pháp (Syntax Highlighting)
            if (typeof CodeMirror !== 'undefined') {
                const textarea = container.querySelector('#gjs-custom-code-editor');
                codeViewer = CodeMirror.fromTextArea(textarea, {
                    lineNumbers: true,
                    mode: 'htmlmixed',
                    theme: 'hopscotch',
                    tabSize: 2,
                    indentUnit: 2,
                    lineWrapping: true
                });
                codeViewer.setValue(currentCode);
                setTimeout(() => codeViewer.refresh(), 50);
            } else {
                const textarea = container.querySelector('#gjs-custom-code-editor');
                textarea.value = currentCode;
                textarea.style.cssText = "width: 100%; height: 250px; background: #1e293b; color: #fff; font-family: monospace; padding: 10px; border-radius: 4px;";
            }

            // Nút Lưu mã code
            container.querySelector('#gjs-btn-save-code').onclick = () => {
                const newCode = codeViewer ? codeViewer.getValue() : container.querySelector('#gjs-custom-code-editor').value;
                target.set('customCode', newCode);
                modal.close();
            };

            // Nút Hủy
            container.querySelector('#gjs-btn-cancel-code').onclick = () => {
                modal.close();
            };
        }
    });

    // BẮT SỰ KIỆN KÉO THẢ: Vừa thả tay buông Block xuống canvas là hiện Modal ngay lập tức!
    editor.on('block:drag:stop', (droppedComponent) => {
        const target = droppedComponent || editor.getSelected();
        if (target && target.get && target.get('type') === 'custom-code-block') {
            // Chờ canvas định vị xong component rồi kích hoạt modal
            setTimeout(() => {
                editor.select(target);
                editor.runCommand('open-custom-code-modal', { target: target });
            }, 100);
        }
    });

    return 'open-custom-code-modal';
}