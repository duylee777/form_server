import jsBeautify from "js-beautify";

// Biến lưu trữ event handler để gỡ bỏ khi đóng Modal
let preventBackdropCloseHandler = null;


export function ViewSourceCommand(editor) {
    editor.Commands.add('open-view-source-modal', {
        run(editor, sender, options = {}) {
            const selected = options.target || editor.getSelected();
            if (!selected) return;

            // Lấy HTML riêng của Component (Không dính CSS reset toàn trang)
            const componentHtml = selected.toHTML();

            // Format code HTML
            const beautifyFn = jsBeautify.html || window.html_beautify;
            const formattedHtml = beautifyFn ? beautifyFn(componentHtml, {
                indent_size: 4,
                indent_char: ' ',
                max_preserve_newlines: 1,
                preserve_newlines: true,
                inline: [],
                wrap_line_length: 0
            }) : componentHtml;

            // Tạo giao diện Modal
            const container = document.createElement('div');
            container.innerHTML = `
                <div style="margin-bottom: 10px; color: #b9b9b9; font-size: 13px;">
                    Mã HTML phân vùng (Sửa trực tiếp và bấm Cập nhật):
                </div>
                <textarea id="gjs-component-code-editor"></textarea>
                <div style="margin-top: 15px; display: flex; justify-content: flex-end; gap: 10px;">
                    <button id="btn-close-comp-modal" style="padding: 8px 16px; background: #4a5568; color: white; border: none; border-radius: 4px; cursor: pointer;">Đóng</button>
                    <button id="btn-save-comp-code" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Cập nhật phân vùng</button>
                </div>
            `;

            const modal = editor.Modal;
            modal.setTitle('Mã Nguồn Phân Vùng Đã Chọn');
            modal.setContent(container);
            modal.open();

            // =========================================================================
            // 🟢 KHÔI PHỤC: CHẶN ĐÓNG MODAL KHI CLICK VÀO VÙNG XÁM (BACKDROP)
            // =========================================================================
            const containerEl = document.querySelector('.gjs-mdl-container');
            if (containerEl) {
                preventBackdropCloseHandler = (e) => {
                    if (e.target === containerEl) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                };
                containerEl.addEventListener('click', preventBackdropCloseHandler, true);
            }

            // Khởi tạo CodeMirror
            let codeViewer = null;
            if (typeof CodeMirror !== 'undefined') {
                const textarea = container.querySelector('#gjs-component-code-editor');
                codeViewer = CodeMirror.fromTextArea(textarea, {
                    lineNumbers: true,
                    mode: 'htmlmixed',
                    theme: 'hopscotch',
                    tabSize: 4,
                    lineWrapping: true
                });
                codeViewer.setValue(formattedHtml);
                setTimeout(() => codeViewer.refresh(), 50);
            }

            // Nút Cập nhật
            container.querySelector('#btn-save-comp-code').onclick = () => {
                const newHtml = codeViewer 
                    ? codeViewer.getValue() 
                    : container.querySelector('#gjs-component-code-editor').value;

                if (newHtml && selected) {
                    const replaced = selected.replaceWith(newHtml);
                    const newComp = Array.isArray(replaced) ? replaced[0] : replaced;
                    
                    if (newComp) {
                        editor.select(newComp);
                    }
                    editor.trigger('component:update', newComp || selected);
                }

                modal.close();
            };

            // Nút Đóng
            container.querySelector('#btn-close-comp-modal').onclick = () => modal.close();
        }
    });

    return 'open-view-source-modal';
}