import { SelectTrait } from "../traits/select.trait";

export function SelectComponent(editor) {
    const optionsManager = SelectTrait(editor);

    editor.Components.addType('select-component', {
        model: {
            defaults: {
                tagName: 'select',
                attributes: { name: 'select_option' },
                // Mảng lưu dữ liệu options ban đầu
                options_data: [
                    { label: 'Lựa chọn 1', value: 'option1' },
                    { label: 'Lựa chọn 2', value: 'option2' }
                ],
                traits: [
                    { type: 'text', label: 'Tên trường (Name)', name: 'name' },
                    { type: 'checkbox', label: 'Bắt buộc chọn', name: 'required' },
                    {
                        type: optionsManager, // Gán Trait tùy biến ở Bước 1
                        name: 'options_data',
                        label: 'Danh sách Lựa chọn'
                    }
                ],
                style: {
                    'width': '100%',
                    'padding': '10px',
                    'border': '1px solid #cbd5e1',
                    'border-radius': '6px',
                    'margin-bottom': '10px'
                }
            },
            // 2. KHỞI TẠO BỘ LẮNG NGHE SỰ KIỆN
            init() {
                const children = this.components();
                let hasExistingOptions = false;

                // 1. Trường hợp nạp lại từ HTML cũ đã lưu
                if (children && children.length > 0) {
                    const savedOptions = [];
                    children.forEach(child => {
                        if (child.get('tagName') === 'option') {
                            const label = child.components().length ? child.components().at(0).get('content') : '';
                            const value = child.getAttributes().value || '';
                            savedOptions.push({ label, value });
                        }
                    });

                    if (savedOptions.length > 0) {
                        this.set('options_data', savedOptions, { silent: true });
                        hasExistingOptions = true;
                    }
                }

                // 2. 🔥 ĐIỂM CỐT LÕI: Nếu kéo Block mới thả vào Canvas (chưa có options), ép render ngay!
                if (!hasExistingOptions) {
                    this.handleOptionsDataChange();
                }

                // 3. Lắng nghe khi thêm/sửa/xóa trên bảng Trait Manager
                this.on('change:options_data', this.handleOptionsDataChange);
            },

            // 3. HÀM TỰ ĐỘNG TẠO LẠI CÁC THẺ <OPTION>
            handleOptionsDataChange() {
                const options = this.get('options_data') || [];
                const newComponents = options.map(opt => ({
                    tagName: 'option',
                    attributes: { value: opt.value || '' },
                    components: opt.label || ''
                }));

                // Cập nhật danh sách thẻ <option> thực tế bên trong <select>
                this.components(newComponents);
            }
        },
        isComponent: el => {
            if (el.tagName === 'SELECT') {
                return { type: 'select-component' };
            }
        }
    });

    return 'select-component';
}