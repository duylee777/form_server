export function TextareaComponent(editor) {
    const textareaType = 'textarea-component';

    editor.Components.addType(textareaType, {
        // Nhận diện Component khi load từ Database hoặc HTML thô
        isComponent: el => (el.tagName === 'DIV' && (el.getAttribute('data-gjs-type') === textareaType || el.hasAttribute('textarea_label'))) ? { type: textareaType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['form-group', 'mb-3'],
                attributes: {
                    'data-gjs-type': textareaType,
                    'textarea_label': 'Lời nhắn / Ghi chú',
                    'textarea_name': 'message',
                    'textarea_placeholder': 'Nhập nội dung...',
                    'textarea_value': '',
                    'textarea_rows': '4',
                    'textarea_required': false
                },
                traits: [
                    { type: 'text', label: 'Nhãn hiển thị', name: 'textarea_label' },
                    { type: 'text', label: 'Tên trường (Name)', name: 'textarea_name' },
                    { type: 'text', label: 'Gợi ý (Placeholder)', name: 'textarea_placeholder' },
                    { type: 'textarea', label: 'Giá trị mặc định', name: 'textarea_value' },
                    { type: 'number', label: 'Số dòng (Rows)', name: 'textarea_rows' },
                    { type: 'checkbox', label: 'Bắt buộc nhập', name: 'textarea_required' }
                ]
            },

            init() {
                // Lắng nghe thay đổi từ Bảng Traits
                this.on('change:attributes:textarea_label change:attributes:textarea_name change:attributes:textarea_placeholder change:attributes:textarea_rows change:attributes:textarea_required', this.renderStructure);
                this.on('change:attributes:textarea_value', this.syncValueToDOM);

                // Nếu chưa có thẻ con (hoặc khi mới khởi tạo), tiến hành render
                if (!this.components().length) {
                    this.renderStructure();
                } else {
                    // Nếu load từ DB đã có sẵn thẻ con, tiến hành ép giá trị vào DOM
                    setTimeout(() => this.syncValueToDOM(), 50);
                }
            },

            renderStructure() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const labelText = attrs.textarea_label || 'Lời nhắn / Ghi chú';
                const name = attrs.textarea_name || 'message';
                const placeholder = attrs.textarea_placeholder || '';
                const val = attrs.textarea_value || '';
                const rows = attrs.textarea_rows || '4';
                const isRequired = (attrs.textarea_required === true || attrs.textarea_required === 'true') ? 'required' : '';

                // ĐẶC BIỆT: Chèn ${val} vào giữa thẻ <textarea> và thêm data-gjs-type="default"
                this.components(`
                    <label class="block text-sm font-medium text-slate-700 mb-1 cursor-pointer">${labelText}</label>
                    <textarea data-gjs-type="default" name="${name}" rows="${rows}" placeholder="${placeholder}" ${isRequired} class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-slate-800 resize-y">${val}</textarea>
                `);

                setTimeout(() => this.syncValueToDOM(), 0);
                this.isRendering = false;
            },

            syncValueToDOM() {
                const val = this.getAttributes().textarea_value || '';
                const view = this.getView();
                if (view && view.el) {
                    const textareaEl = view.el.querySelector('textarea');
                    if (textareaEl) {
                        textareaEl.value = val;
                        textareaEl.textContent = val; // Đảm bảo ghi giá trị vào innerHTML để lưu DB không bị rỗng
                    }
                }
            }
        },

        view: {
            events: {
                'input textarea': 'onTextareaInput'
            },

            onTextareaInput(e) {
                const newValue = e.target.value;
                e.target.textContent = newValue; // Cập nhật trực tiếp innerHTML trên DOM
                this.model.addAttributes({ textarea_value: newValue }, { silent: true });
            }
        }
    });

    return textareaType;
}