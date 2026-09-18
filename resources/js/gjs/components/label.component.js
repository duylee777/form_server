export function LabelComponent(editor) {
    editor.Components.addType('label-component', {
        extend: 'text',
        model: {
            defaults: {
                tagName: 'label',
                droppable: '*',
                content: 'Tên nhãn thông tin',
                editable: true,
                traits: [
                    {
                        type: 'text',
                        label: 'Nội dung nhãn',
                        name: 'label_text', // 👈 2. TỰ ĐỘNG BẮT VÀ SỬA CHỮ BÊN TRONG THẺ <LABEL>
                    },
                    { 
                        type: 'text', 
                        label: 'Thuộc ô (For ID)', 
                        name: 'for' 
                    }
                ],
                style: {
                    'display': 'inline-block',
                    'font-weight': '600',
                    'margin-bottom': '6px',
                    'color': '#1e293b'
                }
            },
            init() {
                // Lắng nghe khi thuộc tính 'label_text' trong Traits thay đổi
                this.on('change:attributes:label_text', this.handleTextChange);
            },

            handleTextChange() {
                const newText = this.getAttributes().label_text;
                if (newText !== undefined) {
                    // Cập nhật lại chuỗi văn bản nằm bên trong thẻ <label>
                    this.components(newText);
                }
            }
        },
        isComponent: el => el.tagName === 'LABEL' ? { type: 'label-component' } : false,
    });

    return 'label-component';
}