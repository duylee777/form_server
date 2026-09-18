import { CustomCodeCommand } from "../commands/custom_code.command";

export function CustomCodeComponent(editor) {
    const openCustomCodeModal = CustomCodeCommand(editor);

    editor.Components.addType('custom-code-block', {
        model: {
            defaults: {
                name: 'Mã tùy chỉnh',
                droppable: false,
                resizable: false,
                editable: true,
                // Nội dung hiển thị mặc định khi chưa nhập code
                customCode: `<div style="padding: 20px; background: #f8f9fa; border: 2px dashed #cbd5e1; text-align: center; color: #64748b; font-family: sans-serif; border-radius: 6px;"><strong>&lt;/&gt; Mã tùy chỉnh (Custom Code)</strong><br><small style="font-size: 12px; color: #94a3b8;">Nhấp đôi vào đây để mở khung sửa mã HTML/CSS/JS</small></div>`,
                traits: [
                    {
                        type: 'button',
                        text: '⚙️ Chỉnh sửa Code',
                        full: true,
                        command: (editor) => {
                            const selected = editor.getSelected();
                            if (selected) {
                                editor.runCommand('open-custom-code-modal', { target: selected });
                            }
                        }
                    }
                ]
            },
            init() {
                // Lắng nghe khi thuộc tính customCode thay đổi thì render lại nội dung
                this.on('change:customCode', this.updateContent);
                this.updateContent();
            },
            updateContent() {
                const code = this.get('customCode') || '';
                // Render mã HTML/CSS/JS trực tiếp vào canvas
                this.components(code);
            }
        },
        view: {
            events: {
                dblclick: 'onDblClick' // Hỗ trợ nhấp đôi chuột vào block để sửa lại code
            },
            onDblClick(e) {
                if (e) e.stopPropagation();
                this.em.get('Commands').run(openCustomCodeModal, { target: this.model });
            }
        }
    });

    return 'custom-code-block';
}