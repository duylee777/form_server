export function RadioComponent(editor) {
    const radioType = 'radio-component';

    editor.Components.addType(radioType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === radioType) ? { type: radioType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['form-radio-group', 'flex', 'items-center', 'gap-2', 'mb-3', 'cursor-pointer'],
                attributes: { 
                    'data-gjs-type': radioType,
                    'radio_label': 'Tùy chọn Radio',
                    'radio_name': 'radio_group',
                    'radio_value': 'option_1',
                    'radio_checked': false,
                },

                traits: [
                    { type: 'text', label: 'Nhãn hiển thị', name: 'radio_label' },
                    { type: 'text', label: 'Tên nhóm (Name)', name: 'radio_name' },
                    { type: 'text', label: 'Giá trị (Value)', name: 'radio_value' },
                    { type: 'checkbox', label: 'Mặc định chọn (Checked)', name: 'radio_checked' },
                ]
            },

            init() {
                // 1. Lắng nghe chính xác sự kiện thay đổi Attributes từ Bảng Traits
                this.on('change:attributes:radio_label change:attributes:radio_name change:attributes:radio_value change:attributes:radio_checked', this.renderContent);
                
                // 2. Lần đầu kéo ra Canvas nếu chưa có thẻ con thì render
                if (!this.components().length) {
                    this.renderContent();
                }
            },

            renderContent() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const labelText = attrs.radio_label || 'Tùy chọn Radio';
                const name = attrs.radio_name || 'radio_group';
                const value = attrs.radio_value || 'option_1';
                const isChecked = (attrs.radio_checked === true || attrs.radio_checked === 'true') ? 'checked' : '';
                this.components([
                    {
                        tagName: 'input',
                        attributes: {
                            type: 'radio',
                            class: 'cursor-pointer m-0! w-4! h-4!',
                            name: name,
                            value: value,
                            ...(isChecked ? { checked: 'checked' } : {})
                        },
                        badgable: false,
                        draggable: false,
                        droppable: false,
                        hoverable: false,
                        layerable: false,
                        selectable: false,
                    },
                    {
                        tagName: 'label',
                        components: labelText,
                        badgable: false,
                        draggable: false,
                        droppable: false,
                        hoverable: false,
                        layerable: false,
                        selectable: false,
                        attributes: {
                            class: 'cursor-pointer text-sm! font-normal! text-slate-800! select-none! m-0!'
                        }
                    }
                ]);

                this.isRendering = false;
            }
        }
    });

    return radioType;
}