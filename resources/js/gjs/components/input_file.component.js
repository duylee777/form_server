export function InputFileComponent(editor) {
    const fileType = 'input-file-component';

    editor.Components.addType(fileType, {
        isComponent: el => (el.tagName === 'DIV' && (el.getAttribute('data-gjs-type') === fileType || el.hasAttribute('file_label'))) ? { type: fileType } : false,

        model: {
            defaults: {
                tagName: 'div',
                classes: ['form-group', 'mb-3'],
                attributes: {
                    'data-gjs-type': fileType,
                    'file_label': 'Tải lên tài liệu / Hình ảnh',
                    'file_name': 'attachment',
                    'file_accept': '.jpg,.png,.pdf',
                    'file_required': false,
                    'file_multiple': false
                },
                traits: [
                    { type: 'text', label: 'Nhãn hiển thị', name: 'file_label' },
                    { type: 'text', label: 'Tên trường (Name)', name: 'file_name' },
                    { 
                        type: 'text', 
                        label: 'Định dạng (Accept)', 
                        name: 'file_accept',
                        placeholder: '.jpg,.png,.pdf hoặc image/*' 
                    },
                    { type: 'checkbox', label: 'Bắt buộc chọn tệp', name: 'file_required' },
                    { type: 'checkbox', label: 'Cho phép chọn nhiều tệp', name: 'file_multiple' }
                ]
            },

            init() {
                // Lắng nghe thay đổi từ Bảng Traits để vẽ lại cấu trúc HTML
                this.on('change:attributes:file_label change:attributes:file_name change:attributes:file_accept change:attributes:file_required change:attributes:file_multiple', this.renderStructure);

                if (!this.components().length) {
                    this.renderStructure();
                }
            },

            renderStructure() {
                if (this.isRendering) return;
                this.isRendering = true;

                const attrs = this.getAttributes();
                const labelText = attrs.file_label || 'Tải lên tài liệu / Hình ảnh';
                const name = attrs.file_name || 'attachment';
                const accept = attrs.file_accept || '';
                const isRequired = (attrs.file_required === true || attrs.file_required === 'true') ? 'required' : '';
                const isMultiple = (attrs.file_multiple === true || attrs.file_multiple === 'true') ? 'multiple' : '';

                // ĐẶC BIỆT: Gán data-gjs-type="default" để Parser không tự ép style input mặc định của GrapesJS
                this.components(`
                    <label class="block text-sm font-medium text-slate-700 mb-1 cursor-pointer">${labelText}</label>
                    <input 
                        data-gjs-type="default" 
                        type="file" 
                        name="${name}" 
                        ${accept ? `accept="${accept}"` : ''} 
                        ${isRequired} 
                        ${isMultiple} 
                        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-slate-300 rounded-md bg-white focus:outline-none" 
                    />
                `);

                this.isRendering = false;
            }
        }
    });

    return fileType;
}