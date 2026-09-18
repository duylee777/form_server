export function CheckboxComponent(editor) {
    const checkboxType = 'checkbox-component';

    editor.Components.addType(checkboxType, {
        isComponent: el => (el.tagName === 'DIV' && el.getAttribute('data-gjs-type') === checkboxType) ? { type: checkboxType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['form-check-group flex items-center gap-2 cursor-pointer'],
                droppable: false,
                attributes: { 
                    'data-gjs-type': checkboxType,
                    'checkbox_label': 'Tùy chọn Checkbox',
                    'checkbox_name': 'checkbox_group[]',
                    'checkbox_value': 'val_1',
                    'checkbox_checked': false,
                },

                traits: [
                    { type: 'text', label: 'Nhãn hiển thị', name: 'checkbox_label' },
                    { type: 'text', label: 'Tên trường (Name)', name: 'checkbox_name' },
                    { type: 'text', label: 'Giá trị (Value)', name: 'checkbox_value' },
                    { type: 'checkbox', label: 'Mặc định tích (Checked)', name: 'checkbox_checked' },
                ]
            },

            init() {
                this.on('change:attributes:checkbox_label change:attributes:checkbox_name change:attributes:checkbox_value change:attributes:checkbox_checked', this.renderContent);
                
                if (!this.components().length) {
                    this.renderContent();
                }
            },

            renderContent() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const labelText = attrs.checkbox_label || 'Tùy chọn Checkbox';
                const name = attrs.checkbox_name || 'checkbox_group[]';
                const value = attrs.checkbox_value || 'val_1';
                const isChecked = (attrs.checkbox_checked === true || attrs.checkbox_checked === 'true');

                this.components([
                    {
                        tagName: 'input',
                        attributes: {
                            type: 'checkbox',
                            class: 'cursor-pointer m-0! w-4! h-4!',
                            name: name,
                            value: value,
                            ...(isChecked ? { checked: 'checked' } : {})
                        },
                        badgable: false,
                        draggable: false,
                        droppable: false,
                        selectable: false,
                        hoverable: false,
                        layerable: false,
                    },
                    {
                        tagName: 'label',
                        components: labelText,
                        badgable: false,
                        draggable: false,
                        droppable: false,
                        selectable: false,
                        hoverable: false,
                        layerable: false,
                        attributes: {
                            class: 'cursor-pointer text-sm! font-normal! text-slate-800! select-none! m-0!'
                        }
                    }
                ]);

                this.isRendering = false;
            }
        }
    });

    return checkboxType;
}